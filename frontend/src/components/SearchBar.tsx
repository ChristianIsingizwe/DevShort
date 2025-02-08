import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-[#1E1E1E] h-12 px-3 py-2 rounded-full w-full">
      <Search size={20} color="white" className="mr-2" />
      <input
        type="search"
        placeholder="Search"
        className="flex-grow bg-transparent text-white p-2 outline-none appearance-none placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
