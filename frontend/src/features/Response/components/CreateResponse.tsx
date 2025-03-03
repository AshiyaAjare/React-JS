import { useState, useEffect } from "react";
import { useCreateResponseMutation } from "../api/responseApi";
import { useGetTagsQuery } from "../../Shared/api/tagsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const CreateResponse = ({ queryId }) => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [newTag, setNewTag] = useState("");
  const { data, isLoading } = useGetTagsQuery(); // Fetch tags
  const [createResponse, { isLoading: isSubmitting, isSuccess, isError }] = useCreateResponseMutation();

  useEffect(() => {
    console.log("Received queryId in CreateResponse:", queryId);
  }, [queryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueTags = [...new Set(selectedTags)];
    const responseData = {
      content,
      user_id: loggedInUserId,
      tag_ids: uniqueTags,
      new_tag: newTag.trim() !== "" ? newTag : undefined, // Only send if entered
    };
    try {
        await createResponse({
            queryId: Number(queryId),
            responseData, 
        }).unwrap();        
      console.log("Response created successfully!");
      navigate("/queries");
    } catch (error) {
      console.error("Failed to create response", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Dashboard
          </button>

          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              Create a New Response
            </h2>
            <p className="text-green-100 mt-2">
              Share your thoughts and help the community with your expertise
            </p>
          </div>

          <div className="p-8">
            {isSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg flex items-start animate-fadeIn">
                <p>Response created successfully! Redirecting...</p>
              </div>
            )}

            {isError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg flex items-start animate-fadeIn">
                <p>Failed to create response. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Response Content
                </label>
                <textarea
                  id="content"
                  placeholder="Write your response..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm transition-colors"
                />
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="text-sm font-medium text-green-800 mb-3">
                  Tag Your Response
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Existing Tags
                    </label>
                    {isLoading ? (
                      <p>Loading tags...</p>
                    ) : (
                      <select
                        id="tags"
                        multiple
                        value={selectedTags}
                        onChange={(e) =>
                          setSelectedTags(
                            Array.from(e.target.selectedOptions, (option) =>
                              Number(option.value)
                            )
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm transition-colors"
                        size={5}
                      >
                        {data?.tags.map((tag) => (
                          <option key={tag.id} value={tag.id}>
                            {tag.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="newTag"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Create New Tag
                    </label>
                    <input
                      id="newTag"
                      type="text"
                      placeholder="Add a new tag (optional)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResponse;
