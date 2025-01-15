import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { checkSession } from './api/auth';
// import Home from './Home';
import Login from './pages/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/home';
import SignUp from './pages/auth/signup';
import { AppDispatch } from './app/store';
import { setLogout, setUser } from './features/user';
import CustomLink from './componets/Link';
import CustomButton from './componets/button';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn,name } = useSelector((state: any) => state.user);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await checkSession();
      if (!res.success) {
        return;
      }
      dispatch(setUser({
        adress: res.data.address,
        id: res.data._id,
        email: res.data.email,
        role: res.data.role,
        name: res.data.name
      }));
    };
    fetchSession();
    console.log("Is Session Valid", isLoggedIn);
  }, [dispatch]);

  return (
    <>

      <nav className=''>
        <ul className='flex flex-row justify-end w-full bg-black px-6'>
          
            <CustomLink to="/">Home</CustomLink>
          
          {isLoggedIn ?
          <>
            <div className='flex'>
               <span className='text-white self-center '>Welcome,</span> <CustomLink to="/">{name}</CustomLink>
            </div>
            <CustomButton className='self-center justify-self-end' onClick={async () => {
              dispatch(setLogout());
            }}>LogOot</CustomButton> 
            </>
            : <>
              
                <CustomLink to="/login">Login</CustomLink>
              
              
                <CustomLink to="/signup">SignUp</CustomLink>
            </>
          }
        </ul>
      </nav>

      <Routes >
        {/* Other routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
    // <BrowserRouter/>

  );
}

export default App;