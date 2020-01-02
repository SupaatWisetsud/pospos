import React from 'react';


export default ({classes, Button, basket, dispatch, onSetDiscount, selectCount}) => (
    <div className={classes.listOrder}>
            {basket.map(n=>(
                <div key={n.p_id} className={classes.itemsProduct}>
                    <div>
                        <p>{n.p_name}</p>
                        <Button 
                        color="danger" 
                        style={{marginTop : 10}} 
                        onClick={e=>{
                            dispatch({type:"deleteProduct", payload : n.p_id});
                            onSetDiscount({status:false,total:0})
                        }}>
                            ยกเลิก
                        </Button>
                    </div>
                    <div>
                        <p>{n.p_sale} ฿</p>
                        <p onClick={e=>selectCount({status:true,count:n.count,id:n.p_id})}>x <span style={{
                            fontSize : 18,
                            fontWeight : "bold",
                            textDecoration : "underline",
                            color : "#85929E"
                        }}>{n.count}</span></p>
                    </div>
                    <div>
                        <img 
                        src={"http://localhost:4000"+n.p_img} alt={n.p_name} 
                        width={"100%"}
                        height={"100%"}
                        style={{objectFit:"cover"}}/>
                    </div>
                </div>
            ))}
    </div>
)