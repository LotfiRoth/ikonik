import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const RedirectLoading= () => {
    const [count, setCount] = useState(3);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() =>
         {
             setCount((currentCount) => --currentCount);
         }, 1000);
         //redirect to Error 401 unauthorized page
         count === 0 && history.push('/error401')
         // clean interval
         return ()=> clearInterval(interval);
    }, [count, history]);

    return (
        <div className= 'container p-5 text-center'>
            <p>redirecting you in {count} seconds</p>
        </div>
    )
}

export default RedirectLoading;


