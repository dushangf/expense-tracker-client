import React, { useState } from 'react';
import { Expense as ExpenseType } from '../store/types/ExpenseTypes';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Options from './Options';
import ExpenseDetails from './ExpenseDetails';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from '../store/ExpensesSlice';
import useUser from '../libs/hooks/useUser';
import ExpenseDelete from './ExpenseDelete';
import { useLocation } from 'react-router-dom';

type Props = {
  expense: ExpenseType;
};

const Expense: React.FC<Props> = ({ expense }) => {
  const [options, setOptions] = useState(false);
  const [expenseDetailsModal, setExpenseDetailsModal] = useState(false);
  const [expenseDeleteModal, setExpenseDeleteModal] = useState(false);

  const { user } = useUser();

  const location = useLocation();

  const { name, date, total, category, notes } = expense;

  const dispatch: AppDispatch = useDispatch();

  const archiveExpense = async () => {
    await dispatch(
      updateExpense({
        id: expense.id,
        status: expense.status === 'archived' ? 'active' : 'archived',
      })
    );

    dispatch(
      getAllExpenses({
        id: user?.id,
        status: location.pathname.includes('archived') ? 'archived' : 'active',
      })
    );
  };

  const removeExpense = async () => {
    dispatch(deleteExpense(expense.id));
  };

  return (
    <tr className='border-b text-sm relative'>
      <td className='py-4 px-10'>{name}</td>
      <td className='py-4 px-10'>{date}</td>
      <td className='py-4 px-10'>{total}</td>
      <td className='py-4 px-10'>{category}</td>
      <td className='py-4 px-10'>{notes}</td>
      <td className='py-4 px-10'>
        <button
          className='rounded-full hover:bg-gray-100 duration-200 p-1'
          onClick={() => setOptions(true)}
          onBlur={() =>
            setTimeout(() => {
              setOptions(false);
            }, 200)
          }
        >
          <BsThreeDotsVertical />
        </button>
      </td>
      {options && (
        <Options
          id={expense.id}
          setExpenseDetailsModal={setExpenseDetailsModal}
          setExpenseDeleteModal={setExpenseDeleteModal}
          archiveExpense={archiveExpense}
          archived={expense.status === 'archived'}
        />
      )}
      {expenseDetailsModal && (
        <ExpenseDetails
          expense={expense}
          setExpenseDetailsModal={setExpenseDetailsModal}
        />
      )}
      {expenseDeleteModal && (
        <ExpenseDelete
          removeExpense={removeExpense}
          setExpenseDeleteModal={setExpenseDeleteModal}
        />
      )}
    </tr>
  );
};

export default Expense;
