import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";


// STYLESHEET
import './Navbar.css';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return (
            {
                color: '#030303',
                borderBottom: 'solid 0.1rem #7FEA60'
            }
        )  
    }
}

const isActiveUserMenu = (history, path) => {
    if(history.location.pathname === path) {
        return (
            {
                color: '#7FEA60',
            }
        )  
    }
}



const Navbar = ({history}) => {

    let {user} = useSelector((state) => ({...state}));

    let dispatch = useDispatch();

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push('/login')
    }    


    return (

    <nav className= 'navbar navbar-expand-lg justify-content-center"'>
        <ul className="navbar-nav navbarLeft">
            <li className="nav-item">
                <NavLink 
                    to='/' style={isActiveUserMenu(history, '/')} 
                    className="navbar-brand nav-link">
                        Logo Ikonik</NavLink>
            </li>
        </ul>

        <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#main_nav">
                <i className="bi bi-justify"></i>
        </button>

        <div className="collapse navbar-collapse" id="main_nav">

        <ul className="navbar-nav navbarCenter">
            <li className="nav-item">
                <NavLink 
                to='/new-releases' 
                style={isActive(history, '/new-releases')} 
                className="nav-link">New Releases</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/women' style={isActive(history, '/women')} className="nav-link">Women</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/men' style={isActive(history, '/men')} className="nav-link">Men</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/brands' style={isActive(history, '/brands')} className="nav-link">Brands</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/sale' style={isActive(history, '/sale')} className="nav-link">Sale</NavLink>
            </li>
        </ul>

            <ul className="navbar-nav navbarCenter smallScreen">
                {user && (
                    <li className="nav-item">
                        <NavLink to='/search' style={isActive(history, '/search')} className="nav-link">Search</NavLink>
                    </li>
                )}

                {user && (
                    <li className="nav-item">
                        <NavLink to='/user/profile' style={isActive(history, '/user/profile')} className="nav-link">My Profile</NavLink>
                    </li>
                    )}
                    {user && (
                    <li className="nav-item">
                        <NavLink to='/logout' style={isActive(history, '/logout')} className="nav-link">Sign Out</NavLink>
                    </li>
                )}
                {!user && (
                    <li className="nav-item">
                        <NavLink to='/register' style={isActive(history, '/register')} className="nav-link">Join Us</NavLink>
                    </li>
                )}
                {!user && (
                    <li className="nav-item">
                        <NavLink to='/login' style={(isActive(history, '/login'))} className="nav-link">Sign In</NavLink>
                    </li>
                )}
               
            </ul>

            <ul className="navbar-nav navbarRight largeScreen">

                <li className="nav-item">
                {user && user.role !== "admin" &&(                  
                    <form style={isActiveUserMenu(history, '/search')} >
                    <i className="bi bi-search"></i>
                    </form>
                )}
                {user && user.role === "admin" &&(                  
                    <NavLink 
                        to='/admin/statistics' 
                        style={isActiveUserMenu(history, '/admin/statistics')} 
                        className="nav-link">
                            <i className="bi bi-graph-up"></i>
                    </NavLink>
                )}
                </li>
                {user && (
                <li className="nav-item">
                {user && user.role === "subscriber" &&(                  
                    <NavLink 
                        to='/user/favorites' 
                        style={isActiveUserMenu(history, '/user/favorites')} 
                        className="nav-link">
                            <i className="bi bi-heart"></i>
                    </NavLink>
                )}
                {user && user.role === "admin" &&(                  
                    <NavLink 
                        to='/admin/crud' 
                        style={isActiveUserMenu(history, '/admin/crud')} 
                        className="nav-link">
                            <i className="bi bi-collection"></i>
                    </NavLink>
                )}

                </li>
            )}
            {user && (
                <li className="nav-item">
                {user && user.role === "subscriber" &&(                  
                    <NavLink 
                        to='/user/cart' 
                        style={isActiveUserMenu(history, '/user/cart')}
                        className="nav-link">
                            <i className="bi bi-bag"></i>
                    </NavLink>
                )}
                {user && user.role === "admin" &&(                  
                    <NavLink 
                        to='/admin/orders' 
                        style={isActiveUserMenu(history, '/admin/orders')}
                        className="nav-link">
                            <i className="bi bi-box"></i>
                    </NavLink>
                )}

                </li>
            )}
            {user && (                
                <li className="nav-item dropdown" id="navbar_dropdown"> 
                    {user && user.role === "subscriber" &&(                  
                        <NavLink 
                            to='/user/profile' 
                            style={isActiveUserMenu(history, '/user/profile')}
                            className="nav-link dropdown-toggle"
                            aria-haspopup="true" 
                            aria-expanded="false">                         
                                <i className="bi bi-person"></i>
                        </NavLink>
                    )}
                    {user && user.role === "admin" &&(
                        <NavLink 
                            to='/admin/dahsboard' 
                            style={isActiveUserMenu(history, '/admin/dashboard')}
                            className="nav-link dropdown-toggle"
                            aria-haspopup="true" 
                            aria-expanded="false">                         
                                <i className="bi bi-calendar2-week"></i>                        
                        </NavLink>
                    )}                        
                        
                        <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarMenuHOver">
                        
                            {user && user.role === "subscriber" &&(
                                <li>
                                    <NavLink style={isActive(history, '/user/profile')} to="/user/profile" className="dropdown-item">Profile Details</NavLink>
                                </li>
                            )}
                            {user && user.role === "subscriber" &&(
		                        <li>
                                    <NavLink style={isActive(history, '/user/history')} to="/user/history" className="dropdown-item">Orders</NavLink>
                                </li>
                            )}
                            {user && user.role === "subscriber" &&(
                                <li>
                                    <NavLink style={isActive(history, '/user/cart')} to="/user/cart" className="dropdown-item">My Bag</NavLink>
                                </li>
                            )}
                            {user && user.role === "subscriber" &&(
                                <li>
                                    <NavLink style={isActive(history, '/user/favorites')} to='/user/favorites' className="dropdown-item">Favorites</NavLink>
                                </li>
                            )}
                                


                            {user && user.role === "admin" &&(
                                <li>
                                    <NavLink style={isActive(history, '/admin/dashboard')} to="/admin/dashboard" className="dropdown-item">Dashboard</NavLink>
                                </li>
                            )}

                            {user && user.role === "admin" &&(
                                <li>
                                    <NavLink style={isActive(history, '/admin/statistics')} to="/admin/statistics" className="dropdown-item">Statistics</NavLink>
                                </li>
                            )}
                            {user && user.role === "admin" &&(
                                <li>
                                    <NavLink style={isActive(history, '/admin/orders-new')} to="/admin/orders" className="dropdown-item">Orders</NavLink>
                                </li>
                            )}
                            {user && user.role === "admin" &&(
                                <li>
                                    <NavLink style={isActive(history, '/admin/crud/brand')} to="/admin/crud/brand" className="dropdown-item">CRUD</NavLink>
                                </li>
                            )}

                           
                                <li>
                                    <NavLink onClick={logout}  to="/logout" className="dropdown-item">Sign Out</NavLink>
                                </li>

                     </ul>
                </li>
                
            )}
            {!user && (
                <li className="nav-item userNonAuth">
                    <NavLink to='/register' style={isActiveUserMenu(history, '/register')} className="nav-link"> Join Us </NavLink>
                </li>
            )}
            {!user && (
                <li className="nav-item userNonAuth">
                    <NavLink to='/login' style={isActiveUserMenu(history, '/login')} className="nav-link"> Sign In </NavLink>
                </li>
            )}
        </ul>
        </div>
    </nav>
)
}

export default withRouter(Navbar);
