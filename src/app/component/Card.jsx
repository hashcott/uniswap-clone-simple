import React from "react";
import Image from "next/image";

import styles from "../page.module.css";

export const Card = (props) => {
  const floor = (num) => {
    // 0.9876 * 1000 = 987.6
    // Math.floor(987.6) = 987
    // 987 / 1000 = 0.987
    return Math.floor(num * 1000) / 1000;
  };

  const change = (e) => {
    // only input must have integer or float type
    const re = /^-?\d+\.?\d*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      props.onChange(e.target.value);
    }
  };
  return (
    <div className={styles.card}>
      <h5>{props.name}</h5>
      <input
        disabled={props.disabled}
        className={styles.inputNumber}
        value={props.value}
        onChange={change}
        type="number"
        min={0}
        placeholder="0"
      />
      <button className={styles.buttonCoin}>
        <Image
          style={{ borderRadius: "100%" }}
          width={24}
          height={24}
          src={`/${props.coin}.png`}
        />
        <span>{props.coin.toUpperCase()}</span>
        <Image width={12} height={12} src="/arrow-down.svg" />
      </button>
      <span
        style={{
          display: props.balance ? "inline-block" : "none",
          fontSize: "0.8rem",
          color: "rgb(155, 155, 155)",
          width: "100%",
          textAlign: "right",
        }}
      >
        Balance: {+props.balance >= 0 && floor(+props.balance)}
      </span>
    </div>
  );
};
