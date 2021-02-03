import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';
import CrudMenu from '../../../components/adminMenu/crudMenu/CrudMenu';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getBrand, updateBrand} from '../../../functions/brand';
import CrudBrandForm from '../../../components/forms/CrudBrandForm';


const CrudBrandUpdate = ({history, match}) => {

    const {user} = useSelector((state) => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        loadBrand()    
    }, []);

    const loadBrand = () => 
        getBrand(match.params.slug).then((b) => setName(b.data.name))


    const handleSubmit = (e) => {
        e.preventDefault();
        //
        setLoading(true)
        updateBrand(match.params.slug, {name,}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" brand was updated successfuly`)
            history.push('/admin/crud/brand')
        })
        .catch(err => {
            // console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data)
            }
        })
    }


    // const handleRemove = async (slug) => {
    //     if(window.confirm(`Are you sure you wante to delete ${slug}?`)) {
    //         setLoading(true)
    //         removeBrand(slug, user.token)
    //             .then(res => {
    //                 setLoading(false)
    //                 toast.success(`${res.data.name} was successfuly deleted from the brands list`)
    //                 loadBrands()
    //             })
    //             .catch((err) => {
    //                 if(err.response.status === 400) {
    //                     setLoading(false)
    //                     toast.error(err.response.data)
    //                 }
    //             })
    //     }
    // }

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
                    <h3>Update brand</h3>
                    <CrudBrandForm
                        handleSubmit= {handleSubmit}
                        name= {name}
                        setName= {setName} />             
                </div>
            </div>           
        </div>
    )
}

export default CrudBrandUpdate;