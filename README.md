# react-projects

Initial React Projects while learning react on Udemy

Technically, the React import is not required in all React projects as we learned
But we are never wrong in using it.

`useState` always returns an array with exactly two elements, amd with
array destructuring we pull ot the elements retured by the `useState` hook and
we store them in two separate constants. First element of the returned array is
the current state snapshot, and every time the component re-renders, which it does
when the state is updated, the first constant will hold the latest state snapshot.
The other `const` on the other hand holds a function which we can call to change
the state and to then trigger such a re-render cycle.

`index.js`: Creates the root of the application and renders app inside it.

```
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

`App.js`: Renders `AddUser` and `UsersList` components. It also receives the data from
`AddUser` component while lifting the state up and it also forwards `usersList` as an
array to the `UsersList` component which initially is an empty array, but we have a
function `setUsersList` that allows us to change the array and then that change would
trigger the `App` component to be rerendered and hence the `UsersList` component would
be updated as well since it's part of the `App` component.

```
<AddUser onAddUser={addUserHandler} />
<UsersList users={usersList} />
```

Unless a users prop is set here, the `users` remains undefined and
renderer throws an error that `map` method cannot be used on undefined which we
use in `UsersList` component.
App is the one component that is above both AddUser and UsersList and is the
nearest to the both and therefore we lift the state management up to this App
component.
We pass a pointer to the `onAddUser` prop which is a function defined in the `App`
component which takes `userName` and `userAge` as inputs.It renders a state updating
function `setUsersList` which updates the state of the `usersList` data which we get
from `AddUser` component and then this updated data is sent to `UsersList` via
`onAddUser` prop.
When the state update depends on the previous state, we use the function
form of state updating function where we pass an anonymous function to the
state updating function which takes prevState as an argunment.
The anonymous function returns the new state snapshot which is
an array which first of all copies all elements from `prevUsersList`
with the use of a spread operator which simply pulls all elements out of
that array and adds them as new elements to the new array and then a new
element at the end is added as an object.

```
const addUserHandler = (userName, userAge) => {
     setUsersList((prevUsersList) => {
       return [...prevUsersList, { name: userName, age: userAge, id: Math.random().toString()}];
    });
};
```

`AddUser` : This component simply renders a `form` for the user to interact with. Inside the `form`
it contains a `label` and an `input` with some props. We wrap this `form` inside a `Card` which is
our custom re-usable UI component. It also returns an `ErrorModal` which is simply an overlay box
a UI element. We also set three states to control the state of `enteredUsername`, `enteredAge`,
and `error`.

```
 const [enteredUsername, setEnteredUsername] = useState("");
 const [enteredAge, setEnteredAge] = useState("");
 const [error, setError] = useState();
  // initial value is undefined
```

```
<div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          // This prop helps in getting rid of the modal when it's not needed.
          title={error.title}
          message={error.message}
        />
      )}

      {/* if error contains the current state snapshot of error state then
      ErrorModal gets rendered, else nothing happens. The only way of getting
      rid of the modal is to reset error to undefined or to null*/}

      <Card className={styles.input}>
        {/* Card is our custom component therefore it's only able to work with
        the props that we use inside this component. */}

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

```
