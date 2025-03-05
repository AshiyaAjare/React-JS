import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import QueryLogic, { QueryData } from "../container/QueryLogic";

const Query: React.FC = () => {
  console.log("Query UI component is rendering"); // Debugging
  const [filterText, setFilterText] = useState<string>("");

  return (
    <QueryLogic>
      {({ 
        data, 
        currentQueries, 
        error, 
        isLoading, 
        currentPage, 
        totalPages, 
        indexOfFirstQuery, 
        indexOfLastQuery, 
        goToPage 
      }) => {
        // Add tag filtering logic
        const [selectedTag, setSelectedTag] = useState<string>(""); 
        
        // Extract unique tags from queries 
        const uniqueTags = useMemo(() => { 
          if (!data) return [];
          const allTags = data.flatMap((query) => query.tags || []); 
          const uniqueTagSet = new Set(allTags.map((tag) => tag.name)); 
          return Array.from(uniqueTagSet); 
        }, [data]);
        
        // Filter queries based on selected tag
        const filteredQueries = useMemo(() => { 
          if (!selectedTag) return currentQueries; 
          return currentQueries.filter((query) => 
            query.tags && query.tags.some((tag) => tag.name === selectedTag)
          ); 
        }, [currentQueries, selectedTag]);

        if (isLoading) {
          console.log("Loading state active"); // Debugging
          return (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          );
        }

        if (error) {
          console.error("API Error:", error); // Debugging
          return (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow">
              <p className="font-medium">Failed to fetch queries</p>
            </div>
          );
        }

        if (!data || data.length === 0) {
          console.warn("No queries found!"); // Debugging
          return (
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 px-6 py-8 rounded-xl shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-indigo-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <p className="text-lg font-medium">No queries available</p>
              <p className="text-indigo-600 mt-2">Create a new query to get started</p>
            </div>
          );
        }

        return (
          <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-indigo-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Queries</h2>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              {/* Tag filtering section */}
              {uniqueTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTag === "" 
                        ? "bg-indigo-600 text-white" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedTag("")}
                  >
                    All
                  </button>
                  {uniqueTags.map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedTag === tag 
                          ? "bg-indigo-600 text-white" 
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ul className="space-y-3">
              {filteredQueries.map((query: QueryData) => (
                <li key={query.id} className="border border-gray-200 hover:border-indigo-200 p-4 rounded-lg shadow-sm hover:shadow transition-all bg-white">
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-100 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-800 hover:text-indigo-600 transition-colors">
                        <Link to={`/queries/${query.id}`} className="hover:underline">
                          {query.title}
                        </Link>
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          {query.user ? `${query.user.first_name} ${query.user.last_name}` : "Unknown User"}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {format(new Date(query.created_at), "MMM d, yyyy")}
                        </span>
                        
                        <span className={query.status? "bg-gray-100 text-gray-600 px-3 py-1 rounded-full" : "bg-green-100 text-green-600 px-3 py-1 rounded-full" }>
                        {query.status ? "Closed" : "Open"}
                        </span>
                      </div>
                      
                      {/* Display tags if available */}
                      {query.tags && query.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {query.tags.map((tag) => (
                            <span 
                              key={tag.id} 
                              className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Link to={`/queries/${query.id}`} className="ml-4">
                      <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-lg transition-colors border border-gray-200 hover:border-indigo-200">
                        View
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
              <span>Showing {indexOfFirstQuery + 1}-{Math.min(indexOfLastQuery, data.length)} of {data.length} queries</span>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 bg-white border border-gray-300 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button 
                    key={number}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === number 
                        ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' 
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => goToPage(number)}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  className={`px-3 py-1 bg-white border border-gray-300 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </QueryLogic>
  );
};

export default Query;