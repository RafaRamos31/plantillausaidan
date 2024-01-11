import { useContext } from "react";
import { LoginButton } from "./LoginButton";
import { NotificationIcon } from "./NotificationIcon"
import { UserIcon } from "./UserIcon"
import { UserContext } from "../contexts/UserContext";

export const Header = () => {

  const {user} = useContext(UserContext);

  return (
    <header className="w-100 d-flex justify-content-end header-profile">
      {
        user ?
        <>
          <NotificationIcon />
          <UserIcon />
        </>
        :
        <LoginButton />
      }
      
    </header>
  )
}
