import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Sidebar, Header, Dashboard, Footer} from '../containers';

import Shop from './Shop';
import Report from './Report';
import Stock from './Stock';
import SaleHistory from './SaleHistory';
import Personnel from './Personnel';
import EditPasswd from './EditPasswd';
import EditProfile from './EditProfile';
import Category from './Category';

const RootView = ({menu}) => {
    
    const [statusBar, setBar] = React.useState(false); 

    const token = localStorage.getItem('token') || '';
    const configHeader = {
        headers : { authorization : token }
    };

    return(
        localStorage.getItem('token')? 
        <React.Fragment>
            <Header token={token} menu={menu} setBar={setBar} />
            <Sidebar token={token} statusBar={statusBar} setBar={setBar} />
            <Dashboard>
    
                {/* content */}
                {menu === "shop" &&  <Shop configHeader={configHeader} />}
                {menu === "report" &&  <Report configHeader={configHeader} />}
                {menu === "stock" &&  <Stock configHeader={configHeader} />}
                {menu === "salehstory" &&  <SaleHistory configHeader={configHeader}/>}
                {menu === "personnel" &&  <Personnel configHeader={configHeader}/>}
                {menu === "editprofile" &&  <EditProfile configHeader={configHeader} />}
                {menu === "editpasswd" &&  <EditPasswd configHeader={configHeader}/>}
                {menu === "category" &&  <Category configHeader={configHeader}/>}
                
            </Dashboard>
            <Footer />
        </React.Fragment>
        :<Redirect to="login" />
    )
}

const mapStateToProps = state => ({
    menu : state.menuReducer
});

export default connect(mapStateToProps)(RootView);