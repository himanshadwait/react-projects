import React from "react";

import Card from "../UI/Card";
import styles from "./UsersList.module.css";
const UsersList = (props) => {
  // In the UserList component we rely on props to get our actual array of users
  // as data. `props.users` holds an array of user data. We can then use `map()`
  // method to map that array of users to an array of JSX elements. `map()` executes
  // a function on every item on users array. `users` is an array of `user` objects
  // where every object has a name property and age property.

  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          // for the moments `users` is `undefined` and not an `array`, which is
          // a value type in javaScript and this value type doesn't have map method
          // This is because in the place where we use the component `UsersList`, we
          // don't set `users` prop. We;re extracting `users` from props, so it is
          // expected to get that users data as an array in the end on the `users`
          // prop on our UsersList component. So when this component is used as a
          // regular HTML component in App, `users` prop needs to be set or we need
          // include a check in this file where it is checked whether `users` is
          // undefined and we don't even try to map it.
            <li key={user.id}>
                {/* We have got only one list being rendered here in this UsersList, it's the
                item that we repeat and it's the item that should have a key prop */}
            {user.name} ({user.age} years old.)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
