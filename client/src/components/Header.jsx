import React, { useState } from 'react';
import RegisterNewUser from './RegisterNewUser';
import LogIn from './LogIn';

const Header = ({ setNewUser }) => {
  const [loginMenu, setLoginMenu] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);
  const [loginType, setLoginType] = useState(undefined);

  const handleLoginButton = () => {
    setLoginMenu(!loginMenu);
    setLoginType(undefined);
  };

  return (
    <header>
      <div className="menu-wrapper">
        <button onClick={() => setMainMenu(!mainMenu)}>Hamburger menu</button>
        <button onClick={handleLoginButton}>Login</button>
        {loginMenu && (
          <>
            <div className="login-wrapper">
              {loginType === 'createAccount' && (
                <RegisterNewUser setNewUser={setNewUser} />
              )}
              {loginType === 'login' && <LogIn />}

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
