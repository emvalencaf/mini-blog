//react
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//pages
import About from './pages/About/About.page';
import Home from './pages/Home/Home.page';

//components
import Navbar from './components/Navbar.components';
import Footer from './components/Footer.component';


//styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element ={<Home />} />
            <Route path='/about' element={<About />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
