import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    window.location.reload();
  };

  return (
    <div className='w-full bg-green-500 px-10 py-6 flex justify-between'>
      <h1 className='font-semibold text-xl'>Expense Tracker</h1>
      <button onClick={() => logout()}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Header;
