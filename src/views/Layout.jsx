import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import useTitle from "../hooks/useTitle";
import { UserContext } from "../contexts/UserContext";

export const Layout = ({pagina, SiteNavBar, children}) => {
  useTitle(pagina);

  const {user} = useContext(UserContext);

  return (
    <>
      <div className="grid-container">
        <div className='px-0 nav-column'>
          {
            user ?
            <SiteNavBar />
            :
            <div className="w-100 h-100" style={{backgroundColor: 'var(--main-green)'}}></div>
          }
        </div>
        <div className='px-0 content-column'>
          <Header/>
          <main className="content">
            {children}
          </main>
          <Footer className='footer'/>
        </div>
      </div>
    </>
  );
}
