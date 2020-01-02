import React from 'react';
import style from './style';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
    color : PropTypes.string,
    fontSize : PropTypes.number
}

const defaultProps = {
    color : "secondary",
    fontSize : 16
}

const Alert = ({children, classes, style ,color, fontSize, toggle, isOpen}) => (
    isOpen? 
    <div id="alert" className={classes.containerAlert}>
        <div className={classNames(classes.alert, color)} style={{fontSize, ...style}}>
            {children}
            <i onClick={toggle} className={classNames(classes.close, "fas fa-times")} />
        </div>
    </div>:
    null
)

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default style(Alert);