import React from 'react';
import style from './style';

const Dashboard = ({children,classes}) => (
    <div className={classes.dashboard}>
        <div className={classes.content}>
            {children}
        </div>
    </div>
);

export default style(Dashboard);