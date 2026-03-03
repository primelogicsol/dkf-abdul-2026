import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface UseSessionOptions {
  requireAuth?: boolean;
  redirectUrl?: string;
}

export function useSession(options: UseSessionOptions = {}) {
  const { requireAuth = false, redirectUrl = '/' } = options;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const validateSession = async () => {
      try {
        // First check localStorage
        const localSession = localStorage.getItem("user_session");
        if (localSession) {
          try {
            const localUser = JSON.parse(localSession);
            
            // Validate with server
            const response = await fetch('/api/auth/session');
            
            if (!response.ok) {
              // Session invalid - clear localStorage
              localStorage.removeItem("user_session");
              if (mounted) {
                setUser(null);
                setError(response.status === 401 ? 'Session expired' : 'Session invalid');
                if (requireAuth) {
                  router.push(redirectUrl);
                }
              }
              setIsLoading(false);
              return;
            }

            const serverUser = await response.json();
            
            // Check if localStorage user matches server user
            if (localUser.id !== serverUser.id) {
              // Different user in localStorage - clear and use server data
              localStorage.setItem("user_session", JSON.stringify(serverUser));
            }
            
            if (mounted) {
              setUser(serverUser);
            }
          } catch {
            // Invalid JSON in localStorage
            localStorage.removeItem("user_session");
            if (mounted) {
              setUser(null);
              if (requireAuth) {
                router.push(redirectUrl);
              }
            }
          }
        } else {
          // No localStorage session
          if (mounted) {
            setUser(null);
            if (requireAuth) {
              router.push(redirectUrl);
            }
          }
        }
      } catch (err) {
        console.error('[useSession] Error:', err);
        if (mounted) {
          setError('Failed to validate session');
          if (requireAuth) {
            router.push(redirectUrl);
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    validateSession();

    return () => {
      mounted = false;
    };
  }, [requireAuth, redirectUrl, router]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('[logout] Error:', err);
    } finally {
      localStorage.removeItem("user_session");
      setUser(null);
      router.push('/');
    }
  };

  return { user, isLoading, error, logout };
}
