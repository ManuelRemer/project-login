import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// custom hooks
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      {
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Signup />} />
            <Route path="/login" element={!user ? <Login /> : <Home />} />
            <Route path="/signup" element={!user ? <Signup /> : <Home />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
