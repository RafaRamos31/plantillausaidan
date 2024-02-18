import { useContext } from "react";
import { LoginButton } from "./LoginButton";
import { NotificationIcon } from "./NotificationIcon"
import { UserIcon } from "./UserIcon"
import { UserContext } from "../contexts/UserContext";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = ({breadcrumbs}) => {

  const {user} = useContext(UserContext);

  return (
    <header className="w-100 d-flex justify-content-between header-profile">
      {
        user ?
        <Breadcrumbs className="my-auto mx-3">
          {
            breadcrumbs && breadcrumbs.map((link) => (
              <Link key={link.nombre} to={link.link} style={{color: 'black', textDecoration: 'none', fontStyle: 'italic'}}>
                {link.nombre}
              </Link>
            ))
          }
        </Breadcrumbs>
        :
        <div></div>
      }
      <>
      {
        user ?
        <div className="d-flex">
          <NotificationIcon />
          <UserIcon />
        </div>
        :
        <LoginButton />
      }
      </>
    </header>
  )
}
