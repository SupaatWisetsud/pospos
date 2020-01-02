import React from 'react';
import {decode} from 'jsonwebtoken';

import {Button} from '../../components';

export default ({classes, currentPosts, currentPage, postsPerPage, _onDeleteUser, setCurrentPage}) => {

    let items = [];
    const token = decode(localStorage.getItem('token'))[0];
    if(currentPage > 1 && currentPosts[0] === undefined){
        setCurrentPage(currentPage - 1);
    }
    currentPosts.forEach( n => {
        token.p_id !== n.p_id && 
        items.push(
            <tr key={n.p_id}>
                <td>{n.p_id}</td>
                <td>
                    <img className={classes.img} src={"http://localhost:4000"+n.p_img} alt={n.p_name} />
                </td>
                <td>
                    <p>{n.p_name}</p>
                </td>
                <td>
                    <p>{n.p_status === "a"? "เจ้าของร้าน":"พนักงาน"}</p>
                </td>
                <td>
                    <p>{n.p_phone}</p>
                </td>
                <td>
                    <Button color="danger" onClick={e=>_onDeleteUser(n.p_id)}>
                        ลบ
                    </Button>
                </td>
            </tr>
        );
    });
    return items.map((n) => n)
} 