import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Logout = ({dispatch}) => {

    dispatch({type:"choose", payload : "shop"});
    localStorage.removeItem('token');
    
    return(<Redirect to="/login"/>)
}

const mapStateToProps = state => ({
    menu : state.menuReducer
});

export default connect(mapStateToProps)(Logout);
