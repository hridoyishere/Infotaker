import { useState } from "react";
import AppCart from "./Components/File/AppCart";
import Navbar from "./Components/File/NavBar";
import NotePage from "./Components/File/Note";
import LoginPopUp from "./Components/File/Login";
import { getToken } from "./Api/authStorage";
import MessagePopUp from "./Components/File/MessagePopUp";
import img1 from "./assets/background.avif";
import img2 from "./assets/image2.jpg";
import img3 from "./assets/image3.jpg";
import img4 from "./assets/image4.jpg";
import { useApp } from "./Context";
import "./App.css";

const backgrounds = [img1, img2, img3, img4];

function App() {
  const [token] = useState(getToken());
  const { shownote } = useApp();

  const [bg] = useState(
    () => backgrounds[Math.floor(Math.random() * backgrounds.length)],
  );

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <MessagePopUp />
      {token ? (
        <>
          <Navbar />

          {shownote ? <NotePage /> : <AppCart />}
        </>
      ) : (
        <LoginPopUp />
      )}
    </div>
  );
}

export default App;
