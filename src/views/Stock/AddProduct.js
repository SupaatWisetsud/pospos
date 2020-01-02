import React from 'react';
import axios from 'axios';
import {Button} from '../../components';

export default ({classes, setToggle, endpoint, loadData, setLoading, setError, configHeader, redirect, category}) => {
    
    const [p_name, set_p_name] = React.useState('');
    const [p_cost, set_p_cost] = React.useState(0);
    const [p_sale, set_p_sale] = React.useState(0);
    const [p_category, set_p_category] = React.useState(1);
    const [p_type, set_p_type] = React.useState('ชิ้น');
    const [p_count, set_p_count] = React.useState(0);
    const [p_alert, set_p_alert] = React.useState(5);
    const [p_barcode, set_p_barcode] = React.useState("");
    const [p_img, set_p_img] = React.useState('');

    const _onSaveProduct = async e => {
        e.preventDefault();

        if(p_name === '' || p_cost === 0 || p_sale === 0){
            setError({status:true, message:"กรุณาใส่ข้อมูลให้ครบ"})
        }else{
            const fd = new FormData();

            fd.append('p_name', p_name);
            fd.append('p_cost', p_cost);
            fd.append('p_sale', p_sale);
            fd.append('p_category', p_category);
            fd.append('p_count', p_count);
            fd.append('p_alert', p_alert);
            fd.append('p_type', p_type);
            fd.append('p_barcode', p_barcode);
            fd.append('p_img', p_img);

            setLoading(true);
            await axios.post(endpoint+"/product", fd, configHeader);
            await axios.get(endpoint+"/product", configHeader)
            .then(res => {
                if(res.data.status === 200){
                    loadData(res.data.row);
                    setLoading(false);
                    setToggle(false);
                }else{
                    setLoading(false);
                    redirect(true);
                }
            })
            .catch(err=>null)
        }
    }
    return(
        <div className={classes.containerAdd}>
            <div className={classes.titleAdd}>
                <p className={classes.titleComponent}>ส่วนจัดการ</p>
                <Button onClick={e=>setToggle(false)} color="danger">
                    <i className="fas fa-times"/>
                </Button>
            </div>
            <div className={classes.mainAdd}>
                <div>
                    <p>ชื่อสินค้า <span style={{color:"red"}}>*</span></p>
                    <input type="text" onChange={e=>set_p_name(e.target.value)}/>
                </div>
                <div>
                    <p>ราคาต้นทุน <span style={{color:"red"}}>*</span></p>
                    <input type="number" placeholder="0.00" onChange={e=>set_p_cost(e.target.value)} />
                </div>
                <div>
                    <p>ราคาขาย <span style={{color:"red"}}>*</span></p>
                    <input type="number" placeholder="0.00" onChange={e=>set_p_sale(e.target.value)} />
                </div>
                
                <div>
                    <p>หมวดหมู่</p>
                    <select onChange={e=>set_p_category(e.target.value)}>
                        {category.map(n => <option key={n.c_id} value={n.c_id}>{n.c_name}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <p>ข้อมูลเสริม ( ไม่บังคับ )</p>
            </div>
            <div className={classes.subAdd}>
                <div>
                    <p>สต็อกสินค้า</p>
                </div>
                <div>
                    <p>จำนวน</p>
                    <input type="number" placeholder="0" onChange={e=>set_p_count(e.target.value)} />
                </div>
                <div>
                    <p>หน่วย</p>
                    <select onChange={e=>set_p_type(e.target.value)}>
                        <option>ชิ้น</option>
                        <option>แพ็ค</option>
                        <option>ชุด</option>
                    </select>
                </div>
            </div>
            <div>
                <p>แจ้งเตือนสินค้าใกล้หมด</p>
            </div>
            <div className={classes.subAdd}>
                <div>
                    <p>{"แจ้งเตือน < น้อยกว่า"}</p>
                    <select onChange={e=>set_p_alert(e.target.value)}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
            <div >
                <p>Barcode</p>
            </div>
            <div className={classes.subAdd}>
                <input type="text" placeholder="barcode" onChange={e=>set_p_barcode(e.target.value)}/>
            </div>
            <div>
                <p>รูปภาพสินค้า</p>
            </div>
            <div className={classes.subAdd}>
                <input type="file" onChange={e=>set_p_img(e.target.files[0])} />
            </div>
            <div className={classes.subAdd}>
                <Button color="success" onClick={_onSaveProduct}>เพิ่มสินค้า</Button>
            </div>
        </div>
    );
}