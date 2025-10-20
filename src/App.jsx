import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPage";
import PlaceOrder from "./pages/placeOrder.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";
import Login from "./components/Login";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Register from "./components/Register";
import AdminDb from "./admin/AdminDb.jsx";
import Catalog from "./pages/Catalog.jsx";
// import ProductList from "./components/ProductList.jsx";
import Footer from "./components/Footer.jsx";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCart } from "./redux/cartSlice.js";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("edutoy_cart");
    if (raw) {
      dispatch(initCart(JSON.parse(raw)));
    }
  }, [dispatch]);

  // ✅ Save cart to localStorage whenever it changes 
  useEffect(() => {
    localStorage.setItem("edutoy_cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin-db" element={<AdminDb />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/products" element={<ProductList />} /> */}

        <Route path="/cart" element={<CartPage />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />

        <Route path="/category" element={<CategorySection />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

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
