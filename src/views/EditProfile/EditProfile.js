import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { connect } from 'react-redux';
import style from './style';
import { Button, Spinner } from '../../components';

const endpoint = "http://localhost:4000/api/user/"
class EditProfile extends React.Component {

    state = {
        p_file : undefined,
        p_name : "",
        p_email : "",
        p_phone : "",
        loading : false,
        redirect : false
    }

    async UNSAFE_componentWillMount(){
        this.setState({loading:true});

        await axios.get(endpoint + decode(localStorage.getItem('token'))[0].p_id , this.props.configHeader)
            .then(async res => {

                const userdata = res.data.row[0];

                await this.setState({
                    loading:false,
                    p_name : userdata.p_name,
                    p_email : userdata.p_email,
                    p_phone : userdata.p_phone
                });
                
            });

    }
    _onSubmit = async e => {
        e.preventDefault();
        let name = this.state.p_name, email = this.state.p_email, phone = this.state.p_phone;
        
        if(name !== this.p_name.value || email !== this.p_email.value || phone !== this.p_phone.value || this.state.p_file !== undefined){
            this.setState({loading:true});
            const fd = new FormData();

            if(name !== this.p_name.value) fd.append('p_name', this.p_name.value);
            if(email !== this.p_email.value) fd.append('p_email', this.p_email.value);
            if(phone !== this.p_phone.value) fd.append('p_phone', this.p_phone.value);
            if(this.state.p_file !== undefined) fd.append('p_file', this.state.p_file);
            
            await axios.post(endpoint + decode(localStorage.getItem('token'))[0].p_id , fd, this.props.configHeader)
            .then(res => {
                if(res.data.status === 200){
                    this.setState({loading:false});
                    this.props.dispatch({type:"choose", payload : "shop"});
                }else{
                    this.setState({loading : false, redirect : true});
                }
            })
        }
    }

    render() {

        const { loading, p_email, p_name, p_phone, redirect } = this.state;
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                {loading && <Spinner />}
                {redirect && <Redirect to="logout" />}
                <div className={classes.container}>
                    <form onSubmit={this._onSubmit}>

                        <p>ข้อมูล</p>
                        <div>
                            <div>
                                <input type="text" placeholder="อีเมลล์" defaultValue={p_email} ref={e=> this.p_email = e} />
                            </div>
                            <div>
                                <input type="text" placeholder="ชื่อ" defaultValue={p_name} ref={e=> this.p_name = e} />
                            </div>
                            <div>
                                <input type="text" placeholder="เบอร์โทร" defaultValue={p_phone} ref={e=> this.p_phone = e} />
                            </div>
                        </div>

                        <p>รูปโปรไฟล์</p>
                        <div>
                            <input type="file" onChange={e=>this.setState({p_file:e.target.files[0]})} />
                        </div>
                        <div style={{textAlign : "end"}}>
                            <Button color="primary">อัพเดท</Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(style(EditProfile));