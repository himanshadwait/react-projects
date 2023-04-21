import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  // type of the button is set from outside where we use our
  // custom Button component with a fallback in case props is
  // undefined. In case where props.type is undefined "button"
  // value will be used as a fallback type.
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
