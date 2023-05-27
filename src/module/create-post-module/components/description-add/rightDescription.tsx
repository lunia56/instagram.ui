import React, { ChangeEvent, FC } from 'react'
import { usePostStore } from "@/store/postStore";
import { useQuery } from "@tanstack/react-query";
import { instagramInstance } from "@/services/instagramInstance";
import { Textarea } from "@/components/Modal/CreatePost/textarea/Textarea";
import { Avatar } from "@/components/common/avatar/Avatar";
import { GlobalButton } from "@/components/Modal/CreatePost/buttons/GlobalButton";
import { Location } from "@/module/create-post-module/components/location/location";

const MAX_CHARACTERS = 500

type RightDescriptionType = {
  location?: boolean
  callback?: () => void
  text?: string
  setText?: (newText: string) => void
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


export const RightDescription: FC<RightDescriptionType> = ({
                                                             location = true,
                                                             callback,
                                                             text,
                                                             setText,
                                                           }) => {
  const {profileData, profileAvatar} = useGetProfile()
  const avatar = profileAvatar && profileAvatar
  const userName = profileData && profileData.userName

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (setText) {
      setText(e.currentTarget.value)
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      width: "536px",
      paddingTop: "4px",
      paddingRight: "4px",
      paddingBottom: "4px",
      paddingLeft: "4p",
    }}>
      <div style={{display: "flex", textAlign: "center", gap: "3px"}}>
        {/*<Avatar alt={'photoAvatar'} width={55} height={55} src={avatar} />*/}
        <div>{userName}</div>
      </div>
      <div style={{display: "flex"}}>
        <Textarea
          maxLength={MAX_CHARACTERS}
          value={text}
          onChange={handleTextChange}
          label={'Add publication description'}
        />
        <p style={{
          textAlign: "end",
          fontSize: "12px"

        }}>
          {text ? `${text.length} / ${MAX_CHARACTERS}` : '0 / 500'}
        </p></div>

      {/*{location ? (*/}
      {/*  <Location />*/}
      {/*) : (*/}
      {/*  <GlobalButton callback={callback} type={'submit'}>*/}
      {/*    Save changes*/}
      {/*  </GlobalButton>*/}
      {/*)}*/}
    </div>
  )
}
