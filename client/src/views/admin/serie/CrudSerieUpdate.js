import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';
import CrudMenu from '../../../components/adminMenu/crudMenu/CrudMenu';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getBrands} from '../../../functions/brand'
import {getSerie, updateSerie} from '../../../functions/serie';
import CrudBrandForm from '../../../components/forms/CrudBrandForm';


const CrudSerieUpdate = ({match, history}) => {

    const {user} = useSelector((state) => ({...state}));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [parent, setParent] = useState('');

    useEffect(() => {
        loadBrands();
        loadSerie();
    }, [])

    const loadBrands = () => 
        getBrands().then((b) => setBrands(b.data));

    const loadSerie = () => 
        getSerie(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent)
        })


    // UPDATE SERIE HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateSerie(match.params.slug, {name, parent}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" was updated successfuly`)
            history.push('/admin/crud/serie')
        })
        .catch(err => {
            // console.log(err);
            setLoading(false);
            if(err.response.status === 400) {
                toast.error(err.response.data)
            }
        })
    }

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
                    <h3>Update Serie</h3>

                    <div className= "form-group">
                            <label>Select parent brand</label>
                            <select
                                name= "brand" 
                                className= "form-control"
                                onChange= {(e) => setParent(e.target.value)}>
                                    {brands.length > 0 && brands.map((b) => (
                                        <option key={b._id} value= {b._id} selected={b._id === parent}>
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
            </div>           
        </div>
    )
}

export default CrudSerieUpdate;

