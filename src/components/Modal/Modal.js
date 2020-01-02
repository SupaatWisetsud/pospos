import React from 'react';
import style from './style';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';

const propTypes = {

}

const defaultProps = {
    show : false,
    onClose : e => e.preventDefault(), 
}

const Modal = ({children, classes, isOpen}) => {
    return (
        isOpen?
        <div id="modal" className={classes.containerModal}>
            <div className={classes.modal}>
                {children}
            </div>
        </div>:
        null
    );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default style(Modal);