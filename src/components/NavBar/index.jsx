import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./navBar.module.css";
import { IoNotifications } from "react-icons/io5";
import Modal from "../Modal";
import SingIn from "../../pages/SingIn";
import { LoggedContext } from "../../context/LoggedContext";
import BurgerMobileMenu from "./BurgerMobileMenu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delUser } from "../../reducer/userReducer";

export default function NavBar() {
  const state = useSelector((state) => state);
  const { user } = state.user;
  const { show, setShow } = useContext(LoggedContext);
  const dispatch = useDispatch();

  return (
    <>
      {show && (
        <Modal setShow={setShow} children={<SingIn setShow={setShow} />} />
      )}

      <div className={style.alignContent}>
        <div className={style.navBarContainer}>
          <div className={style.logoAlign}>
            <img
              src="azul.png"
              alt="Logo da empresa Azul Turismo"
              className={style.navBarLogo}
            />
            <span>AZUL TOUR</span>
          </div>
          <nav className={style.menuContainer}>
            <ul className={style.menuContent}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Serviços</Link>
              </li>
              <li>
                <Link to="/about">Sobre nós</Link>
              </li>
            </ul>
          </nav>
          <div className={style.userContainer}>
            <ul className={style.menuContent}>
              {user ? (
                <>
                  <li>
                    <Link to="/profile">Meus Passeios</Link>
                  </li>
                  
                  <div>
                    <Link to="/profile">
                      <IoNotifications className={style.notificationIcon} />
                    </Link>
                    <Link to="/profile">
                      <img
                        src={user.image_profile}
                        className={style.userPicture}
                      />
                    </Link>
                  </div>
                  <li
                    onClick={() => {
                      dispatch(delUser());
                      localStorage.removeItem("token");
                    }}
                  >
                    <Link to="/">Sair</Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => setShow(true)}>
                    <Link>Entrar</Link>
                  </li>
                  <div>
                    <Link to="/profile">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKTCvhbnqwyIbeN8eZAzlzb9s9d6LBnNWsw&usqp=CAU"
                        alt="Imagem de Perfil do usuário"
                        className={style.userPicture}
                      />
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
          <BurgerMobileMenu callMenu={style.menuMobile} />
        </div>
      </div>
    </>
  );
}
