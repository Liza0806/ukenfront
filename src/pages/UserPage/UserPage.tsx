import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersByUserId } from "../../redux/api/usersApi";
import { User } from "../../redux/types/types";
import React from 'react';

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<string>();
  //const userId = id;

  useEffect(() => {
    // debugger
    if (id) {
      getUsersByUserId(id)
        .then((user) => {
          console.log("getUser in UserPage", user);
          setUser(user);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre> // test
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
