import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

// ----- AUTENTIZACE UŽIVATELE ---------------------

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false)
  const login = async (email, password) => {
    
  const {data, error} = await supabase.auth.signInWithPassword({email, password});
        
  if (!error && data) {
      console.log(data)
      setUser(data.user);
    setIsAuth(true); 
  } else {
    console.error('Chyba při přihlášení:', error);
  }

}
  const logout = () => setUser(null);

  useEffect(() => {
   const {data} = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuth(true)
        setUser(session.user)
      }
      if (event === 'SIGNED_OUT') {
        setIsAuth(false)
        setUser(null)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, []
  )

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}