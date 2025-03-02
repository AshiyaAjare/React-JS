import React from 'react';

const features = [
  {
    name: 'Issue Tracking System',
    description: 'Create and track issues with real-time updates and notifications',
    image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  },
  {
    name: 'Find & Connect with People',
    description: 'Discover and collaborate with others who share your interests and goals',
    image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
  },
  {
    name: 'Post Your Queries',
    description: 'Share your questions and challenges to get help from the community',
    image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
  },
  {
    name: 'Respond to Others',
    description: 'Contribute your expertise and build your reputation in the community',
    image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-16">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  }
];

const Features = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Enhanced decorative elements */}
        <div className="absolute top-40 left-0 w-64 h-64 bg-pink-100 rounded-full opacity-30 blur-3xl -ml-32"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl -mr-40"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Heading section with enhanced visuals */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Key Features
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how LinkUp can help your team collaborate and grow
          </p>
        </div>
        
        {/* Features section with improved layout */}
        <div className="relative z-10">
          {/* Top two features - larger cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {features.slice(0, 2).map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-indigo-50 backdrop-blur-sm flex"
              >
                <div className="bg-purple-100 p-4 h-fit rounded-lg inline-flex mr-6 text-indigo-500">
                  {feature.image}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h2>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom two features with testimonial sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.slice(2, 4).map((feature, index) => (
                <div 
                  key={index + 2} 
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-indigo-50 backdrop-blur-sm flex"
                >
                  <div className="bg-purple-100 p-4 h-fit rounded-lg inline-flex mr-6 text-indigo-500">
                    {feature.image}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h2>
                    <p className="text-gray-600 flex-grow">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Features;