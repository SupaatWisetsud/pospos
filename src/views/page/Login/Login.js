import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import style from '../style';
import {Button, Alert} from '../../../components';

const Login = ({classes}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);
    const [error, setError] = React.useState({ errorStatus : false, errorMessage : ''});

    const _onLogin = async (e) => {
        e.preventDefault();
        if(username.value !== '' && password.value !== ''){
            const data = {
                username : username.value,
                password : password.value
            }
            await axios.post("http://localhost:4000/api/auth", data)
            .then(res=>{
                if(res.data.result){
                    localStorage.setItem('token', res.data.token);
                    setRedirect(true);
                }else{
                    setError({
                        errorStatus : true, 
                        errorMessage : "Username or Password ของท่านไม่ถูกต้อง"
                    });
                }
            })
            .catch(err=>null);
    
            username.value = '';
            password.value = '';
        }else{
            setError({
                errorStatus : true, 
                errorMessage : "กรุณากรอก Username หรือ Password ให้ครบ!"
            });
        }
    }

    const onDismiss = () => setError(false);

    return(
        <div className={classes.login}>
            {redirect && <Redirect to='/' />}
            {localStorage.getItem('token') && <Redirect to="/" />}
            <Alert color="danger" isOpen={error.errorStatus} toggle={onDismiss}>{error.errorMessage}</Alert>
            <form onSubmit={_onLogin}>
                <div>
                    <span>Login</span>
                </div>
                <div>
                    <input type="text" placeholder="Username" ref={e => setUsername(e)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" ref={e => setPassword(e)} />
                </div>
                <div style={{textAlign : "center"}}>
                    <Button color="primary" style={{fontSize:24}}>เข้าสู่ระบบ</Button>
                </div>
            </form>
        </div>
    );
}

export default style(Login);