import { useState, useEffect } from 'react';
import { getAllExpenses } from '../store/ExpensesSlice';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '../libs/hooks/useUser';
import { AppDispatch, RootState } from '../store';
import ExpenseList from '../components/ExpenseList';
import NewExpense from '../components/NewExpense';
import { Link } from 'react-router-dom';
import ReportModal from '../components/ReportModal';

const Expenses = () => {
  const { user } = useUser();

  const [newExpenseModal, setNewExpenseModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const expenses = useSelector((state: RootState) => state.expense.list);

  useEffect(() => {
    dispatch(getAllExpenses({ id: user?.id, status: 'active' }));
  }, [user, dispatch]);

  return (
    <div className='w-full'>
      <div className='border-b-2 border-green-600 w-full py-7 px-10 flex justify-between items-center'>
        <h2 className='font-semibold'>EXPENSES</h2>
        <div className='flex'>
          <button
            onClick={() => setNewExpenseModal(true)}
            className='bg-green-600 font-semibold text-white px-3 py-2 rounded mx-2'
          >
            Add Expense
          </button>
          <button
            onClick={() => setReportModal(true)}
            className='bg-blue-600 font-semibold text-white px-3 py-2 rounded mx-2'
          >
            Download Report
          </button>
          <Link
            to='/expenses/archived'
            className='bg-red-600 font-semibold text-white px-3 py-2 rounded mx-2'
          >
            Archived
          </Link>
        </div>
      </div>
      <ExpenseList expenses={expenses.data} />
      {newExpenseModal && (
        <NewExpense setNewExpenseModal={setNewExpenseModal} />
      )}
      {reportModal && <ReportModal setReportModal={setReportModal} />}
    </div>
  );
};

export default Expenses;
