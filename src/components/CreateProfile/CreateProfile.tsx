import React, {ChangeEvent, useRef, useState} from 'react';
import s from './CreateProfile.module.scss'
import MyButton from '@/components/common/MyButton/MyButton';
import {Controller, useForm} from 'react-hook-form';
import {FormControl, FormErrorMessage, FormLabel, Input, Textarea} from '@chakra-ui/react';
import img from '@/assets/Profile/not_foto.png';
import Image from 'next/image';
import {SingleDatepicker} from '@/components/common/DatePicker/SingleDatepicker';
import {convertFileToBase64} from '@/services/converter64Base';

type FormData = {
  username: string;
  name: string;
  surname: string;
  city: string;
  aboutme: string;
  date: Date;
};
const CreateProfile = () => {
  const [isEdite, setIsEdite] = useState<boolean>(false)
  //const [date, setDate] = useState<Date>(new Date())
  const {
    control,
    reset,
    handleSubmit,
    watch, setError,
    formState: {errors, isValid}
  } = useForm<FormData>({mode: 'onChange'});
  const [avatar, setAvatar] = useState('')

  function onSubmit(values: FormData) {

  }

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    //как остоновить submit
    inputRef && inputRef.current?.click();
  };
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAvatar(file64)
          console.log(file64);
        })
      } else {
        //add error
      }
    }
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
                {avatar ?
                  <div className={s.image}>
                    <img width={'100%'} height={'100%'} src={avatar} alt=""/>
                  </div>
                  :
                  <div className={s.image}>
                    <Image src={img} alt=""/>
                  </div>
                }
                <Input type="file"
                       ref={inputRef}
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <MyButton type="button" variant="empty" callback={selectFileHandler}
                          style={{width: '179px', height: '36px'}}>Add a Profile
                  Photo</MyButton>
              </div>
              <div className={s.right}>
                <FormControl isInvalid={Boolean(errors.username)}>
                  <FormLabel color={'#BDC1C7'}>Username</FormLabel>
                  <Controller
                    control={control}
                    name="username"
                    rules={{
                      required: 'Username is required',
                      minLength: {
                        value: 6,
                        message: 'Minimum length 6 characters'
                      }, maxLength: {
                        value: 30,
                        message: 'Maximum length 30 characters'
                      }

                    }}
                    render={({field: {onChange, value,}}) => (<>
                      <Input
                        id="username"
                        variant="flushed"
                        focusBorderColor="#2F68CC"
                        value={value}
                        onChange={onChange}
                      />
                    </>)}


                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.name)}>
                  <FormLabel color={'#BDC1C7'}>Name</FormLabel>
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: 'Name is required',
                    }}
                    render={({field: {onChange, value,}}) => (<>
                      <Input
                        id="name"
                        variant="flushed"
                        focusBorderColor="#2F68CC"
                        value={value}
                        onChange={onChange}
                      />
                    </>)}


                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.surname)}>
                  <FormLabel color={'#BDC1C7'}>Surname</FormLabel>
                  <Controller
                    control={control}
                    name="surname"
                    rules={{
                      required: 'Surname is required',
                    }}
                    render={({field: {onChange, value,}}) => (<>
                      <Input
                        id="surname"
                        variant="flushed"
                        focusBorderColor="#2F68CC"
                        value={value}
                        onChange={onChange}
                      />
                    </>)}


                  />
                  <FormErrorMessage>
                    {errors.surname && errors.surname.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.date)}>
                  <FormLabel color={'#BDC1C7'}>Date of birthday</FormLabel>
                  <Controller
                    name="date"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value}}) => (<>
                      <SingleDatepicker
                        name="date"
                        id="date"
                        date={value}
                        onDateChange={onChange}
                      />
                    </>)}
                  />
                  <FormErrorMessage>
                    {errors.date && errors.date.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.city)}>
                  <FormLabel color={'#BDC1C7'}>City</FormLabel>
                  <Controller
                    control={control}
                    name="city"
                    rules={{
                      required: 'City is required',
                    }}
                    render={({field: {onChange, value,}}) => (<>
                      <Input
                        id="city"
                        variant="flushed"
                        focusBorderColor="#2F68CC"
                        value={value}
                        onChange={onChange}
                      />
                    </>)}


                  />
                  <FormErrorMessage>
                    {errors.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.aboutme)}>
                  <FormLabel color={'#BDC1C7'}>About Me</FormLabel>
                  <Controller
                    control={control}
                    name="aboutme"
                    rules={{
                      required: 'About me is required',
                      maxLength: {value: 200, message: 'Minimum length should be 200'},
                    }}
                    render={({field: {onChange, value,}}) => (<>
                      <Textarea
                        id="aboutme"
                        focusBorderColor="#2F68CC"
                        value={value}
                        onChange={onChange}
                      />
                    </>)}


                  />
                  <FormErrorMessage>
                    {errors.aboutme && errors.aboutme.message}
                  </FormErrorMessage>
                </FormControl>
              </div>
            </div>
            <hr/>
            <MyButton type="submit" variant="secondary"
                      style={{marginTop: '25px', alignSelf: 'flex-end', width: '179px', height: '36px'}}>Create
              Account</MyButton>
          </form>
        </div>
      }
    </>
  )
}

export default CreateProfile;


