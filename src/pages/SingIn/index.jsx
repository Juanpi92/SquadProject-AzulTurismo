import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import style from "./singIn.module.css";
import axios from "axios";
import PreLoader from "../../components/PreLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducer/userReducer";
import RegisterDone from "./Animation/RegisterDone";

export default function SingIn({ setShow, change }) {
  const [login, setLogin] = useState(change);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(false);
  const [doneAnimation, setDoneAnimation] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useRef();
  const registerForm = useRef();
  const dispatch = useDispatch();

  // Function Register
  const handleRegister = async (e) => {
    e.preventDefault();
    let name = registerForm.current.name.value;
    let email = registerForm.current.email.value;
    let password = registerForm.current.password.value;
    let confirmPassword = registerForm.current.confirmPassword.value;
    if (password != confirmPassword) {
      setAuthError("Confirmação de senha incorreta.");
      setTimeout(() => {
        setAuthError("");
        registerForm.current.password.value = "";
        registerForm.current.confirmPassword.value = "";
      }, [3000]);
      return;
    }

    const options = {
      method: "POST",
      url: "https://tourismapi.herokuapp.com/register",
      headers: { "Content-Type": "application/json" },
      data: {
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
        idioms: "Português",
        profession: "Insira sua profissão",
        located: "Insira seu Estado",
        tel1: "Insira seu Telefone",
        tel2: "",
        about: "Conte algo sobre você",
        images: ["", "", "", ""],
        image_banner: "",
        image_profile: "",
      },
    };
    try {
      await axios.request(options);
      showLoad();
      setStatus(true);
      registerForm.current.reset();
      setTimeout(() => {
        setLogin(false);
      }, [4300]);
    } catch (error) {
      showLoad();
      setAuthError("Usuário já cadastrado");
      setTimeout(() => {
        setAuthError("");
        registerForm.current.reset();
      }, [3000]);
    }
  };

  const showLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, [4000]);
  };

  //function login
  const handleLogin = async (e) => {
    e.preventDefault();
    let email = loginForm.current.email_login.value;
    let password = loginForm.current.password_login.value;

    const options = {
      method: "POST",
      url: "https://tourismapi.herokuapp.com/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: `${email}`,
        password: `${password}`,
      },
    };
    try {
      let response = await axios.request(options);
      showLoad();
      dispatch(setUser(response.data.user));
      localStorage.setItem("azul_user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      loginForm.current.reset();
      setTimeout(() => {
        showLoad();
      }, [3000]);
      setShow(false);
    } catch (error) {
      showLoad();
      setTimeout(() => {
        setAuthError("Email ou Senha incorretos. Tente novamente.");
        setTimeout(() => {
          setAuthError("");
        }, [5000]);
      }, [3000]);
    }
  };

  const eraseInputHistory = () => {
    registerForm.current.reset();
    loginForm.current.reset();
  }

  useEffect(() => {
    setDoneAnimation(true);
    setTimeout(() => {
      setDoneAnimation(false);
      setStatus(false);
    }, [4000]);
  }, [status === true]);

  return (
    <div>
      {login ? (
        <form
          className={style.singInContainer}
          ref={registerForm}
          onSubmit={handleRegister}
        >
          <div className={style.formHeader}>
            <img src="azul.png" alt="Logo da Empresa Azul Turismo" />
            <span>Cadastre-se agora</span>
            <p>Faça seu cadastro agora e comece a explorar nossos passeios.</p>
          </div>
          <div className={style.formMain} style={{ minHeight: "250px" }}>
            {status ? (
              <RegisterDone play={doneAnimation} />
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Insira seu nome"
                  id="name"
                  required
                />
                <input
                  type="email"
                  placeholder="Insira seu email"
                  pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
                  id="email"
                  required
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Insira uma senha"
                  id="password"
                  required
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  id="confirmPassword"
                  required
                />
                <div style={{ display: "flex", justifyContent: "left", width: '100%'}}>
                  <input type="checkbox" name="showPassword" onClick={() => setShowPassword(!showPassword)} style={{ width: '20px', marginRight: 5}}/>
                  <span style={{ height: "16px", fontSize: "15px", color: "#333" }}>Mostrar campos de senha</span>
                </div>
                <span
                  style={{ height: "16px", fontSize: "14px", color: "red" }}
                >
                  {authError}
                </span>
              </>
            )}
          </div>
          {!status && (
            <div className={style.formFooter}>
              <Button text="Cadastrar" type="submit" />
              <span>ou</span>
              {/* <FacebookAuth /> */}
              {/* <GoogleAuth /> */}
              <span 
                onClick={() => {
                  setLogin(!login); 
                  setShowPassword(false);
                  eraseInputHistory()
                  }}>
                Já tem uma conta? <strong>Entrar</strong>
              </span>
            </div>
          )}
        </form>
      ) : (
        <form className={style.loginContainer} ref={loginForm}>
          <div className={style.formHeader}>
            <img src="azul.png" alt="Logo da Empresa Azul Turismo" />
            <span>Entre como usuário</span>
            <p>Entre agora e comece a explorar nossos passeios.</p>
          </div>
          <div className={style.formMain}>
            <input
              type="email"
              placeholder="Email cadastrado"
              pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
              required
              id="email_login"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha de usuário"
              id="password_login"
              required
            />
            <div style={{ display: "flex", justifyContent: "left", width: '100%'}}>
              <input type="checkbox" name="showPassword" onClick={() => setShowPassword(!showPassword)} style={{ width: '20px', marginRight: 5}}/>
              <span style={{ height: "16px", fontSize: "15px", color: "#333" }}>Mostrar senha</span>
            </div>
            <span style={{ height: "16px", fontSize: "14px", color: "red" }}>
              {authError}
            </span>
          </div>
          <div className={style.formFooter}>
            {load ? (
              <>
                <PreLoader />
              </>
            ) : (
              <>
                <Button onPress={handleLogin} text="Entrar como Usuário" />
                <span>ou</span>
                {/* <FacebookAuth /> */}
                {/* <GoogleAuth /> */}
                <span 
                onClick={() => {
                  setLogin(!login); 
                  setShowPassword(false);
                  }}>
                  Não é cadastrado? <strong>Cadastre-se</strong>
                </span>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
