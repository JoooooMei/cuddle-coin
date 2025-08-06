import React, { useState } from 'react';
import RegisterNewUser from './loginMenu/RegisterNewUser';
import LogIn from './loginMenu/LogIn';
import UserDropDown from './UserDropDown';

const Header = ({ setNewUser, setJWT, JWT, setUser, user, setMainMenu }) => {
  const [loginMenu, setLoginMenu] = useState(false);

  const [loginType, setLoginType] = useState(undefined);
  const [showUser, setShowUser] = useState(false);

  const handleLoginButton = () => {
    setLoginMenu(!loginMenu);
    setLoginType(undefined);
  };

  return (
    <header>
      <div className="menu-wrapper">
        <ul className="nav-menu">
          <li>
            <button
              onClick={() => {
                setMainMenu('home');
              }}
              className="menu-item">
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMainMenu('transaction');
              }}
              className="menu-item">
              Make transaction
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMainMenu('mine');
              }}
              className="menu-item">
              Mine
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMainMenu('admin');
              }}
              className="menu-item">
              Admin
            </button>
          </li>
        </ul>

        {JWT ? (
          <>
            <button
              onClick={() => setShowUser(!showUser)}
              className="logged-in">
              Logged<br></br>in
            </button>
            {showUser && <UserDropDown setJWT={setJWT} user={user} />}
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
