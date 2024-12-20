import { useState, useEffect } from "react";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      setUsers(await response.json());
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching users");
    }
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    if (Object.values(form).some((field) => !field)) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/createUsers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to create user");
      setForm({ name: "", email: "", password: "" });
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Error creating user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCNONitINNgsibwgla3pR5hiRnyZpSoFXXg&s')] text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="md:w-1/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                <UserPlus className="text-blue-400" size={24} />
                <span>New User</span>
              </h1>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 rounded flex items-center gap-2 text-red-200">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full p-3 pl-10 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleCreateUser}
                  className="w-full bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 font-medium"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>

          {/* Users List Section */}
          <div className="md:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold mb-6">Registered Users</h2>
              <div className="grid grid-cols-1 gap-4">
                {users.map(({ user_id, username, email }) => (
                  <div
                    key={user_id}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-full">
                        <User size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {username}
                        </h3>
                        <p className="text-gray-400 text-sm">{email}</p>
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
