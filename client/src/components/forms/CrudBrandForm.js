import React from 'react';

const CrudBrandForm = ({handleSubmit, name, setName}) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type='text' 
                onChange= {(e) => setName(e.target.value)} 
                className='form-control' 
                value={name} 
                autoFocus
                required
                />
                <button className="btn btn-outlined-primary">Save</button>
        </div>
    </form>
)

export default CrudBrandForm;