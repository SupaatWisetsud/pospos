import React from 'react';
import Moment from 'react-moment';
import {Button, Modal, Pagination} from '../../../components';

const Deposit = ({classes, isOpen, onDismiss, deposit, dispatch, onSetDiscount}) => {
   
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    const _onSelectOrderDeposit = (e, n) => {
        e.stopPropagation();
        dispatch({
            type : "deleteAll",
            payload : n.data
        });
        
        dispatch({type : "delDepositOrder",payload : n});
        
        onSetDiscount({status:false, total : n.discount}, n.discountType)
        onDismiss();
    }

    const _onDelDeposit = (e, n) => {
        e.stopPropagation();
        dispatch({type : "delDepositOrder",payload : n});
    }
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = deposit.slice(indexOfFirstPost, indexOfLastPost);

    let items = [];
    
    if(currentPage > 1 && currentPosts[0] === undefined){
        setCurrentPage(currentPage - 1);
    }

    currentPosts.forEach( (n, i) => {
        deposit[0] !== undefined &&
        items.push(
            <tr key={i} onClick={e=>_onSelectOrderDeposit(e, n)}>
                <td>
                    <Moment format={"DD/MM/YY HH:mm"}>
                        {n.time}
                    </Moment>
                </td>
                <td>
                    {n.data.length} รายการ
                </td>
                <td>{n.total} ฿</td>
                    <td>{n.discount} {n.discountType}</td>
                <td>
                    <Button color="danger" onClick={e=>_onDelDeposit(e, n)}>
                        ยกเลิก
                    </Button>
                </td>
            </tr>
        );
    });
    
    return(
        <Modal isOpen={isOpen}>
            <div className={classes.titleModal}>
                <h2>พักการขาย</h2>
                <Button onClick={e=>onDismiss()} color="danger">
                    <i className="fas fa-times"/>
                </Button>
            </div>
            <div className={classes.depositModalBody}>
                <table>
                    <thead>
                        <tr>
                            <th>เวลา</th>
                            <th>รายการ</th>
                            <th>ยอด</th>
                            <th>ส่วนลด</th>
                            <th>ยกเลิก</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((n) => n)}
                    </tbody>
                </table>
            </div>
            <div className={classes.depositModalFooter}>
                <Pagination 
                postPerPage={postsPerPage} 
                totalPosts={deposit.length}
                paginate={e => setCurrentPage(e)}
                currentPage={currentPage}/>
            </div>
        </Modal>
    );
}

export default Deposit;