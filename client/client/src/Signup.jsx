import bg from './assets/bg.jpg';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', {
        name: username,
        email: email,
        password: password,
        phonenumber: phoneNumber,
      });

      setSuccess(true);
      setErrorMsg('');

      // Log the successful response
      console.log('Successful signup:', response.data);
    } catch (error) {
      // Error response from the backend
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('An error occurred during signup');
      }
      setSuccess(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 h-screen fixed top-0 left-0">
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
        />
      </div>

      <div className="ml-auto w-1/2 flex items-center justify-center">
        <div className="w-full ml-10 max-w-md h-auto p-9 rounded-lg justify-center">
          <h2 className="text-4xl font-serif font-bold text-center mb-10">
            Sign Up
          </h2>

          {errorMsg && <p className="text-red-500 text-center mb-5">{errorMsg}</p>}
          {success && <p className="text-green-500 text-center mb-5">Signup successful!</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full mt-5 bg-transparent px-3 py-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent px-3 py-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                id="phno"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your mobile number"
                required
                className="w-full mt-5 bg-transparent px-3 py-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full mt-5 bg-transparent px-3 py-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-amber-500 text-white py-2 rounded-md focus:outline-none focus:ring-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 text-center">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-sm text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
