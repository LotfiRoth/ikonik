import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';
import CrudMenu from '../../../components/adminMenu/crudMenu/CrudMenu';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {createBrand, getBrands, removeBrand} from '../../../functions/brand';
import CrudBrandForm from '../../../components/forms/CrudBrandForm';
import SearchForm from '../../../components/forms/SearchForm';


const CrudBrand = () => {

    const {user} = useSelector((state) => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);

    const [keyword, setKeyword] = useState('');





    useEffect(() => {
        loadBrands();
    }, [])

    const loadBrands = () => 
        getBrands().then((b) => setBrands(b.data));


    // CREATE BRAND HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();
        //
        setLoading(true)
        createBrand({name,}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`The new brand "${res.data.name}" was created successfuly`)
            loadBrands()
        })
        .catch(err => {
            // console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data)
            }
        })
    }


    // DELETE BRAND HANDLER
    const handleRemove = async (slug) => {
        if(window.confirm(`Are you sure you wante to delete ${slug}?`)) {
            setLoading(true)
            removeBrand(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.success(`${res.data.name} was successfuly deleted from the brands list`)
                    loadBrands()
                })
                .catch((err) => {
                    if(err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })
        }
    }




    const searched = (keyword) => (b) => b.name.toLowerCase().includes(keyword)

    return (
        <div className= "container-fluid">
            <AdminMenu />
            <CrudMenu />
            
            <div className='row d-flex justify-content-left settings-view'>
            
                <div className='container-fluid settings-form'>
                    {loading ? <h5>Loading ...</h5> :
                                <h3>CRUD Brand</h3>}
                </div>
                
                <div>
                    <h3>Create a brand</h3>
                    <CrudBrandForm 
                        handleSubmit= {handleSubmit}
                        name= {name}
                        setName= {setName} />                
                </div>
                
                <div>
                    {/* {JSON.stringify(brands)} */}
                    <h3>Brands listing</h3>

                    <SearchForm 
                        keyword= {keyword}
                        setKeyword= {setKeyword}
                    />

                    {brands.filter(searched(keyword)).map((b) => (
                        <div key={b._id} className='alert alert-primary'>
                            {b.name}                             
                            <span onClick={() => handleRemove(b.slug)} 
                                className='btn btn-sm float-right'>
                                    <i className="bi bi-trash"></i>
                            </span> 
                            <span>
                                <Link to={`/admin/crud/brand/${b.slug}`} 
                                    className='btn btn-sm float-right'>
                                        <i className="bi bi-pencil"></i>
                                </Link>
                            </span>
                        </div>
                    ))}
                </div>
            </div>           
        </div>
    )
}

export default CrudBrand;