"use client";
import { ArrowRight, MessageSquare, Sparkles, Clock, Bot } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-white">
      {/* Navigation */}
      <nav className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="text-purple-400" size={28} />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
              かおり AI
            </span>
          </div>
          <div>
            <Link href="/ai" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-medium">
              Try Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Experience the Future of Conversation with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"> かおり AI</span>
            </h1>
            <p className="text-xl text-gray-300">
              Elevate your interactions with our advanced AI assistant. Designed for natural conversations, creative collaboration, and personalized support.
            </p>
            <p className="text-xl text-gray-300">
            ✨ Note: This is kaori personal experimental project. The goal is to explore AI integration using Next.js and Groq API, while also enhancing my skills in building a responsive and intuitive AI assistant. 🚀
            </p>
            <Link href="/ai" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-lg flex items-center justify-center">
              Start Chatting <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
