import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  // If not authenticated, automatically authenticate the user
  if (!isAuthenticated) {
    setAuthenticated();
  }

  // Always render the children - no blocking or redirects
  return <>{children}</>;
}