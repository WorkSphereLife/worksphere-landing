'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          </div>
          <button className="bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors">
            Get Started Free
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <div className="text-center mb-12">
          <Link href="/">
            <button className="bg-purple-950 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors text-lg font-medium">
              ← Back to Home
            </button>
          </Link>
        </div>

        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Revolutionizing the Job Search & Hiring Process
        </h2>
        
        <div className="text-gray-300 text-lg mb-12 space-y-6 max-w-3xl mx-auto">
          <p>
            The modern job application process is broken. Job seekers spend hours filling out repetitive forms, 
            tweaking resumes, and submitting applications, only to receive no feedback. On the other hand, 
            recruiters struggle to sift through hundreds of resumes to find qualified candidates.
          </p>
          
          <p>
            WorkSphereLife is changing that by bringing job seekers and recruiters into one AI-powered hiring ecosystem. 
            We eliminate inefficiencies, automate workflows, and provide data-driven hiring insights.
          </p>
          
          <p className="text-purple-400 font-semibold text-xl text-center">
            Our mission is simple: Make job applications effortless for candidates and hiring seamless for employers.
          </p>
        </div>

        <h3 className="text-3xl font-bold mb-12 text-white text-center">How It Works</h3>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="p-8 border border-purple-900 rounded-xl bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <BriefcaseIcon className="h-12 w-12 text-purple-400" />
              <h3 className="text-2xl font-semibold text-white">💡 For Job Seekers</h3>
            </div>
            <ul className="text-gray-300 space-y-4">
              <li>✅ Apply to jobs instantly with One-Click Apply</li>
              <li>✅ AI-powered resume & cover letter customization tailored for every job</li>
              <li>✅ Real-time application tracking to keep job seekers updated</li>
              <li>✅ Personalized job matching based on skills, experience, and industry trends</li>
            </ul>
          </div>

          <div className="p-8 border border-purple-900 rounded-xl bg-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <SparklesIcon className="h-12 w-12 text-purple-400" />
              <h3 className="text-2xl font-semibold text-white">💼 For Employers & Recruiters</h3>
            </div>
            <ul className="text-gray-300 space-y-4">
              <li>✅ AI-driven candidate ranking to surface the best talent instantly</li>
              <li>✅ Automated resume screening & shortlisting powered by AI</li>
              <li>✅ Seamless integration with ATS (Greenhouse, Lever, Workday, etc.)</li>
              <li>✅ Data-driven insights to improve hiring efficiency</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            At WorkSphereLife, we believe that hiring should be as intelligent as the workforce itself. 
            By leveraging AI, we reduce friction, eliminate bias, and make hiring smarter, faster, and fairer.
          </p>
        </div>
      </div>
    </div>
  );
}