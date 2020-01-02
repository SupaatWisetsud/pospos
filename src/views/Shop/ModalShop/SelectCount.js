import React from 'react';
import {Button, Modal} from '../../../components';

export default ({classes, isOpen, onDismiss, dispatch, data, onSetDiscount}) => {

    const [number, setNumber] = React.useState(data.count.toString());

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

    const _onSubmit = () => {
        if(number === "0"){
            dispatch({type:"deleteProduct", payload : data.id});
            onSetDiscount({status:false,total:0});
        }else{
            dispatch({type:"selectCount", payload : {id : data.id, count : number}});
        }
        onDismiss(); 
        setNumber("0");
    }

    return (
        <Modal isOpen={isOpen}>
            <div className={classes.titleModal}>
                <h2>จำนวนสินค้า</h2>
                <Button onClick={e=>{onDismiss(); setNumber("0")}} color="danger">
                    <i className="fas fa-times"/>
                </Button>
            </div>
            <div className={classes.displayModal}>
                <h2>
                    {number}
                </h2>
            </div>
            <div className={classes.discountNumber}>
                <div onClick={e=>onSetNumber("7")}>7</div>
                <div onClick={e=>onSetNumber("8")}>8</div>
                <div onClick={e=>onSetNumber("9")}>9</div>
                <div onClick={e=>onSetNumber("4")}>4</div>
                <div onClick={e=>onSetNumber("5")}>5</div>
                <div onClick={e=>onSetNumber("6")}>6</div>
                <div onClick={e=>onSetNumber("1")}>1</div>
                <div onClick={e=>onSetNumber("2")}>2</div>
                <div onClick={e=>onSetNumber("3")}>3</div>
                <div onClick={e=>setNumber("0")}>C</div>
                <div onClick={e=>onSetNumber("0")}>0</div>
                <div onClick={onDelete}>ลบ</div>
            </div>
            <div className={classes.btnModal} onClick={_onSubmit}>
                <Button color="primary" style={{width:"100%",padding : 10}}>
                    ตกลง
                </Button>
            </div>
        </Modal>
    );
}