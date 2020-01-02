import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {decode} from 'jsonwebtoken';

import style from './style';
import route from '../../routes';

const Sidebar = ({classes, menu, dispatch, token, statusBar, setBar}) => {
    
    return (
        <div className={classes.bgSidebar} style={{display : statusBar && "flex"}} >
            <div className={classes.sidebar} >
                <i className={classNames("far fa-times-circle", classes.closeBar)} onClick={e=>setBar(false)} />
                <div>
                    <img src="/shop.png" alt="shop" width={200} height={200} />
                    <ul className={classes.navtion}>
                        {route[decode(token)[0].p_status === 'a'? 0:1].map((n,index)=> (
                            n.name === menu? 
                            <li 
                            key={index} 
                            className={classes.liAction}>
                                <i className={n.icon} /> {n.display}
                            </li>
                            :
                            <li key={index}
                            onClick={ e => dispatch({type:"choose", payload : n.name})}>
                                <i className={n.icon} /> {n.display}
                            </li>
                        ))}
                    </ul>
                </div>
        
                <div className={classes.version}>
                    <span>version 0.1</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    menu : state.menuReducer
});

export default connect(mapStateToProps)(style(Sidebar));