// queryStyles.ts - Tailwind CSS classes for ViewQuery component

export const queryStyles = {
    // Layout containers
    container: "max-w-4xl mx-auto p-4 md:p-6 bg-gray-50",
    card: "rounded-xl shadow-lg overflow-hidden bg-white border border-purple-100",
    
    // Query header
    header: "bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 p-5 border-b border-purple-100",
    title: "text-2xl font-bold text-purple-800",
    metaWrapper: "flex flex-wrap items-center gap-2 mt-2 text-sm text-purple-700",
    userBadge: "bg-purple-50 px-3 py-1 rounded-full",
    divider: "",
    statusBadgeOpen: "bg-green-100 text-green-600 px-3 py-1 rounded-full",
    statusBadgeClosed: "bg-gray-100 text-gray-600 px-3 py-1 rounded-full",
    flaggedBadge: "bg-red-50 text-red-500 px-3 py-1 rounded-full",
    
    // Action buttons
    actionButtons: "flex gap-2 mt-2",
    editButton: "px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-600",
    deleteButton: "px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-600",
    
    // Content section
    contentSection: "p-5 border-b border-purple-50",
    contentText: "text-gray-700 mb-4 whitespace-pre-wrap",
    
    // Form controls
    textarea: "w-full p-2 border rounded mb-3",
    formButtonWrapper: "flex gap-2 mb-3",
    saveButton: "px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 text-sm",
    cancelButton: "px-3 py-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 text-sm",
    
    // Tags
    tagsWrapper: "mt-3",
    tagsList: "flex flex-wrap gap-2",
    tag: "px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs",
    
    // Timestamps
    timestamp: "mt-4 text-xs text-gray-500",
    
    // Responses section
    responsesSection: "p-5",
    responsesTitle: "text-xl font-semibold mb-4 text-purple-800 flex items-center",
    responsesCount: "ml-2 bg-purple-100 text-purple-700 text-sm px-2 py-0.5 rounded-full",
    responsesList: "space-y-6",
    
    // Response card
    responseWrapper: "relative pl-5 ml-3",
    threadLine: "absolute left-0 top-2 bottom-0 w-0.5 bg-purple-100",
    responseCardWrapper: "relative mb-2",
    threadConnector: "absolute -left-5 top-6 w-4 h-0.5 bg-purple-100",
    responseCard: "bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-100",
    
    // Response header
    responseHeader: "flex justify-between items-center mb-2",
    responseUser: "font-medium text-purple-700",
    responseTime: "text-xs text-gray-500",
    
    // Response content
    responseContent: "text-gray-700 whitespace-pre-wrap mb-3",
    
    // Response status badges
    responseStatusWrapper: "flex flex-wrap gap-2 text-xs mb-3",
    approvedBadge: "bg-green-50 text-green-600 px-2 py-0.5 rounded-full",
    pendingBadge: "bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full",
    responseFlaggedBadge: "bg-red-50 text-red-500 px-2 py-0.5 rounded-full",
    
    // Metrics and voting
    metricsWrapper: "flex items-center justify-between",
    metricsGroup: "flex items-center gap-3 text-sm text-gray-600",
    metricItem: "flex items-center",
    metricValue: "font-medium",
    metricLabel: "mx-1",
    
    // Action buttons
    actionsGroup: "flex gap-2",
    
    // Button states for voting
    approveButton: "px-3 py-1 rounded-full text-sm transition-colors",
    approveActiveButton: "bg-yellow-100 hover:bg-yellow-200 text-yellow-600",
    approvePendingButton: "bg-green-100 hover:bg-green-200 text-green-600",
    
    upvoteButton: "px-3 py-1 rounded-full text-sm transition-colors",
    upvotedButton: "bg-green-200 text-green-700 cursor-default",
    upvoteDisabledButton: "bg-gray-100 text-gray-400 cursor-not-allowed",
    upvoteAvailableButton: "bg-green-100 hover:bg-green-200 text-green-600",
    
    downvoteButton: "px-3 py-1 rounded-full text-sm transition-colors",
    downvotedButton: "bg-red-200 text-red-700 cursor-default",
    downvoteDisabledButton: "bg-gray-100 text-gray-400 cursor-not-allowed",
    downvoteAvailableButton: "bg-red-100 hover:bg-red-200 text-red-600",
    
    editResponseButton: "px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 text-sm",
    deleteResponseButton: "px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 text-sm",
    
    // Empty state
    emptyResponsesMessage: "bg-blue-50 p-4 rounded-lg text-blue-600 text-center",
    
    // Footer
    footerSection: "p-5 bg-gray-50 border-t border-purple-100 flex flex-wrap gap-3 justify-between",
    respondButton: "px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-sm",
    formContainer: "mt-4 p-4 border border-gray-300 rounded-md shadow-sm w-full",
    backButton: "px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors",
    
    // Loading and error states
    loadingContainer: "flex justify-center items-center h-screen",
    loadingText: "animate-pulse text-lg font-medium text-purple-300",
    errorText: "text-red-400 text-lg font-medium"
  };
  
  // Helper for combining multiple classes conditionally
  export const cx = (...classes: (string | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(" ");
  };