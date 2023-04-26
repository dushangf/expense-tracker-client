type Props = {
  removeExpense: any;
  setExpenseDeleteModal: any;
};

const ExpenseDelete: React.FC<Props> = ({ removeExpense, setExpenseDeleteModal }) => {
  return (
    <div className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <div className='bg-white p-10 rounded'>
        <p>Are you sure you want to delete the expense?</p>
        <div className='flex justify-center w-full my-2'>
            <button onClick={() => removeExpense()} className='px-4 py-2 bg-green-700 font-semibold text-white mx-2 rounded'>YES</button>
            <button onClick={() => setExpenseDeleteModal(false)} className='px-4 py-2 bg-red-700 font-semibold text-white mx-2 rounded'>No</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDelete;
