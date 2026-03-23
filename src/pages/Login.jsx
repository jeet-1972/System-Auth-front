import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { ok, status, data } = await login({ username, password });
      if (ok && status === 200) {
        navigate('/dashboard', { replace: true });
        return;
      }
      const base =
        status === 401
          ? data?.error || 'Invalid credentials.'
          : data?.error || 'Login failed.';
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
      <h1>Sign in</h1>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="form-footer">
        New user? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
