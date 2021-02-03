import React from 'react';
import {NavLink} from 'react-router-dom';


// STYLESHEET
import '../userMenu/UserMenu.css'


const AdminMenu = () => {
        
    return (
        <div className="user-dashboard-menu d-flex">
                <ul className='nav d-flex justify-content-center'>
                    <li className='nav-item'>
                        <NavLink to="/admin/dashboard"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Dashboard
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to="/admin/orders"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Orders                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to= "/admin/crud"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                CRUD                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to= "/admin/statistics"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Statistics                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to= "/admin/sales-&-coupons"
                            className='nav-link'
                            activeStyle={{color: '#7FEA60'}}>
                                Sales & Coupons                        
                        </NavLink>
                    </li>
                    <li className='nav-item'>
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

export default AdminMenu;
