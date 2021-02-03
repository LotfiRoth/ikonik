import React from 'react';
import {NavLink} from 'react-router-dom';

import './CrudMenu.css'


const CrudMenu = () => {
        
    return (
            <div className="admin-crud-menu">
                <ul className="nav flex-column sidebar">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: '#7FEA60', borderBottom: '#030303 solid 0.1rem'}} to="/admin/crud/brand">Brand</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: '#7FEA60', borderBottom: '#030303 solid 0.1rem'}} to="/admin/crud/serie">Serie</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: '#7FEA60', borderBottom: '#030303 solid 0.1rem'}} to="/admin/crud/sneaker">Sneaker</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeStyle={{color: '#7FEA60', borderBottom: '#030303 solid 0.1rem'}} to="/admin/crud/stock">Stock</NavLink>
                    </li>
                </ul>
            </div>
    )
 }

export default CrudMenu;