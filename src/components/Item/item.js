import React from "react";
import styles from './popup.module.scss'

const Item = props => {
    return (
        <div className={styles.popup}>
            <div className={styles.box}>
                {props.content}
            </div>
        </div>
    );
};

export default Item;