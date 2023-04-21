import React from "react";

import styles from "./Card.module.css";
const Card = (props) => {
  // The css class we're applying to the div with the help of className
  // should reflect both the card class as well as any potentially
  // incoming classes. Any class that we add in the card component while using
  // it inside any other component, should in the end be applied together with
  // the card class {styles.card} to the div which is rendered by the card. So
  // We want to apply two css classes, one coming from the Card.module.css and
  // one coming from outside through the props.
  // We can use template literals to do this. className prop is being
  // used to inject a class coming from outside.

  // Inside the div we want to output the content which the card component
  // is wrapped around.
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
