import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import style from './style';
import { Button, Spinner, Alert } from '../../components';

import Product from './Product';
import Basket from './Basket';
import { Bill, Discount, Payment, SelectCount, Deposit } from './ModalShop';

const endpoint = "http://localhost:4000/api";

class Shop extends React.Component {

    state = {
        payment: false,
        discount: {
            status: false,
            total: 0
        },
        discountType: '฿',
        selectCount: {
            status: false,
            count: 0,
            id: 0
        },
        data: [],
        depositData: [],
        loading: false,
        error: {
            message: '',
            status: false
        },
        bill: {
            status: false,
            total: 0
        },
        deposit: {
            status: false
        },
        redirect: false,
        category : [],
        categoryType : "0"
    }
    
    async UNSAFE_componentWillMount() {
        
        this.setState({ loading: true })
        await axios.get(endpoint + "/product", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ data: res.data.row, loading: false, depositData: res.data.row });
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => null);

        this.setState({ loading: true })
        await axios.get(endpoint + "/category", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ category: res.data.row, loading: false});
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => null);
    }

    _onpayment = e => {
        if (this.props.basket[0] !== undefined) {
            this.setState({ payment: true });
        } else {
            this.setState({ error: { message: 'ไม่มีข้อมูลในรายการ', status: true } });
        }
    }

    _onDiscount = e => {
        if (this.props.basket[0] !== undefined) {
            this.setState(oldState => ({ discount: { status: true, total: oldState.discount.total } }));
        } else {
            this.setState({ error: { message: 'ไม่มีข้อมูลในรายการ', status: true } });
        }
    }

    _onSetBill = (number, total) => {
        this.setState({
            bill: {
                total: number - total,
                status: true
            }
        })
    }

    _onSearchProduct = e => {
        e.preventDefault();
        
        if (this.searchTxt.value !== "*" && this.searchTxt.value !== "") {
            const x = this.state.depositData.filter(n => {
                const regex = new RegExp(`${this.searchTxt.value}`);
                return regex.test(n.p_name);
            });
            this.setState({ depositData: x });
        }else{
            let x;
            if(this.state.categoryType === "0"){
                x = this.state.data;
            }else{
                x = this.state.data.filter(n => this.state.categoryType === n.c_id.toString());
            }
            
            this.setState({ depositData: x });
        }
    }

    _onSearchCategory = async e => {
        this.searchTxt.value = "";
        await this.setState({categoryType : e.target.value});
        
        if(this.state.categoryType !== "0"){
            const x = this.state.data.filter(n => this.state.categoryType === n.c_id.toString());
            this.setState({ depositData: x });
        }else{
            const x = this.state.data;
            this.setState({ depositData: x });
        }
        
    }

    _onDeposit = e => { //พักการขาย

        if (this.props.basket[0] !== undefined) {

            let total = 0;
            this.props.basket.forEach(n => { total += Number.parseInt(n.count) * Number.parseInt(n.p_sale) });

            const data = {
                data: this.props.basket,
                time: new Date(),
                total: total,
                discount: this.state.discount.total,
                discountType: this.state.discountType
            }

            this.props.dispatch({
                type: "depositOrder",
                payload: data
            })

            this.props.dispatch({
                type: "deleteAll",
                payload: []
            })
        }
        this.setState({
            deposit: { status: true },
            discount: { status: false, total: 0 }
        });

    }

    //กริยาส่วนของการยิงบาร์โค้ด
    _onBarcode = e => {
        e.preventDefault();
        this.state.depositData.forEach(n => {
            if (n.p_barcode === this.barcode.value) {

                let basket = this.props.basket.find(x => x.p_id === n.p_id);
                if (basket !== undefined) {
                    if ((n.p_count - basket.count) !== 0)
                        this.props.dispatch({ type: "addProduct", payload: n })
                } else this.props.dispatch({ type: "addProduct", payload: n })
            
            }
        });
        this.barcode.value = "";
    }

    render() {
        
        const { loading, error, discount, payment, bill, redirect, selectCount, depositData, deposit, discountType, category } = this.state;
        const { classes, basket, dispatch, configHeader } = this.props;
        
        let total = 0;
        basket.forEach(n => { total += Number.parseInt(n.count) * Number.parseInt(n.p_sale) });

        let defaultTotal = total;

        if (discountType === '฿') {
            total -= discount.total;
        } else {
            total -= total / 100 * discount.total;
        }

        return (
            <React.Fragment>

                {/* alert etc. */}
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {error.status &&
                    <Alert isOpen={error.status} color="danger" toggle={e => this.setState({ error: { message: '', status: false } })}>
                        {error.message}
                    </Alert>}

                {/* discount modal */}
                {discount.status &&
                    <Discount
                        classes={classes}
                        isOpen={discount.status}
                        onDismiss={e => this.setState(oldState => ({ discount: { status: false, total: oldState.discount.total } }))}
                        onSetDiscount={e => this.setState({ discount: e })}
                        total={total}
                        onSetError={e => this.setState({ error: e })}
                        discount={discount}
                        discountType={discountType}
                    />}

                {/* payment modal */}
                <Payment
                    isOpen={payment}
                    classes={classes}
                    onDismiss={e => this.setState({ payment: false })}
                    total={total}
                    defaultTotal={defaultTotal}
                    discount={discount.total}
                    discountType={discountType}
                    endpoint={endpoint}
                    basket={basket}
                    dispatch={dispatch}
                    loadData={e => this.setState({ data: e })}
                    setBill={this._onSetBill}
                    onSetError={e => this.setState({ error: e })}
                    configHeader={configHeader}
                    redirect={e => this.setState({ redirect: e })}
                    onSetDiscount={e => this.setState({ discount: e })}
                />

                {/* select count product */}
                {selectCount.status &&
                    <SelectCount
                        classes={classes}
                        isOpen={selectCount.status}
                        onDismiss={e => this.setState({ selectCount: { status: false, count: 0, id: 0 } })}
                        dispatch={dispatch}
                        data={selectCount}
                        onSetDiscount={e => this.setState({ discount: e })}
                    />}

                {/* bill modal */}
                <Bill
                    isOpen={bill.status}
                    onDismiss={e => this.setState({ bill: { status: false, total: 0 } })}
                    total={bill.total}
                    configHeader={configHeader}
                    redirect={e => this.setState({ redirect: e })} 
                    classes={classes}/>

                <Deposit
                    classes={classes}
                    isOpen={deposit.status}
                    onDismiss={e => this.setState({ deposit: { status: false } })}
                    dispatch={dispatch}
                    deposit={this.props.deposit}
                    onSetDiscount={(discount, discountType) => this.setState({ discount: discount, discountType: discountType })}
                />

                {/* container content */}
                <div className={classes.container}>

                    {/* list product */}
                    <div className={classes.product}>
                        <div className={classes.search}>

                            <div>
                                {/* category */}
                                <select onChange={this._onSearchCategory}>
                                    <option value={0}>ทั้งหมด</option>
                                    {category.map(n => <option value={n.c_id} key={n.c_id}>{n.c_name}</option>)}
                                </select>

                                {/* input text search */}
                                <form onSubmit={this._onSearchProduct}>
                                    <input type="text" placeholder="ค้นหาสินค้า" ref={e=> this.searchTxt = e} />
                                    <Button color="success">
                                        <i className="fas fa-search" /> ค้นหา
                                    </Button>
                                </form>

                            </div>

                            <div>
                                <form onClick={this._onBarcode} className={classes.formBarcode} >
                                    <input type="text" placeholder="barcode" autoFocus ref={e => this.barcode = e} />
                                    <Button color="primary">
                                        ตกลก
                                    </Button>
                                </form>
                            </div>

                        </div>
                        <div className={classes.listProduct}>

                            {depositData.map(n => {

                                return (
                                    n.p_count === 0 ?
                                    null :
                                    <Product
                                    key={n.p_id}
                                    action={basket.map(x => n.p_id === x.p_id && classes.action)}
                                    classes={classes}
                                    data={n}
                                    dispatch={dispatch}
                                    basket={basket.find(x => x.p_id === n.p_id)} />
                                )
                            })}

                        </div>
                    </div>

                    {/* order */}
                    <div className={classes.order}>
                        <div className={classes.total}>
                            <div>
                                <span>
                                    ส่วนลด
                                    <select onChange={e => {
                                        this.setState({
                                            discountType: e.target.value,
                                            discount: { status: false, total: 0 }
                                        });
                                    }}>
                                        <option>฿</option>
                                        <option>%</option>
                                    </select>
                                </span>
                                <h2 onClick={this._onDiscount}> {discount.total}</h2>
                            </div>
                            <div>
                                <span>รวม</span>
                                <h2>
                                    ฿ {total}
                                    {discount.total !== 0 &&
                                        <React.Fragment>
                                            <span style={{ fontSize: 16, color: "rgba(0,0,0,0.3)" }}> / </span>
                                            <span style={{ textDecoration: "line-through", fontSize: 16, color: "rgba(0,0,0,0.3)" }}>
                                                {defaultTotal}
                                            </span>
                                        </React.Fragment>}
                                </h2>
                            </div>
                            <Button style={{ width: "100%", fontSize: 24 }}
                                color="success"
                                onClick={this._onpayment}>
                                ชำระเงิน
                            </Button>
                        </div>

                        {/* basket */}
                        <Basket
                            classes={classes}
                            Button={Button}
                            basket={basket}
                            dispatch={dispatch}
                            onSetDiscount={e => this.setState({ discount: e })}
                            selectCount={e => this.setState({ selectCount: e })}
                        />
                        <div className={classes.optionListOrder}>
                            <Button color="info" style={{ fontSize: 18 }} onClick={this._onDeposit}>
                                พักการขาย
                            </Button>
                            <Button color="danger" onClick={e => {
                                dispatch({ type: "deleteAll", payload: [] })
                                this.setState({ discount: { status: false, total: 0 } })
                            }} style={{ fontSize: 18 }}>
                                เคลียร์
                            </Button>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    basket: state.basketReducer,
    deposit: state.depositReducer
});

export default connect(mapStateToProps)(style(Shop));