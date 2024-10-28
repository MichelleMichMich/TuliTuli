import { createContext } from "react";

export const SettingsContext = createContext(null)





// ----- AUTENTIZACE UŽIVATELE ---------------------

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}




// ---------- SPRÁVA STAVU KOŠÍKU ----------------------

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => setCart([...cart, item]);
  const removeItem = (itemId) => setCart(cart.filter(item => item.id !== itemId));

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}



// ------ SDÍLENÍ NOTIFIKACÍ, CHYBOVÝCH NEBO INFORMAČNÍCH HLÁŠEK -----------


const NotificationContext = React.createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications([...notifications, message]);
    setTimeout(() => setNotifications((n) => n.filter((msg) => msg !== message)), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}



// ----- SLOŽITĚJŠÍ FORMULÁŘE -------------

const FormContext = React.createContext();

function FormProvider({ children }) {
  const [formData, setFormData] = useState({});

  const updateField = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateField }}>
      {children}
    </FormContext.Provider>
  );
}