import { useParams, useNavigate } from "react-router-dom";
import { useGetQueryByIdQuery, useDeleteQueryByIdMutation, useUpdateQueryMutation } from "../api/queryApi";
import { useUpvoteResponseMutation, useDownvoteResponseMutation, useDeleteResponseMutation, useUpdateResponseMutation, useApproveResponseMutation } from "../../Response/api/responseApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useState, useEffect } from "react";
import { Query, Response, Tag, User } from '../types'; 

export const useQueryContainer = () => {
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
  const [toggleApproval] = useApproveResponseMutation();

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
      query.responses.forEach((response: Response) => {
        const savedVote = localStorage.getItem(`vote-${loggedInUserId}-${response.id}`);
        initialVotes[response.id] = savedVote as 'upvote' | 'downvote' | null;
      });
      
      setUserVotes(initialVotes);
    }
  }, [query?.responses, loggedInUserId]);

  useEffect(() => {
    console.log("Query status updated:", query?.status);
  }, [query]);

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

  const handleEditResponse = (response: Response) => {
    setEditingResponseId(response.id);
    setEditedContent(response.content);
    setIsEditing(true);
  };

  const handleEditQuery = (query: Query) => {
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

  const canApproveResponses = loggedInUserId === query?.user.id;

  const [recentlyApproved, setRecentlyApproved] = useState<number | null>(null);

  const handleToggleApproval = async (responseId?: number) => {
    if (!responseId) {
      console.error("Response ID is undefined, cannot make API call");
      return;
    }

    try {
      const result = await toggleApproval(responseId).unwrap();
      
      // Track the recently approved response
      if (result.approval) {
        setRecentlyApproved(responseId);
      } else {
        setRecentlyApproved(null);
      }
      refetch();
    } catch (error) {
      console.error("Error updating response status", error);
    }
  };


  return {
    queryId,
    query,
    isLoading,
    error,
    loggedInUserId,
    isEditing,
    editedContent,
    editingResponseId,
    editingQueryId,
    showForm,
    userVotes,
    canApproveResponses,
    navigate,
    setEditedContent,
    setIsEditing,
    setEditingResponseId,
    setShowForm,
    handleUpvote,
    handleDownvote,
    handleDeleteQuery,
    handleDeleteResponse,
    handleEditResponse,
    handleEditQuery,
    handleSave,
    handleQuerySave,
    handleToggleApproval
  };
};