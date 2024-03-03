import { supabase } from "@/supabase/initSupabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  setSession?: (session: Session | null) => void;
  classeId?: number;
  setClasse?: (v: number) => void;
};

const AuthContext = createContext<AuthType>({ session: null, loading: true });

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [classe, setClasse] = useState<number | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      handleUser(data.session);
    };

    supabase.auth.onAuthStateChange((e, session) => {
      handleUser(session);
    });
    fetchSession();
  }, []);
  async function handleUser(userSession: Session | null) {
    if (userSession == null) {
      setSession(null);
      setLoading(false);
      return;
    } else {
      await supabase
        .from("etudiants")
        .select("*")
        .eq("uuid", userSession.user.id)
        .single()
        .then((v) => {
          if (v.data) {
            setClasse(v.data.classe_id);
            setLoading(false);
            setSession(userSession);
          }
        });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        setSession: setSession,
        classeId: classe!,
        setClasse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
