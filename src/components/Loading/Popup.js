import React from "react";
import styles from './popup.module.scss'
import LoadingGif from '../../assets/LoadingBK.gif'

const Loading = props => {
    return (
        <div className={styles.popup}>
            <div className={styles.box}>
                <img src={LoadingGif} alt="Loading"></img>
            </div>
        </div>
    );
};

export default Loading;