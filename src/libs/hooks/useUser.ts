import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<Record<string, any>>();

  useEffect(() => {
    const authState = localStorage.getItem('_auth_state');
    if (authState) {
      setUser(JSON.parse(authState));
    }
  }, []);

  return {
    user: user,
  };
};

export default useUser;
