import { useState } from "react";
import { useCreateQueryMutation } from "../api/queryApi";
import { useGetTagsQuery } from "../../Shared/api/tagsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const navigate = useNavigate(); 
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [newTag, setNewTag] = useState("");
  const { data, isLoading } = useGetTagsQuery(); // Fetch tags
  const [createQuery, { isLoading: isSubmitting, isSuccess, isError }] = useCreateQueryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const queryData = {
      title,
      content,
      user_id: loggedInUserId,
      tag_ids: selectedTags, // Existing tags
      new_tag: newTag.trim() !== "" ? newTag : undefined, // Only send if entered
    };
    try {
      await createQuery(queryData);
      console.log("Query created successfully!");
      navigate("/queries");
    } catch(error) {
      console.error("Failed to create query", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Create a New Query
            </h2>
            <p className="text-indigo-100 mt-2">Share your question with the community and get expert answers</p>
          </div>
          
          {/* Card body */}
          <div className="p-8">
            {/* Notification banners */}
            {isSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg flex items-start animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 mt-0.5 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Query created successfully! Redirecting you to the queries page...</p>
              </div>
            )}
            
            {isError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg flex items-start animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 mt-0.5 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="font-medium">Failed to create query</p>
                  <p className="text-sm mt-1">Please check your input and try again. If the problem persists, contact support.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 flex items-center">
                  <span className="text-red-500 mr-1">*</span> Query Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter a descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">A clear title helps others understand your query at a glance</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 flex items-center">
                  <span className="text-red-500 mr-1">*</span> Query Details
                </label>
                <textarea
                  id="content"
                  placeholder="Describe your query in detail..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Include all relevant details to get the best answers</p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <h3 className="text-sm font-medium text-indigo-800 mb-3">Tag Your Query</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Existing Tags</label>
                    {isLoading ? (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading tags...</span>
                      </div>
                    ) : (
                      <div className="relative">
                        <select
                          id="tags"
                          multiple
                          value={selectedTags}
                          onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => Number(option.value)))}
                          className="w-full px-4 py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm transition-colors"
                          size={5}
                        >
                          {data?.tags.map((tag) => (
                            <option key={tag.id} value={tag.id} className="py-1">
                              {tag.name}
                            </option>
                          ))}
                        </select>
                        <div className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple tags</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="newTag" className="block text-sm font-medium text-gray-700">Create New Tag</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                        </svg>
                      </div>
                      <input
                        id="newTag"
                        type="text"
                        placeholder="Add a new tag (optional)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm transition-colors"
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Can't find a relevant tag? Create a new one!
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <span>Fields marked with <span className="text-red-500">*</span> are required</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-3 font-medium rounded-lg shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 font-medium rounded-lg shadow-sm transition-colors flex items-center ${
                      isSubmitting
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create Query
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Remember to check the existing queries before creating a new one to avoid duplicates.
        </p>
      </div>
    </div>
  );
};

export default CreateQuery;