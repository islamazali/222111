// src/pages/Offers.tsx (REDIRECT → /offer) — keep old route without funnel conflict

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Offers() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/offer', { replace: true });
  }, [navigate]);

  return null;
}
