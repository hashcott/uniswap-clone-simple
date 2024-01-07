import React from "react";

import styles from "../page.module.css";

export const Card = (props) => {
  return (
    <div className={styles.card}>
      <h5>{props.name}</h5>
      <input className={styles.inputNumber} type="number" placeholder="0" />
    </div>
  );
};
