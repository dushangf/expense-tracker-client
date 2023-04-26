import { FormEvent, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../store/UserSlice';

type Props = {
  setSalaryModal: any;
};

const NewSalary: React.FC<Props> = ({ setSalaryModal }) => {
  const [newSalary, setNewSalary] = useState(0);

  const user = useSelector((state: RootState) => state.user.details);

  const dispatch: AppDispatch = useDispatch();

  const addSalary = async (e: FormEvent) => {
    e.preventDefault();

    await dispatch(
      updateUser({ salary: user.data.salary + newSalary, id: user.data.id })
    );

    await dispatch(getUserDetails());

    setSalaryModal(false)
  };

  return (
    <div className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <button
        onClick={() => setSalaryModal(false)}
        className='absolute top-10 right-16 text-2xl text-white'
      >
        <CgClose />
      </button>
      <form
        onSubmit={(e) => addSalary(e)}
        className='bg-white rounded-xl p-10 flex justify-between'
      >
        <input
          placeholder='Add Salary'
          type='number'
          className='px-3 py-2 rounded border-2 mr-1'
          onChange={(e) => setNewSalary(Number(e.target.value))}
        />
        <button
          type='submit'
          className='py-2 px-3 font-semibold bg-green-600 border-2 border-green-700 rounded ml-1 text-white'
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default NewSalary;
