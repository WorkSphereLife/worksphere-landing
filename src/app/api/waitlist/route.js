import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

// Debugging: Print environment variables
console.log("🔍 FIREBASE_KEY_PATH:", process.env.FIREBASE_KEY_PATH);
console.log("🔍 GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log("🔍 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔍 Checking FIREBASE_SERVICE_ACCOUNT availability:", !!process.env.FIREBASE_SERVICE_ACCOUNT);

// Load Firebase credentials (Supports Local & Vercel)
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Running on Vercel (Read from Environment Variable)
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Running Locally (Read from JSON File)
  const serviceAccountPath = process.env.FIREBASE_KEY_PATH || "./serviceAccountKey.json";

  if (!serviceAccountPath || !existsSync(serviceAccountPath)) {
    console.error("❌ ERROR: Firebase key path is missing or incorrect:", serviceAccountPath);
    throw new Error("Missing or incorrect Firebase key path.");
  }

  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
}

// Initialize Firebase if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase initialized successfully.");
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    throw new Error("Firebase initialization failed.");
  }
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
      console.warn("⚠️ Missing email in request.");
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    console.log(`📩 New waitlist submission: ${email}`);

    // Store email in Firestore
    const emailRef = firestore.collection("waitlist").doc(email);
    await emailRef.set({ email, timestamp: new Date() });

    console.log(`✅ Email added to Firestore: ${email}`);

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to WorkSphere Life Beta Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome to WorkSphereLife! 🎉</h2>
          <p>Thank you for signing up for our beta waitlist! You are now among the first to experience our platform.</p>
          <p>We’ll keep you updated with the latest news and exclusive early access.</p>
          <p>Stay tuned!</p>
          <br>
          <p>Best,</p>
          <p><strong>The WorkSphereLife Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 Confirmation email sent to: ${email}`);

    return new Response(
      JSON.stringify({ message: "Success! Email added to waitlist and confirmation sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 ERROR:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
  }
}
