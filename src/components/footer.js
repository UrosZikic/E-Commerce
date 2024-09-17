import IonIcon from "@reacticons/ionicons";
import "../styles/footer.css";

export default function Footer({ navCart, dataDisplay, cartValidate }) {
  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);

  let posStyle;
  if (urlObj == "http://localhost:3000/") {
    posStyle = true;
  }

  return (
    <footer
      className={`${
        navCart === undefined ||
        navCart <= 1 ||
        (dataDisplay && dataDisplay.length <= 8)
          ? "positionAbsolute"
          : ""
      }  ${posStyle && "positionRelative"} footer`}
      style={{ bottom: cartValidate ? "0" : "unset" }}
    >
      <div className="defaultWidth defaultFlex flexJustifyBetween">
        <div style={{ color: "white" }}>
          <p style={{ margin: "0" }}>
            <img
              style={{ width: "100%", maxWidth: "10rem" }}
              src="../images/logo.webp"
              alt="company logo"
            />
          </p>
          <p>Copy right by GameProject</p>
        </div>
        <div className="defaultFlex flexJustifyAround">
          <ul
            style={{ margin: "0", fontWeight: "300", gap: "1rem" }}
            className="defaultFlex flexColumn"
          >
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Store</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
          <ul
            style={{
              color: "white",
              fontSize: "1.7rem",
              margin: "0",
              gap: "1rem",
            }}
            className="defaultFlex flexColumn"
          >
            <li>Email: gameProject@gmail.com</li>
            <li>Phone: 1234567+</li>
          </ul>
        </div>
        {/*  */}
        <div>
          <ul>
            <li>
              <a href="">
                <IonIcon name="logo-facebook" style={{ fontSize: "2.5rem" }} />
              </a>
            </li>
            {/* x */}
            <li>
              <a href="">
                <IonIcon name="logo-youtube" style={{ fontSize: "2.5rem" }} />
              </a>
            </li>
            {/* x */}
            <li>
              <a href="">
                <IonIcon name="logo-instagram" style={{ fontSize: "2.5rem" }} />
              </a>
            </li>
            <li>
              <a href="">
                <IonIcon name="logo-linkedin" style={{ fontSize: "2.5rem" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
