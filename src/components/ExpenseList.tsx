import React from 'react';
import { Expense as ExpenseType } from '../store/types/ExpenseTypes';
import Expense from './Expense';

type Props = {
  expenses: ExpenseType[];
};

const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const headerItems = ['Name', 'Date', 'Total', 'Category', 'Notes', 'Options'];

  return (
    <div className='w-full px-10 py-3 mt-5'>
      <table className='w-full leading-normal shadow-md rounded-lg'>
        <thead>
          <tr>
            {headerItems.map((item) => (
              <th
                key={item}
                className='px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
