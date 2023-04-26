import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaUpload } from 'react-icons/fa';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { uploadProfilePicture } from '../store/UserSlice';

type Props = {
  setProfilePictureModal: any;
};

const ProfilePictureModal: React.FC<Props> = ({ setProfilePictureModal }) => {
  const [photo, setPhoto] = useState<File | string>('');

  const dispatch: AppDispatch = useDispatch();

  const onUpload = async () => {
    const formData = new FormData();

    formData.append('file', photo);

    await dispatch(uploadProfilePicture(formData));

    setProfilePictureModal(false);
  };

  return (
    <div className='w-screen h-screen fixed z-10 bg-black/50 flex justify-center items-center top-0 left-0'>
      <button
        onClick={() => setProfilePictureModal(false)}
        className='absolute text-2xl text-white top-10 right-16'
      >
        <CgClose />
      </button>
      <div className='bg-white rounded p-10 flex flex-col'>
        <input
          className='border rounded'
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          onChange={(e) => {
            e.target.files && setPhoto(e.target.files[0]);
          }}
        />
        <button
          onClick={() => onUpload()}
          className='flex items-center justify-center text-white bg-blue-600 font-semibold rounded py-3 px-5 my-1'
        >
          <FaUpload />
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
