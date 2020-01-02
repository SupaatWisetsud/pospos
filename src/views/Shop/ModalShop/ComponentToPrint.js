import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

class ComponentToPrint extends React.Component {
    state = {
        data: []
    }
    async UNSAFE_componentWillMount() {
        await axios.get("http://localhost:4000/api/bill", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ data: res.data.row });
                } else {
                    this.props.redirect(true);
                }
            })
            .catch(err => null)
    }

    render() {
        const { data } = this.state;
        const { classes } = this.props;
        let order = undefined;

        if (data[0] !== undefined) {
            order = JSON.parse(data[0].p_order).order;
        }

        return (
            data[0] !== undefined ?
                <React.Fragment>
                    <div>
                        <div className={classes.printTitle}>
                            <h5>ระบบบริหารร้าน BIG SALE</h5>
                        </div>
                        <h5>เลขที่ใบเสร็จ : {data[0].p_bill}</h5>
                        <div className={classes.datetime} >
                            <span>
                                วันที่ : <Moment format="DD/MM/Y">{data[0].p_dateSale}</Moment>
                            </span>
                            <span>
                                เวลา :<Moment format="HH:mm">{data[0].p_dateSale}</Moment>
                            </span>
                        </div>
                        <div className={classes.orderContent}>
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
                                <p>{data[0].p_discount} บาท</p>
                            </div>
                            <div>
                                <p>ราคารวม</p>
                                <p>{data[0].p_total} บาท</p>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                <h1>Faill</h1>
        )
    }
}

export default ComponentToPrint;