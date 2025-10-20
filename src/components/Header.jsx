import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUserCircle,
  FaShoppingCart,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false); // 👈 New state for the popup

  const cartItems = useSelector(selectCartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get("search") || "";
    setSearchQuery(currentSearch);
  }, [location.search]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate("/catalog");
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white py-4 px-4 sm:px-4 lg:px-8 sticky top-0 z-50 shadow-md">
      <div className="max-w-full min-w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431860/maris-logo_xsvndf.jpg"
              alt="Maris Educreative Toys Logo"
              className="w-12 sm:w-16 rounded-2xl transition-transform hover:scale-110"
            />
          </Link>
          <div className="text-center sm:text-left">
            <Link to="/">
              <h1 className="text-xl font-bold font-fredoka text-white">
                Maris Educreative
              </h1>
            </Link>
            <p className="text-xs sm:text-sm text-yellow-200 hidden sm:block">
              Toys, Books, Stationery & More
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full max-w-xs sm:max-w-sm"
        >
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200" />
          <input
            type="text"
            placeholder="Search Toys, Books & More..."
            value={searchQuery}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-yellow-200 bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </form>

        {/* Navigation + Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex gap-3 sm:gap-5 text-sm sm:text-base font-semibold">
            <Link to="/" className="hover:text-yellow-200 transition-colors">
              Home
            </Link>
            <Link to="/category" className="hover:text-yellow-200 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="hover:text-yellow-200 transition-colors">
              About
            </Link>

            {/* 👇 Modified Store link (now opens map modal) */}
            <button
              onClick={() => setShowMap(true)}
              className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
            >
              <FaMapMarkerAlt />
              Store
            </button>

            <Link to="/blog" className="hover:text-yellow-200 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Cart + User */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/cart" className="relative hover:text-yellow-200 transition-colors">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full px-2 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="hover:text-yellow-200 transition-colors">
              <FaUserCircle className="text-xl" />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="hidden sm:flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
              <FaInstagram className="text-xl" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-200 transition-colors">
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* 🌍 Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg w-[90%] max-w-3xl relative">
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-3 right-3 text-gray-700 text-lg font-bold hover:text-red-600"
            >
              ✕
            </button>
            <iframe
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.685249292846!2d3.4838962923371835!3d6.642693155129767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bec713b7c6f61%3A0xd33ae746a97e4557!2sOwutu-Isawo%20Rd%2C%20Ikorodu%2C%20Ipakodo%20104101%2C%20Lagos!5e0!3m2!1sen!2sng!4v1760955687274!5m2!1sen!2sng"
             src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d151025.7799571894!2d3.335850918226255!3d6.655465584050166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stransformer%2C%20ojuoro%20agric%2C%20ikorodu!5e0!3m2!1sen!2sng!4v1760959291215!5m2!1sen!2sng" 
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCartItems } from "../redux/cartSlice";
// import {
//   FaSearch,
//   FaMapMarkerAlt,
//   FaUserCircle,
//   FaShoppingCart,
//   FaInstagram,
//   FaFacebook,
//   FaTwitter,
//   FaWhatsapp,
// } from "react-icons/fa";

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ Correct hook: useSelector instead of useDispatch
//   const cartItems = useSelector(selectCartItems);
//   const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   // ✅ Keeps search query in sync with the URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const currentSearch = params.get("search") || "";
//     setSearchQuery(currentSearch);
//   }, [location.search]);

//   // ✅ Handles search navigation
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);

//     if (value.trim()) {
//       navigate(`/catalog?search=${encodeURIComponent(value.trim())}`);
//     } else {
//       navigate("/catalog");
//     }
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white py-4 px-4 sm:px-4 lg:px-8 sticky top-0 z-50 shadow-md">
//       <div className="max-w-full min-w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
//         {/* Logo and Tagline */}
//         <div className="flex items-center gap-4">
//           <Link to="/">
//             <img
//               src="https://res.cloudinary.com/dd9mhvnbt/image/upload/v1759431860/maris-logo_xsvndf.jpg"
//               alt="Maris Educreative Toys Logo"
//               className="w-12 sm:w-16 rounded-2xl transition-transform hover:scale-110"
//             />
//           </Link>
//           <div className="text-center sm:text-left w-[100] lg:text-sm">
//             <Link to="/">
//               <h1 className="text-xl w-full font-bold font-fredoka text-white">
//                 Maris Educreative
//               </h1>
//             </Link>
//             <p className="text-xs sm:text-sm text-yellow-200 hidden sm:block">
//               Toys, Books, Stationery & More
//             </p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-xs sm:max-w-sm">
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200" />
//           <input
//             type="text"
//             placeholder="Search Toys, Books & More..."
//             value={searchQuery}
//             onChange={handleChange}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-yellow-200 bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             aria-label="Search for toys, books, and more"
//           />
//         </form>

//         {/* Navigation + Icons */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           <nav className="flex gap-3 sm:gap-5 text-sm sm:text-base font-semibold">
//             <Link to="/" className="hover:text-yellow-200 transition-colors">
//               Home
//             </Link>
//             <Link to="/category" className="hover:text-yellow-200 transition-colors">
//               Categories
//             </Link>
//             <Link to="/about" className="hover:text-yellow-200 transition-colors">
//               About
//             </Link>
//             <Link
//               to="/store-locator"
//               className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
//             >
//               <FaMapMarkerAlt />
//               Store
//             </Link>
//             <Link to="/blog" className="hover:text-yellow-200 transition-colors">
//               Blog
//             </Link>
//           </nav>

//           {/* Cart + User */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <Link to="/cart" className="relative hover:text-yellow-200 transition-colors">
//               <FaShoppingCart className="text-xl" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full px-2 text-xs font-bold">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//             <Link to="/login" className="hover:text-yellow-200 transition-colors">
//               <FaUserCircle className="text-xl" />
//             </Link>
//           </div>

//           {/* Social Media */}
//           <div className="hidden sm:flex gap-3">
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//             >
//               <FaInstagram className="text-xl" />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//             >
//               <FaFacebook className="text-xl" />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//             >
//               <FaTwitter className="text-xl" />
//             </a>
//             <a
//               href="https://whatsapp.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//             >
//               <FaWhatsapp className="text-xl" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


