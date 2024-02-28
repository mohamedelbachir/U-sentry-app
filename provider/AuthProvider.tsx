import { supabase } from "@/supabase/initSupabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthType>({ session: null, loading: true });

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      //setTimeout(() => {
      setLoading(false);
      //}, 5000);
    };
    fetchSession();
    supabase.auth.onAuthStateChange((e, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
