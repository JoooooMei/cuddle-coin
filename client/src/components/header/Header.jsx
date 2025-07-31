import React, { useState } from 'react';
import RegisterNewUser from './loginMenu/RegisterNewUser';
import LogIn from './loginMenu/LogIn';
import UserDropDown from './UserDropDown';

const Header = ({ setNewUser, setJWT, JWT, setUser, user }) => {
  const [loginMenu, setLoginMenu] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);
  const [loginType, setLoginType] = useState(undefined);
  const [showUser, setShowUser] = useState(false);

  const handleLoginButton = () => {
    setLoginMenu(!loginMenu);
    setLoginType(undefined);
  };

  return (
    <header>
      <div className="menu-wrapper">
        <button onClick={() => setMainMenu(!mainMenu)}>Hamburger menu</button>
        {mainMenu && (
          <>
            <div className="dropdown-menu-wrapper main-menu"></div>
          </>
        )}

        {JWT ? (
          <>
            <button
              onClick={() => setShowUser(!showUser)}
              className="logged-in">
              Logged<br></br>in
            </button>
            {showUser && (
              <UserDropDown
                JWT={JWT}
                setJWT={setJWT}
                setUser={setUser}
                user={user}
              />
            )}
          </>
        ) : (
          <button onClick={handleLoginButton}>Login</button>
        )}

        {loginMenu && (
          <>
            <div className="dropdown-menu-wrapper login-menu">
              {loginType === 'createAccount' && (
                <RegisterNewUser setNewUser={setNewUser} setJWT={setJWT} />
              )}
              {loginType === 'login' && (
                <LogIn setJWT={setJWT} setLoginMenu={setLoginMenu} />
              )}

              {!loginType && (
                <div className="select-login-type">
                  <button onClick={() => setLoginType('login')}>Login</button>

                  <button onClick={() => setLoginType('createAccount')}>
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
