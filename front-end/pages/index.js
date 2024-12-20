import { useState, useEffect } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      setUsers(await response.json());
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching users");
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCNONitINNgsibwgla3pR5hiRnyZpSoFXXg&s')] text-white p-4 flex justify-center items-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          E-commerse Datas
        </h1>
      </div>
    </div>
  );
}
