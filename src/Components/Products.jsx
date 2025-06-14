import React, { useState, useEffect } from "react";

function ComputerProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/laptops") // Fetch laptops category
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Computer Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-contain mb-4"
            />
            <h5 className="text-lg font-semibold text-gray-800">{item.title}</h5>
            <p className="text-gray-600 text-sm truncate">{item.description}</p>
            <p className="text-green-600 font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComputerProductList;
