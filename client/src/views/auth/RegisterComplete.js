import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import {userCreateAndUpdate} from '../../functions/auth';


const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
  
    // redirect user if already logged in
    // const {user} = useSelector((state) => ({...state}));

    let dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // console.log(email, window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'))
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
         //validation
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }
        if (password.length < 8) {
            toast.error('Password must contain a minimum of 8 characters');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email, 
                window.location.href
                );
                console.log("RESULT", result);
                if (result.user.emailVerified) {
                    //remove user email from local storage
                    window.localStorage.removeItem('emailForRegistration')
                    // get user id token
                    let user = auth.currentUser
                    await user.updatePassword(password);
                    const idTokenResult = await user.getIdTokenResult()
                    // redux store
                    console.log("user:", user, "idTokenResult:", idTokenResult);

                    userCreateAndUpdate(idTokenResult.token)
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

                    // redirect
                    history.push('/')
                }
        } catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const RegisterCompleteForm = () => 
    
        <form onSubmit= {handleSubmit}>
            <h3>Complete Registration</h3>
                <input 
                    type= 'email' 
                    className= 'form-control' 
                    value= {email} 
                    disabled/>
                <br />
                <input 
                    type= 'password' 
                    className= 'form-control' 
                    value= {password}
                    placeholder= 'Enter Password' 
                    onChange = {(e) => setPassword(e.target.value)}
                    autoFocus/> 
                <br />
                <input 
                    type= 'password' 
                    className= 'form-control' 
                    value= {passwordConfirm}
                    placeholder= 'Confirm Password' 
                    onChange = {(e) => setPasswordConfirm(e.target.value)}/> 
                <br />

                <button type= "submit" className= "btn btn-raised auth-form-button" disabled={password !== passwordConfirm}>Complete Registration</button>
        </form>
    
    
        return (
            <div className= "container-fluid">
                <div className='row d-flex justify-content-center auth-view'>
                    <div className='col-10 col-md-8 col-lg-6 auth-form'>
                    {RegisterCompleteForm()}
                    </div>
                </div>           
        </div>



    )
}

export default RegisterComplete;