import React, {ChangeEventHandler, useState} from 'react';
import s from './CreateProfile.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import {useForm} from 'react-hook-form';
import {FormControl, FormErrorMessage, FormLabel, Input, Textarea} from '@chakra-ui/react';
import img from '@/assets/Profile/not_foto.png';
import Image from 'next/image';
import {SingleDatepicker} from '@/components/common/DatePicker/SingleDatepicker';
import {RangeCalendarPanel, RangeDatepicker} from '@/components/common/DatePicker/RangeCalendarPanel';
import ModalSendEmail from "@/components/Modal/ModalSendEmail/ModalSendEmail";

type FormData = {
  username: string;
  name: string;
  surname: string;
  city: string;
  aboutme:string
};
const CreateProfile = () => {
  const [isEdite, setIsEdite] = useState<boolean>(false)
  const [date, setDate] = useState(new Date())
  const [addPhotoOpen, setAddPhotoOpen ] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values:FormData) {
    console.log(values);
    
    }  
    const dateHandler = (event: ChangeEventHandler<HTMLInputElement>) => {
    //console.log(typeof (new Date(event.target.value).toLocaleDateString('ru')))
    //setDate(new Date(event.target.value).toLocaleDateString('ru'))
  }
  const addAvatar = () => {
console.log('add avatar');
  }

  return (
    <>
      {!isEdite ?
        <div className={s.oops}>
          <h1>Oops! This place looks empty</h1>
          <p>You do not have an account to create one, click below and then fill in all the fields</p>
          <MyButton variant="secondary" callback={() => setIsEdite(true)} style={{width: '179px', height: '36px'}}>
            Create Button</MyButton>
        </div>
        :
        <div className={s.createProfile}>
          <div className={s.title}>Create Profile
          </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <hr/>
              <div className={s.block}>
                <div className={s.left}>
                  <div className={s.image}>
                    <Image src={img} alt=""/>
                  </div>
                  <MyButton onClick={()=>{setAddPhotoOpen(!addPhotoOpen)}} variant="empty" callback={addAvatar} style={{width: '179px', height: '36px'}}>Add a Profile Photo</MyButton>
                </div>
                <div className={s.right}>
                  <FormControl isInvalid={errors.username}>
                    <FormLabel color={'#BDC1C7'}>Username</FormLabel>
                    <Input
                      id="username"
                      variant="flushed"
                      focusBorderColor="#2F68CC"
                      {...register('username', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                      })}
                    />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel color={'#BDC1C7'}>Name</FormLabel>
                    <Input
                      id="name"
                      variant="flushed"
                      focusBorderColor="#2F68CC"
                      {...register('name', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.surname}>
                    <FormLabel color={'#BDC1C7'}>Surname</FormLabel>
                    <Input
                      id="surname"
                      variant="flushed"
                      focusBorderColor="#2F68CC"
                      {...register('surname', {
                        required: 'This is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.surname && errors.surname.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.date}>
                    <FormLabel color={'#BDC1C7'}>Date of birthday</FormLabel>
                    <SingleDatepicker date={ date} onDateChange={setDate}/>
                    <FormErrorMessage>
                      {errors.surname && errors.surname.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.city}>
                    <FormLabel color={'#BDC1C7'}>City</FormLabel>
                    <Input
                      id="city"
                      variant="flushed"
                      focusBorderColor="#2F68CC"
                      {...register('city', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                      })}
                    />
                    <FormErrorMessage>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.aboutme}>
                    <FormLabel color={'#BDC1C7'}>About Me</FormLabel>
                    <Textarea/>
                    <FormErrorMessage>
                      {errors.aboutme && errors.aboutme.message}
                    </FormErrorMessage>
                  </FormControl>
                </div>
              </div>
              <hr/>
              <MyButton type="submit" variant='secondary' style={{marginTop:'25px', alignSelf: 'flex-end',width: '179px', height: '36px'}}>Create Account</MyButton>
            </form>

        </div>
      }
      {addPhotoOpen && <ModalSendEmail modalOnClick={()=>setAddPhotoOpen(false)} email={'variables?.email'}/>}
      </>
  )
}

export default CreateProfile;


