import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";


function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userDashboard" element={<UserDashboard />} />


      </Routes>

      <Footer />
    </Router>


  );
}

export default App;
