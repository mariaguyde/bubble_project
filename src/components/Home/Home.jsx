import { NavLink } from "react-router-dom"
import style from "./Home.module.css"
import baoImage from "../../assets/img/bao.png"

export default function Home() {
  return (
    <div className={style["home"]}>
        <NavLink to="/menu" className={style["link"]}>
            <div className={style["home-logo"]}>
                <img src={baoImage} alt="image Bao" />
            </div>
            <div className={style["home__text"]}>
                Appuyez pour <br/> commander
            </div>
        </NavLink>
    </div>
  )
}
