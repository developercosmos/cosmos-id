import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Support from "./pages/Support";
import Contact from "./pages/support/Contact";
import FAQ from "./pages/support/FAQ";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/contact" element={<Contact />} />
        <Route path="/support/faq" element={<FAQ />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute 
              element={<Admin />} 
              allowedRoles={['superuser', 'admin', 'operator']} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;