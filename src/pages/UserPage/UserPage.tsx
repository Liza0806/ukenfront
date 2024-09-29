import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsersByTelegramId } from "../../redux/api/usersApi";

const UserPage: React.FC = () => {

    const { id } = useParams<string>();
    const telegramId = Number(id)
    useEffect(() => {
        if (telegramId) {
          getUsersByTelegramId(telegramId)
          .then(()=>console.log('getUser in UserPage'))
            // .then((event) => setEvent(event))
            // .catch((error) => console.error(error));
        }
      }, [telegramId]);
    return <div>USSSSSEEEEEEEEEERRRRRRRRRRRRRR</div>;
  };
  
  export default UserPage;
  