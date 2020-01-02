import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import style from './style';
import ComponentToPrint from './ComponentToPrint';
import { Spinner, Pagination, Button, Alert } from '../../components';
import Posts from './Posts';

const endpoint = "http://localhost:4000/api";

class SaleHistory extends React.Component {

    state = {
        data: [],
        depositData: [],
        loading: false,
        error: {
            status: false,
            message: ''
        },
        redirect: false,
        dataPrint: [],
        currentPage: 1,
        postsPerPage: 10
    }

    async UNSAFE_componentWillMount() {
        this.setState({ loading: true });
        await axios.get(endpoint + "/payment", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ data: res.data.row, loading: false, depositData: res.data.row });
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => null)
    }

    _onPrint = data => {
        this.setState({ dataPrint: data });
    }

    onCilckSearch = e => {
        e.preventDefault();
        this.dateStart.value = "";
        this.dateEnd.value = "";
        if (this.seachTxt.value === "" || this.seachTxt.value === 0) {
            this.setState(oldState => ({
                depositData: oldState.data
            }))
        } else {
            const x = this.state.data.filter(n => this.seachTxt.value === n.p_bill.toString());
            this.setState({ depositData: x });
        }
    }

    _onSearchDate = e => {
        e.preventDefault();
        this.seachTxt.value = "";
        if(this.dateStart.value !== "" && this.dateEnd.value !== ""){
            let dateStart = new Date(this.dateStart.value), dateEnd = new Date(this.dateEnd.value);

            if (dateStart.getTime() <= dateEnd.getTime()) {
                dateEnd.setDate(dateEnd.getDate() + 1);
                const x = this.state.data.filter( n => {
                    let date = new Date(n.p_dateSale);
                    return ( date.getTime() >= dateStart.getTime() &&  date.getTime() <= dateEnd.getTime())
                });
                this.setState({depositData : x});
            } else {
                this.setState({error : {status : true, message : "กรุณาใส่เวลาให้ถูกต้อง..!"}})
            }
        }
    }

    _onResetSearchDate = e => {
        this.dateStart.value = "";
        this.dateEnd.value = "";
        this.setState(oldState => ({depositData : oldState.data}))
    }

    render() {
        const { classes } = this.props;
        const { loading, redirect, dataPrint, currentPage, postsPerPage, depositData, error } = this.state;

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = depositData.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {error.status &&
                <Alert color="danger" isOpen={error.status} toggle={e => this.setState({error : {status : false, message : ""}})}>
                    {error.message}
                </Alert>}
                <div style={{ display: 'none' }}>
                    <ComponentToPrint ref={el => (this.componentRef = el)} data={dataPrint} classes={classes} />
                </div>

                <div className={classes.container}>
                    <div className={classes.seach}>
                        <div>
                            <form onSubmit={this.onCilckSearch}>
                                <input type="text" placeholder="ค้นหาเลขที่ใบเสร็จ" ref={e => this.seachTxt = e} />
                                <Button color="success">
                                    ค้นหา
                                </Button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={this._onSearchDate} >
                                <p>ค้นหาระหว่างวัน :</p>
                                <input type="date" ref={e => this.dateStart = e} />
                                <p>ถึง</p>
                                <input type="date" ref={e => this.dateEnd = e} />
                                <Button color="primary">
                                    ค้นหา
                                </Button>
                            </form>
                            <Button color="dark" onClick={this._onResetSearchDate} >
                                รีเซ็ต
                            </Button>
                        </div>
                    </div>
                    <div className={classes.containerList}>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th>ใบเสร็จ</th>
                                    <th>รายการ</th>
                                    <th>วันที่</th>
                                    <th>ส่วนลด</th>
                                    <th>รวมทั้งสิ้น</th>
                                    <th>ชำระเงินโดย</th>
                                    <th>สถานะ</th>
                                    <th>พิมใบเสร็จ</th>
                                </tr>
                            </thead>
                            <tbody>

                                <Posts
                                    componentRef={this.componentRef}
                                    currentPosts={currentPosts}
                                    currentPage={currentPage}
                                    postsPerPage={postsPerPage}
                                    _onPrint={this._onPrint}
                                />

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.footer}>
                    <p>ทั้งหมด {depositData.length} รายการ</p>

                    <Pagination
                        postPerPage={postsPerPage}
                        totalPosts={depositData.length}
                        paginate={e => this.setState({ currentPage: e })}
                        currentPage={currentPage} />
                </div>
            </React.Fragment>
        );
    }
}

export default style(SaleHistory);