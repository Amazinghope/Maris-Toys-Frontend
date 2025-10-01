import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice"; // ✅ import selector

import logo from "/assets/maris-logo.jpg";
import { FaSearch, FaMapMarkerAlt, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Get cart items from Redux
  const cartItems = useSelector(selectCartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white py-4 px-4 sm:px-4 lg:px-8 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src={logo}
              alt="Maris Educreative Toys Logo"
              className="w-12 sm:w-16 rounded-2xl transition-transform hover:scale-110"
            />
          </Link>
          <div className="text-center sm:text-left">
            <Link to="/">
              <h1 className="text-xl sm:text-2xl font-bold font-fredoka text-white">
                Maris Toys
              </h1>
            </Link>
            <p className="text-xs sm:text-sm text-yellow-200 hidden sm:block">
              Toys, Books, Stationery & Tutorials
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-xs sm:max-w-sm"
        >
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200" />
          <input
            type="text"
            placeholder="Search Toys, Books & More..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-yellow-200 bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label="Search for toys, books, and more"
          />
        </form>

        {/* Navigation and Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex gap-3 sm:gap-5 text-sm sm:text-base font-semibold">
            <Link
              to="/"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Home page"
            >
              Home
            </Link>
            <Link
              to="/category"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Browse categories"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-200 transition-colors"
              aria-label="About us"
            >
              About
            </Link>
            <Link
              to="/store-locator"
              className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
              aria-label="Locate our store"
            >
              <FaMapMarkerAlt />
              Store
            </Link>
            <Link
              to="/blog"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Read our blog"
            >
              Blog
            </Link>
          </nav>

          {/* Cart and User */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/cart"
              className="relative hover:text-yellow-200 transition-colors"
              aria-label={`Cart with ${totalItems} items`}
            >
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full px-2 text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/Log-in"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Log in or view profile"
            >
              <FaUserCircle className="text-xl" /> 
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="hidden sm:flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-200 transition-colors"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/cartContext";

// import logo from "/assets/maris-logo.jpg";
// import { FaSearch, FaMapMarkerAlt, FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

// const Header = () => {
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white py-4 px-4 sm:px-4 lg:px-8 sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
//         {/* Logo and Tagline */}
//         <div className="flex items-center gap-4">
//           <Link to="/">
//             <img
//               src={logo}
//               alt="Maris Educreative Toys Logo"
//               className="w-12 sm:w-16 rounded-2xl transition-transform hover:scale-110"
//             />
//           </Link>
//           <div className="text-center sm:text-left">
//             <Link to="/">
//               <h1 className="text-xl sm:text-2xl font-bold font-fredoka text-white">
//                 Maris Toys
//               </h1>
//             </Link>
//             <p className="text-xs sm:text-sm text-yellow-200 hidden sm:block">
//               Toys, Books, Stationery & Tutorials
//             </p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <form
//           onSubmit={handleSearch}
//           className="relative w-full max-w-xs sm:max-w-sm"
//         >
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-200" />
//           <input
//             type="text"
//             placeholder="Search Toys, Books & More..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-yellow-200 bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
//             aria-label="Search for toys, books, and more"
//           />
//         </form>

//         {/* Navigation and Icons */}
//         <div className="flex items-center gap-4 sm:gap-6">
//           <nav className="flex gap-3 sm:gap-5 text-sm sm:text-base font-semibold">
//             <Link
//               to="/"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Home page"
//             >
//               Home
//             </Link>
//             <Link
//               to="/category"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Browse categories"
//             >
//               Categories
//             </Link>
//             <Link
//               to="/about"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="About us"
//             >
//               About
//             </Link>
//             <Link
//               to="/store-locator"
//               className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
//               aria-label="Locate our store"
//             >
//               <FaMapMarkerAlt />
//               Store
//             </Link>
//             <Link
//               to="/blog"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Read our blog"
//             >
//               Blog
//             </Link>
//           </nav>

//           {/* Cart and User */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <Link
//               to="/cart"
//               className="relative hover:text-yellow-200 transition-colors"
//               aria-label={`Cart with ${totalItems} items`}
//             >
//               <FaShoppingCart className="text-xl" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 rounded-full px-2 text-xs font-bold">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//             <Link
//               to="/Log-in"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Log in or view profile"
//             >
//               <FaUserCircle className="text-xl" /> 
//             </Link>
//           </div>

//           {/* Social Media Icons */}
//           <div className="hidden sm:flex gap-3">
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Follow us on Instagram"
//             >
//               <FaInstagram className="text-xl" />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Follow us on Facebook"
//             >
//               <FaFacebook className="text-xl" />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Follow us on Twitter"
//             >
//               <FaTwitter className="text-xl" />
//             </a>
//             <a
//               href="https://whatsapp.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-200 transition-colors"
//               aria-label="Contact us on WhatsApp"
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
// // import { Link } from "react-router-dom";
// // import { useCart } from "../context/cartContext";
// // import logo from "/assets/maris-logo.jpg";
// // import { FaMapMarkerAlt } from "react-icons/fa";
// // // import { FaWhatsapp } from "react-icons/fa";
// // // import { FaTwitter } from "react-icons/fa";
// // // import { FaInstagram } from "react-icons/fa";
// // // import { FaXbox } from "react-icons/fa";
// // // import { FaFacebook } from "react-icons/fa";
// // // import { FaUser } from "react-icons/fa";
// // import {FaSearch} from "react-icons/fa"
// // import { FaUserCircle } from "react-icons/fa";



// // const Header = () => {
// //   const { cart } = useCart();
// //   const totalItems = cart.reduce((acct, item) => acct + item.quantity, 0)
// //   return (
// //     <div>
    
// //       <div className="py-4 gap-40  bg-blue-600 flex justify-around div-1 ">
// //         <img src={logo} alt="maris-logo" className="logo sm:w-12 rounded-2xl " />
// //          <div className="relative w-full max-w-xs ml-4 mb-4">
// //              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/> 
// //            <input 
// //            type="text" 
// //            placeholder="Toy, Books, & More ..."
// //            className="w-full pl-10 pr-4 py-1 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
// //            />
// //            </div>
             
// //              <div className="flex  gap-9">
// //               <nav className="mt-5 mb-4 text-white font-bold flex gap-5 sm:text-sm  ">
// //                 <Link>About us</Link>
// //                 <span className="flex gap-1">
// //                   <FaMapMarkerAlt />
// //                <Link>Locate Our Store</Link>
// //                </span>
// //                <Link>Blog</Link>
// //               </nav>

// //             <span className="flex justify-between mt-5 mb-4"> 
// //             <span className="flex text-amber-300  font-bold gap-1 "  >
// //                <FaUserCircle className="text-amber-300 "/>
// //              <Link to= '/Log-in'  >  <p> Log in</p> </Link>
             
// //                </span>
// //                 {/* <FaInstagram className="text-white"/> */}
// //             {/* <FaFacebook className="text-white"/> */}
// //             {/* <FaXbox/> */}
// //             {/* <FaTwitter/> */}
// //             {/* <FaWhatsapp className="text-white"/> */}
// //             </span>
// //                </div>

// //             </div>

      
// //     <header
// //       className="bg-blue-600 text-white py-4 px-6 flex flex-col
// //          justify-between items-center sm:gap-0 sm:px-9 sm:flex-row  "
// //     >
      
// //       <p className=" flex-1 text-sm font-bold md:text-lg font-fredoka text-center  sm:text-base truncate px-2">
// //         Maris Educreative Toys, Books, and Stationery store including Tutorial Services.
// //       </p>
// //       <nav className="flex gap-5  sm:text-sm font-bold  ">
// //         <Link to="/" >
// //           Home
// //         </Link>
// //         <Link to= {'/category'}>Category</Link>
// //         <Link to="/cart" >
// //           Cart{" "}
// //           <span className="bg-white text-blue-600 px-2 py-1 rounded">
// //             {" "}
// //             {totalItems}
// //           </span>
// //         </Link>
// //       </nav>
            
      
// //     </header>
// //     </div>
// //   );
// // };

// // export default Header;
