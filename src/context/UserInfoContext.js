import { createContext } from 'react';

const UserInfoContext = createContext({
  userInfo: null,
  permission: false,
});

export default UserInfoContext;
