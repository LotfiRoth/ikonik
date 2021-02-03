import React, {useState} from 'react';
import UserMenu from '../../components/userMenu/UserMenu';
import {auth} from '../../firebase';
import {toast} from 'react-toastify'

// CSS STYLE
import './Settings.css'

const Settings = () => {
    const[password, setPassword] = useState('');
    const[passwordConfirm, setPasswordConfirm] = useState('');
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(password);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                console.log('success')
                setLoading(false);
                toast.success('Password updated successfuly');
                // clear state
                setPassword("");
                setPasswordConfirm("");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.message);
            });
    }

    
    const PasswordUpdateForm = () => 

    <form onSubmit={handleSubmit} className='settings-updatePass-form'>
        <h5>Update Password</h5>

        <div className="form-inline">
            <br/>
            <div className="form-group">
                <input type='password' 
                    name='password'
                    onChange={e => setPassword(e.target.value)}
                    className='form-control'
                    placeholder= 'New Password'
                    disabled={loading}
                    value={password} />
            </div>
            <div className="form-group">
                <input type='password' 
                    name='passwordConfirm'
                    onChange={e => setPasswordConfirm(e.target.value)}
                    className='form-control'
                    placeholder= 'Confirm New Password'
                    value={passwordConfirm}/>
            </div>
            <div className="form-group">
            <button className='btn settings-form-button' disabled={password !== passwordConfirm || password.length < 8 || loading}>Submit</button>
            </div>
        </div>

    </form>
    
     return (
            <div className= "container-fluid">
                <UserMenu/>
                <div className='row d-flex justify-content-left settings-view'>
                    <div className='container-fluid settings-form'>
                        {loading && (
                            <h4>Loading ...</h4>
                                )}
                        <h3>Account Details</h3>
                        {PasswordUpdateForm()}
                    </div>
                </div>           
        </div>
)
    }

export default Settings;