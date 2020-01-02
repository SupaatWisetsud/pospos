import React from 'react';
import {Button} from '../../components';

export default ({currentPosts, currentPage, postsPerPage, edit, setEdit, _onDeleteProduct, setCurrentPage}) => {
    let items = [];

    // currentPosts is data 
    if(currentPage > 1 && currentPosts[0] === undefined){
        setCurrentPage(currentPage - 1);
    }
    
    currentPosts.forEach( (n, x) => {
        items.push(
            <tr key={n.p_id}>
                <td>{n.p_id}</td>
                <td>{n.p_name}</td>
                <td>{n.p_sale}</td>
                <td>{n.p_count}</td>
                <td>{n.c_name}</td>
                <td>
                    {(n.p_count < n.p_alert && n.p_count !== 0) && <p style={{color:"white",backgroundColor:"#F7DC6F"}}>สินค้าใกล้หมดแล้ว</p>}
                    {n.p_count === 0 && <p style={{color:"white",backgroundColor:"#E74C3C"}}>สินค้าหมดแล้ว</p>}
                    {(n.p_count >= n.p_alert && n.p_count !== 0) && <p style={{color:"white",backgroundColor:"#58D68D"}}>พร้อมขาย</p> }
                </td>
                <td>
                    <Button color={edit.status? (edit.data.p_id === n.p_id? "warning":null):"warning"} onClick={e=>{
                        if(edit.status === false){
                            setEdit({status:true, data : n}); 
                        }
                    }}>แก้ไข</Button>
                </td>
                <td>
                    <Button color="danger" onClick={e=>_onDeleteProduct(n.p_id)}>
                        ลบ
                    </Button>
                </td>
            </tr>
        );
    });
    return items.map((n) => n)
} 