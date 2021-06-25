import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
    return(
        <div className={styles.backdrop} onClick={props.onClose}></div>
    )
}

const ModalOverlay = (props) => {

    return(
        <div className={styles.modal}>
            <div>{props.children}</div>
        </div>
    )

}

const Modal = (props) => {
    return(
        <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.close}/>, document.getElementById("overlays"))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlays"))}
        </React.Fragment>
    )
}

export default Modal;