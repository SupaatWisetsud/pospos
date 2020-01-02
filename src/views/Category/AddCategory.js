import React from 'react';
import axios from 'axios';

export default ({classes, Button, configHeader, setLoading, setRedirect, setData}) => {
    
    const [txtAdd, setTxtAdd] = React.useState("");

    const _onSubmit = async e => {
        
        e.preventDefault();
        setLoading(true);
        await axios.post("http://localhost:4000/api/category", {category : txtAdd.value}, configHeader)
            .then(res => {
                setLoading(false);
                if(res.data.status === 200){
                    setData(res.data.row);
                }else setRedirect(true);
            })
            .catch(err => null);
        
        txtAdd.value = '';
    
    }

    return(
        <React.Fragment>
            <form className={classes.formadd} onSubmit={_onSubmit}>
                <input type="text" placeholder="ชื่อประเภท" ref={e => setTxtAdd(e)} />
                <Button color="success">เพิ่มประเภท</Button>
            </form>
        </React.Fragment>
    )
}