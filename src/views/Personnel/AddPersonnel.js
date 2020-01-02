import React from 'react';
import {Alert, Button} from '../../components';
import axios from 'axios';

export default ({classes, setToggle, setData, endpoint, setLoading, configHeader, redirect}) => {
    
    const [error, setError] = React.useState({status : false, message : ''});

    const [p_name, set_p_name] = React.useState('');
    const [p_password, set_p_password] = React.useState('');
    const [p_password_confrim, set_p_password_confrim] = React.useState('');
    const [p_email, set_p_email] = React.useState('');
    const [p_status, set_p_status] = React.useState('u');
    const [p_phone, set_p_phone] = React.useState('');
    const [p_img, set_p_img] = React.useState('');

    const _onAddPersonnel = async e => {
        e.preventDefault();

        if(p_name === '' || p_password === '' || p_email === '' || p_phone === '' || p_password_confrim === ''){
            setError({status:true, message : "กรุณาใส่ข้อมูลให้ครบ"});
        }else{
            
            if(p_password === p_password_confrim){
                const fd = new FormData();

                fd.append('p_name', p_name);
                fd.append('p_password', p_password);
                fd.append('p_email', p_email);
                fd.append('p_status', p_status);
                fd.append('p_phone', p_phone);
                fd.append('p_img', p_img);

                setLoading(true);
                await axios.post(endpoint+"/user", fd, configHeader);
                await axios.get(endpoint+"/user", configHeader)
                .then(res => {
                    if(res.data.status === 200){
                        setData(res.data.row);
                        setLoading(false);
                        setToggle(false);
                    }else{
                        setLoading(false);
                        redirect(true)
                    }
                })
                .catch(err=>null)
            }else{
                setError({status:true, message : "รหัสไม่ตรงกัน!"});
            }
        }
    }
    return(
        <React.Fragment>
            {error.status && 
            <Alert color="danger" isOpen={error.status} toggle={e=>setError(false)}>
                {error.message}
            </Alert>}
            <div className={classes.containerAdd}>
                <div style={{
                    backgroundColor : "#FFF",
                    padding : 10
                }}>
                    <div>
                        <p>บัญชีผู้ใช้</p>
                    </div>
                    <div>
                        <input type="email" placeholder="อีเมล" onChange={e=>set_p_email(e.target.value)}/>
                        <span style={{color:"red"}}> *</span>
                    </div>
                    <div>
                        <input type="password" placeholder="รหัสผ่าน" onChange={e=>set_p_password(e.target.value)} />
                        <span style={{color:"red"}}> *</span>
                    </div>
                    <div>
                        <input type="password" placeholder="ยืนยันรหัสผ่าน" onChange={e=>set_p_password_confrim(e.target.value)} />
                        <span style={{color:"red"}}> *</span>
                    </div>
                </div>
                <div style={{
                    backgroundColor : " #FFF",
                    padding : 10,
                    marginTop : 10
                }}>
                    <div>
                        <p>ข้อมูลส่วนตัว</p>
                    </div>
                    <div>
                        <p>ประเภทของพนักงาน</p>
                        <select onChange={e=>set_p_status(e.target.value)}>
                            <option value="u">พนักงาน</option>
                            <option value="a">เจ้าของร้าน</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="ชื่อ" onChange={e=>set_p_name(e.target.value)}/>
                        <span style={{color:"red"}}> *</span>
                    </div>
                    <div>
                        <input type="number" placeholder="เบอร์โทรศัพท์" onChange={e=>set_p_phone(e.target.value)}/>
                        <span style={{color:"red"}}> *</span>
                    </div>
                    <div>
                        <p>รูปภาพ</p>
                        <input type="file" onChange={e=>set_p_img(e.target.files[0])}/>
                    </div>
                </div>
                <div style={{
                    backgroundColor : " #FFF",
                    padding : 10,
                    marginTop : 10
                }}>
                    <Button color="primary" onClick={e=>setToggle(false)}>
                        กลับ
                    </Button>
                    <Button color="success" onClick={_onAddPersonnel}>
                        บันทึก
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}