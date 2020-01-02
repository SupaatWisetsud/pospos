import React from 'react';
import axios from 'axios';

import {Button, Pagination} from '../../components';
import Posts from './Posts';

export default ({classes, setToggle, data, endpoint, setLoading, setData, configHeader, redirect}) => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(8);
    
    const _onDeleteUser = async id => {
        setLoading(true);
        await axios.delete(endpoint+"/user", {...configHeader, data:{id}})
        await axios.get(endpoint+"/user", configHeader)
        .then(res=>{
            if(res.data.status === 200){
                setLoading(false);
                setData(res.data.row);
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
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.listTitle}>
                    <div>
                        <input type="text" className={classes.searchTxt} placeholder="ค้นหาพนักงาน" />
                        <Button color="success" onClick={null} style={{marginLeft:5,fontSize : 18}}>ค้นหา</Button>
                    </div>
                    
                    <Button color="primary" onClick={e=>setToggle(true)}> + พนักงาน</Button>
                </div>
                <div className={classes.containerList}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>รหัสพนักงาน</th>
                                <th>รูป</th>
                                <th>ชื่อ - นามสกุล</th>
                                <th>ประเภท</th>
                                <th>เบอร์โทรศัพท์</th>
                                <th>ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <Posts 
                            classes={classes} 
                            currentPosts={currentPosts} 
                            currentPage={currentPage}
                            postsPerPage={postsPerPage}
                            _onDeleteUser={_onDeleteUser}
                            setCurrentPage={setCurrentPage}
                            />
            
                        </tbody>
                    </table>
                </div>
                <div className={classes.footer}>
                    <p>ทั้งหมด {data.length - 1} รายการ</p>
                    
                    {/* pagination */}
                    <Pagination 
                    postPerPage={postsPerPage} 
                    totalPosts={data.length}
                    paginate={e => setCurrentPage(e)}
                    currentPage={currentPage}/>
                </div>
            </div>
        </React.Fragment>
    );
}