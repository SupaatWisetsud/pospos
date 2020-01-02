import React from 'react';
import {Button} from '../../components';

import Moment from 'react-moment';
import ReactToPrint  from 'react-to-print';

export default ({classes, currentPosts, currentPage, postsPerPage, componentRef, _onPrint}) => {
    let items = [];
    
    currentPosts.forEach( n => {
        let {order} = JSON.parse(n.p_order);
        
        items.push(
            <tr key={n.p_bill}>
                <td>{n.p_bill}</td>
                <td>
                    {order.map((x,i)=>
                        <p key={i}>{x.p_name} x{x.count}</p>
                    )}
                </td>
                <td>
                    
                    <Moment format="DD/MM/YYYY :: HH:mm">{n.p_dateSale}</Moment>
                </td>
                <td>{n.p_discount} ฿</td>
                <td>{n.p_total} ฿</td>
                <td>{n.p_payby}</td>
                <td>
                    <p style={{backgroundColor : "#7DCEA0", color : "#FFF"}}>
                    {n.p_status}
                    </p>
                </td>
                <td>
                    <div onClick={e=>_onPrint(n)}>
                        <ReactToPrint
                        trigger={() => (
                            <Button color="warning">
                                <i className="fas fa-print"/>
                            </Button>
                        )}
                        content={() => componentRef}/>
                    </div>
                </td>
            </tr>
        );
    });
    return items.map((n) => n)
} 