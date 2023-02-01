import style from "./Home.module.css"
import baoImage from "../../assets/img/bao.png"
import { useNavigate } from "react-router-dom"
import { useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const homePage = useRef();

  const navigateToMenu = () => {
    homePage.current.classList.add(style["home--hidden"]);
    setTimeout(() => navigate("/menu"), 150);
  }

  return (
    <div ref={homePage} onClick={navigateToMenu} className={style["home"]}>
      <div className={style["home-logo"]}>
        <img src={baoImage} alt="image Bao" />
      </div>
      <div className={style["home__text"]}>
        Appuyez pour <br /> commander
      </div>
    </div>
  )
}
