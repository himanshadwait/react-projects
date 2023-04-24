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

We trigger the `errorHandler` function which is a pointer passed to `onConfirm` prop
inside the ErrorModal where we have got the `Okay` button and the backdrop. There we
register clicks and trigger this using props. This the function That is ultimately gets
triggered when we click on the backdrop or when we click on the button.
Backdrop is an overlay between the modal overlay and the actual page so that we can't
interact with the page while the modal is popped open.
The `errorHandler` function simply resets the state of the `error` to null which helps
us getting rid of `ErrorModal` when it's not needed.

```
const errorHandler = () => {
    setError(null);
  };
```

`addUserHandler` function is passed as a pointer to the `onSubmit` prop of the `form`
element inside the `AddUser` component. This takes `event` as its input and prevents
default behiviour of Javascript of refreshing the page after `onSubmit` executes that
is, after the form is submitted.

```
const addUserHandler = (event) => {
    event.preventDefault();

```

for validation we want to make sure that all the code below this comment only
executes when we have valid inputs, that is, when we don't get empty input
fields and the age is also greater than one.
For starters we just return when we have an empty input and invalid age
and cancel the further execution of the function. We would want to
continue doing that but we would also want to show some error message to
the user and therefore we need a way of dynamically showing and hiding
our ErrorModal. We need to update our UI conditionally. We need to manage some
error state, ` const [error, setError] = useState()` so that we can set it to
"we have an error", in which case we want to render the modal and to "we got no error",
in which case we render nothing.

```
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
```

After return the code below doesn't get executed.
We force a conversion of `enteredAge` to a `number` using `+`.
Anything that's entered into an `input` is always retrieved as a `string`.

`console.log(enteredUsername, enteredAge);`
We don't just want to log the data, but we want to create a new user object
with that data, and we add that to an array of users object which is then output
in `UsersList` component and we do this by "Lifting the state up". We need to
manage our list of users in a place, where we can get both access to the `AddUser`
component and get notified when that Add User button gets clicked as well as where
we got access to the `UsersList` component to feed our users array into it.` App` has
access to both these components. so instead of console logging we send this data to
App by adding
`props.onAddUser(enteredUsername, enteredAge);`

`onAddUser` is executed as function here because we get a function as a value on the
`onAddUSer` prop in `App`. At this stage, the app should work but with a warning in the
console that `Each child in a list should have a unique "key" prop` and we are going to
fix this next in the `UsersList` component.

After clicking on `Add User` button, we want to clear the input fields using state
management and it is done by

```
setEnteredUsername("");
setEnteredAge("");
```

Setting the state to empty strings alone does not clear the inputs
unless we reflect our current state in the input. To feed the current state
of `enteredUsername` and `enteredAge` back into the inputs by using `value` props.

The complete `addUserHandler` function is:

```
 const addUserHandler = (event) => {
    event.preventDefault();

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

    props.onAddUser(enteredUsername, enteredAge);

    setEnteredUsername("");
    setEnteredAge("");

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

```

`UsersList` : This component receives the data from `App` component.
In the `UsersList` component we rely on props to get our actual array of users
as data. `props.users` holds an array of user data. We can then use `map()`
method to map that array of users to an array of JSX elements. `map()` executes
a function on every item on users array. `users` is an array of `user` objects
where every object has a name property and age property.

```
const UsersList = (props) => {

  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
```

For the moment `users` is `undefined` and not an `array`, which is
a value type in javaScript and this value type doesn't have map method
This is because in the place where we use the component `UsersList`, we
don't set `users` prop. We're extracting `users` from props, so it is
expected to get that users data as an array in the end on the `users`
prop on our UsersList component. So when this component is used as a
regular HTML component in App, `users` prop needs to be set or we need
include a check in this file where it is checked whether `users` is
undefined and we don't even try to map it.

We have got only one list being rendered here in this UsersList, it's the
item that we repeat and it's the item that should have a key prop.

`<li key={user.id}>{user.name} ({user.age} years old.)</li>`

The complete return code of `UsersList` :

```
const UsersList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old.)
          </li>
        ))}
      </ul>
    </Card>
  );
};
```

`Card`:
The css class we're applying to the div with the help of `className`
should reflect both the card class as well as any potentially
incoming classes. Any class that we add in the `Card` component while using
it inside any other component, should in the end be applied together with
the card class {styles.card} to the div which is rendered by the card. So
We want to apply two css classes, one coming from the Card.module.css and
one coming from outside through the props.
We can use template literals to do this.className prop is being
used to inject a class coming from outsid
Inside the div we want to output the content which the card component
is wrapped around and this is done by `props.children`

```
const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};
```

### Limitations of JSX

We can't return more than one "root" JSX element (We also can't store more than
one "root" JSX element in a variable).
The workaround is to wrap all the JSX code in a `<div>` or some other custom
component. This problem can be solved simply by wrapping the adjacent element
with a `<div>`. This way we only have one thing that we return. Instead of using
a `<div>` we could use a native JavaScript array and all the adjacent elements
inside are separated by commasbut it has a gotcha. Whenever we're working with an
array of JSX elements, React wants a "key" on every element.

```
return (
    [
      error && (
        <ErrorModal
          key="error-modal"
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      ),
      <Card key="add-user-card" className={styles.input}>
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
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    ]
  );
};
```

However, with the wrapping `<div>` or generally any wrapping element, there's
a new problem. **We can end up with `<div>` soup**. We can end up with a real
DOM that's being rendered where we have many nested React components and all
those components for various reasons need wrapping `<div>`s or other wrapping
components and we have all these unnecessary `<div>`s being rendered in the
real DOM even though they're only there because of this requirement or this
limitation of JSX. In bigger apps, we can easily end up with **tons of
unnecessary `<div>`s** or other elements which add **no semantic meaning or
structure** to the page but **are only there because of React's/JSX' requirement**.
Rendering unnecessary elements generally is never a good idea in programming hence
this wrapping `<div>` approach is okay but not ideal. A dirty little workaround is
creating a helper wrapper component.

We can create a `Wrapper` component which is just an empty component and it only returns
`props.children`. This is enough to fulfill the requirement JSX has. We can use this as
a Wrapper.

```
const Wrapper = (props) => {
    return props.children;
    //Children prop holds all the content we're passing between the opening and closing tag
    //of our custom component.
}
```

The `AddUser` return code looks now like:

```
return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
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
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};
```

This Wrapper component is actually not a component that we need to build on
our own instead it comes with React. There it's the `fragment` component which
can be accessed by `React.Fragment` or we can just `import Fragment from React`
The following will always work and this is same as our wrapper component.:

```
return (
  <React.Fragment>
    <h2>Hi There!</h2>
    <p>This always work :-</p>
  <React.Fragement>
);
```

This can be used in some cases:

```
return (
  <>
    <h2>Hi There!</h2>
    <p>This does work</p>
  </>
);
```

We use this built-in wrapper in the `App` component.

```
return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </React.Fragment>
  );
```

Fragments allow us to write cleaner code, to end up with less unnecessary
HTML elements.

### React Portals

Let's say we have the following code:

```
return (
  <React.Fragment>
    <MyModal />
    <MyInputForm />
  <React.Fragment>
)
```

Which in `RealDOM` looks like this:

```
<section>
    <h2> Some other content</h2>
    <div class="my-modal">
      <h2>A Modal Title!</h2>
    </div>
    <form>
      <label>Username</label>
      <input type="text" />
    </form>
</section>
```

Semantically and from a "clean HTML structure" perspective, having this
nested modal isn't ideal. It is an **overlay to the entire page** after all,
so logically it's above everything else. This is similar for side-drawers,
dialogues and for all kinds of overlays or any related components.

It is like styling a `<div>` like a `<button>` and adding an event listener to it:
it'll work, but it's not a good practice.

```
<div onClick={clickHandler}>ClickMe, I am a bad button!</div>
```

We can use the React portals to get rid of the problem of overlay content which
shouldn't be deeply nested. The RealDOM will then look like this:

```
<div class="my-modal">
    <h2>A Modal Title!</h2>
</div>
<section>
    <h2> Some other content</h2>
    <form>
      <label>Username</label>
      <input type="text" />
    </form>
</section>

```

Portals need two things:

1. You need a place you want to port the components to
2. You need to let the component know that it should have a
   portal to that place.
   The place can be the index.html file above the main `root` of the app:

```
<body>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <script src="../src/index.js" type="text/JSX"></script>
</body>
```

React is the library that has all the React features, state management, and so
on, baked in and React DOM uses that React to bring that logic and these features
into the web browser. React itself doesn't care wheter you run it in an
environment that has a DOM or if you would use it to build a native app.
React DOM is kind of the adapter for React to the browser.

`ReactDOM.createPortal()` takes two arguments. The first one is the React node that should
be rendered (it wants JSX). Second argument is a pointer to that container in the real
DOM where the elements should be rendered in.

```
 {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
```

There was an element selected like this in the index.js where we also
rendered the root component with the render method into a place
selected by with getElementById. Now we're not rendering an element
there but instead inside of an existing application, which is
already being rendered by the React, we portal, we move the HTML content
that is about to be rendered into a different place.

### React References "refs":

In their most basic form, refs allow us to get access to other DOM elements and
work with them.
In `AddUser` component:

```
  setEnteredUsername("");
    // We use the state to reset the inputs
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
```

With every keystroke, we update the value we get by the user and we store in our state
and we feed that state back to the <input>. Then we use the state to reset the inputs.
But updating the state with every keystroke when we only need it when we submit the form
sounds a bit redundent.
With refs we can set up a connection between a HTML element that is being rendered in the
end and our other JavaScript code. We create a ref with use of another react hook, we use
the useRef hook. Like other react hooks it is used inside functional component. It takes a
value we want to initialize it to. It returns a value which allows us to work with that ref
later, work with that element to which we're going to connect it. `nameInputRef` connect this
ref with the first input which allows us to enter a username. `ageInputRef` connect the
second ref to the second input which allows us to enter the age.
We can let React know that we want to connect a ref to a HTMl element by going to that
element and adding a special built-in prop named ref. This ref props connects the `nameInputRef`
to the input. This ref returned by the `useRef` hook
is always an object and always has a `current` prop and this prop holds the actual value
that ref is connected with and hence it's actually the `<input>` which is being stored in as
a value the `current` prop. The current prop stores the actual DOM node, which could now
be manipulated and be done all kinds of things with.
In `nameInputRef.current.value` current refers to the value stored and the value stored is the
`<input>` element and every `<input>` element has a `value` property in JavaScript.

Now `AddUser` function looks like:

```
const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    const enteredUsername = nameInputRef.current.value; //Reading the input data
    const enteredAge = ageInputRef.current.value;
    event.preventDefault();

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

    props.onAddUser(enteredUsername, enteredAge);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};
```

With this we are able to get our user inputs but we've lost our resetting logic. To bring
it back we either can switch back to our state based solution or we can do something
which we should rarely do but which, in the context of a input field value is okay. We can
manipulate the DOM without react. We typically shouldn't do that but if we just want to reset
the value entered by the user, it is something that we can consider doing.

```

    props.onAddUser(enteredUsername, enteredAge);
    // To reset the input after submission, we manipulate the DOM.
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

```

This should be rarely done. Rarely we should use Refs to manipulate the DOM.
If you just want to read a value, Refs are probably better. But in the above
case Refs offer lesser code but there's an edge case of manipulating the DOM.
State is definitely cleaner but it is a bit of more code.

This approach of using Refs to interact with DOM elements, specifically with
`<input>` elements also has a special name which is **uncontrolled components**
because we're not controlling the state of the input elements with react. When we use
Refs, we have uncontrolled input components, the approach where we managed our state
and we updated that state on every keystroke and we fed that state back into input
with the value prop, was **controlled approach**. Those input fields were
**Controlled Components** because their internal state was controlled by React.
