'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BriefcaseIcon, UserIcon, SparklesIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
      } else {
        setError('Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <EnvelopeIcon className="h-5 w-5 text-purple-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-950 text-white px-6 py-3 rounded-lg hover:bg-purple-800 flex items-center justify-center gap-2 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Joining...
              </>
            ) : 'Get Early Access'}
          </button>
        </form>
      ) : (
        <div className="text-center bg-green-800 p-4 rounded-lg border border-green-600">
          <p className="text-green-400 font-medium">🎉 Thanks! You're on the list!</p>
        </div>
      )}
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
      <p className="text-gray-400 text-sm mt-4 text-center">
        We respect your privacy. No spam ever.
      </p>
    </div>
  );
}

export default function Home() {
  const [showFeature, setShowFeature] = useState(null);

  const features = [
    { 
      title: "One-Click Apply",
      shortDesc: "Instant applications with AI-optimized materials",
      fullDesc: `Simplifying Applications with AI

The traditional job application process is time-consuming and repetitive.
WorkSphereLife changes that with One-Click Apply.

✅ Pre-filled applications using AI-driven form automation
✅ Resume & cover letter customization tailored for each job
✅ ATS-friendly submissions to ensure resumes pass screening
✅ Real-time tracking & notifications when applications are viewed

🔹 What This Means for Job Seekers: No more manual applications—just one click and AI handles the rest.
🔹 What This Means for Employers: Receive complete, ATS-compatible applications from verified, high-quality candidates`,
      icon: BriefcaseIcon
    },
    { 
      title: "AI Resume Optimization",
      shortDesc: "Tailored resumes crafted with AI precision",
      fullDesc: `Tailored Resumes for Every Job

Most job seekers use one generic resume for every application—reducing their chances of getting hired. 
WorkSphereLife’s AI analyzes each job description and rewrites resumes to maximize success.

✅ Custom AI-driven resume enhancement based on job descriptions
✅ Keyword optimization to pass ATS screening
✅ Instant AI-generated cover letters for personalized applications
✅ AI-powered suggestions to improve job seeker profiles

🔹 What This Means for Job Seekers: Higher chances of landing interviews with job-specific, optimized resumes.
🔹 What This Means for Employers: Every resume is tailored for relevance, reducing mismatched applications`,
      icon: SparklesIcon
    },
    { 
      title: "Smart Matching",
      shortDesc: "AI-driven candidate ranking for employers",
      fullDesc: `AI-Driven Candidate Selection for Employers

Recruiters waste countless hours sorting through hundreds of applications. 
WorkSphereLife’s Smart Matching algorithm ranks the best candidates instantly.

✅ AI-powered ranking system that filters top candidates
✅ Automatic shortlisting based on skills, experience, and culture fit
✅ Bias-free hiring decisions using data-driven selection models
✅ Seamless integration with applicant tracking systems (ATS)

🔹 What This Means for Job Seekers: Faster interview callbacks by matching your skills to the right jobs.
🔹 What This Means for Employers: Save 50% of hiring time by getting the best talent without manual screening`,
      icon: UserIcon
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Image
              src="/images/New%20Logo%202.png"
              alt="WorkSphereLife"
              width={200}
              height={60}
              className="h-16 w-auto"
              priority
            />
            <span className="text-2xl font-semibold text-white">WorkSphereLife</span>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
          </div>
          <button className="bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors">
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Job Applications, 
          <span className="bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 bg-clip-text text-transparent">
            Effortless!
          </span>
          <br />
          Hiring, 
          <span className="bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 bg-clip-text text-transparent">
            Smarter!
          </span>
        </h1>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          AI-driven automation optimizing your job search and hiring process. Apply with one click. Find the right candidates instantly.
        </p>
        <WaitlistForm />
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">
          Revolutionizing Hiring Through AI
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="p-8 border border-purple-900 rounded-xl hover:shadow-lg transition bg-gray-800 cursor-pointer"
              onClick={() => setShowFeature(feature)}
            >
              <feature.icon className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      {showFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl max-w-2xl w-full mx-4 relative">
            <button 
              onClick={() => setShowFeature(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <div className="text-center whitespace-pre-line">
              <showFeature.icon className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">{showFeature.title}</h2>
              <p className="text-gray-300 text-lg text-left">{showFeature.fullDesc}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 bg-purple-950 text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">
          Ready to Transform Your Hiring Journey?
        </h2>
        <button className="bg-purple-700 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors">
          Start Free Trial
        </button>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 WorkSphereLife. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
