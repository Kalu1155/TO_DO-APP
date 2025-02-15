import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser?.loggedIn) {
  //     console.log("User is already logged in:", storedUser.email);
  //     navigate("/overview");
  //   }
  // }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await axios.get("http://localhost:3000/users");
  //     const users = response.data; 
  //     const user = users.find(
  //       (u) => u.email === login.email && u.password === login.password
  //     );

  //     if (user) {
  //       const userData = { username: user.username, loggedIn: true };
  //       localStorage.setItem("user", JSON.stringify(userData));

  //       navigate("/overview");
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   } catch (err) {
  //     console.error("Error during login:", err.message);
  //     setError("An error occurred while logging in. Please try again.");
  //   }
  // };
const handleSignIn =()=>{
  navigate("/overview");
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <div className="text-3xl font-extrabold text-center mb-4">
          <span className="text-gray-800">TO</span>
          <span className="text-white bg-gray-800 rounded px-2">DO</span>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Enter your email"
              name="email"
              value={login.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="p-3 outline-none bg-gray-200 rounded-md w-full"
              placeholder="Enter your password"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="text-sm mb-4">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 underline">
              Sign Up
            </Link>
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-4 rounded-md w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
