import React, { ChangeEvent, FC } from 'react'
import { usePostStore } from "@/store/postStore";
import { useQuery } from "@tanstack/react-query";
import { instagramInstance } from "@/services/instagramInstance";

const MAX_CHARACTERS = 500

type RightDescriptionType = {
  location: boolean
  callback?: () => void
}

type RootProfile = {
  id: number
  userName: string | null
  firstName: string | null
  lastName: string | null
  city: string | null
  dateOfBirth: string | null | Date
  aboutMe: string | null
}

const getAccountData = (): Promise<RootProfile> => {
  return instagramInstance.get(`users/profile`)
}


const noRefetch = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchIntervalInBackground: false,
} as const

const useGetProfileData = () => {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: getAccountData,
    onSuccess: data => {
    },
    onError: err => {
    },
    retry: false,
    ...noRefetch,
    staleTime: 0,
    select: (data: any) => data?.data,
  })
}


const useGetProfile = () => {
  const {data: profileData, isLoading: isProfileLoading} = useGetProfileData()

  const initialProfileData = {
    userName: profileData?.userName || '',
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    city: profileData?.city || '',
    dateOfBirth: profileData?.dateOfBirth ? new Date(profileData?.dateOfBirth) : new Date(),
    aboutMe: profileData?.aboutMe || '',
  }
  const profileAvatar = profileData?.avatars[0]?.url || ''

  return {
    profileData: initialProfileData,
    profileAvatar,
    isProfileLoading,
  }
}


export const RightDescription: FC<RightDescriptionType> = ({location, callback}) => {
  const {profileData, profileAvatar} = useGetProfile()
  const avatar = profileAvatar && profileAvatar
  const userName = profileData && profileData.userName

  const {setPostDescription, postDescription} = usePostStore()

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.currentTarget.value)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "536px"
    }}>
      <div style={{display: "flex", textAlign: "center"}}>
        {/*<Avatar alt={'photoAvatar'} width={55} height={55} src={avatar} />*/}
        <div>{userName}</div>
      </div>
      <div style={{display: "flex"}}>
        {/*<Textarea*/}
        {/*  maxLength={MAX_CHARACTERS}*/}
        {/*  value={postDescription}*/}
        {/*  onChange={handleTextChange}*/}
        {/*  label={'Add publication description'}*/}
        {/*/>*/}
        <p>{postDescription ? `${postDescription.length} / ${MAX_CHARACTERS}` : '0 / 500'}</p>
      </div>

      {/*{location ? (*/}
      {/*  <Location />*/}
      {/*) : (*/}
      {/*  <GlobalButton callback={callback} type={'submit'}>*/}
      {/*    Edit*/}
      {/*  </GlobalButton>*/}
      {/*)}*/}
    </div>
  )
}
