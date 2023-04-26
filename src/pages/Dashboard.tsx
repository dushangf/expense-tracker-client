import { useEffect, useState } from 'react';
import NewSalary from '../components/NewSalary';
import useUser from '../libs/hooks/useUser';
import { getUserDetails } from '../store/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getAllExpenses } from '../store/ExpensesSlice';

const Dashboard = () => {
  const [salaryModal, setSalaryModal] = useState(false);

  const userData = useSelector((state: RootState) => state.user.details);

  const expensesData = useSelector(
    (state: RootState) => state.expense.list.data
  ).reduce((a, c) => a + c.total, 0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExpenses({ id: userData.data?.id }));
  }, [userData]);

  return (
    <div className='p-10 flex w-full'>
      <div className='shadow-lg rounded border-2 border-green-600 h-48 relative mx-4 p-4 w-96'>
        <div className='flex justify-between w-full'>
          <h4 className='text-sm font-semibold'>Total Leftover</h4>
          <button
            onClick={() => setSalaryModal(true)}
            className='bg-green-600 font-semibold text-white text-xs rounded p-2'
          >
            Add Salary
          </button>
        </div>
        <p className='text-2xl font-semibold text-center m-6'>
          {userData.data ? userData.data.salary : 0}$
        </p>
        <button className='text-gray-500 hover:underline underline-offset-2 absolute bottom-3 right-3 text-xs'>
          View Details
        </button>
      </div>
      <div className='shadow-lg rounded border-2 border-green-600 h-48 relative mx-4 p-4 w-96'>
        <div className='flex justify-between w-full'>
          <h4 className='text-sm font-semibold'>Total Expenses</h4>
          <button className='bg-green-600 font-semibold text-white text-xs rounded p-2'>
            Add Expense
          </button>
        </div>
        <p className='text-2xl font-semibold text-center m-6'>
          {expensesData}$
        </p>
        <button className='text-gray-500 hover:underline underline-offset-2 absolute bottom-3 right-3 text-xs'>
          View Details
        </button>
      </div>
      {salaryModal && <NewSalary setSalaryModal={setSalaryModal} />}
    </div>
  );
};

export default Dashboard;
