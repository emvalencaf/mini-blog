//react
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//firebase
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect } from 'react';
import { useAuthenthication } from './hooks/useAuthentication.hook';

//context
import { AuthProvider } from './contexts/AuthContext';

//pages
import About from './pages/About/About.page';
import Home from './pages/Home/Home.page';
import Login from './pages/Login/Login.page';
import Register from './pages/Register/Register.page';
import CreatePost from './pages/CreatePost/CreatePost.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import Search from './pages/Search/Search.page';

//components
import Navbar from './components/Navbar.components';
import Footer from './components/Footer.component';


//styles
import './App.css';
import Post from './pages/Post/Post.page';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthenthication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

  }, [auth]);

  if (loadingUser) return <p>Carregando...</p>


  return (
    <div className="App">
      <AuthProvider value={{ user }}>

        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              {/* Public Routes */}
              
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/search'
                element={<Search />}
              />
              <Route
                path='/posts/:id'
                element={<Post />}
              />

              {/* PRIVATE ROUTES */}
              
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/register'
                element={!user ? <Register /> : <Navigate to='/' />}
              />
              <Route
                path="/post/create"
                element={user ? <CreatePost /> : <Navigate to='/login' />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>

      </AuthProvider>
    </div>
  );
}

export default App;
