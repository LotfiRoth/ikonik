import React from 'react';
import {NavLink} from 'react-router-dom';


// STYLESHEET
import './UserMenu.css'


const UserMenu = () => {
        
    return (
        <div className="user-dashboard-menu d-flex">
                <ul className='nav d-flex justify-content-center'>
                    <li className='nav-item'>
                        <NavLink to="/user/profile"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Profile
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/user/history"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Orders                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to= "/user/cart"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Bag                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to= "/user/favorites"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Favorites                        
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to= "/user/settings"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Settings                        
                        </NavLink>
                    </li>  
                </ul>
        </div>
    )
 }

export default UserMenu;
