import React, {useState, useEffect} from 'react';
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {userCreateAndUpdate} from '../../functions/auth';

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    
    // redirect user if already logged in
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) {
            history.push('/');
        }
    }, [user, history]);

    let dispatch = useDispatch();
    
    // Redirect depending on role
    const redirectRoleBased = (res) => {
        if(res.data.role === "admin") {
            history.push('/admin/dashboard')
        } else {
            history.push("/user/profile")
        }
    }    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            // console.log(result)
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

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
            redirectRoleBased(res)
            })
            .catch(err => console.log(err));
            
            // Redirect
            history.push('/') 

     
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
        };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
        .then(async(result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            userCreateAndUpdate(idTokenResult.token)
            .then((res) => {
                // console.log("user create and update response:", res);
                dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    firstName: res.data.firstName,
                    email: user.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                }
              });
              redirectRoleBased(res)
            })
            .catch(err => console.log(err));
            // history.push('/');
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.message);
        })
    }
    
    const loginForm = () => 

        <form onSubmit= {handleSubmit}>
            <h3>Sign In</h3>
            

            
            <div className="form-group">
                <input 
                    type= 'email' 
                    className= 'form-control' 
                    value= {email} 
                    placeholder= "Email Address"
                    onChange= {(e) => setEmail(e.target.value)}
                    autoFocus
                /> 
            </div>          
            
            <div className="form-group">
                <input 
                    type= 'password' 
                    className= 'form-control' 
                    value= {password} 
                    placeholder= "Password"
                    onChange= {(e) => setPassword(e.target.value)}
                /> 
            </div>
            
            <button onClick= {handleSubmit} disabled= {!email || !password} type= "primary" className= "btn btn-raised auth-form-button">
                Log In
            </button>
            <button 
                onClick = {googleLogin}
                className= "btn btn-raised auth-form-button">
                    Google Log In
            </button>
            <br/>

            <Link to= "/login/forgotPassword" className= "form-link">Forgot Password ?</Link>
        </form>
    
    return (

        <div className= "container-fluid">
                <div className='row d-flex justify-content-center auth-view'>
                    <div className='col-10 col-md-8 col-lg-6 auth-form'>
                    {loading && (
                            <h4>Loading ...</h4>
                                )}
                        {loginForm()}
                    </div>
                </div>           
        </div>
    );
};



export default Login;