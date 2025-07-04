import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

function App() {
  return (

    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      
      <Footer/>
    </Router>
    

  );
}

export default App;
