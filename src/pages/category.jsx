import React from "react";
import axios from "axios";
import { loadState } from "../storage";

// Axios request configuration with interceptors
const request = axios.create({ baseURL: "http://localhost:3000" });

request.interceptors.request.use(
  (config) => {
    const user = loadState("user");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const Category = () => {
  const [state, setState] = React.useState([]);
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await request.get("/messages");
      setState(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request.post("/messages", newProduct);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>
      <form className="mb-10 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          className="mt-4 p-2 border border-gray-300 rounded w-full"
          rows="4"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add Product
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {state.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="text-gray-900 font-bold text-lg mb-2">${item.price}</div>
              <p className="text-gray-600 mb-4">Category: {item.category}</p>
              <div className="flex justify-between items-center">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                  Add to Cart
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
