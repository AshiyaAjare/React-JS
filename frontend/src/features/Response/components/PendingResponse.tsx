import React, { useState, useMemo } from 'react';
import { useResponsesContainer } from "../container/PendingResponseContainer";
import { useUpdateResponseStatusMutation } from '../api/responseApi';
import { Response, User, Tag } from '../container/types';

const Responses = () => {
  const { responses: responseData, currentUser, isLoading, error } = useResponsesContainer();
  const [updateResponseStatus] = useUpdateResponseStatusMutation();
  
  // Search and selection states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponses, setSelectedResponses] = useState<number[]>([]);

  // Type-safe role check
  const isAdmin = currentUser && currentUser.role === 'moderator_user';
  const responses = responseData?.responses ?? [];

  // Handle response status update
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

  // Bulk status update
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

    // Clear selection after bulk update
    setSelectedResponses([]);
  };

  // Toggle response selection
  const toggleResponseSelection = (responseId: number) => {
    setSelectedResponses(prev => 
      prev.includes(responseId)
        ? prev.filter(id => id !== responseId)
        : [...prev, responseId]
    );
  };

  // Filtered and searched responses
  const filteredResponses = useMemo(() => {
    if (!searchTerm) return responses;

    const lowercaseSearch = searchTerm.toLowerCase();
    return responses.filter(response => 
      // Search across multiple fields
      response.query?.title.toLowerCase().includes(lowercaseSearch) ||
      response.content.toLowerCase().includes(lowercaseSearch) ||
      response.user?.first_name.toLowerCase().includes(lowercaseSearch) ||
      response.user?.last_name.toLowerCase().includes(lowercaseSearch) ||
      response.tags?.some(tag => tag.name.toLowerCase().includes(lowercaseSearch))
    );
  }, [responses, searchTerm]);

  // If user is not an admin, show "No Responses"
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <p className="text-gray-700 text-xl">No Responses</p>
      </div>
    );
  }

  // Loading state
  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  
  // Error state
  if (error) return <p className="text-red-500">Error fetching responses</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <h2 className="text-2xl font-bold text-indigo-500 mb-6">Responses</h2>
      
      {/* Search Input */}
      <div className="mb-6 flex items-center space-x-4">
        <input 
          type="text"
          placeholder="Search responses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        {/* Bulk Action Buttons */}
        {selectedResponses.length > 0 && (
          <div className="flex space-x-2">
            <button 
              onClick={() => handleBulkStatusUpdate('approval')}
              className="bg-green-200 text-black px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Bulk {selectedResponses.length > 1 ? 'Approve' : 'Toggle Approval'}
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('flagged')}
              className="bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Bulk {selectedResponses.length > 1 ? 'Flag' : 'Toggle Flag'}
            </button>
          </div>
        )}
      </div>
      
      {filteredResponses?.length === 0 ? (
        <p className="text-gray-700">No responses found</p>
      ) : (
        <ul className="space-y-4">
          {filteredResponses?.map((response) => (
            <li 
              key={response.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
            >
              {/* Checkbox for selection */}
              <input 
                type="checkbox"
                checked={selectedResponses.includes(response.id)}
                onChange={() => toggleResponseSelection(response.id)}
                className="mr-4 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              
              <div className="flex-grow grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Query:</strong> {response.query?.title || "No query available"}</p>
                  <p className="text-gray-600"><strong>Content:</strong> {response.content || "No content available"}</p>
                  <p className="text-gray-600"><strong>User:</strong> {response.user ? `${response.user.first_name} ${response.user.last_name}` : "Unknown User"}</p>
                </div>
                <div className="space-y-2">
                  {/* Clickable status toggles */}
                  <div 
                    onClick={() => handleStatusUpdate(response, 'approval')}
                    className={`cursor-pointer p-2 w-40 rounded ${response.approval ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
                  >
                    <strong>Approval:</strong> {response.approval ? "Yes" : "No"}
                  </div>
                  <div 
                    onClick={() => handleStatusUpdate(response, 'flagged')}
                    className={`cursor-pointer p-2 w-40 rounded ${response.flagged ? 'bg-yellow-100 text-yellow-500' : 'bg-blue-100 text-blue-500'}`}
                  >
                    <strong>Flagged:</strong> {response.flagged ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              
              {/* Additional details */}
              <div className="mt-2 text-md text-gray-600 space-y-1">
                <p><strong>Created At:</strong> {response.created_at ? new Date(response.created_at).toLocaleString() : "Invalid Date"}</p>
                <p><strong>Tags:</strong> {response.tags?.map(tag => tag.name).join(", ") || "No tags"}</p>
                <div className="flex space-x-4">
                  <span><strong>Upvotes:</strong> {response.upvotes || 0}</span>
                  <span><strong>Downvotes:</strong> {response.downvotes || 0}</span>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Responses;