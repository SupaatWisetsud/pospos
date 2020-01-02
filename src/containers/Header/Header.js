import React from 'react';
import {decode} from 'jsonwebtoken';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import style from './style';

var togle = false;
const endpoint = "http://localhost:4000";

function dropProfile(){
    togle = !togle;
    if(togle){
        const profileDrop = document.getElementById("profile-drop");
        profileDrop.style.display = "block";
    }else{
        const profileDrop = document.getElementById("profile-drop");
        profileDrop.style.display = "none";
    }
};
const Header = ({classes, token, menu, setBar, dispatch}) => {
    const {p_name, p_img, p_status, p_id} = decode(token)[0];
    
    return(
        <div className={classes.header}>
            <div className={classes.headerTitle}>
                <span>BIG SALE</span>
            </div>
            <div style={{display : "flex", justifyContent : "space-between"}}>
                <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                    <div className={classes.bar}>
                        <i className="fas fa-bars" onClick={e=>setBar(true)} />
                    </div>
                    <p style={{marginLeft:10, fontSize : 24, color : "#FFF"}}>
                    {menu === "shop" &&  ":: การขาย"}
                    {menu === "report" &&  ":: ผลยอดการขาย"}
                    {menu === "stock" && ":: สต็อกสินค้า"}
                    {menu === "salehstory" && ":: ประวัติการขาย"}
                    {menu === "personnel" &&  ":: พนักงานภายในร้าน"}
                    {menu === "editprofile" &&  ":: แก้ไขโปรไฟล์"}
                    {menu === "editpasswd" &&  ":: แก้ไขรหัสผ่าน"}
                    {menu === "category" &&  ":: หมวดหมู่"}
                    </p>
                </div>
                <div className={classes.profile} onClick={e=>dropProfile()}>
                    <img src={endpoint+p_img} alt={p_id} style={{borderColor : p_status === "a"? "#A569BD":"#58D68D"}} />
                    <span>{p_name}</span>
                    <div id="profile-drop">
                        <p>สถานะ : {p_status === "a"? "เจ้าของร้าน":"พนักงาน"}</p>
                        <ul>
                            <li onClick={e=>dispatch({type:"choose", payload : "editprofile"})} className={menu === "editprofile"? classes.selected:null}>
                                <i className="far fa-address-card"/>
                                <span> แก้ไขโปรไฟล์</span>
                            </li>
                            <li onClick={e=>dispatch({type:"choose", payload : "editpasswd"})} className={menu === "editpasswd"? classes.selected:null}>
                                <i className="fas fa-key"/>
                                <span> แก้ไขรหัสผ่าน</span>
                            </li>
                            <Link to="/logout">
                                <i className="fas fa-sign-out-alt"/>
                                <span> ออกจากระบบ</span>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(style(Header));