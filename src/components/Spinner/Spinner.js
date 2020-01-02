import React from 'react';
import style from './style';

const Spinner = ({classes}) => (
    <div className={classes.containerSpinner} >
        <i className="fas fa-spinner"/>
    </div>
)

export default style(Spinner);