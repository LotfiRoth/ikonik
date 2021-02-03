import React from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';

const AdminDashboard = () => {
    return (
            <div className= "container-fluid">
                <AdminMenu />
            <div className='row d-flex justify-content-left settings-view'>
            <div className='container-fluid settings-form'>

                <h3>Account Details</h3>
            </div>
        </div>           
</div>
    )
}

export default AdminDashboard;

