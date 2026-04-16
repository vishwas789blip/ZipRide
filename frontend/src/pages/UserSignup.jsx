import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext  } from '../context/userContext';

const UserSignUp = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [error, setError]         = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password)
      return setError('All fields are required');
    if (firstName.length < 3)
      return setError('First name must be at least 3 characters');
    if (password.length < 6)
      return setError('Password must be at least 6 characters');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        { fullName: { firstName, lastName }, email, password }
      );
      if (response.status === 201) {
        setUser(response.data);
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };  // ← one closing brace here, not two

  return (  // ← return is INSIDE the component, not after it
    <div className="min-h-screen bg-black text-white flex flex-col max-w-sm mx-auto px-6">
      <div className="py-6">
        <Link to="/" className="text-2xl font-bold">Uber</Link>
      </div>
      <div className="flex-1 flex flex-col justify-center pb-16">
        <h1 className="text-3xl font-bold mb-2">Create account</h1>
        <p className="text-gray-400 mb-8">Sign up to start riding</p>

        {error && (
          <div className="bg-red-900/40 text-red-300 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" placeholder="First name"
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/30"
            />
            <input
              type="text" placeholder="Last name"
              value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <input
            type="email" placeholder="Email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="password" placeholder="Password (min 6 chars)" autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};  // ← component closes here

export default UserSignUp;