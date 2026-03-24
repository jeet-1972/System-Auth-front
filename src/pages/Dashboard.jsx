import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { me, logout } from '../services/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { ok, data } = await me();
      if (!ok) {
        navigate('/login', { replace: true });
        return;
      }
      setUsername(data?.username ?? null);
      setLoading(false);
    })();
  }, [navigate]);

  async function handleLogout() {
    setLogoutLoading(true);
    await logout();
    setLogoutLoading(false);
    navigate('/login', { replace: true });
  }

  if (loading) {
    return (
      <div className="form-card">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h1>Welcome to Sangeet</h1>
      {username && <p className="username">Hello, {username}</p>}
      <button
        type="button"
        className="btn-logout"
        onClick={handleLogout}
        disabled={logoutLoading}
      >
        {logoutLoading ? 'Logging out…' : 'Logout'}
      </button>
    </div>
  );
}
