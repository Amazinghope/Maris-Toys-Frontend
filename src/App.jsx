import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import AboutUs from "./pages/About";
import ProductDetail from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";
import Login from "./components/Login";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Register from "./components/Register";
import AdminDashboard from "./admin/AdminDb.jsx";
import UserDashboard from "./users/UsersDashboard.jsx";
import Catalog from "./pages/Catalog.jsx";
import ProtectedRoute from "./routes/protectedRoutes.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Footer from "./components/Footer.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCart } from "./redux/cartSlice.js";

//  This inner component safely uses useLocation()
function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //  Define routes that should NOT show header/footer
  const noLayoutRoutes = ["/admin-db", "/users-db"];

  //  Check if current path is in the excluded list
  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  //  Load cart from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("edutoy_cart");
    if (raw) {
      dispatch(initCart(JSON.parse(raw)));
    }
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("edutoy_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/category" element={<CategorySection />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-db" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["regular"]} />}>
          <Route path="/users-db" element={<UserDashboard />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

//  This outer App wraps everything in the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/Home";
// import AboutUs from "./pages/About"
// import ProductDetail from "./pages/ProductDetails.jsx";
// import CartPage from "./pages/CartPage";
// import PlaceOrder from "./pages/PlaceOrder.jsx";
// import ConfirmOrder from "./pages/ConfirmOrder.jsx";
// import OrderSuccess from "./pages/OrderSuccess.jsx";
// import Header from "./components/Header";
// import CategorySection from "./components/CategorySection";
// import Login from "./components/Login";
// import VerifyOtp from "./pages/VerifyOtp.jsx";
// import Register from "./components/Register";
// import AdminDashboard from "./admin/AdminDb.jsx";
// import UserDashboard from "./users/UsersDashboard.jsx";
// import Catalog from "./pages/Catalog.jsx";
// // import ProductList from "./components/ProductList.jsx";
// import ProtectedRoute from "./routes/protectedRoutes.jsx";
// import Unauthorized from "./pages/Unauthorized.jsx";
// import Footer from "./components/Footer.jsx";


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { initCart } from "./redux/cartSlice.js";

// function App() {
//   const location = useLocation()
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);

//   // ✅ Define routes that should NOT show header/footer
//   const noLayoutRoutes = ["/admin-db", "/users-db"];

//   // ✅ Check if current path is in the excluded list
//   const hideLayout = noLayoutRoutes.some((path) => location.pathname.startsWith(path));


//   // ✅ Load cart from localStorage on mount
//   useEffect(() => {
//     const raw = localStorage.getItem("edutoy_cart");
//     if (raw) {
//       dispatch(initCart(JSON.parse(raw)));
//     }
//   }, [dispatch]);

//   // ✅ Save cart to localStorage whenever it changes 
//   useEffect(() => {
//     localStorage.setItem("edutoy_cart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <Router>
//       {!hideLayout && <Header /> }
      
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutUs />} />

//         <Route path="/catalog" element={<Catalog />} />
        
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         {/* <Route path="/products" element={<ProductList />} /> */}

//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/confirm-order" element={<ConfirmOrder />} />
//         <Route path="/order-success/:id" element={<OrderSuccess />} />
//         <Route path="/category" element={<CategorySection />} />
        
//         <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
//           <Route path="/admin-db" element={<AdminDashboard />} />
//         </Route>

//         <Route element={<ProtectedRoute allowedRoles={["regular"]}/>}>
//           <Route path="/users-db" element={<UserDashboard />} />
//         </Route>

//       <Route path="/unauthorized" element={<Unauthorized />} />

//       </Routes>
//        {/* { hideLayout }  */}
//        <Footer/>
      
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
// import HomePage from "./pages/Home";
// import ProductDetail from "./pages/ProductDetails.jsx";
// import CartPage from "./pages/CartPage";
// import Checkout from "./pages/Checkout";
// import Header from "./components/Header";
// import CategorySection from "./components/CategorySection";
// import { CartProvider } from "./context/cartContext";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Catalog from "./pages/Catalog.jsx";
// // import products from "./data/products.js";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { initCart } from "./redux/cartSlice.js";
// function App() {
//   const dispatch = useDispatch()
//   const cart = useSelector((state)=> state.cart )

//   // Load cart from localStorage on mount
// useEffect(()=>{
//   const item = localStorage.getItem('edu-toy');
//   if(item) dispatch(initCart(JSON.parse(item)))
// }, [dispatch])

// // Save cart on every change
// useEffect(() =>{
//   localStorage.setItem('edu-toy', JSON.stringify(cart))
// }, [cart])
//   return (
//     <CartProvider>
//       <Router>
//        <Header/>
//        <Routes>
//         <Route path="/" element={<HomePage/>}/>
//         <Route path="/catalog" element={<Catalog/>}/>

//         {/* <Route path="/product" element={products}/> */}

//         <Route path="/Log-in" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/product/:id" element={<ProductDetail/>}/>
//         <Route path="/cart" element={<CartPage/>}/>
//         <Route path="/checkout" element={<Checkout/>}/> 
//         <Route path="/category" element={<CategorySection/>}/> 
   
//        </Routes>
//       </Router>
//     </CartProvider>
//   );
// }
// export default App;
