import { useState, useEffect } from "react";

export default function ProductManagement() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
      setProducts(data);
      setError("");
    } catch {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    const { name, description, price, stock } = form;

    if (!name || !description || !price || !stock) {
      setError("All fields are required");
      return;
    }

    try {
      await fetch("http://localhost:4000/createProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: name,
          description,
          price: +price,
          stock: +stock,
        }),
      });
      setForm({ name: "", description: "", price: "", stock: "" });
      setError("");
      fetchProducts();
    } catch {
      setError("Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCNONitINNgsibwgla3pR5hiRnyZpSoFXXg&s')] text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="md:w-1/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h1 className="text-xl font-bold mb-6">Add Product</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 rounded text-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Product Name"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Price"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  min="0"
                />

                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="Stock"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  min="0"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-medium"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>

          {/* Products List Section */}
          <div className="md:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold mb-6"> Products</h2>
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div
                    key={product.product_id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white">
                          {product.product_name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-semibold">
                          ${product.price}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
