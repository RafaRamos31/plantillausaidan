import { LoginButton } from "./LoginButton";
import { NotificationIcon } from "./NotificationIcon"
import { UserIcon } from "./UserIcon"

export const Header = () => {

  const logged = false;

  return (
    <header className="w-100 d-flex justify-content-end header-profile">
      {
        logged ?
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
