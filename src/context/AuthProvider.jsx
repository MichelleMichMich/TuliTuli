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
      // setUser(userData) ;
      setUser(data.user);
    setIsAuth(true); // Nastaví stav `isAuth` na true při úspěšném přihlášení
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




// ---------- SPRÁVA STAVU KOŠÍKU ----------------------

// const CartContext = React.createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addItem = (item) => setCart([...cart, item]);
//   const removeItem = (itemId) => setCart(cart.filter(item => item.id !== itemId));

//   return (
//     <CartContext.Provider value={{ cart, addItem, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// }



// ------ SDÍLENÍ NOTIFIKACÍ, CHYBOVÝCH NEBO INFORMAČNÍCH HLÁŠEK -----------


// const NotificationContext = React.createContext();

// function NotificationProvider({ children }) {
//   const [notifications, setNotifications] = useState([]);

//   const addNotification = (message) => {
//     setNotifications([...notifications, message]);
//     setTimeout(() => setNotifications((n) => n.filter((msg) => msg !== message)), 3000);
//   };

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// }



// ----- SLOŽITĚJŠÍ FORMULÁŘE -------------

// const FormContext = React.createContext();

// function FormProvider({ children }) {
//   const [formData, setFormData] = useState({});

//   const updateField = (field, value) => {
//     setFormData(prevData => ({ ...prevData, [field]: value }));
//   };

//   return (
//     <FormContext.Provider value={{ formData, updateField }}>
//       {children}
//     </FormContext.Provider>
//   );
// }