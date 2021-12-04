import { motion } from "framer-motion";
import React from "react";
import LoadingGif from '../../assets/LoadingBK.gif';
import styles from './popup.module.scss';


const Loading = props => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>

            <div className={styles.popup}>
                <div className={styles.box}>
                    <img src={LoadingGif} alt="Loading"></img>
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;