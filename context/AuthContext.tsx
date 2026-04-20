import { auth } from "@/constants/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  user: FirebaseUser | null;
  loading: boolean;
  getToken: () => Promise<string>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  getToken: async () => "",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const getToken = useCallback(async () => {
    if (!user) throw new Error("No autenticado");
    return user.getIdToken();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
