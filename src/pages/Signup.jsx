import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { ok, status, data } = await register({ username, email, phone, password });
      if (ok && status === 201) {
        navigate('/login', { replace: true });
        return;
      }
      const base = data?.error || 'Registration failed.';
      const step = data?.step ? ` (${data.step})` : '';
      const code = data?.code ? ` [${data.code}]` : '';
      setError(`${base}${step}${code}`);
    } catch {
      setError('Network or CORS error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing up…' : 'Sign up'}
        </button>
      </form>
      <p className="form-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
