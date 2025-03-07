import React, { useState, useMemo } from 'react';
import { useResponsesContainer } from "../container/PendingResponseContainer";
import { useUpdateResponseStatusMutation } from '../api/responseApi';
import { Response, User, Tag } from '../container/types';

const Responses = () => {
  const { responses: responseData, currentUser, isLoading, error } = useResponsesContainer();
  const [updateResponseStatus] = useUpdateResponseStatusMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponses, setSelectedResponses] = useState<number[]>([]);

  const isAdmin = currentUser && currentUser.role === 'moderator';
  const responses = responseData?.responses ?? [];

  const handleStatusUpdate = (response: Response, field: keyof Response) => {
    if (!isAdmin) return;

    const updates = {
      [field]: !response[field]
    };

    updateResponseStatus({ 
      id: response.id, 
      updates 
    });
  };

  const handleBulkStatusUpdate = (field: 'approval' | 'flagged') => {
    if (!isAdmin) return;

    selectedResponses.forEach(responseId => {
      const response = responses.find(r => r.id === responseId);
      if (response) {
        updateResponseStatus({
          id: responseId,
          updates: { [field]: !response[field] }
        });
      }
    });

    setSelectedResponses([]);
  };

  const toggleResponseSelection = (responseId: number) => {
    setSelectedResponses(prev => 
      prev.includes(responseId)
        ? prev.filter(id => id !== responseId)
        : [...prev, responseId]
    );
  };

  const filteredResponses = useMemo(() => {
    if (!searchTerm) return responses;

    const lowercaseSearch = searchTerm.toLowerCase();
    return responses.filter(response => 
      response.query?.title.toLowerCase().includes(lowercaseSearch) ||
      response.content.toLowerCase().includes(lowercaseSearch) ||
      response.user?.first_name.toLowerCase().includes(lowercaseSearch) ||
      response.user?.last_name.toLowerCase().includes(lowercaseSearch) ||
      response.tags?.some(tag => tag.name.toLowerCase().includes(lowercaseSearch))
    );
  }, [responses, searchTerm]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <p className="text-gray-700 text-xl">No Responses</p>
      </div>
    );
  }

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="animate-pulse text-indigo-500 text-xl">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <p className="text-red-500 text-xl">Error fetching responses</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-600 mb-8 text-center">Response Management</h2>
        
        {/* Search Input */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-4">
            <input 
              type="text"
              placeholder="Search responses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          {selectedResponses.length > 0 && (
                    <div className="flex flex-col space-y-2 w-60">
                      <button 
                        onClick={() => handleBulkStatusUpdate('approval')}
                        className="mt-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs hover:bg-green-200 transition"
                      >
                        Bulk {selectedResponses.length > 1 ? 'Approve' : 'Toggle'}
                      </button>
                      <button 
                        onClick={() => handleBulkStatusUpdate('flagged')}
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs hover:bg-yellow-200 transition"
                      >
                        Bulk {selectedResponses.length > 1 ? 'Flag' : 'Toggle'}
                      </button>
                    </div>
                  )}
        </div>
        
        {filteredResponses?.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-md p-8">
            <p className="text-gray-500 text-lg">No responses found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredResponses?.map((response) => (
              //{():()}
              <div 
                key={response.id} 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex items-center"
              >
                {/* Checkbox for selection */}
                <input 
                  type="checkbox"
                  checked={selectedResponses.includes(response.id)}
                  onChange={() => toggleResponseSelection(response.id)}
                  className="mr-4 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                
                {/* Main Content */}
                <div className="flex-grow">
                  <p className="text-indigo-700 font-semibold text-lg truncate mb-1">
                    {response.user ? `${response.user.first_name} ${response.user.last_name}` : "Unknown User"}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {response.content || "No content available"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {response.query?.title || "No query available"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-4">
                  
                  
                  {/* Status Indicators */}
                  <div 
                    onClick={() => handleStatusUpdate(response, 'approval')}
                    className={`cursor-pointer px-3 py-1 rounded-lg text-center text-xs transition ${response.approval ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {response.approval ? "Approved" : "Not Approved"}
                  </div>
                  <div 
                    onClick={() => handleStatusUpdate(response, 'flagged')}
                    className={`cursor-pointer px-3 py-1 rounded-lg text-center text-xs transition ${response.flagged ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}
                  >
                    {response.flagged ? "Flagged" : "Not Flagged"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Responses;