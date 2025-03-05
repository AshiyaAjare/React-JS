import CreateResponse from "../../Response/components/CreateResponse";
import { useQueryContainer } from "../container/ViewQueryLogic"; // Import the container hook
import { queryStyles, cx } from "../../Shared/components/Styles"; // Import styles
import { CheckCircleIcon } from 'lucide-react';

const ViewQuery = () => {
  // Use the container hook to get all the logic and state
  const {
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
  } = useQueryContainer();

  if (isLoading) return (
    <div className={queryStyles.loadingContainer}>
      <div className={queryStyles.loadingText}>Loading query...</div>
    </div>
  );
  
  if (error || !query) return (
    <div className={queryStyles.loadingContainer}>
      <div className={queryStyles.errorText}>Error fetching query details.</div>
    </div>
  );

  return (
    <div className={queryStyles.container}>
      {/* Main container with subtle background */}
      <div className={queryStyles.card}>
        {/* Query header with gradient background */}
        <div className={queryStyles.header}>
          <h1 className={queryStyles.title}>{query.title}</h1>
          
          <div className={queryStyles.metaWrapper}>
            <span className={queryStyles.userBadge}>User: {query.user ? `${query.user.first_name} ${query.user.last_name}` : "Unknown User"}</span>
            <span>•</span>
            <span>{new Date(query.created_at).toLocaleString()}</span>
            <span>•</span>
            <span className={query.status ? queryStyles.statusBadgeClosed : queryStyles.statusBadgeOpen}>
              {query.status ? "Closed" : "Open"}
            </span>
            
            {query.flagged && (
              <>
                <span>•</span>
                <span className={queryStyles.flaggedBadge}>Flagged</span>
              </>
            )}
          </div>

          {loggedInUserId === query.user.id && (
            <div className={queryStyles.actionButtons}>
              <button
                onClick={() => handleEditQuery(query)}
                className={queryStyles.editButton}
              >
                Edit Query
              </button>
              <button
                onClick={() => handleDeleteQuery()}
                className={queryStyles.deleteButton}
              >
                Delete Query
              </button>
            </div>
          )}
        </div>

        {/* Query content */}
        <div className={queryStyles.contentSection}>
        {isEditing && editingQueryId === query.id ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={queryStyles.textarea}
            />
            <div className={queryStyles.formButtonWrapper}>
              <button
                onClick={handleQuerySave}
                className={queryStyles.saveButton}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingResponseId(null);
                }}
                className={queryStyles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className={queryStyles.contentText}>{query.content}</p>
        )}
          {/* Tags */}
          {query.tags?.length > 0 && (
            <div className={queryStyles.tagsWrapper}>
              <div className={queryStyles.tagsList}>
                {query.tags.map((tag: any) => (
                  <span key={tag.id} className={queryStyles.tag}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className={queryStyles.timestamp}>
            Last updated: {new Date(query.updated_at).toLocaleString()}
          </div>
        </div>

        {/* Responses Section*/}
        <div className={queryStyles.responsesSection}>
          <h2 className={queryStyles.responsesTitle}>
            <span>Responses</span>
            {query.responses?.length > 0 && (
              <span className={queryStyles.responsesCount}>
                {query.responses.length}
              </span>
            )}
          </h2>

          <div className={queryStyles.responsesList}> 
            {query.responses?.length > 0 ? (
              query.responses.map((response: any) => {
                // Determine if user has voted on this response and what type of vote
                const userVoteType = userVotes[response.id];
                
                return (
                  <div key={response.id} className={queryStyles.responseWrapper}>
                    {/* Thread line */}
                    <div className={queryStyles.threadLine}></div>
                    
                    {/* Response card */}
                    <div className={queryStyles.responseCardWrapper}>
                      {/* Thread connector */}
                      <div className={queryStyles.threadConnector}></div>

                      <div className={queryStyles.responseCard}>
                        {/* User and timestamp */}
                        <div className={queryStyles.responseHeader}>
                          <div className={queryStyles.responseUser}>
                            User: {response.user ? `${response.user.first_name} ${response.user.last_name}` : "Unknown User"}
                          </div>
                          <div className={queryStyles.responseTime}>
                            {new Date(response.created_at).toLocaleString()}
                          </div>
                        </div>
                        
                        {/* Content */}
                        {isEditing && editingResponseId === response.id ? (
                          <div>
                            <textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              className={queryStyles.textarea}
                            />
                            <div className={queryStyles.formButtonWrapper}>
                              <button
                                onClick={handleSave}
                                className={queryStyles.saveButton}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditingResponseId(null);
                                }}
                                className={queryStyles.cancelButton}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className={queryStyles.responseContent}>{response.content}</p>
                        )}
                        
                        {/* Status and metrics */}
                        <div className={queryStyles.responseStatusWrapper}>
                          {/* {response.approval ? (
                            <span className={queryStyles.approvedBadge}>Approved</span>
                          ) : (
                            <span className={queryStyles.pendingBadge}>Pending</span>
                          )} */}
                          {response.approval ? (
                            <span className={queryStyles.approvedBadge}>
                              Approved
                            </span>
                          ) : (
                            <span className={queryStyles.pendingBadge}>Pending</span>
                          )}
                          
                          {response.flagged && (
                            <span className={queryStyles.responseFlaggedBadge}>Flagged</span>
                          )}
                        </div>
                        
                        {/* Metrics and voting */}
                        <div className={queryStyles.metricsWrapper}>
                          <div className={queryStyles.metricsGroup}>
                            <span className={queryStyles.metricItem}>
                              <span className={queryStyles.metricValue}>{response.upvotes}</span>
                              <span className={queryStyles.metricLabel}>upvotes</span>
                            </span>
                            <span className={queryStyles.metricItem}>
                              <span className={queryStyles.metricValue}>{response.downvotes}</span>
                              <span className={queryStyles.metricLabel}>downvotes</span>
                            </span>
                            <span className={queryStyles.metricItem}>
                              <span className={queryStyles.metricValue}>{response.likes}</span>
                              <span className={queryStyles.metricLabel}>likes</span>
                            </span>
                          </div>
                          
                          <div className={queryStyles.actionsGroup}>
                          {canApproveResponses && (
                          <button
                            onClick={() => handleToggleApproval(response.id)}
                            disabled={response.flagged} // Disable when response is flagged
                            className={cx(
                              queryStyles.approveButton,
                              response.flagged 
                                ? queryStyles.approveDisabledButton 
                                : (response.approval 
                                    ? queryStyles.approveActiveButton 
                                    : queryStyles.approvePendingButton)
                            )}
                          >
                            {response.approval ? 'Unapprove' : 'Approve'}
                          </button>
                        )}

                        {/* Response status section */}
                        {response.approval ? (
                          <span className={queryStyles.approvedBadge}>
                            Approved
                            {/* Verified icon only appears when approval is being actively set */}
                            {/* This would require tracking the most recent approval action */}
                            <CheckCircleIcon 
                              className={queryStyles.verifiedIcon} 
                              color="#2ecc71" 
                              size={16} 
                            />
                          </span>
                        ) : (
                          <span className={queryStyles.pendingBadge}>Pending</span>
                        )}
                            
                            <button
                              onClick={() => handleUpvote(response.id)}
                              disabled={userVoteType !== null}
                              className={cx(
                                queryStyles.upvoteButton,
                                userVoteType === 'upvote' 
                                  ? queryStyles.upvotedButton 
                                  : userVoteType === 'downvote'
                                    ? queryStyles.upvoteDisabledButton
                                    : queryStyles.upvoteAvailableButton
                              )}
                            >
                              {userVoteType === 'upvote' ? 'Upvoted' : 'Upvote'}
                            </button>
                            <button
                              onClick={() => handleDownvote(response.id)}
                              disabled={userVoteType !== null}
                              className={cx(
                                queryStyles.downvoteButton,
                                userVoteType === 'downvote'
                                  ? queryStyles.downvotedButton
                                  : userVoteType === 'upvote'
                                    ? queryStyles.downvoteDisabledButton
                                    : queryStyles.downvoteAvailableButton
                              )}
                            >
                              {userVoteType === 'downvote' ? 'Downvoted' : 'Downvote'}
                            </button>
                            
                            {loggedInUserId === response.user.id && !isEditing && (
                              <>
                                <button
                                  onClick={() => handleEditResponse(response)}
                                  className={queryStyles.editResponseButton}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteResponse(response.id)}
                                  className={queryStyles.deleteResponseButton}
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
              <div className={queryStyles.emptyResponsesMessage}>
                No responses yet. Be the first to respond!
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className={queryStyles.footerSection}>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className={queryStyles.respondButton}
          >
            {showForm ? "Cancel" : "Respond to Query"}
          </button>

          {showForm && queryId ? (
            <div className={queryStyles.formContainer}>
              <CreateResponse queryId={queryId} />
            </div>
          ) : null}
          
          <button
            onClick={() => navigate("/queries")}
            className={queryStyles.backButton}
          >
            Back to Queries
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuery;