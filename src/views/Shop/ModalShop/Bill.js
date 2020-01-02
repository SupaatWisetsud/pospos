import React from 'react';
import ReactToPrint  from 'react-to-print';

import ComponentToPrint from './ComponentToPrint';

import {Button, Modal} from '../../../components';


class Bill extends React.Component {
    
    render(){
        
        const {isOpen, onDismiss, total, configHeader, redirect, classes} = this.props;
        return(
            <Modal isOpen={isOpen}>
                <div style={{position : "relative", padding : "10px 40px", textAlign : "center"}}>
                    <Button onClick={onDismiss} color="danger" style={{
                        position : "absolute",
                        top : 0,
                        right : 0
                    }}>
                        <i className="fas fa-times"/>
                    </Button>
                    <i className="far fa-check-circle" style={{fontSize : 180, color : "#58D68D"}}/>
                    <br/>
                    <h2 style={{margin : 10}}>ถอน {total} บาท</h2>
                    
    
                    <div onClick={onDismiss}>
                        <ReactToPrint
                            trigger={() => (
                                <Button color="success" style={{fontSize : 22}}>
                                    <i className="fas fa-print"/>
                                    <span> พิมใบเสร็จ</span>
                                </Button>
                            )}
                        content={() => this.componentRef}/>
                    </div>

                    <div style={{ display: 'none' }}>
                        <ComponentToPrint ref={el => (this.componentRef = el)} 
                        configHeader={configHeader}
                        redirect={redirect}
                        classes={classes}/>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Bill;