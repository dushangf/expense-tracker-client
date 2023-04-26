import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { downloadReport } from '../store/ExpensesSlice';

type Props = {
  setReportModal: any;
};

const ReportModal: React.FC<Props> = ({ setReportModal }) => {
  const [category, setCategory] = useState('Transportation');

  const categories = [
    'Transportation',
    'Food',
    'Entertainment',
    'Utilities',
    'Rent',
  ];

  const dispatch: AppDispatch = useDispatch();

  const onDownload = async () => {
    await dispatch(downloadReport(category));

    setReportModal(false);
  };

  return (
    <div className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <button
        onClick={() => setReportModal(false)}
        className='absolute top-10 right-16 text-2xl text-white'
      >
        <CgClose />
      </button>
      <div className='bg-white rounded p-10 flex flex-col'>
        <label>Select Category</label>
        <select
          className='border rounded p-1'
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => onDownload()}
          className='flex bg-blue-500 text-white justify-center items-center rounded p-2 my-2'
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
