import axios from 'axios';

export const getSeries = async () =>
    await axios.get(`${process.env.REACT_APP_API}/series`);


export const getSerie = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/serie/${slug}`);


export const removeSerie = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/serie/${slug}`, {
            headers: {
                authtoken,
            },
        })

export const updateSerie = async (slug, serie, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/serie/${slug}`, serie,
        {
            headers: {
                authtoken
            },
        })

 export const createSerie = async (serie, authtoken) =>
        await axios.post(`${process.env.REACT_APP_API}/serie`, serie, {
                headers: {
                    authtoken
                },
            })