import React from 'react';
import axios from 'axios';
import {Button, Modal} from '../../../components';

export default props => {
    const {
        classes, 
        loadData, 
        isOpen, 
        onDismiss, 
        basket, 
        dispatch, 
        total, 
        defaultTotal,
        discount,
        endpoint, 
        setBill, 
        onSetError,
        onSetDiscount, 
        configHeader, 
        redirect,
        discountType} = props;
        
    const [number, setNumber] = React.useState("0");

    const onSetNumber = num => {
        setNumber(n=>{
            if(n==="0"){return num}
            else{return n+num}
        })
    }
    const onDelete = () => {
        setNumber(n=>n.slice(0, n.length - 1));
        if(number.length === 1){
            setNumber("0");
        }
    }
    const payment = async () => {

        if(number >= total){

            const data = {basket, total, discount, discountType, defaultTotal};
            
            await axios.post(endpoint+"/payment", data, configHeader)
            await axios.get(endpoint+"/product", configHeader)
            .then(res=>{
                if(res.data.status === 200){
                    setBill(number, total);
                    loadData(res.data.row);
                    dispatch({type:"deleteAll", payload : []});
                    onSetDiscount({status:false, total:0});
                    onDismiss(); 
                    setNumber("0");
                }else{
                    loadData([]);
                    onDismiss(); 
                    setNumber("0");
                    redirect(true)
                }
            })
        }else{
            onSetError({status:true, message : "กรอกเงินไม่ครบ!"})
        }
    }

    return (
        <Modal isOpen={isOpen}>
            <div className={classes.titleModal}>
                <h2>ชำระเงิน</h2>
                <Button onClick={e=>{onDismiss(); setNumber("0")}} color="danger">
                    <i className="fas fa-times"/>
                </Button>
            </div>
            <div className={classes.displayModal}>
                <h2>{number}</h2>
            </div>
            <div className={classes.paymentNumber}>
                <div onClick={e=>onSetNumber("7")}>7</div>
                <div onClick={e=>onSetNumber("8")}>8</div>
                <div onClick={e=>onSetNumber("9")}>9</div>
                <div onClick={e=>setNumber("1000")}>1000</div>
                <div onClick={e=>onSetNumber("4")}>4</div>
                <div onClick={e=>onSetNumber("5")}>5</div>
                <div onClick={e=>onSetNumber("6")}>6</div>
                <div onClick={e=>setNumber("500")}>500</div>
                <div onClick={e=>onSetNumber("1")}>1</div>
                <div onClick={e=>onSetNumber("2")}>2</div>
                <div onClick={e=>onSetNumber("3")}>3</div>
                <div onClick={e=>setNumber("100")}>100</div>
                <div onClick={e=>setNumber("0")}>C</div>
                <div onClick={e=>onSetNumber("0")}>0</div>
                <div onClick={onDelete}>ลบ</div>
                <div onClick={e=>setNumber(total.toString())}>ชำระเต็ม</div>
            </div>
            <div className={classes.btnModal}>
                <Button color="primary" style={{width:"100%",padding : 10}} onClick={payment}>
                    ตกลง
                </Button>
            </div>
        </Modal>
    );
}