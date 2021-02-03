import React, {useState, useEffect} from 'react';
import AdminMenu from '../../../components/adminMenu/AdminMenu';
import CrudMenu from '../../../components/adminMenu/crudMenu/CrudMenu';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createSneaker} from '../../../functions/sneaker';


const initialState = ({
    title:'',
    description: '',
    price: '',
    // brand: '',
    // serie: '',
    // stock: [],
    // images: [],
    mainColors: ["Red", "Pink", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Black", "Grey", "White"],
    mainColor: "",
    // otherColors: [],
    styles: ["High-Top", "Mid-top", "Low-Top", "Special"],
    Style: ""
})

const CrudSneaker = () => {

    const [values, setValues] = useState(initialState);

    //DESTRUCTURATION
    const {title, description, price, brand, serie, stock, images, mainColors, mainColor, otherColors, styles, style} = values;

    //REDUX
    const {user} = useSelector((state) => ({...state}))

    //HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        createSneaker(values, user.token)
        .then(res => {
            console.log(res);
            toast.success(`The sneaker "${res.data.title}" was successfuly created`);
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 400) 
            toast.error(err.repsonse.data);
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        // console.log(e.target.name, "--->", e.target.value)
    }


    return (
        <div className= "container-fluid">
            <AdminMenu />
            <CrudMenu />
            
            <div className='row d-flex justify-content-left settings-view'>
                <div className='container-fluid settings-form'>
                    {/* {loading ? <h5>Loading ...</h5> :
                                <h3>Create sneaker</h3>} */}
                </div>
                {/* {JSON.stringify(values)} */}
                <div>
                    <h5> Create a Sneaker </h5>
                    <form onSubmit= {handleSubmit}>
                        <div className= "form-group">
                            <label>Title</label>
                            <input value= {title} 
                                onChange= {handleChange} 
                                type= 'text' 
                                name='title' 
                                className= 'form-control' />
                        </div>
                        <div className= "form-group">
                            <label>Description</label>
                            <input value= {description} 
                                onChange= {handleChange} 
                                type= 'text' 
                                name='description' 
                                className= 'form-control' />
                        </div>
                        <div className= "form-group">
                            <label>Price</label>
                            <input value= {price} 
                                onChange= {handleChange} 
                                type= 'number' 
                                name='price' 
                                className= 'form-control' />
                        </div>
                        {/* <div className= "form-group">
                            <label>Stock</label>
                            <input value= {stock} 
                                onChange= {handleChange} 
                                type= 'Array' 
                                name='stock' 
                                className= 'form-control' />
                        </div> */}

                        <div className= "form-group">
                            <label>Main Color</label>
                            <select  
                                name= 'mainColor' 
                                className= 'form-control'
                                onChange= {handleChange} 
                                >
                                <option>Select</option>
                               {mainColors.map((mainColor) => ( 
                                        <option key={mainColor} value={mainColor} >{mainColor}</option>
                                    ))}                                     
                            </select>

                        </div>
                        {/* <div className= "form-group">
                            <label>Other Colors</label>
                            <input 
                                value= {otherColors} 
                                onChange= {handleChange} 
                                type= 'Array' 
                                name='otherColors' 
                                className= 'form-control' />
                        </div> */}
                        <div className= "form-group">
                            <label>Style</label>
                            <select  
                                onChange= {handleChange} 
                                name='style' 
                                className= 'form-control'>
                                    <option>Select</option>
                                    {styles.map((style) => (
                                        <option key={style} value={style} >{style}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <button className= "btn btn-outline-info">Save</button>
                        </div>


                    </form>
                </div>

            </div>
        
        </div>
    )
}

export default CrudSneaker;