import React from "react";
import Image from "next/image";

import styles from "../page.module.css";

export const Card = (props) => {
  const inputRef = React.useRef(null);
  const onChange = (e) => {
    if (/[+-]?([0-9]*[.])?[0-9]+/.test(e.target.value)) {
      let number = parseFloat(e.target.value);
      if (number > parseFloat(props.balance)) {
        number = parseFloat(props.balance);
        inputRef.current.value = number.toFixed(3);
      }
      props.setValue(number);
    }
  };
  return (
    <div className={styles.cardInput}>
      <div>
        <h5>{props.name}</h5>
        <input
          ref={inputRef}
          onChange={(e) => onChange(e)}
          className={styles.inputNumber}
          type="number"
          placeholder="0"
          disabled={props.balance ? false : true}
        />
      </div>
      <div>
        <div className={styles.coin}>
          <Image src={`/${props.coinSymbol}.png`} width={24} height={24} />
          <span>{props.coinSymbol.toUpperCase()}</span>
        </div>
        <span
          style={{ display: props.balance ? "block" : "none" }}
          className={styles.balance}
        >
          Balance: {props.balance && parseFloat(props.balance).toFixed(3)}
        </span>
      </div>
    </div>
  );
};
