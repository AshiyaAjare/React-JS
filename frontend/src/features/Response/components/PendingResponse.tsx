import React from 'react';
import { useResponsesContainer } from "../container/PendingResponseContainer";
import { useUpdateResponseStatusMutation } from '../api/responseApi';
import { Response, User } from '../container/types';

const Responses = () => {
  const { responses: responseData, currentUser, isLoading, error } = useResponsesContainer();
  const [updateResponseStatus] = useUpdateResponseStatusMutation();

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
      
      {responses?.length === 0 ? (
        <p className="text-gray-700">No responses found</p>
      ) : (
        <ul className="space-y-4">
          {responses?.map((response) => (
            <li 
              key={response.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700"><strong>Query:</strong> {response.query?.title || "No query available"}</p>
                  <p className="text-gray-600"><strong>Content:</strong> {response.content || "No content available"}</p>
                  <p className="text-gray-600"><strong>User:</strong> {response.user ? `${response.user.first_name} ${response.user.last_name}` : "Unknown User"}</p>
                </div>
                <div className="space-y-2">
                  {/* Clickable status toggles */}
                  <div 
                    onClick={() => handleStatusUpdate(response, 'approval')}
                    className={`cursor-pointer p-2 rounded ${response.approval ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    <strong>Approval:</strong> {response.approval ? "Yes" : "No"}
                  </div>
                  <div 
                    onClick={() => handleStatusUpdate(response, 'flagged')}
                    className={`cursor-pointer p-2 rounded ${response.flagged ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
                  >
                    <strong>Flagged:</strong> {response.flagged ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              
              {/* Additional details */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p><strong>Created At:</strong> {response.created_at ? new Date(response.created_at).toLocaleString() : "Invalid Date"}</p>
                <p><strong>Tags:</strong> {response.tags?.map(tag => tag.name).join(", ") || "No tags"}</p>
                <div className="flex space-x-4">
                  <span><strong>Upvotes:</strong> {response.upvotes || 0}</span>
                  <span><strong>Downvotes:</strong> {response.downvotes || 0}</span>
                  <span><strong>Likes:</strong> {response.likes || 0}</span>
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