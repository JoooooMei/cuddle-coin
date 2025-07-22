import React from 'react';

const AllUsers = ({ allUsers }) => {
  return (
    <div>
      <ul>
        {allUsers &&
          allUsers.map((user) => <li key={user._id}>{user.userName}</li>)}
      </ul>
    </div>
  );
};

export default AllUsers;
