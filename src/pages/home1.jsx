

// const homepage = () => {
//   return (
//     <div className="bg-gray-50 text-gray-800 font-[Fredoka]">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">Maris Educreative Hands Toys</h1>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Cart</button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="bg-blue-100 py-12 text-center">
//         <h2 className="text-4xl font-bold mb-2">Inspire Learning Through Play</h2>
//         <p className="text-lg text-gray-700">
//           Educational toys that spark curiosity and growth in every child.
//         </p>
//       </section>

//       {/* Featured Toys */}
//       <section className="max-w-6xl mx-auto py-12 px-4">
//         <h3 className="text-2xl font-semibold mb-6">Featured Educational Toys</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {/* Toy Card 1 */}
//           <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
//             <img
//               src="https://via.placeholder.com/300x200"
//               alt="Toy 1"
//               className="rounded mb-4"
//             />
//             <h4 className="text-xl font-bold mb-2">Alphabet Puzzle</h4>
//             <p className="text-gray-600 mb-2">
//               Helps kids learn letters and improve problem-solving skills.
//             </p>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//               Add to Cart
//             </button>
//           </div>

//           {/* Toy Card 2 */}
//           <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
//             <img
//               src="https://via.placeholder.com/300x200"
//               alt="Toy 2"
//               className="rounded mb-4"
//             />
//             <h4 className="text-xl font-bold mb-2">Math Blocks</h4>
//             <p className="text-gray-600 mb-2">
//               Great for counting, sorting, and simple arithmetic.
//             </p>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//               Add to Cart
//             </button>
//           </div>

//           {/* Toy Card 3 */}
//           <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
//             <img
//               src="https://via.placeholder.com/300x200"
//               alt="Toy 3"
//               className="rounded mb-4"
//             />
//             <h4 className="text-xl font-bold mb-2">Science Kit</h4>
//             <p className="text-gray-600 mb-2">
//               Introduce young minds to the wonders of science.
//             </p>
//             <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t mt-12 py-6 text-center text-gray-600">
//         <p>&copy; 2025 Maris Edu Toys. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default homepage

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Edu-Toy E‑commerce — Single-file React App
 * -------------------------------------------
 * Features
 * - Product catalog with search, category & age filters, price sort
 * - Product details page
 * - Cart (add, increment, decrement, remove), persistent via localStorage
 * - Checkout form (mock order placement with success screen)
 * - Responsive, Tailwind-styled, with subtle Motion animations
 *
 * How to use in Vite:
 * 1) npm create vite@latest edu-toy -- --template react
 * 2) cd edu-toy && npm i react-router-dom framer-motion
 * 3) Install Tailwind: https://tailwindcss.com/docs/guides/vite (postcss & config)
 * 4) Replace src/App.jsx content with this file's default export component
 * 5) Ensure index.css includes Tailwind directives: @tailwind base; @tailwind components; @tailwind utilities;
 * 6) npm run dev
 */

// -----------------------------
// Mock Data
// -----------------------------
const PRODUCTS = [
  {
    id: "st-001",
    name: "STEM Builder Kit",
    price: 19999,
    rating: 4.7,
    stock: 25,
    age: "6-9",
    category: "STEM",
    skills: ["Problem Solving", "Engineering", "Creativity"],
    short: "Build simple machines and learn physics the fun way.",
    description:
      "Hands-on kit for kids to explore levers, pulleys, and gears. Includes guidebook with 20 challenges.",
    image:
      "https://images.unsplash.com/photo-1596495578065-9c9ae2f2b2b1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ma-002",
    name: "Math Blocks 100",
    price: 8999,
    rating: 4.5,
    stock: 48,
    age: "3-6",
    category: "Math",
    skills: ["Counting", "Patterns", "Fine Motor"],
    short: "Colorful blocks for counting, grouping & patterns.",
    description:
      "100 durable counting blocks with activity cards. Great for early numeracy and color sorting.",
    image:
      "https://images.unsplash.com/photo-1596464716121-abd93c6d1a5b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ar-003",
    name: "Art & Craft Box",
    price: 12999,
    rating: 4.6,
    stock: 32,
    age: "4-8",
    category: "Art",
    skills: ["Creativity", "Design", "Focus"],
    short: "All-in-one craft set to spark imagination.",
    description:
      "Paper, stickers, safe scissors, glue, and templates for 30+ creative projects.",
    image:
      "https://images.unsplash.com/photo-1525362081669-2b476bb628c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "pu-004",
    name: "Logic Puzzle Set",
    price: 10999,
    rating: 4.4,
    stock: 50,
    age: "6-10",
    category: "Puzzles",
    skills: ["Logic", "Spatial Reasoning"],
    short: "Progressive challenges build grit and logic.",
    description:
      "50 puzzle cards from easy to expert. Self-check solutions included.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sc-005",
    name: "Junior Science Lab",
    price: 23999,
    rating: 4.8,
    stock: 18,
    age: "8-12",
    category: "Science",
    skills: ["Experimentation", "Observation"],
    short: "Microscope, slides & 20 safe experiments.",
    description:
      "Starter lab with magnification, dyes, and illustrated instructions for budding scientists.",
    image:
      "https://images.unsplash.com/photo-1559757175-08fda9d7d9f4?q=80&w=1200&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "STEM", "Math", "Art", "Puzzles", "Science"];
const AGE_RANGES = ["All", "0-3", "3-6", "4-8", "6-9", "6-10", "8-12"];

// -----------------------------
// Utils
// -----------------------------
const formatCurrency = (kobo) => {
  // Default to NGN formatting, fallback to standard if Intl not available
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  } catch (_) {
    return `₦${Math.round(kobo / 100).toLocaleString()}`;
  }
};

// -----------------------------
// Cart State (Context + Reducer)
// -----------------------------
const CartContext = createContext();

const initialCartState = {
  items: /** @type {Record<string, { id: string; qty: number }>} */ ({}),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.payload || state;
    }
    case "ADD": {
      const { id, qty = 1 } = action.payload;
      const prev = state.items[id]?.qty || 0;
      return { items: { ...state.items, [id]: { id, qty: prev + qty } } };
    }
    case "INC": {
      const { id } = action.payload;
      const prev = state.items[id]?.qty || 0;
      return { items: { ...state.items, [id]: { id, qty: prev + 1 } } };
    }
    case "DEC": {
      const { id } = action.payload;
      const prev = state.items[id]?.qty || 0;
      const next = Math.max(0, prev - 1);
      const clone = { ...state.items };
      if (next === 0) delete clone[id];
      else clone[id] = { id, qty: next };
      return { items: clone };
    }
    case "REMOVE": {
      const { id } = action.payload;
      const clone = { ...state.items };
      delete clone[id];
      return { items: clone };
    }
    case "CLEAR": {
      return { items: {} };
    }
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("edutoy_cart");
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch (e) {
      console.warn("Failed to parse cart from storage", e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("edutoy_cart", JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save cart", e);
    }
  }, [state]);

  const itemsDetailed = useMemo(() => {
    return Object.values(state.items)
      .map(({ id, qty }) => {
        const p = PRODUCTS.find((x) => x.id === id);
        if (!p) return null;
        return { ...p, qty, lineTotal: p.price * qty };
      })
      .filter(Boolean);
  }, [state.items]);

  const totals = useMemo(() => {
    const subtotal = itemsDetailed.reduce((s, x) => s + x.lineTotal, 0);
    const shipping = subtotal > 50000 ? 0 : 2500; // free shipping over ₦50,000
    const tax = Math.round(subtotal * 0.075); // 7.5% VAT (example)
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [itemsDetailed]);

  const api = useMemo(
    () => ({ state, dispatch, itemsDetailed, totals }),
    [state, itemsDetailed, totals]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// -----------------------------
// Layout & UI
// -----------------------------
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

function Navbar() {
  const { itemsDetailed } = useCart();
  const count = itemsDetailed.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
          <span className="font-bold text-lg">Edu‑Toy</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="px-3 py-1.5 rounded-xl hover:bg-gray-100" to="/">Shop</Link>
          <Link className="px-3 py-1.5 rounded-xl hover:bg-gray-100" to="/about">About</Link>
          <Link className="px-3 py-1.5 rounded-xl hover:bg-gray-100" to="/support">Support</Link>
          <Link
            to="/cart"
            className="relative px-3 py-1.5 rounded-xl hover:bg-gray-100"
            aria-label="Cart"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid gap-2 sm:grid-cols-3">
        <div>
          <div className="font-semibold text-gray-900">Edu‑Toy</div>
          <p>Learn through play. Curated toys for curious minds.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Help</div>
          <ul className="space-y-1">
            <li>Shipping & Returns</li>
            <li>Privacy & Security</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Newsletter</div>
          <div className="mt-2 flex gap-2">
            <input className="border rounded-xl px-3 py-2 w-full" placeholder="Email address" />
            <button className="px-4 py-2 rounded-xl bg-black text-white">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// -----------------------------
// Catalog & Filters
// -----------------------------
function CatalogPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [age, setAge] = useState("All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (age !== "All") list = list.filter((p) => p.age === age);
    if (q.trim()) {
      const t = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.skills.some((s) => s.toLowerCase().includes(t)) ||
          p.category.toLowerCase().includes(t)
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured: stable order
        break;
    }
    return list;
  }, [q, category, age, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Explore Educational Toys</h1>
          <p className="text-gray-600">Curated by age, skill, and subject.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border rounded-2xl px-4 py-2 w-full sm:w-80"
            placeholder="Search STEM, math, art…"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4 mb-6">
        <select className="border rounded-xl px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              Category: {c}
            </option>
          ))}
        </select>
        <select className="border rounded-xl px-3 py-2" value={age} onChange={(e) => setAge(e.target.value)}>
          {AGE_RANGES.map((a) => (
            <option key={a} value={a}>
              Age: {a}
            </option>
          ))}
        </select>
        <select className="border rounded-xl px-3 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Sort: Price ↑</option>
          <option value="price-desc">Sort: Price ↓</option>
          <option value="rating">Sort: Rating</option>
        </select>
        <Link to="/cart" className="px-3 py-2 rounded-xl border hover:bg-gray-50 text-center">
          View Cart
        </Link>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />)
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl border overflow-hidden hover:shadow-md transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`} className="font-semibold line-clamp-2">
            {product.name}
          </Link>
          <div className="text-right text-sm font-semibold">{formatCurrency(product.price)}</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Badge>{product.category}</Badge>
          <Badge>Age {product.age}</Badge>
          <span>★ {product.rating}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1 px-3 py-2 rounded-xl border hover:bg-gray-50 text-center">
            Details
          </Link>
          <button
            onClick={() => dispatch({ type: "ADD", payload: { id: product.id, qty: 1 } })}
            className="flex-1 px-3 py-2 rounded-xl bg-black text-white"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// -----------------------------
// Product Detail
// -----------------------------
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { dispatch } = useCart();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-red-600">Product not found.</p>
        <button className="mt-4 px-3 py-2 rounded-xl border" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden border">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Badge>{product.category}</Badge>
          <Badge>Age {product.age}</Badge>
          <span>★ {product.rating}</span>
          <span>Stock: {product.stock}</span>
        </div>
        <div className="text-xl font-semibold">{formatCurrency(product.price)}</div>
        <p className="text-gray-700">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.skills.map((s) => (
            <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => dispatch({ type: "ADD", payload: { id: product.id, qty: 1 } })}
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            Add to Cart
          </button>
          <button onClick={() => navigate("/cart")} className="px-4 py-2 rounded-xl border">
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Cart Page
// -----------------------------
function CartPage() {
  const { itemsDetailed, totals, dispatch } = useCart();
  const navigate = useNavigate();

  if (itemsDetailed.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Link to="/" className="px-4 py-2 rounded-xl border inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-4">
        {itemsDetailed.map((item) => (
          <div key={item.id} className="flex gap-4 border rounded-2xl p-3 items-center">
            <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">{formatCurrency(item.price)} • Age {item.age}</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 py-1 rounded-lg border"
                  onClick={() => dispatch({ type: "DEC", payload: { id: item.id } })}
                >
                  −
                </button>
                <span className="min-w-8 text-center">{item.qty}</span>
                <button
                  className="px-2 py-1 rounded-lg border"
                  onClick={() => dispatch({ type: "INC", payload: { id: item.id } })}
                >
                  +
                </button>
                <button
                  className="ml-3 px-2 py-1 rounded-lg border text-red-600"
                  onClick={() => dispatch({ type: "REMOVE", payload: { id: item.id } })}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right font-semibold">{formatCurrency(item.lineTotal)}</div>
          </div>
        ))}
      </div>

      <div className="border rounded-2xl p-5 h-fit sticky top-24">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
          <Row label="Shipping" value={totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)} />
          <Row label="VAT (7.5%)" value={formatCurrency(totals.tax)} />
          <div className="border-t pt-2 font-semibold flex items-center justify-between">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => navigate("/checkout") } className="flex-1 px-4 py-2 rounded-xl bg-black text-white">
            Checkout
          </button>
          <button onClick={() => dispatch({ type: "CLEAR" })} className="px-4 py-2 rounded-xl border">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// -----------------------------
// Checkout
// -----------------------------
function CheckoutPage() {
  const { itemsDetailed, totals, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (itemsDetailed.length === 0) navigate("/cart");
  }, [itemsDetailed.length, navigate]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    method: "card",
  });
  const [errors, setErrors] = useState({});

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const e = {};
    if (!form.firstName) e.firstName = "First name is required";
    if (!form.lastName) e.lastName = "Last name is required";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required";
    if (!form.address) e.address = "Address is required";
    if (!form.city) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    return e;
  }

  function placeOrder() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Mock order placement
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: itemsDetailed,
      totals,
      customer: form,
      placedAt: new Date().toISOString(),
    };

    sessionStorage.setItem("edutoy_last_order", JSON.stringify(order));
    dispatch({ type: "CLEAR" });
    navigate(`/success/${order.id}`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-[1fr_420px] gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First Name" name="firstName" value={form.firstName} onChange={onChange} error={errors.firstName} />
          <Field label="Last Name" name="lastName" value={form.lastName} onChange={onChange} error={errors.lastName} />
          <Field label="Email" name="email" value={form.email} onChange={onChange} error={errors.email} />
          <Field label="Phone" name="phone" value={form.phone} onChange={onChange} error={errors.phone} />
          <Field label="Address" name="address" value={form.address} onChange={onChange} error={errors.address} className="sm:col-span-2" />
          <Field label="City" name="city" value={form.city} onChange={onChange} error={errors.city} />
          <Field label="State" name="state" value={form.state} onChange={onChange} error={errors.state} />
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Payment Method</label>
            <div className="mt-2 grid sm:grid-cols-3 gap-2">
              {[
                { id: "card", label: "Card" },
                { id: "transfer", label: "Bank Transfer" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((opt) => (
                <label key={opt.id} className={`border rounded-xl px-3 py-2 cursor-pointer ${form.method === opt.id ? "ring-2 ring-black" : ""}`}>
                  <input
                    type="radio"
                    name="method"
                    value={opt.id}
                    checked={form.method === opt.id}
                    onChange={onChange}
                    className="mr-2"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-2xl p-5 h-fit sticky top-24">
        <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
          <Row label="Shipping" value={totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)} />
          <Row label="VAT (7.5%)" value={formatCurrency(totals.tax)} />
          <div className="border-t pt-2 font-semibold flex items-center justify-between">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        <button onClick={placeOrder} className="mt-4 w-full px-4 py-2 rounded-xl bg-black text-white">
          Place Order
        </button>
        <p className="mt-2 text-xs text-gray-600">* This is a demo checkout. No real payment is processed.</p>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, error, className = "" }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full border rounded-xl px-3 py-2 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// -----------------------------
// Success Page
// -----------------------------
function SuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("edutoy_last_order") || "null");
    } catch {
      return null;
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">✓</div>
      <h2 className="mt-4 text-2xl font-bold">Order Placed!</h2>
      <p className="text-gray-600">Thank you. Your order <span className="font-mono">{id}</span> has been received.</p>
      {order && (
        <div className="mt-6 text-sm text-left border rounded-2xl p-4 inline-block">
          <div className="font-semibold mb-2">Summary</div>
          <ul className="list-disc pl-5 space-y-1">
            {order.items.map((i) => (
              <li key={i.id}>
                {i.qty} × {i.name} — {formatCurrency(i.lineTotal)}
              </li>
            ))}
          </ul>
          <div className="mt-3 font-semibold">Total: {formatCurrency(order.totals.total)}</div>
        </div>
      )}
      <div className="mt-6 flex gap-2 justify-center">
        <button onClick={() => navigate("/")} className="px-4 py-2 rounded-xl border">
          Continue Shopping
        </button>
        <button onClick={() => navigate("/" )} className="px-4 py-2 rounded-xl bg-black text-white">
          Go Home
        </button>
      </div>
    </div>
  );
}

// -----------------------------
// Misc Pages
// -----------------------------
function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
      <h2 className="text-xl font-semibold">About Edu‑Toy</h2>
      <p className="text-gray-700">
        We curate purposeful toys that grow with your child. Each product is reviewed for safety,
        educational value, and fun.
      </p>
    </div>
  );
}

function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
      <h2 className="text-xl font-semibold">Support</h2>
      <p className="text-gray-700">Have questions? Email support@edutoy.example or check our FAQs.</p>
    </div>
  );
}

// -----------------------------
// App Root
// -----------------------------
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success/:id" element={<SuccessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
