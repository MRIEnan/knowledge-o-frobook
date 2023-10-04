import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [CheckPassword, setCheckPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-navy-blue-900 via-navy-blue-800 to-navy-blue-900 select-none">
      <div className="bg-opacity-75 bg-white rounded-lg p-8 backdrop-blur-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-navy-blue-900">
          Sign in
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Check Password
            </label>
            <input
              type="password"
              value={CheckPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-navy-blue-500 text-white rounded-md hover:bg-navy-blue-600 focus:outline-none focus:bg-navy-blue-600 bg-blue-900 text-center shadow:2xl  hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center text-blue-600">
          have an account{"? "}
          <Link className="font-bold text-orange-700" to="/login">
            login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
