import axios from 'axios';

export const userCreateAndUpdate = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/user-create-and-update`, 
        {
            //
        }, 
        {
        headers: {
            authtoken: authtoken
        }
    })
};

export const userCurrent = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/user-current`, 
        {}, 
        {
        headers: {
            authtoken: authtoken
        }
    })
};

export const adminCurrent = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/admin-current`, 
        {}, 
        {
        headers: {
            authtoken: authtoken
        }
    })
};