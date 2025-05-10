import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const QueriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const queries = [
    { id: 1, title: "How to integrate Devise in Rails?" },
    { id: 2, title: "Best practices for React state management?" },
    { id: 3, title: "Understanding Redux Toolkit Query?" },
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Queries
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg">
          {queries.map((query) => (
            <a
              key={query.id}
              href={`/queries/${query.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {query.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueriesDropdown;
