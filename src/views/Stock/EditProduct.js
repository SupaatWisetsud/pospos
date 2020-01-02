import React from 'react';
import axios from 'axios';
import {Button} from '../../components';

export default ({classes, setToggle, endpoint, loadData, setLoading, categoryData, data, configHeader, redirect}) => {

    const {p_id, p_name, p_type, p_cost, p_sale, p_alert, p_count, c_id} = data;

    const [name, set_name] = React.useState(p_name);
    const [cost, set_cost] = React.useState(p_cost);
    const [sale, set_sale] = React.useState(p_sale);
    const [category, set_category] = React.useState(c_id);
    const [type, set_type] = React.useState(p_type);
    const [count, set_count] = React.useState(p_count);
    const [alert, set_alert] = React.useState(p_alert);
    const [img, set_img] = React.useState(null);
    
    const _onSaveProduct = async e => {
        e.preventDefault();

        
        const fd = new FormData();

        fd.append('id', p_id);
        fd.append('p_name', name);
        fd.append('p_cost', cost);
        fd.append('p_sale', sale);
        fd.append('p_category', category);
        fd.append('p_count', count);
        fd.append('p_alert', alert);
        fd.append('p_type', type);
        fd.append('p_img', img);

        setLoading(true);
        await axios.put(endpoint+"/product", fd, configHeader);
        await axios.get(endpoint+"/product", configHeader)
        .then(res => {
            if(res.data.status === 200){
                loadData(res.data.row);
                setLoading(false);
                setToggle({status:false, data : {}});
            }else{
                setLoading(false);
                setToggle({status:false, data : {}});
                redirect(true);
            }
        })
        .catch(err=>null)
        
    }
    
    return(
        <div className={classes.containerAdd}>
            <div className={classes.titleAdd}>
                <p className={classes.titleComponent}>แก้ไขสินค้า</p>
                <Button onClick={e=>setToggle({status:false,data:{}})} color="danger">
                    <i className="fas fa-times"/>
                </Button>
            </div>
            <div className={classes.mainAdd}>
                <div>
                    <p>ชื่อสินค้า <span style={{color:"red"}}>*</span></p>
                    <input type="text" defaultValue={p_name} onChange={e=>set_name(e.target.value)}/>
                </div>
                <div>
                    <p>ราคาต้นทุน <span style={{color:"red"}}>*</span></p>
                    <input type="number" placeholder="0.00" defaultValue={p_cost} onChange={e=>set_cost(e.target.value)} />
                </div>
                <div>
                    <p>ราคาขาย <span style={{color:"red"}}>*</span></p>
                    <input type="number" placeholder="0.00" defaultValue={p_sale} onChange={e=>set_sale(e.target.value)} />
                </div>
                
                <div>
                    <p>หมวดหมู่</p>
                    <select onChange={e=>set_category(e.target.value)} defaultValue={parseInt(category)} >
                        {categoryData.map(n => <option value={n.c_id} key={n.c_id} >{n.c_name}</option>)}
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
                    <input type="number" placeholder="0" defaultValue={p_count} onChange={e=>set_count(e.target.value)} />
                </div>
                <div>
                    <p>หน่วย</p>
                    <select onChange={e=>set_type(e.target.value)} defaultValue={p_type} >
                        <option value="ชิ้น">ชิ้น</option>
                        <option value="แพ็ค">แพ็ค</option>
                        <option value="ชุด">ชุด</option>
                    </select>
                </div>
            </div>
            <div>
                <p>แจ้งเตือนสินค้าใกล้หมด</p>
            </div>
            <div className={classes.subAdd}>
                <div>
                    <p>{"แจ้งเตือน < น้อยกว่า"}</p>
                    <select onChange={e=>set_alert(e.target.value)} defaultValue={p_alert}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
            <div>
                <p>รูปภาพสินค้า</p>
            </div>
            <div className={classes.subAdd}>
                <input type="file" onChange={e=>set_img(e.target.files[0])} />
            </div>
            <div className={classes.subAdd}>
                <Button color="success" onClick={_onSaveProduct}>
                    บันทึก
                </Button>
            </div>
        </div>
    );
}