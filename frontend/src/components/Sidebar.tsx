import { Clock, User, Users, LogOut, House } from "lucide-react";
import SearchBar from "./SearchBar";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#1E1E1E] flex flex-col p-4">
      {/* Top Section: Search Bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Middle Section: Navigation Buttons */}
      <nav className="flex flex-col space-y-4 flex-grow">
        <button className="flex items-center w-full text-white text-base p-2 hover:bg-[#333] rounded-lg">
          <House size={20} className="mr-3" />
          For you
        </button>
        <button className="flex items-center w-full text-white text-base p-2 hover:bg-[#333] rounded-lg">
          <Clock size={20} className="mr-3" />
          Watch Later
        </button>
        <button className="flex items-center w-full text-white text-base p-2 hover:bg-[#333] rounded-lg">
          <User size={20} className="mr-3" />
          Following
        </button>
        <button className="flex items-center w-full text-white text-base p-2 hover:bg-[#333] rounded-lg">
          <Users size={20} className="mr-3" />
          Communities
        </button>
      </nav>

      {/* Bottom Section: Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center w-full text-red-500 text-base p-2 hover:bg-[#333] rounded-lg">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
