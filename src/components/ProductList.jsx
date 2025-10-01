// Parent component
import { useState, useEffect } from "react";
import AgeSelector from "../components/AgeSelector";
import API from "../api";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/all-products");
      setProducts(res.data.productDetails); // 👈 depends on how your API response is structured
      setFilteredProducts(res.data.productDetails);
    };
    fetchProducts();
  }, []);

  const handleAgeSelect = (ageRange) => {
    if (!ageRange) {
      setFilteredProducts(products);
    } else {
      const result = products.filter((p) => p.age === ageRange);
      setFilteredProducts(result);
    }
  };

  return (
    <div>
      <AgeSelector onAgeSelect={handleAgeSelect} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {filteredProducts.map((p) => (
          <div key={p._id} className="bg-white shadow-md rounded-xl p-4">
            <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-md"/>
            <h3 className="mt-2 font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="font-semibold">₦{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
