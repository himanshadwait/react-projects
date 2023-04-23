
// Backdrop is an overlay between the modal overlay and the actual page
// so that we can't interact with the page while the modal is popped open.

import React from "react";

import Card from "./Card";
import Button from "./Button";

import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={styles.backdrop} onClick={props.onConfirm} />
      {/* This div itself is empty but this backdrop css class makes sure that
          we have a greyish, transparentish background behind the modal. */}
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
          {/* title props holds the text which should be output in the header section
              of the modal */}
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
          {/* Button to close the modal */}
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
