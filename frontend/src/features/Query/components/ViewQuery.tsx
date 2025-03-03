import { useParams, useNavigate } from "react-router-dom";
import { useGetQueryByIdQuery, useDeleteQueryByIdMutation, useUpdateQueryMutation } from "../api/queryApi";
import { useUpvoteResponseMutation, useDownvoteResponseMutation, useDeleteResponseMutation, useUpdateResponseMutation } from "../../Response/api/responseApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useState, useEffect } from "react";
import CreateResponse from "../../Response/components/CreateResponse";


const ViewQuery = () => {
  const { queryId } = useParams();
  const queryIdNumber = Number(queryId); 
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);

  const { data, error, isLoading, refetch } = useGetQueryByIdQuery(queryId!);
  
  const [upvoteResponse] = useUpvoteResponseMutation();
  const [downvoteResponse] = useDownvoteResponseMutation();
  const [deleteQueryById] = useDeleteQueryByIdMutation();
  const [deleteResponse] = useDeleteResponseMutation();
  const [updateResponse] = useUpdateResponseMutation();
  const [updateQuery] = useUpdateQueryMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editingResponseId, setEditingResponseId] = useState<number | null>(null);
  const [editingQueryId, setEditingQueryId] = useState<number | null>(null);
  
  const query = data?.query;
  const [showForm, setShowForm] = useState(false);
  
  // Track which responses the user has already voted on
  const [userVotes, setUserVotes] = useState<{[responseId: number]: 'upvote' | 'downvote' | null}>({});

  // Initialize user votes when data is loaded
  useEffect(() => {
    if (query?.responses && loggedInUserId) {
      const initialVotes: {[responseId: number]: 'upvote' | 'downvote' | null} = {};  
      query.responses.forEach((response: any) => {
        const savedVote = localStorage.getItem(`vote-${loggedInUserId}-${response.id}`);
        initialVotes[response.id] = savedVote as 'upvote' | 'downvote' | null;
      });
      
      setUserVotes(initialVotes);
    }
  }, [query?.responses, loggedInUserId]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-lg font-medium text-purple-300">Loading query...</div>
    </div>
  );
  
  if (error || !query) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-400 text-lg font-medium">Error fetching query details.</div>
    </div>
  );

  const handleUpvote = async (responseId: number) => {
    // If user has already voted on this response, don't allow again
    if (userVotes[responseId]) return;
    
    await upvoteResponse({ responseId, userId: loggedInUserId });
    
    // Update local tracking
    const newUserVotes = { ...userVotes, [responseId]: 'upvote' };
    setUserVotes(newUserVotes);
    
    // Save to localStorage for persistence
    localStorage.setItem(`vote-${loggedInUserId}-${responseId}`, 'upvote');
    
    refetch();
  };

  const handleDownvote = async (responseId: number) => {
    // If user has already voted on this response, don't allow again
    if (userVotes[responseId]) return;
    
    await downvoteResponse({ responseId, userId: loggedInUserId });
    
    // Update local tracking
    const newUserVotes = { ...userVotes, [responseId]: 'downvote' };
    setUserVotes(newUserVotes);
    
    // Save to localStorage for persistence
    localStorage.setItem(`vote-${loggedInUserId}-${responseId}`, 'downvote');
    
    refetch();
  };

  const handleDeleteQuery = async () => {
    console.log("Deleting query with ID:", queryIdNumber); 
  
    if (!queryIdNumber) {
      console.error("Error: queryId is invalid", queryId);
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        await deleteQueryById(queryIdNumber);
        refetch();
        navigate("/queries");
      } catch (error) {
        console.error("Error deleting query:", error);
      }
    }
  };
  
  const handleDeleteResponse = async (responseId: number) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      await deleteResponse({ responseId, userId: loggedInUserId }); 
      refetch(); 
    }
  };

  const handleEditResponse = (response: any) => {
    setEditingResponseId(response.id);
    setEditedContent(response.content);
    setIsEditing(true);
  };

  const handleEditQuery= (query: any) => {
    setEditingQueryId(query.id);
    setEditedContent(query.content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editingResponseId === null) return;
    
    try {
      await updateResponse({ responseId: editingResponseId, content: editedContent }).unwrap();
      setIsEditing(false);
      setEditingResponseId(null);
      refetch();
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  const handleQuerySave = async () => {
    if (editingQueryId === null) return;
    
    try {
      await updateQuery({ queryId: editingQueryId, content: editedContent }).unwrap();
      setIsEditing(false);
      setEditingQueryId(null);
      refetch();
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50">
      {/* Main container with subtle background */}
      <div className="rounded-xl shadow-lg overflow-hidden bg-white border border-purple-100">
        {/* Query header with gradient background */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 p-5 border-b border-purple-100">
          <h1 className="text-2xl font-bold text-purple-800">{query.title}</h1>
          
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-purple-700">
            <span className="bg-purple-50 px-3 py-1 rounded-full">User: {query.user ? `${query.user.first_name} ${query.user.last_name}` : "Unknown User"}</span>
            <span>•</span>
            <span>{new Date(query.created_at).toLocaleString()}</span>
            <span>•</span>
            <span className={`${query.status ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-600"} px-3 py-1 rounded-full`}>
              {query.status ? "Closed" : "Open"}
            </span>
            {query.flagged && (
              <>
                <span>•</span>
                <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full">Flagged</span>
              </>
            )}
          </div>

          {loggedInUserId === query.user.id && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditQuery(query)}
                className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-600"
              >
                Edit Query
              </button>
              <button
                onClick={() => handleDeleteQuery(query.id)}
                className="px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-600"
              >
                Delete Query
              </button>
            </div>
          )}
        </div>

        {/* Query content */}
        <div className="p-5 border-b border-purple-50">
        {isEditing && editingQueryId === query.id ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleQuerySave}
                className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingQueryId(null);
                }}
                className="px-3 py-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">{query.content}</p>
        )}
          {/* Tags */}
          {query.tags?.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {query.tags.map((tag: any) => (
                  <span key={tag.id} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            Last updated: {new Date(query.updated_at).toLocaleString()}
          </div>
        </div>

        {/* Responses Section*/}
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-4 text-purple-800 flex items-center">
            <span>Responses</span>
            {query.responses?.length > 0 && (
              <span className="ml-2 bg-purple-100 text-purple-700 text-sm px-2 py-0.5 rounded-full">
                {query.responses.length}
              </span>
            )}
          </h2>

          <div className="space-y-6">
            {query.responses?.length > 0 ? (
              query.responses.map((response: any) => {
                // Determine if user has voted on this response and what type of vote
                const userVoteType = userVotes[response.id];
                
                return (
                  <div key={response.id} className="relative pl-5 ml-3">
                    {/* Thread line */}
                    <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-purple-100"></div>
                    
                    {/* Response card */}
                    <div className="relative mb-2">
                      {/* Thread connector */}
                      <div className="absolute -left-5 top-6 w-4 h-0.5 bg-purple-100"></div>

                      <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100">
                        {/* User and timestamp */}
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium text-purple-700">User: {response.user ? `${response.user.first_name} ${response.user.last_name}` : "Unknown User"}</div>
                          <div className="text-xs text-gray-500">{new Date(response.created_at).toLocaleString()}</div>
                        </div>
                        
                        {/* Content */}
                        {isEditing && editingResponseId === response.id ? (
                          <div>
                            <textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className="w-full p-2 border rounded mb-3"
                            />
                            <div className="flex gap-2 mb-3">
                              <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditingResponseId(null);
                                }}
                                className="px-3 py-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 whitespace-pre-wrap mb-3">{response.content}</p>
                        )}
                        
                        {/* Status and metrics */}
                        <div className="flex flex-wrap gap-2 text-xs mb-3">
                          {response.approval ? (
                            <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Approved</span>
                          ) : (
                            <span className="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">Pending</span>
                          )}
                          
                          {response.flagged && (
                            <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Flagged</span>
                          )}
                        </div>
                        
                        {/* Metrics and voting */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="font-medium">{response.upvotes}</span>
                              <span className="mx-1">upvotes</span>
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium">{response.downvotes}</span>
                              <span className="mx-1">downvotes</span>
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium">{response.likes}</span>
                              <span className="mx-1">likes</span>
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpvote(response.id)}
                              disabled={userVoteType !== null}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                userVoteType === 'upvote'
                                  ? 'bg-green-200 text-green-700 cursor-default' // Already upvoted
                                  : userVoteType === 'downvote'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' // Already downvoted
                                    : 'bg-green-100 hover:bg-green-200 text-green-600' // Not voted yet
                              }`}
                            >
                              {userVoteType === 'upvote' ? 'Upvoted' : 'Upvote'}
                            </button>
                            <button
                              onClick={() => handleDownvote(response.id)}
                              disabled={userVoteType !== null}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                userVoteType === 'downvote'
                                  ? 'bg-red-200 text-red-700 cursor-default' // Already downvoted
                                  : userVoteType === 'upvote'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' // Already upvoted
                                    : 'bg-red-100 hover:bg-red-200 text-red-600' // Not voted yet
                              }`}
                            >
                              {userVoteType === 'downvote' ? 'Downvoted' : 'Downvote'}
                            </button>
                            
                            {loggedInUserId === response.user.id && !isEditing && (
                              <>
                                <button
                                  onClick={() => handleEditResponse(response)}
                                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteResponse(response.id)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 text-sm"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg text-blue-600 text-center">
                No responses yet. Be the first to respond!
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-5 bg-gray-50 border-t border-purple-100 flex flex-wrap gap-3 justify-between">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-sm"
          >
            {showForm ? "Cancel" : "Respond to Query"}
          </button>

          {showForm && queryId ? (
            <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm w-full">
              <CreateResponse queryId={queryId} />
            </div>
          ) : null}
          
          <button
            onClick={() => navigate("/queries")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
          >
            Back to Queries
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuery;