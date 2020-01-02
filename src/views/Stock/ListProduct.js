import React from 'react';
import axios from 'axios';
import {Button, Pagination} from '../../components';
import Posts from './Posts';

export default props => {
    const {classes, 
        toggle, 
        setToggle, 
        data, 
        endpoint, 
        loadData, 
        setLoading, 
        setEdit, 
        edit,
        statusEdit, 
        configHeader, 
        redirect, 
        searchTxt,
        onCilckSearch,
        category,
        _onSearchCategory} = props;
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(9);
        
    const _onDeleteProduct = async id => {
        setLoading(true);
        await axios.delete(endpoint + '/product', {...configHeader ,data:{p_id:id}} );
        await axios.get(endpoint + '/product', configHeader)
        .then(res=>{
            if(res.data.status === 200){
                loadData(res.data.row);
                setLoading(false);
            }else{
                setLoading(false);
                redirect(true);
            }
        })
        .catch(err=>null);
    }


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    return(
        <div style={{marginTop : 10, width : (toggle || statusEdit)? "68%":"100%" ,}}>
            <div className={classes.containerList}>
                <div className={classes.searchProduct}>
                    <div>
                        <p>หมวดหมู่</p>
                        <select className={classes.category} onChange={_onSearchCategory} defaultValue={0}>
                            <option value={0}>ทั้งหมด</option>
                            {category.map(n => <option key={n.c_id} value={n.c_id} >{n.c_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <form onSubmit={onCilckSearch}>
                            <input className={classes.searchTxt} type="text" placeholder="ค้นหาสินค้า" ref={searchTxt}/>
                            <Button color="primary">
                                ค้นหา
                            </Button>
                        </form>
                        <Button color="success" style={{margin:"0 0 0 10px"}} onClick={e=>setToggle(true)}>
                            เพิ่มสินค้า
                        </Button>
                    </div>
                </div>
                <table className={classes.tableProduct}>
                    <thead>
                        <tr>
                            <th>รหัส</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>หมวดหมู่</th>
                            <th>สถานะ</th>
                            <th>แก้ไข</th>
                            <th>ลบ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Posts
                        currentPosts={currentPosts} 
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        _onDeleteProduct={_onDeleteProduct}
                        setEdit={setEdit}
                        edit={edit}
                        setCurrentPage={setCurrentPage}
                        />
                    </tbody>
                </table>
            </div>

            
            <div className={classes.footer}>
                <p>สินค้าทั้งหมด {data.length} รายการ</p>

                <Pagination 
                postPerPage={postsPerPage} 
                totalPosts={data.length}
                paginate={e => setCurrentPage(e)}
                currentPage={currentPage}/>
            </div>
        </div>
    );
}