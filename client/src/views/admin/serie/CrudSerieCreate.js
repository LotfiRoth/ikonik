// TO DO //
// - fILTER CATEGORIES BY PARENT'S NAME

import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';
import CrudMenu from '../../../components/adminMenu/crudMenu/CrudMenu';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getBrands} from '../../../functions/brand'
import {createSerie, getSeries, removeSerie} from '../../../functions/serie';
import CrudBrandForm from '../../../components/forms/CrudBrandForm';
import SearchForm from '../../../components/forms/SearchForm';


const CrudSerieCreate = () => {

    const {user} = useSelector((state) => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState([]);
    const [series, setSeries] = useState([]);

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadBrands();
        loadSeries();
    }, [])

    const loadBrands = () => 
        getBrands().then((b) => setBrands(b.data));

    const loadSeries = () => 
        getSeries().then((s) => setSeries(s.data));


    // CREATE SERIE HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();
        //
        setLoading(true)
        createSerie({name, parent: brand}, user.token)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            toast.success(`The serie "${res.name}" was created successfuly`)
            setName('')
            loadSeries();
        })
        .catch(err => {
            // console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data)
            }
        })
    }

    // DELETE SERIE HANDLER
    const handleRemove = async (slug) => {
        if(window.confirm(`Are you sure you want to delete the serie ${slug} ?`)) {
            setLoading(true)
            removeSerie(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.success(`The serie "${res.data.name}" was deleted successfuly`)
                    loadSeries();
                })
                .catch((err) => {
                    if(err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })
        }
    }


    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)


    return (
        <div className= "container-fluid">
            <AdminMenu />
            <CrudMenu />
            
            <div className='row d-flex justify-content-left settings-view'>
            
                <div className='container-fluid settings-form'>
                    {loading ? <h5>Loading ...</h5> :
                                <h3>CRUD Serie</h3>}
                </div>
                
                <div>                        
                    <h3>Create a serie</h3>

                    <div className= "form-group">
                            <select
                                name= "brand" 
                                className= "form-control"
                                onChange= {(e) => setBrand(e.target.value)}>
                                <option>Select</option>                            
                                    {brands.length > 0 && brands.map((b) => (
                                        <option key={b._id} value= {b._id}>
                                            {b.name}
                                        </option>
                                    )
                                )}
                            </select>
                                
                        </div>

                    <CrudBrandForm 
                        handleSubmit= {handleSubmit}
                        name= {name}
                        setName= {setName} />                
                </div>

                                
                
                <div>
                    {/* {JSON.stringify(brands)} */}
                    <h3>Series listing</h3>

                    <SearchForm 
                        keyword= {keyword}
                        setKeyword= {setKeyword}
                    />

                    {series.filter(searched(keyword)).map((s) => (
                        <div key={s._id} className='alert alert-primary'>
                            {s.name}  
                            {/* {JSON.stringify(s.parent)} */}
                                                       
                            <span onClick={() => handleRemove(s.slug)} 
                                className='btn btn-sm float-right'>
                                    <i className="bi bi-trash"></i>
                            </span> 
                            <span>
                                <Link to={`/admin/crud/serie/${s.slug}`} 
                                    className='btn btn-sm float-right'>
                                        <i className="bi bi-pencil"></i>
                                </Link>
                            </span>
                        </div>
                    )
                    )}

                </div>
            </div>           
        </div>
    )
}

export default CrudSerieCreate;

