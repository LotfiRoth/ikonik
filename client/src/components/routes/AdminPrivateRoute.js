import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import {useSelector}  from 'react-redux';
import RedirectLoading from './RedirectLoading';
import {adminCurrent} from '../../functions/auth'


const AdminPrivateRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    const [adminVerify, setAdminVerify] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            adminCurrent(user.token)
            .then(res => {
                console.log('CURRENT ADMIN RES', res)
                setAdminVerify(true)
            })
            .catch(err => {
                console.log('ADMIN ROUTE ERR', err)
                setAdminVerify(false)
            })
        }
    }, [user])

    return adminVerify ? 
        <Route {...rest} /> : <RedirectLoading />
}

export default AdminPrivateRoute 