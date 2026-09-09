import { useState } from "react";
import AppCart from "./Components/File/AppCart";
import backgroundImage from "./assets/background.avif";
import Navbar from "./Components/File/NavBar";
import NotePage from "./Components/File/Note";
import LoginPopUp from "./Components/File/Login";
import { getToken } from "./Api/authStorage";
import MessagePopUp from "./Components/File/MessagePopUp";
import { useApp } from "./Context";

import "./App.css";

function App() {
  const [token] = useState(getToken());
  const { shownote } = useApp();


  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <MessagePopUp/>
      {token ? (
        <>
          <Navbar />

          {shownote ? <NotePage /> : <AppCart />}
        </>
      ) : (
        <LoginPopUp/>
      )}
    </div>
  );
}

export default App;