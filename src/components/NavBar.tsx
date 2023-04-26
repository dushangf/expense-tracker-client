import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaMoneyBill, FaHome } from 'react-icons/fa';

const NavBar = () => {
  const location = useLocation();

  const isDashboard = location.pathname.includes('dashboard');
  const isExpenses = location.pathname.includes('expenses');
  const isProfile = location.pathname.includes('profile');

  return (
    <div className='flex flex-col bg-green-500 h-full font-semibold w-48'>
      <li
        className={`list-none py-4 px-7 flex hover:bg-green-300 duration-200 ${
          isDashboard && 'bg-green-300'
        }`}
      >
        <Link className='flex items-center w-full' to='/dashboard'>
          <FaHome className='mr-3' />
          Dashboard
        </Link>
      </li>
      <li
        className={`list-none py-4 px-7 flex hover:bg-green-300 duration-200 ${
          isExpenses && 'bg-green-300'
        }`}
      >
        <Link className='flex items-center w-full' to='/expenses'>
          <FaMoneyBill className='mr-3' />
          Expenses
        </Link>
      </li>
      <li
        className={`list-none py-4 px-7 flex hover:bg-green-300 duration-200 ${
          isProfile && 'bg-green-300'
        }`}
      >
        <Link className='flex items-center w-full' to='/profile'>
          <FaUser className='mr-3' />
          Profile
        </Link>
      </li>
    </div>
  );
};

export default NavBar;
