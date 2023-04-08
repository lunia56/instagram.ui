import React, {useState} from 'react';
import s from './CreateProfile.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';

const CreateProfile = () => {
  const [isEdite, setIsEdite] = useState<boolean>(false)


  return (
    <div className={s.createProfile}>
      <h1>Oops! This place looks empty</h1>
      <p>You do not have an account to create one, click below and then fill in all the fields</p>
      <MyButton variant="secondary" callback={() => setIsEdite(true)} style={{width: '179px', height: '36px'}}>
        Create Button</MyButton>
    </div>
  );
}

export default CreateProfile;


