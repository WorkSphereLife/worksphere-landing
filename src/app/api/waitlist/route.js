import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

// Load Firebase credentials from JSON file
const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_KEY_PATH);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Handles POST requests for the waitlist.
 */
export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // Store email in Firestore
    const emailRef = firestore.collection("waitlist").doc(email);
    await emailRef.set({ email, timestamp: new Date() });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to WorkSphere Life Beta Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome to WorkSphere Life! 🎉</h2>
          <p>Thank you for signing up for our beta waitlist! You are now among the first to experience our platform.</p>
          <p>We’ll keep you updated with the latest news and exclusive early access.</p>
          <p>Stay tuned!</p>
          <br>
          <p>Best,</p>
          <p><strong>The WorkSphere Life Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Success! Email added to waitlist and confirmation sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
  }
}