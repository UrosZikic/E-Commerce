import "../styles/register.css";
import { useState, useEffect, useRef } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useProducts } from "../useProducts";
import { useCart } from "../useCart";
import { useProfiles } from "../useProfiles";

export default function Register() {
  const { dataProfile } = useProfiles();
  const { data } = useProducts();
  const { cart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);
  const [loadForm, setLoadForm] = useState(0);

  const handleForm = (load) => setLoadForm(load);

  return (
    <>
      <Nav data={data} navCart={navCart} />
      <Options handleForm={handleForm} loadForm={loadForm} />
      <Registration dataProfile={dataProfile} loadForm={loadForm} />;
      <LogIn dataProfile={dataProfile} loadForm={loadForm} />
      <Footer dataDisplay="0" />
    </>
  );
}
function Options({ handleForm, loadForm }) {
  return (
    <div className="defaultWidth">
      <button
        onClick={() => handleForm(1)}
        style={{ display: loadForm === 0 ? "block" : "none" }}
      >
        Register
      </button>
      <button
        onClick={() => handleForm(0)}
        style={{ display: loadForm === 1 ? "block" : "none" }}
      >
        Log in
      </button>
    </div>
  );
}

function LogIn({ dataProfile, loadForm }) {
  const [logInSuccess, setLogInSuccess] = useState(null);
  const [nameMsg, setNameMsg] = useState(null);
  const [passMsg, setPassMsg] = useState(null);
  const refs = {
    name: useRef(""),
    password: useRef(""),
  };

  function updateProductInfo(e, refName) {
    return (refs[refName].current = e.target.value);
  }

  function loginConfirm(e) {
    e.preventDefault();
    let confirmLogin = null;
    let logInData = null;
    return dataProfile.some((item, id) => {
      if (item.name === refs.name.current) {
        if (item.password === refs.password.current) {
          confirmLogin = true;
          logInData = item;
          setLogInSuccess(confirmLogin);

          return loginInitiate(confirmLogin, logInData);
        } else {
          setPassMsg("Wrong Password");
        }
      } else {
        setNameMsg("User with this username doesn't exist!");
      }
    });
  }

  function loginInitiate(confirmLogin, logInData) {
    const retrieveProfileData = logInData;
    if (confirmLogin) {
      setNameMsg("");
      setPassMsg("");
      const profileData = JSON.stringify(retrieveProfileData);
      localStorage.setItem("profile", profileData);
      // const userProfile = JSON.parse(localStorage.getItem("profile"));
      window.location.href = `/pages/Profile`;
    }
  }
  return (
    <div style={{ display: loadForm === 0 ? "block" : "none" }}>
      <form
        action=""
        className="defaultFlex flexColumn defaultWidth registerForm"
      >
        <label htmlFor="name">username</label>
        <input
          type="text"
          id="name"
          onChange={(e) => updateProductInfo(e, "name")}
        />
        <p>{nameMsg}</p>
        <label htmlFor="pass">password</label>
        <input
          type="text"
          id="pass"
          onChange={(e) => updateProductInfo(e, "password")}
        />
        <p>{passMsg}</p>
        <button onClick={loginConfirm}>Log in</button>
      </form>
    </div>
  );
}

function Registration({ dataProfile, loadForm }) {
  const [userMessage, setUserMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [rePass, setRePass] = useState(null);
  const refs = {
    name: useRef(""),
    password: useRef(""),
    rePass: useRef(""),
  };
  const passwordRequirements = {
    numbers: "0123456789".split(""),
    signs: '!@#$%^&*()_+?/.,<>:;|"{}-=`~'.split(""),
  };

  function updateProductInfo(e, refName) {
    return (refs[refName].current = e.target.value);
  }

  function register(e) {
    e.preventDefault();

    // validate name

    (function validateRegistration() {
      validateName();
      function validateName() {
        let validate = false;
        if (refs.name.current.length < 4)
          return setUserMessage("Username must have at least 4 characters");
        else {
          validate = true;
          setUserMessage(null);
        }

        dataProfile.some((item) => {
          if (item && item.name === refs.name.current) {
            validate = false;
            setUserMessage("Username taken!");
            return true; // Stop iterating
          }
          validate = true;
          setUserMessage(null);
          return false;
        });
        return validate && validatePassword();
      }
      function validatePassword() {
        let validate = false;
        // validate password
        if (refs.password.current.length >= 8) {
          if (
            refs.password.current
              .split("")
              .some((item) =>
                passwordRequirements.numbers.includes(item.trim())
              )
          ) {
            if (
              refs.password.current
                .split("")
                .some((item) =>
                  passwordRequirements.signs.includes(item.trim())
                )
            ) {
              if (/[a-zA-Z]/.test(refs.password.current)) {
                setPasswordMessage("");
                validate = true;
              } else {
                validate = false;
                setPasswordMessage("Password must contain at least one letter");
              }
            } else
              setPasswordMessage("Password must contain at least one sign");
          } else
            setPasswordMessage("Password must contain at least one number");
        } else setPasswordMessage("Password must have at least 8 characters!");
        // validate repeat password
        if (refs.rePass.current === refs.password.current) {
          validate = true;
          setRePass("");
          validate && confirmRegistration();
        } else {
          setRePass("Passwords don't match!");
        }
      }
    })();

    function confirmRegistration() {
      return (window.location.href = `http://localhost:80/register.php?name=${refs.name.current}&pass=${refs.password.current}`);
    }
  }
  return (
    <div style={{ display: loadForm === 1 ? "block" : "none" }}>
      <form
        action=""
        method=""
        className="defaultFlex flexColumn defaultWidth registerForm"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="name"
          id="username"
          onChange={(e) => updateProductInfo(e, "name")}
        />
        <p>{userMessage}</p>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => updateProductInfo(e, "password")}
        />
        <p>{passwordMessage}</p>
        <label htmlFor="repass">Repeat password</label>
        <input
          type="text"
          name="rePass"
          id="repass"
          onChange={(e) => updateProductInfo(e, "rePass")}
        />
        <p>{rePass}</p>
        <button onClick={register}>Register</button>
      </form>
    </div>
  );
}
