import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [signUp, setSignup] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignup({ ...signUp, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", signUp);
      const data = response.data;
      if (data) {
        // alert("Sign up successful");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/overview"); 
      } else {
        setError("There is a missing input");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      const message = error.response?.data?.message || "An error occurred. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 z-50 w-screen">
      <div className="bg-white w-full max-w-[400px] rounded-xl p-5 shadow-lg">
        <div className="text-3xl font-extrabold text-center py-2">
          <span className="text-gray-800 p-1">TO</span>
          <span className="text-white bg-gray-800 rounded p-1">DO</span>
        </div>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium py-2">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Name"
              name="name"
              value={signUp.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium py-2">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Username"
              name="username"
              value={signUp.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium py-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Email"
              name="email"
              value={signUp.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium py-2">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Password"
              name="password"
              value={signUp.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-700">
              Sign In
            </Link>
          </p>
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-4 rounded-md mt-4 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
