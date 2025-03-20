import React, { useState } from 'react';

const UserManualGuide = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-indigo-500 mb-6">User Manual Guide</h1>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            {['overview', 'contributor', 'moderator', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-500 text-white'
                    : 'bg-lavender-300 text-gray-700 hover:bg-indigo-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Content Sections */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-pink-100">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Welcome to the Platform</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    This platform is designed to facilitate knowledge sharing and collaboration through a structured query and response system.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <h3 className="font-semibold text-indigo-500">Key Roles</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <span className="font-medium">Contributors</span> - Post queries and respond to others' questions
                      </li>
                      <li>
                        <span className="font-medium">Moderators</span> - Review and approve responses before publication
                      </li>
                    </ul>
                  </div>
                  <p>
                    Our platform ensures quality content through moderation while empowering users to share their knowledge and get answers to their questions.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'contributor' && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Contributor Guidelines</h2>
                <div className="text-gray-700 space-y-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Posting a Query</h3>
                      <p className="text-gray-600 mt-1">
                        Click on the "New Query" button on the dashboard. Fill in the title and description fields with clear, concise information about your question.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Responding to Queries</h3>
                      <p className="text-gray-600 mt-1">
                        Browse queries from other contributors. When you find one you can help with, click "Respond" and submit your answer. Your response will be sent for moderation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Moderation Process</h3>
                      <p className="text-gray-600 mt-1">
                        After submitting your response, it will be reviewed by a moderator. You'll be notified once it's approved and visible to other users.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-200 mt-4">
                    <h3 className="font-semibold text-indigo-500">Best Practices</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                      <li>Be clear and concise in your queries and responses</li>
                      <li>Provide relevant information and context</li>
                      <li>Use appropriate formatting for code snippets or technical information</li>
                      <li>Be respectful and constructive in your interactions</li>
                      <li>Check for existing similar queries before posting a new one</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'moderator' && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Moderator Guidelines</h2>
                <div className="text-gray-700 space-y-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Response Review Queue</h3>
                      <p className="text-gray-600 mt-1">
                        Access your moderator dashboard to see all responses waiting for review. Responses are ordered by submission time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Reviewing Responses</h3>
                      <p className="text-gray-600 mt-1">
                        Review each response for accuracy, clarity, and adherence to community guidelines. You can approve, reject, or send feedback to the contributor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold text-indigo-500">Moderation Actions</h3>
                      <p className="text-gray-600 mt-1">
                        After reviewing, select "Approve" to publish the response or "Reject" to prevent publication. You can add notes to explain your decision to the contributor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 mt-4">
                    <h3 className="font-semibold text-indigo-500">Moderation Standards</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                      <li>Ensure responses are accurate and helpful</li>
                      <li>Check for clarity and appropriate tone</li>
                      <li>Verify that responses don't contain harmful or inappropriate content</li>
                      <li>Maintain consistency in moderation decisions</li>
                      <li>Provide constructive feedback when rejecting responses</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'faq' && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-6 text-gray-700">
                  <div className="border-b border-pink-100 pb-4">
                    <h3 className="font-semibold text-indigo-500">How long does the moderation process take?</h3>
                    <p className="text-gray-600 mt-1">
                      Typically, responses are reviewed within 24-48 hours, depending on the volume of submissions.
                    </p>
                  </div>
                  
                  <div className="border-b border-pink-100 pb-4">
                    <h3 className="font-semibold text-indigo-500">Can I edit my response after submitting it?</h3>
                    <p className="text-gray-600 mt-1">
                      Yes, you can edit your response before it's approved. Once approved, you'll need to submit a new response with your changes.
                    </p>
                  </div>
                  
                  <div className="border-b border-pink-100 pb-4">
                    <h3 className="font-semibold text-indigo-500">How do I become a moderator?</h3>
                    <p className="text-gray-600 mt-1">
                      Moderators are selected from active contributors who have demonstrated expertise and commitment to the platform. Contact the admin team for more information.
                    </p>
                  </div>
                  
                  <div className="border-b border-pink-100 pb-4">
                    <h3 className="font-semibold text-indigo-500">Can I respond to multiple queries?</h3>
                    <p className="text-gray-600 mt-1">
                      Yes, you can respond to as many queries as you like. There's no limit on the number of contributions you can make.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-500">What happens if my response is rejected?</h3>
                    <p className="text-gray-600 mt-1">
                      You'll receive feedback explaining why your response was rejected. You can then revise and resubmit your response based on the feedback.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Start Guide */}
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Quick Start Guide</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span>Create your account and complete your profile</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Browse existing queries or post your own</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <span>Respond to queries that match your expertise</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Wait for moderation approval and engage with other users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserManualGuide;