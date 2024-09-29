import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersByTelegramId } from "../../redux/api/usersApi";
import { User } from "../../redux/types/types";

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<string>();
  const telegramId = Number(id);

  useEffect(() => {
    if (telegramId) {
      getUsersByTelegramId(telegramId)
        .then((user) => {
          console.log("getUser in UserPage", user);
          setUser(user);
        })
        .catch((error) => console.error(error));
    }
  }, [telegramId]);

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
