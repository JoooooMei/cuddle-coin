const UserDropDown = ({ setJWT, user }) => {
  const handleLogoutButton = () => {
    setJWT('');
    localStorage.removeItem('jwt-cuddle');
    window.location.reload();
  };

  return (
    <div className="dropdown-menu-wrapper login-menu">
      <div>
        <ul className="logged-in-user">
          <li>
            <span>
              <b>id: </b>
              {user._id}
            </span>
          </li>
          <li className="user-name">{user.userName}</li>
        </ul>
        <ul>
          <b>Roles</b>
          {user.role?.map((role, index) => (
            <li className="capitalize" key={index}>
              {role}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleLogoutButton()}>Logout</button>
    </div>
  );
};

export default UserDropDown;
