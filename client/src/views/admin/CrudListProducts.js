import React from 'react';
import AdminMenu from '../../components/adminMenu/AdminMenu';
import CrudMenu from '../../components/adminMenu/crudMenu/CrudMenu'

const CrudListProducts = () => {
    return (
            <div className= "container-fluid">
                <AdminMenu />
                <CrudMenu />
            <div className='row d-flex justify-content-left settings-view'>
            <div className='container-fluid settings-form'>

                <h3>CRUD List All Products</h3>
            </div>
        </div>           
</div>
    )
}

export default CrudListProducts;