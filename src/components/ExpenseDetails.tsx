import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaEdit, FaSave } from 'react-icons/fa';
import { Expense } from '../store/types/ExpenseTypes';
import { updateExpense } from '../store/ExpensesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getAllExpenses } from '../store/ExpensesSlice';
import useUser from '../libs/hooks/useUser';

type Props = {
  expense: Expense;
  setExpenseDetailsModal: any;
};

const ExpenseDetails: React.FC<Props> = ({
  setExpenseDetailsModal,
  expense,
}) => {
  const [editable, setEditable] = useState(false);

  const { user } = useUser();

  const { name, date, total, category, notes } = expense;

  const [newExpense, setNewExpense] = useState(expense);

  const dispatch: AppDispatch = useDispatch();

  const categories = [
    'Transportation',
    'Food',
    'Entertainment',
    'Utilities',
    'Rent',
  ];

  const saveUpdatedUser = async () => {
    await dispatch(updateExpense(newExpense));

    dispatch(getAllExpenses({id: user?.id, status: 'active'}));

    setEditable(false);
  };

  return (
    <td className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <button
        onClick={() => setExpenseDetailsModal(false)}
        className='absolute text-3xl text-white top-10 right-16'
      >
        <CgClose />
      </button>
      <div className='bg-white p-10 rounded flex flex-col w-1/3'>
        <div className='flex justify-between'>
          <h4 className='font-semibold'>Expense Details</h4>
          {editable ? (
            <button onClick={() => saveUpdatedUser()}>
              <FaSave />
            </button>
          ) : (
            <button onClick={() => setEditable(true)}>
              <FaEdit />
            </button>
          )}
        </div>
        <div className='flex flex-col m-2'>
          <label>Name :</label>
          <input
            readOnly={!editable}
            className='px-3 py-2 rounded border my-2'
            onChange={(e) =>
              setNewExpense({ ...newExpense, name: e.target.value })
            }
            type='text'
            defaultValue={name}
          />
        </div>
        <div className='flex flex-col m-2'>
          <label>Date :</label>
          <input
            readOnly={!editable}
            className='px-3 py-2 rounded border my-2'
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
            type='date'
            defaultValue={date}
          />
        </div>
        <div className='flex flex-col m-2'>
          <label>Total :</label>
          <input
            readOnly={!editable}
            className='px-3 py-2 rounded border my-2'
            onChange={(e) =>
              setNewExpense({ ...newExpense, total: Number(e.target.value) })
            }
            type='number'
            defaultValue={total}
          />
        </div>
        <div className='flex flex-col m-2'>
          <label>Name :</label>
          <select
            className='px-3 py-2 rounded border my-2'
            defaultValue={category}
            disabled={!editable}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
          >
            <option>--Select--</option>
            {categories.map((category) => (
              <option key={category} defaultValue={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col m-2'>
          <label>Notes :</label>
          <input
            readOnly={!editable}
            className='px-3 py-2 rounded border my-2'
            onChange={(e) =>
              setNewExpense({ ...newExpense, notes: e.target.value })
            }
            type='textarea'
            defaultValue={notes}
          />
        </div>
      </div>
    </td>
  );
};

export default ExpenseDetails;
