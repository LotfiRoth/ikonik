import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar';

import LandingPage from './views/landingPage/LandingPage';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import RegisterComplete from './views/auth/RegisterComplete'
import ForgotPassword from './views/auth/ForgotPassword';
import History from './views/user/History';
import Cart from './views/user/Cart';
import UserProfile from './views/user/UserProfile';
import Favorites from './views/user/Favorites';
import Settings from './views/user/Settings';

import AdminDashboard from './views/admin/dashboard/AdminDashboard';
import CrudListProducts from './views/admin/CrudListProducts';
import CrudBrand from './views/admin/brand/CrudBrand';
import CrudBrandUpdate from './views/admin/brand/CrudBrandUpdate';
import CrudSerieCreate from './views/admin/serie/CrudSerieCreate';
import CrudSerieUpdate from './views/admin/serie/CrudSerieUpdate';
import CrudSneaker from './views/admin/sneaker/CrudSneakerCreate';




import AdminPrivateRoute from './components/routes/AdminPrivateRoute';


import UserPrivateRoute from './components/routes/UserPrivateRoute';
import Unauthorized401 from './views/errorPages/Unauthorized401';

import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {userCurrent} from './functions/auth';

import './App.css';

  const App = () => {
    const dispatch = useDispatch();

    //check firebase auth state
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async(user) => {
        if (user) {
          // get json webtoken
          const idTokenResult = await user.getIdTokenResult();
          console.log('user:', user);

          userCurrent(idTokenResult.token)
            .then((res) => {
                // console.log("user create and update response:", res);
                dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    firstName: res.data.firstName,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                }
              });
            })
            .catch(err => console.log(err));
        }
      });
      // clean up
      return () => unsubscribe()

    }, [dispatch])
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component= {LandingPage} />
        <Route exact path="/login" component= {Login} />
        <Route exact path="/register" component= {Register} />
        <Route exact path="/register/registerComplete" component= {RegisterComplete} />
        <Route exact path="/login/forgotPassword" component= {ForgotPassword} />
        <UserPrivateRoute exact path="/user/history" component= {History} />
        <UserPrivateRoute exact path="/user/profile" component= {UserProfile} />
        <UserPrivateRoute exact path="/user/cart" component= {Cart} />
        <UserPrivateRoute exact path="/user/favorites" component= {Favorites} />
        <UserPrivateRoute exact path="/user/settings" component= {Settings} />

        <AdminPrivateRoute exact path="/admin/dashboard" component= {AdminDashboard} />
        <AdminPrivateRoute exact path="/admin/crud/products" component= {CrudListProducts} />
        <AdminPrivateRoute exact path="/admin/crud/brand" component= {CrudBrand} />
        <AdminPrivateRoute exact path="/admin/crud/brand/:slug" component= {CrudBrandUpdate} />
        <AdminPrivateRoute exact path="/admin/crud/serie" component= {CrudSerieCreate} />
        <AdminPrivateRoute exact path="/admin/crud/serie/:slug" component= {CrudSerieUpdate} />
        <AdminPrivateRoute exact path="/admin/crud/sneaker" component= {CrudSneaker} />
        
        <Route exact path="/error401" component= {Unauthorized401} />    

      </Switch>
    </>
  );
}

export default App;
