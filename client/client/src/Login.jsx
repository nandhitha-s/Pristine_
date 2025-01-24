import bg from "./assets/bg.jpg";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: user,
        password: pwd,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage
      setSuccess(true);
      setUser('');
      setPwd('');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      if (!err.response) {
        setErrMsg('No server response');
      } else if (err.response.status === 400) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="flex min-h-screen">
          <div className="w-1/2 h-screen fixed top-0 left-0">
            <img
              src={bg}
              alt="Background"
              className="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
            />
          </div>

          <div className="ml-auto w-1/2 flex items-center justify-center">
            <div className="w-full ml-auto max-w-md h-auto p-9 rounded-lg justify-center fixed">
              <h2 className="text-4xl font-serif font-bold text-center mb-10">
                Login
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="Enter your username"
                    className="w-full px-3 py-2 bg-transparent rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-3 py-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-or hover:bg-amber-500 text-white py-2 rounded-md focus:outline-none focus:ring-2"
                >
                  Login
                </button>
              </form>
              <div className="mt-4 text-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div>
                <p className="mt-5">
                  Didn&apos;t have an account{" "}
                  <a
                    href="/signup"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Sign Up?
                  </a>
                </p>
              </div>
              <button
                type="button"
                className="text-black mt-9 bg-transparent hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                type="button"
                className="text-black bg-transparent hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
              >
                <svg
                  className="w-5 h-5 me-2 -ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                Sign in with Apple
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
