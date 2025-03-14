import "./App.css";
import { AppBar, NavigationBar } from "./widgets/index.js";
import Router from "./Router";
import { AuthPage } from "pages";
import { useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faFile,
  faPlus,
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHouse, faFile, faPlus, faMagnifyingGlass, faCircleUser);

function App() {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return (
      <div className="App" style={{ height: window.innerHeight }}>
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="App" style={{ height: window.innerHeight }}>  
      <AppBar />
      <Router />
      <NavigationBar />
    </div>
  );
}

export default App;
