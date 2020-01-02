import React from 'react';
import Moment from 'react-moment';

class ComponentToPrint extends React.Component {
    render() {
        const { data, classes } = this.props;
        let { p_order } = data, order = undefined;

        if (p_order !== undefined) {
            p_order = JSON.parse(p_order);
            order = p_order.order;
        }

        return (
            <React.Fragment>
                <div>
                    <div className={classes.printTitle}>
                        <h5>ระบบบริหารร้าน BIG SALE</h5>
                    </div>
                    <h5>เลขที่ใบเสร็จ : {data.p_bill}</h5>
                    <div className={classes.datetime} >
                        <span>
                            วันที่ : <Moment format="DD/MM/Y">{data.p_dateSale}</Moment>
                        </span>
                        <span>
                            เวลา :<Moment format="HH:mm">{data.p_dateSale}</Moment>
                        </span>
                    </div>
                    <div className={classes.order}>
                        <div className={classes.titleOrder}>
                            <p>รายการ</p>
                            <p>จำนวน</p>
                        </div>
                        
                        {order !== undefined &&
                        order.map(n =>
                            <div key={n.p_id} className={classes.itemOrder}>
                                <p>{n.p_name}</p>
                                <p>x{n.count}</p>
                            </div>
                        )}
                        
                    </div>
                    <div className={classes.sumOrder}>
                        <div>
                            <p>ส่วนลด</p>
                            <p>{data.p_discount} บาท</p>
                        </div>
                        <div>
                            <p>ราคารวม</p>
                            <p>{data.p_total} บาท</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ComponentToPrint;