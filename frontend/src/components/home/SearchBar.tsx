import { useState } from "react";
import { Search } from "lucide-react"; // Lucide icon for a modern look

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    // Trigger search logic or API request here
  };

  return (
    <div className="relative w-full p-2">
      <div className="flex items-center bg-[#1e1e1e80] rounded-full px-3 py-1 border border-gray-700">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search videos..."
          value={query}
          onChange={handleSearch}
          className="text-sm text-white focus:outline-none px-2 w-full bg-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;
