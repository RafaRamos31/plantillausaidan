import { UserContextProvider } from "./contexts/UserContext"
import { MainRouter } from "./routers/MainRouter"

export const App = () => {
  return (
    <>
      <UserContextProvider>
        <MainRouter/>
      </UserContextProvider>
    </>
  )
}
