import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import dateformat from 'dateformat';

import style from './style';
import { Spinner } from '../../components';

const endpoint = "http://localhost:4000/api";

const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    title: {
        text: "Color",
        fontSize: 25,
    }
}

const day = [];
for (let index = 0; index <= 24; index++) {
    day.push(index.toString());
}
const year = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'];

const month = [];
for (let index = 1; index < 32; index++) {
    month.push(index.toString());
}

class Report extends React.Component {
    state = {
        type: "d",
        chartData: {
            labels: [],
            datasets: [
                {
                    label: '',
                    data: [],
                    backgroundColor: ['rgba(165, 214, 243, 0.5)'],
                    borderColor: ['#2874A6'],
                    borderWidth: 2
                },
            ]
        },
        loading: false,
        data: [],
        depositData: [],
        redirect: false,
        datetime: new Date(),
        totalTItle: {
            total: 0, discount: 0, netProfit: 0, cost: 0
        }
    }

    async UNSAFE_componentWillMount() {
        this.setState({ loading: true })
        await axios.get(endpoint + "/payment", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ data: res.data.row, loading: false, depositData: res.data.row });
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => null);

        setGraph(this.state.data, this.state.datetime, this.state.type, (totalTItle, ranges, datetime, dataG) => {

            this.setState({
                totalTItle,
                chartData: {
                    labels: ranges,
                    datasets: [
                        {
                            label: dateformat(datetime, "yyyy-mm-dd HH:MM"),
                            data: dataG,
                            backgroundColor: ['rgba(165, 214, 243, 0.5)'],
                            borderColor: ['#2874A6'],
                            borderWidth: 2
                        },
                    ]
                },
            })

        });

    }

    _onSelect = async e => {

        await this.setState({ type: e.target.value, datetime: new Date() });

        setGraph(this.state.data, this.state.datetime, this.state.type, (totalTItle, ranges, datetime, dataG) => {

            this.setState({
                totalTItle,
                chartData: {
                    labels: ranges,
                    datasets: [
                        {
                            label: dateformat(datetime, "yyyy-mm-dd HH:MM"),
                            data: dataG,
                            backgroundColor: ['rgba(165, 214, 243, 0.5)'],
                            borderColor: ['#2874A6'],
                            borderWidth: 2
                        },
                    ]
                },
            })

        });

    }

    _onDate = async e => {

        await this.setState({ datetime: e.target.value });

        setGraph(this.state.data, this.state.datetime, this.state.type, (totalTItle, ranges, datetime, dataG) => {

            this.setState({
                totalTItle,
                chartData: {
                    labels: ranges,
                    datasets: [
                        {
                            label: dateformat(datetime, "yyyy-mm-dd HH:MM"),
                            data: dataG,
                            backgroundColor: ['rgba(165, 214, 243, 0.5)'],
                            borderColor: ['#2874A6'],
                            borderWidth: 2
                        },
                    ]
                },
            })

        });

    }

    render() {
        const { classes } = this.props;
        const { type, chartData, loading, redirect, totalTItle, data } = this.state;

        let optionYear = [];
        if (data[0] === undefined) {
            optionYear.push(dateformat(new Date(), "yyyy"));
        } else {
            let startDate = parseInt(dateformat(data[data.length - 1].p_dateSale, "yyyy"));
            let endDate = parseInt(dateformat(new Date(), "yyyy"));

            for (let countYear = startDate; countYear <= endDate; countYear++) {
                optionYear.push(countYear);
            }
        }

        return (
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                <div className={classes.titleReport}>
                    <div>
                        <div style={{ backgroundColor: "#688DBF", color: "white" }}>
                            กำไรสุทธิ฿
                        </div>
                        <div>{totalTItle.netProfit}</div>
                    </div>
                    <div>
                        <div style={{ backgroundColor: "#BB8FCE", color: "white" }}>
                            ต้นทุน฿
                        </div>
                        <div>{totalTItle.cost}</div>
                    </div>
                    <div>
                        <div style={{ backgroundColor: "#68BF97", color: "white" }}>
                            ยอดขาย฿
                        </div>
                        <div>{totalTItle.total}</div>
                    </div>
                    <div>
                        <div style={{ backgroundColor: "#EEE86A", color: "white" }}>
                            ส่วนลด฿
                        </div>
                        <div>{totalTItle.discount}</div>
                    </div>
                </div>
                <div className={classes.filter}>
                    <div>
                        <select onChange={this._onSelect} defaultValue={type}>
                            <option value="d">วัน</option>
                            <option value="m">เดือน</option>
                            <option value="y">ปี</option>
                        </select>
                    </div>
                    <div>

                        {type === 'd' && <input type="date" onChange={this._onDate} />}
                        {type === 'm' && <input type="month" onChange={this._onDate} />}
                        {type === 'y' &&
                            <select onChange={this._onDate} defaultValue={dateformat(new Date(), "yyyy")} >
                                {optionYear.map((n,i)=><option key={i} value={n}>{n}</option>)}
                            </select>
                        }
                    </div>
                </div>
                <div style={{ backgroundColor: "white", marginTop: 5, padding: 5, borderRadius: 5, boxShadow: "1px 2px 3px rgba(0,0,0,0.3)" }}>
                    <Line
                        height={420}
                        data={chartData}
                        options={option} />
                </div>
            </React.Fragment>
        )
    }
}

// data is state data
// datetime is state datetime
// setState is func call back
function setGraph(data, datetime, type, setState) {

    let total = 0, discount = 0, netProfit = 0, cost = 0, dataG = [], ranges = [], x = [];

    if (type === 'd') {
        x = data.filter(n => dateformat(n.p_dateSale, "yyyy-mm-dd") === dateformat(datetime, "yyyy-mm-dd"));

        for (let ho = 0; ho < 25; ho++) {
            let time = x.filter(n => dateformat(n.p_dateSale, "H") === ho.toString());
            let ho_total = 0;
            time.forEach(n => ho_total += n.p_total);
            dataG.push(ho_total);
        }

        ranges = day;
    } else if (type === 'm') {

        x = data.filter(n => dateformat(n.p_dateSale, "yyyy-mm") === dateformat(datetime, "yyyy-mm"));

        for (let ho = 1; ho < 32; ho++) {
            let time = x.filter(n => dateformat(n.p_dateSale, 'd') === ho.toString());
            let ho_total = 0;
            time.forEach(n => ho_total += n.p_total);
            dataG.push(ho_total);
        }

        ranges = month;

    } else if (type === 'y') {
        x = data.filter(n => dateformat(n.p_dateSale, "yyyy") === dateformat(datetime, "yyyy"));

        for (let ho = 1; ho < 13; ho++) {
            let time = x.filter(n => dateformat(n.p_dateSale, 'm') === ho.toString());
            let ho_total = 0;
            time.forEach(n => ho_total += n.p_total);
            dataG.push(ho_total);
        }

        ranges = year;
    }

    let baht = x.filter(n => n.p_typediscount === "฿");
    let percent = x.filter(n => n.p_typediscount === "%");

    // calculate discount
    percent.forEach(n => discount += (n.p_sumtotal / 100) * n.p_discount);
    baht.forEach(n => discount += n.p_discount);

    //calculate total AND cost
    x.forEach(n => {
        // total
        total += n.p_total;
        // cost
        const { order } = JSON.parse(n.p_order);
        order.forEach(i => cost += i.p_cost * i.count);
    });

    //calculate net profit
    netProfit = total - cost;

    setState({ total, discount, netProfit, cost }, ranges, datetime, dataG);
}

export default style(Report);

