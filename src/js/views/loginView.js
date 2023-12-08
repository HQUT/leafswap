import { Link } from "react-router-dom";
export function LoginView(props) {
    let a = "login-section login";
    let b = "login-section signup";
    return (
      <div className={props.signIn ? a : b}>
         <Link to="/" className="home-button">
        Home
      </Link>
        <form
          className="login-container"
          onSubmit={(e) => e.preventDefault()}
        >
          <ul>
            <li className={`login-li ${props.signIn ? "active" : ""}`}>
              <p onClick={() => props.login()}>Log In</p>
            </li>
            <li className={`login-li ${!props.signIn ? "active" : ""}`}>
              <p onClick={() => props.signUp()}>Sign Up</p>
            </li>
          </ul>
          <p className="label-box">EMAIL</p>
          <input
            type="email"
            className="input-box"
            onChange={(e) => props.onEmail(e.target.value)}
          />
          <p className="label-box">PASSWORD</p>
          <input
            className="input-box"
            type="password"
            onChange={(e) => props.onPassword(e.target.value)}
          />
          <p className="message-error"> {props.errorText}</p>
          <button
            className="login-button"
            hidden={props.signIn}
            onClick={(e) => props.onCreate()}
          >
            REGISTER
          </button>
          <button
            className="login-button"
            hidden={!props.signIn}
            onClick={(e) => props.onLogIn()}
          >
            LOGIN
          </button>
        </form>
      </div>
    );
  }
  