import React from 'react';
import { FaList, FaArchive, FaTrash } from 'react-icons/fa';

type Props = {
  id: string;
  setExpenseDetailsModal: any;
  setExpenseDeleteModal: any;
  archiveExpense: any;
  archived: boolean;
};

const Options: React.FC<Props> = ({
  id,
  setExpenseDetailsModal,
  archiveExpense,
  setExpenseDeleteModal,
  archived,
}) => {
  return (
    <td className='absolute top-6 right-24 bg-white z-10 text-xs'>
      <li className='list-none p-1 border'>
        <button
          onClick={() => setExpenseDetailsModal(true)}
          className='flex items-center'
        >
          <FaList className='mr-1' />
          View Details
        </button>
      </li>
      <li className='list-none p-1 border-b border-x'>
        <button onClick={() => archiveExpense()} className='flex items-center'>
          <FaArchive className='mr-1' />
          {archived ? 'Unarchive' : 'Archive'}
        </button>
      </li>
      <li className='list-none p-1 border-b border-x'>
        <button
          onClick={() => setExpenseDeleteModal(true)}
          className='flex items-center'
        >
          <FaTrash className='mr-1' />
          Delete
        </button>
      </li>
    </td>
  );
};

export default Options;
