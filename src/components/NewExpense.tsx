import { FormEvent, useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';
import useUser from '../libs/hooks/useUser';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getAllExpenses, postExpense } from '../store/ExpensesSlice';

type Props = {
  setNewExpenseModal: any;
};

const NewExpense: React.FC<Props> = ({ setNewExpenseModal }) => {
  const { user } = useUser();

  const [expense, setExpense] = useState({
    name: '',
    total: 0,
    date: '',
    category: '',
    notes: '',
    user_id: '',
  });

  const categories = [
    'Transportation',
    'Food',
    'Entertainment',
    'Utilities',
    'Rent',
  ];

  useEffect(() => {
    setExpense({ ...expense, user_id: user?.id });
  }, [user]);

  const dispatch: AppDispatch = useDispatch();

  const onExpenseSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await dispatch(postExpense(expense));

    await dispatch(getAllExpenses({ id: user?.id, status: 'active' }));

    setNewExpenseModal(false);
  };

  return (
    <div className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <button
        onClick={() => setNewExpenseModal(false)}
        className='absolute text-3xl text-white top-10 right-16'
      >
        <CgClose />
      </button>
      <form
        onSubmit={(e) => onExpenseSubmit(e)}
        className='bg-white rounded p-10 flex flex-col'
      >
        <input
          className='py-2 px-3 border rounded m-2'
          type='text'
          placeholder='Name'
          onChange={(e) => setExpense({ ...expense, name: e.target.value })}
          value={expense.name}
        />
        <input
          className='py-2 px-3 border rounded m-2'
          type='number'
          placeholder='Total'
          onChange={(e) =>
            setExpense({ ...expense, total: Number(e.target.value) })
          }
          value={expense.total}
        />
        <input
          className='py-2 px-3 border rounded m-2'
          type='date'
          placeholder='Date'
          onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          value={expense.date}
        />
        <select
          className='py-2 px-3 border rounded m-2'
          placeholder='Category'
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          value={expense.category}
        >
          <option>--Select--</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className='py-2 px-3 border rounded m-2'
          type='textarea'
          placeholder='Notes'
          onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
          value={expense.notes}
        />
        <button className='bg-green-600 rounded p-3 font-semibold text-white m-2'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default NewExpense;
