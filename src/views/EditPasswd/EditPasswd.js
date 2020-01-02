import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { decode } from 'jsonwebtoken'; 
import style from './style';

import { Button, Spinner, Alert } from '../../components';

const endpoint = "http://localhost:4000/api/user/";
class EditPasswd extends React.Component{

    state = {
        loading : false,
        error : {status : false, message : ''},
        redirect : false
    }
    _onSubmit = async e => {
        e.preventDefault();
        
        let old = this.oldPassword.value, _new = this.newPassword.value, confirm = this.confirmPassword.value;
        if(!(old === '' && _new === '' && confirm === '')){
            if(_new === confirm){
                if(_new !== old){

                    const data = {
                        p_password : _new,
                        old : old
                    }
                    this.setState({loading:true});
                    await axios.post(endpoint + decode(localStorage.getItem('token'))[0].p_id , data, this.props.configHeader)
                    .then(res=>{
                        this.setState({loading:false});
                        if(res.data.status === 200){
                            
                            if(res.data.success) this.props.dispatch({type:"choose", payload : "shop"});
                            else this.setState({error : {status : true, message : res.data.message}})
                        
                        }else this.setState({redirect : true});
                        
                    })
                    .catch(err=>null);

                }else this.setState({error:{status:true, message : "จะเปลี่ยนทำควยอะไรถ้าจะใช้รหัสเดิม.."}});
            }else this.setState({error:{status:true, message : "รหัสใหม่ของท่านไม่ตรงกัน.."}});
        }else this.setState({error:{status:true, message : "กรุณากรอกข้อมูลให้ครบ.."}});
        
        
    }
    render(){
        const { classes } = this.props;
        const { loading, redirect, error } = this.state;
        return(
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                {error.status &&
                <Alert isOpen={error.status} color="danger" toggle={e => this.setState({ error: { message: '', status: false } })}>
                    {error.message}
                </Alert>}
                <div className={classes.container}>
                    <form onSubmit={this._onSubmit}>
                        <p>รหัสเดิม</p>
                        <div>
                            <input type="password" placeholder="รหัสเดิม" ref={e=> this.oldPassword = e} />
                        </div>

                        <p>รหัสใหม่</p>
                        <div>
                            <div>
                                <input type="password" placeholder="รหัสใหม่" ref={e=> this.newPassword = e} />
                            </div>
                            <div>
                                <input type="password" placeholder="ยืนยันรหัสใหม่" ref={e=>this.confirmPassword = e} />
                            </div>
                        </div>
                        <div style={{textAlign:"end"}}>
                            <Button color="primary">อัพเดท</Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(style(EditPasswd));