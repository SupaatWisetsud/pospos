import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import style from './style';
import { Alert, Spinner, Button } from '../../components';
import AddCategory from './AddCategory';

class Category extends React.Component {

    state = {
        error: { status: false, message: "" },
        loading: false,
        redirect: false,
        addCategory: false,
        data: []
    }

    async UNSAFE_componentWillMount() {
        this.setState({loading : true});
        await axios.get("http://localhost:4000/api/category", this.props.configHeader)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ loading : false, data: res.data.row });
                } else this.setState({ redirect: true });
            })
            .catch(err => null)
    }

    _onToggle = e => {
        this.setState(oldState => ({ addCategory: !oldState.addCategory }));
    }

    _onDelectCategory = async id => {
        this.setState({loading : true});
        await axios.delete("http://localhost:4000/api/category", { headers : this.props.configHeader.headers , data : {id}})
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ loading : false, data: res.data.row });
                } else this.setState({ redirect: true });
            })
            .catch(err => null)
    }

    render() {
        const { classes, configHeader, dispatch } = this.props;
        const { error, loading, redirect, addCategory, data } = this.state;
        return (
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {error.status &&
                    <Alert isOpen={error.status} color="danger" toggle={e => this.setState({ error: { message: '', status: false } })}>
                        {error.message}
                    </Alert>}
                <div className={classes.container}>

                    <div className={classes.heading} >
                        <Button color={addCategory ? "danger" : "primary"} onClick={this._onToggle} >
                            {addCategory ? "-" : "+"}
                        </Button>
                        {
                            addCategory &&
                            <AddCategory
                                classes={classes}
                                Button={Button}
                                configHeader={configHeader}
                                setLoading={e => this.setState({ loading: e })}
                                setRedirect={e => this.setState({ redirect: e })}
                                setData={e => this.setState({ data: e })}
                            />
                        }
                    </div>

                    <div className={classes.listcategory}>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>ชื่อประเภท</th>
                                    <th>ลบประเภท</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(n => (
                                        <tr key={n.c_id}>
                                            <td>{n.c_id}</td>
                                            <td>{n.c_name}</td>
                                            <td>
                                                <Button color="danger" onClick={e=>{
                                                    this._onDelectCategory(n.c_id);
                                                    dispatch({type:"deleteAll", payload : []})
                                                }}>
                                                    ลบ
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(style(Category));