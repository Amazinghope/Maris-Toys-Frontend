
const SearchBar = ({ activeSection, searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <input
        type="text"
        placeholder={`Search ${activeSection}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;