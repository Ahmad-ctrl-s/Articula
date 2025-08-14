import { useLocation } from "react-router";
import Navigation from "./sub-components/navbar";
import RegisterationBar from "../Sub-Components/Regestration Bar";

const SemanticElements = ({ children }) => {
  const location = useLocation()
  return (
    <>
      <header>
        {console.log(location.pathname.slice(1, location.pathname.length))}
        {(location.pathname.slice(1, location.pathname.length) === 'login' || location.pathname.slice(1, location.pathname.length) === 'signup') ? <RegisterationBar /> : <Navigation /> }

      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default SemanticElements;