import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function OrderManagement() {
  const [form, setForm] = useState({
    userId: "",
    totalAmount: "",
    status: "",
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
      setError("");
    } catch (err) {
      setError("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async () => {
    if (!form.userId || !form.totalAmount || !form.status) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/createOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(form.userId, 10),
          total_amount: parseFloat(form.totalAmount),
          status: form.status,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      setForm({ userId: "", totalAmount: "", status: "" });
      setError("");
      fetchOrders();
    } catch (err) {
      setError("Failed to create order");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "shipped":
        return "text-blue-400";
      case "delivered":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCNONitINNgsibwgla3pR5hiRnyZpSoFXXg&s')] text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="md:w-1/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h1 className="text-xl font-bold mb-6">Add order</h1>
              <div className="space-y-4">
                <input
                  type="number"
                  value={form.userId}
                  onChange={(e) => setForm({ ...form, userId: e.target.value })}
                  placeholder="User ID"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <input
                  type="number"
                  value={form.totalAmount}
                  onChange={(e) =>
                    setForm({ ...form, totalAmount: e.target.value })
                  }
                  placeholder="Total Amount"
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Order Status</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span>Create Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* Orders List Section */}
          <div className="md:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition duration-200"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-400">
                          Order #{order.order_id}
                        </p>
                        <p className="text-lg font-medium mt-1">
                          User ID: {order.user_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-semibold">
                          ${order.total_amount}
                        </p>
                        <p
                          className={`text-sm font-medium 
                            
                      `}
                        >
                          {order.status}
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
