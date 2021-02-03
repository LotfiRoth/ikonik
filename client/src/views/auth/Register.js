import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom';

const Register = ({history}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

        // redirect user if already logged in
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) {
            history.push('/');
        }
    }, [user, history])

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email was sent to ${email}. Please click the link to complete registration`)

        // save user email into local storage
        window.localStorage.setItem('emailForRegistration', email)

        // clear state
        setEmail("")
        setFirstName("")
        setLastName("")
        setDateOfBirth("")
    }

    const registerForm = () => 


        <form className='register-form' onSubmit= {handleSubmit} >
            
            <h1>IKONIK LOGO</h1>
            <h4>Become an Ikonik member</h4>
            <p>Create your Ikonik Member profile and get access to the very best of sneakers, discount coupons, and special events.</p>
            
            <div className="justify-content-center">
                <input 
                    type= 'email' 
                    className= 'form-control' 
                    value= {email} 
                    placeholder= "Email Address"
                    onChange= {(e) => setEmail(e.target.value)}
                    autoFocus/> 
            </div>
 
            <div className="form-group">
                <input 
                    type= 'text' 
                    className= 'form-control' 
                    value= {firstName} 
                    placeholder= "First Name"
                    onChange= {(e) => setFirstName(e.target.value)}/>
            </div> 

            <div className="form-group">
                <input 
                    type= 'text' 
                    className= 'form-control' 
                    value= {lastName} 
                    placeholder= "Last Name"
                    onChange= {(e) => setLastName(e.target.value)}/> 
            </div>

            <div className="form-group">
                <input 
                    type= 'text' 
                    className= 'form-control' 
                    value= {dateOfBirth} 
                    placeholder= "Date of Birth"
                    onChange= {(e) => setDateOfBirth(e.target.value)}/>
                    <p>Get an Ikonik reward every year on your birthday</p> 
            </div>
            
            <button type= "submit" className= "btn btn-raised auth-form-button">Join Us</button>
                
            <p>Already a member ? <Link to='/login' className= "form-link">Sign in.</Link></p>
            
        </form>
    
    return (
        <div className= "container-fluid">
                <div className='row d-flex justify-content-center auth-view'>
                    <div className='col-10 col-md-8 col-lg-6 auth-form'>
                        {registerForm()}
                    </div>
                </div>           
        </div>
    )
}

export default Register;