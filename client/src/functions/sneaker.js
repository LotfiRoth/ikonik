import axios from 'axios';

 export const createSneaker = async (sneaker, authtoken) =>
        await axios.post(`${process.env.REACT_APP_API}/sneaker`, sneaker, {
                headers: {
                    authtoken
                },
            })