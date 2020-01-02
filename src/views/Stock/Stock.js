import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import style from './style';
import { Spinner, Alert } from '../../components';
import AddProduct from './AddProduct';
import ListProduct from './ListProduct';
import EditProduct from './EditProduct';

const endpoint = "http://localhost:4000/api";

class Stock extends React.Component {
    state = {
        toggle: false,
        data: [],
        depositData: [],
        loading: false,
        error: { status: false, message: '' },
        edit: {
            status: false,
            data: {}
        },
        redirect: false,
        category: [],
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
            .catch(err => null)

        this.setState({ loading: true })
        await axios.get(endpoint + "/category", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ category: res.data.row, loading: false });
                } else {
                    this.setState({ loading: false, redirect: true });
                }
            })
            .catch(err => null);
    }
    onCilckSearch = e => {
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

    render() {
        const { category, toggle, loading, error, edit, redirect, depositData } = this.state;
        const { classes, configHeader } = this.props;
        let ready = 0, out = 0, near = 0;

        depositData.forEach(n => {
            if (n.p_count < n.p_alert && n.p_count !== 0) near++;
            if (n.p_count === 0) out++;
            if (n.p_count >= n.p_alert) ready++;
        });

        return (
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {error.status &&
                    <Alert color="danger" isOpen={error.status} toggle={e => this.setState({ error: { message: '', status: false } })}>
                        {error.message}
                    </Alert>}
                <div className={classes.type}>
                    <div>
                        <h3>{ready}</h3>
                        <p>พร้อมขาย</p>
                    </div>
                    <div>
                        <h3>{near}</h3>
                        <p>ใกล้หมด</p>
                    </div>
                    <div>
                        <h3>{out}</h3>
                        <p>สินค้าหมด</p>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ListProduct
                        classes={classes}
                        toggle={toggle}
                        data={depositData}
                        endpoint={endpoint}
                        category={category}
                        loadData={e => this.setState({ data: e, depositData: e })}
                        setToggle={e => this.setState({ toggle: e, edit: { status: false, data: {} } })}
                        setLoading={e => this.setState({ loading: e })}
                        setEdit={e => this.setState({ edit: e, toggle: false })}
                        edit={edit}
                        statusEdit={edit.status}
                        configHeader={configHeader}
                        redirect={e => this.setState({ redirect: e })}
                        searchTxt={e => this.searchTxt = e}
                        onCilckSearch={this.onCilckSearch}
                        _onSearchCategory={this._onSearchCategory}
                    />

                    {toggle &&
                        <AddProduct
                            classes={classes}
                            endpoint={endpoint}
                            loadData={e => this.setState({ data: e, depositData: e })}
                            setToggle={e => this.setState({ toggle: e })}
                            setLoading={e => this.setState({ loading: e })}
                            setError={e => this.setState({ error: e })}
                            configHeader={configHeader}
                            redirect={e => this.setState({ redirect: e })}
                            category={category} />}

                    {edit.status &&
                        <EditProduct
                            classes={classes}
                            endpoint={endpoint}
                            categoryData={category}
                            loadData={e => this.setState({ data: e, depositData: e })}
                            setToggle={e => this.setState({ edit: e })}
                            setLoading={e => this.setState({ loading: e })}
                            setError={e => this.setState({ error: e })}
                            data={edit.data}
                            configHeader={configHeader}
                            redirect={e => this.setState({ redirect: e })} />
                    }
                </div>
            </React.Fragment>
        );
    }
}
export default style(Stock);