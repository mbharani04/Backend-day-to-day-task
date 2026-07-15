import { useEffect, useState } from "react";

const ClassTask = () => {
  // Store all products
  const [datagetting, setDatagetting] = useState([]);

  // Store selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch API
  const gettingData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setDatagetting(data.products);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  // 👉 Step 1: Calculate unique categories directly inline during render
  const categories = datagetting.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  // 👉 Step 2: Filter products directly inline during render
  const filteredProducts =
    selectedCategory === "all"
      ? datagetting
      : datagetting.filter((product) => product.category === selectedCategory);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5">
        Product Filter
      </h1>

      {/* Category Dropdown */}
      <div className="flex justify-center mb-5">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-400 rounded-md p-2"
        >
          <option value="all">All Categories</option>

          {/* Mapping through our inline calculated array */}
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-64 border rounded-lg shadow-md p-4 bg-white"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-bold mt-3">
              {product.title}
            </h2>

            <p className="text-gray-600">
              {product.category}
            </p>

            <p className="text-green-600 font-bold mt-2">
              ₹ {product.price}
            </p>

            <p className="text-green-600 text-sm mt-2">
              Rating : {product.rating}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassTask;