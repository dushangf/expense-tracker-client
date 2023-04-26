import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { postUser } from '../store/UserSlice';
import { CgClose } from 'react-icons/cg';

const Login = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    address: [''],
    city: '',
    country: '',
    password: '',
    confirm_password: '',
  });

  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const registeredUser = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  const onRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessToast(false);
    setErrorToast(false);

    await dispatch(postUser(user));

    if (!registeredUser.post.error) {
      return setSuccessToast(true);
    }

    return setErrorToast(true);
  };

  const RegisterSuccess = () => {
    return (
      <div className='absolute bg-green-700 font-semibold px-5 py-3 flex justify-between top-4 right-6 w-1/4 rounded text-white'>
        <p>User Registered Successfully</p>
        <Link to='/login'>Go to Login</Link>
      </div>
    );
  };

  const RegisterError = (): JSX.Element => {
    return (
      <div className='absolute bg-red-700 font-semibold px-5 py-3 flex justify-between top-4 right-6 w-1/4 rounded text-white'>
        <p>Error registering user</p>
        <button className='text-white' onClick={() => setErrorToast(false)}>
          <CgClose />
        </button>
      </div>
    );
  };

  return (
    <div className='bg-gray-900 min-h-screen flex justify-center items-center'>
      {successToast && <RegisterSuccess />}
      {errorToast && <RegisterError />}
      <div className='bg-black/25 w-1/3 h-max rounded-xl text-white my-10'>
        <h1 className='p-6 text-center text-xl bg-gray-800 rounded-t-xl'>
          REGISTER
        </h1>
        <form
          onSubmit={(e) => {
            onRegisterSubmit(e);
          }}
          className='p-6 flex flex-col justify-center items-center'
        >
          <div className='flex justify-between w-full'>
            <input
              type='text'
              className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
              placeholder='First Name'
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <input
              type='text'
              className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
              placeholder='Last Name'
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            />
          </div>
          <input
            type='date'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Date Of Birth'
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
          />
          <input
            type='text'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Email ID'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type='text'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Address Line 1'
            onChange={(e) =>
              setUser({
                ...user,
                address: [e.target.value, ...user.address.slice(1)],
              })
            }
          />
          <input
            type='text'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Address Line 2'
            onChange={(e) =>
              setUser({
                ...user,
                address: [...user.address.slice(0, 1), e.target.value],
              })
            }
          />
          <input
            type='text'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='City'
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
          <input
            type='text'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Country'
            onChange={(e) => setUser({ ...user, country: e.target.value })}
          />
          <input
            type='password'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type='password'
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Confirm password'
            onChange={(e) =>
              setUser({ ...user, confirm_password: e.target.value })
            }
          />
          <button type='submit' className='py-3 px-12 bg-gray-800 rounded m-5'>
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
