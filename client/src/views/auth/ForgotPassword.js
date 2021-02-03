import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

        // redirect user if already logged in
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) {
            history.push('/');
        }
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            toast.success('Email was sent to yout email address. Click the link to reset password')

        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log('ERROR MSG FOR FORGOT PASSWORD', error);
        })

    }

    return (

        <div className= "container-fluid">
                <div className='row d-flex justify-content-center auth-view'>
                    <div className='col-10 col-md-8 col-lg-6 auth-form'>
                    {loading && (
                            <h4>Loading ...</h4>
                                )}
                            
                            <form onSubmit= {handleSubmit}>

                                <h3>Forgot Password</h3>
                                
                                    <input
                                        type= 'email'
                                        value= {email}
                                        onChange= {(e) => setEmail(e.target.value)}
                                        placeholder= "Please enter email address"
                                        className= 'form-control' 
                                        autoFocus />
                            
                            
                                <button className= "btn btn-raised auth-form-button" disabled= {!email}>
                                    Reset Password 
                                </button>
                            </form>
                    </div>
                </div>           
        </div>
    )}

export default ForgotPassword;