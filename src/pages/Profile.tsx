import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateUser } from '../store/UserSlice';
import { FaEdit, FaUser } from 'react-icons/fa';
import ProfilePictureModal from '../components/ProfilePictureModal';

const Profile = () => {
  const [editable, setEditable] = useState(false);

  const [profilePictureModal, setProfilePictureModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.user.details.data);

  const [newUserData, setNewUserData] = useState({});

  const onEditSave = async () => {
    await dispatch(updateUser(newUserData));

    setEditable(false);
  };

  return (
    <div className='w-full flex justify-center p-10'>
      <div className='rounded border shadow-lg h-max py-10 px-14 w-5/6'>
        <div className='flex justify-between mb-15'>
          <h3 className='font-semibold text-2xl'>
            Profile
            <button
              onClick={() => setEditable(true)}
              className='text-base mx-5'
            >
              <FaEdit />
            </button>
          </h3>
          {userData && userData.image_url ? (
            <img className='rounded-full w-20' src={userData.image_url} alt='logo' />
          ) : (
            <button
              onClick={() => setProfilePictureModal(true)}
              className='bg-green-300 hover:bg-green-400 duration-200 rounded-full p-6'
            >
              <FaUser />
            </button>
          )}
        </div>
        <div className='flex my-5 w-full justify-between'>
          <div className='flex flex-col w-1/2 mr-2'>
            <label>First Name</label>
            <input
              readOnly={!editable}
              className={`rounded px-4 py-3 mb-3 ${
                editable
                  ? 'border border-black'
                  : 'border-b-2  border-black py-3'
              }`}
              type='text'
              defaultValue={userData && userData.first_name}
              onChange={(e) =>
                setNewUserData({ ...newUserData, first_name: e.target.value })
              }
            />
          </div>
          <div className='flex flex-col w-1/2 ml-2'>
            <label>Last Name</label>
            <input
              readOnly={!editable}
              className={`rounded px-4 py-3 mb-3 ${
                editable
                  ? 'border border-black'
                  : 'border-b-2  border-black py-3'
              }`}
              type='text'
              defaultValue={userData && userData.last_name}
              onChange={(e) =>
                setNewUserData({ ...newUserData, last_name: e.target.value })
              }
            />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <label>Email</label>
          <input
            readOnly={!editable}
            className={`rounded px-4 py-3 mb-3 ${
              editable ? 'border border-black' : 'border-b-2  border-black py-3'
            }`}
            type='text'
            defaultValue={userData && userData.email}
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col w-full'>
          <label>Address Line 1</label>
          <input
            readOnly={!editable}
            className={`rounded px-4 py-3 mb-3 ${
              editable ? 'border border-black' : 'border-b-2  border-black py-3'
            }`}
            type='text'
            defaultValue={userData && userData.address && userData.address[0]}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                address: [e.target.value, ...userData.address.slice(1)],
              })
            }
          />
        </div>
        <div className='flex flex-col w-full'>
          <label>Address Line 2</label>
          <input
            readOnly={!editable}
            className={`rounded px-4 py-3 mb-3 ${
              editable ? 'border border-black' : 'border-b-2  border-black py-3'
            }`}
            type='text'
            defaultValue={userData && userData.address && userData.address[1]}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                address: [...userData.address.slice(0, 1), e.target.value],
              })
            }
          />
        </div>
        <div className='flex flex-col w-full'>
          <label>City</label>
          <input
            readOnly={!editable}
            className={`rounded px-4 py-3 mb-3 ${
              editable ? 'border border-black' : 'border-b-2  border-black py-3'
            }`}
            type='text'
            defaultValue={userData && userData.city}
            onChange={(e) =>
              setNewUserData({ ...newUserData, city: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col w-full'>
          <label>Country</label>
          <input
            readOnly={!editable}
            className={`rounded px-4 py-3 mb-3 ${
              editable ? 'border border-black' : 'border-b-2  border-black py-3'
            }`}
            type='text'
            defaultValue={userData && userData.country}
            onChange={(e) =>
              setNewUserData({ ...newUserData, country: e.target.value })
            }
          />
        </div>
        {editable && (
          <div className='flex justify-center my-3'>
            <button
              onClick={() => onEditSave()}
              className='bg-green-600 font-semibold text-white py-3 px-5 w-1/2 rounded mr-2'
            >
              SAVE
            </button>
            <button
              onClick={() => setEditable(false)}
              className='bg-red-600 font-semibold text-white py-3 px-5 w-1/2 rounded ml-2'
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
      {profilePictureModal && (
        <ProfilePictureModal setProfilePictureModal={setProfilePictureModal} />
      )}
    </div>
  );
};

export default Profile;
