import { useState } from "react";
import { LogOut, User, ChevronDown, ChevronUp } from "lucide-react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic here
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        User
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg">
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User size={16} className="mr-2" />
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
