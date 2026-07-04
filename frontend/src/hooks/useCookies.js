import { useState, useEffect } from 'react';
import api from '../services/api';

export function useCookies() {
  const [cookies, setCookies]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cookies');
        // BUG 1: response.data is { cookies: [...], total: N }
        // The array lives at response.data.cookies, not response.data.
        setCookies(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load cookies');
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, []);

  return { cookies, loading, error };
}

export function useStats() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    api.get('/stats')
      .then(res  => setStats(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
