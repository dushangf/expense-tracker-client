import { useState, useEffect } from 'react';
import { getAllExpenses } from '../store/ExpensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '../libs/hooks/useUser';
import { AppDispatch, RootState } from '../store';
import ExpenseList from '../components/ExpenseList';
import NewExpense from '../components/NewExpense';
import { Link } from 'react-router-dom';

const Expenses = () => {
  const { user } = useUser();

  const [newExpenseModal, setNewExpenseModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const expenses = useSelector((state: RootState) => state.expense.list);

  useEffect(() => {
    dispatch(getAllExpenses({ id: user?.id, status: 'archived' }));
  }, [user, dispatch]);

  return (
    <div className='w-full'>
      <div className='border-b-2 border-green-600 w-full py-7 px-10 flex justify-between items-center'>
        <h2 className='font-semibold'>ARCHIVED EXPENSES</h2>
        <div className='flex'>
          <Link
            to='/expenses'
            className='bg-green-600 font-semibold text-white px-3 py-2 rounded mx-2'
          >
            Go Back
          </Link>
        </div>
      </div>
      <ExpenseList expenses={expenses.data} />
      {newExpenseModal && (
        <NewExpense setNewExpenseModal={setNewExpenseModal} />
      )}
    </div>
  );
};

export default Expenses;
