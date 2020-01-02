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
    fontSize : 16, 
}

const Button = ({children, classes, style, color, fontSize, onClick}) => (
    <button 
    className={classNames(classes.btn, color)} 
    style={{fontSize, ...style}}
    onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default style(Button);