'use client'

import { BookOpenCheck } from 'lucide-react';
import Card from './components/Card';
import { useState } from 'react';
import { toast } from "sonner";

export default function Home() {

  const [email, setEmail] = useState('');

  // event handler
  const handleSubscribe = () => {
  }



  return (
    <div className="min-h-screen bg-white">
      {/* header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <BookOpenCheck />
        <h1 className='text-2xl font-bold'>Daily News</h1>
      </div>
      <nav className='flex items-center gap-6'>
        <a href="/" className="hover:text-gray-500">About</a>
        <a href="/" className="hover:text-gray-500">Contact</a>
      </nav>
      </header>

      {/* main content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Daily Briefs of AI</h2>
          <p className='text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed'>
            Discover the latest news and insights in the world of AI. Stay updated with the latest developments and trends in artificial intelligence.
          </p>
        </div>
      
        {/* input and subscribe button */}
        <div className='text-center flex items-center justify-center gap-4'>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card title='AI' description='Latest news and insights in the world of AI. Stay updated with the latest developments and trends in artificial intelligence.' />
          <Card title='Startups' description='Business news and insights in the world of startups. Stay updated with the latest developments and trends in startups.'/>
          <Card title='Tech' description='Latest news and insights in the world of tech. Stay updated with the latest developments and trends in tech.'/>
        </div>


      </div>

    </div>

  );
}
