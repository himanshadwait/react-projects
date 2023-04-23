import React, { useState } from "react";

import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  // initial value is undefined

  const addUserHandler = (event) => {
    event.preventDefault();
    // for validation we want to make sure that all the code below this comment only
    // executes when we have valid inputs, that is, when we don't get empty input
    // fields and the age is also greater than one.

    // For now we just return when we have an empty input and invalid age
    // and cancel the further execution of the function. We would want to
    // continue doing that but we would also want to show some error message to
    // the user and therefore we need a way of dynamically showing and hiding
    // our ErrorModal. We need to update our UI conditionally. We need to manage some
    // error state, so that we can set it to "we have an error", in which case we
    // want to render the modal and to "we got no error", in which case we render nothing.
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values) !",
      });

      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0) !",
      });
      return;
    }
    // after return the code below doesn't get executed.
    // forcing a conversion of enteredAge to a number using +
    // Anything that's entered into an input is always retrieved as a string.

    // console.log(enteredUsername, enteredAge);
    // We don't just want to log the data, but we want to create a new user object
    // with that data, and we add that to an array of users object which is then output
    // in UsersList component and we do this by "Lifting the state up". We need to
    // manage our list of users in a place, where we can get both access to the AddUser
    // component and get notified when that Add User button gets clicked as well as where
    // we got access to the UsersList component to feed our users array into it. App has
    // access to both these components. so instead of console logging we send this data to
    // App by adding
    props.onAddUser(enteredUsername, enteredAge);
    // onAddUser is executed as function here because wget a function as a value on the
    // onAddUSer prop in App. At this stage, the app should work but with a warning in the
    // console that Each child in a list should have a unique "key" prop and we are going to
    // fix this next in the UsersList component.
    setEnteredUsername("");
    setEnteredAge("");
    // Setting the state to empty strings alone does not clear the inputs
    // unless we reflect our current state in the input. To feed the current state
    // of enteredUsername and enteredAge back into the inputs by using value props.
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };
  // We trigger this errorHandler function inside the ErrorModal where we have got the `Okay` button
  // and the backdrop. There we register clicks and trigger this using props. This the function 
  // That is ultimately triggered when we click on the backdrop or when we clicke on the button.
  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          // This prop helps in getting rid of the modal when it's not needed.
          title={error.title}
          message={error.message}
        />
      )}
      {/* if error contains the current state snapshot of error state then ErrorModal gets rendered */}
      {/* else nothing happens. The only way of getting rid of the modal is to reset error to 
      undefined or to null*/}
      <Card className={styles.input}>
        {/* Card is our custom component therefore it's only able to work with the props that we
    use inside this component. */}
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          {/* value prop here reflects the current state snapshot of username and age inputs. */}
          <Button type="submit">Add User</Button>
          {/* When we click this Add User Button and hence the addUserHandler in the 
        AddUser component runs we forward the enteredUsername and enteredAge to the App component
        and we do this with props as well. */}
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
