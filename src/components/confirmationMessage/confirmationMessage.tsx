import React from 'react';
import {Box, Button, Heading, Text, VStack} from '@chakra-ui/react';
import Image from 'next/image';

export type ConfirmationMessageType = {
    title: string,
    description: string,
    buttonTitle: string,
    onClickHandler: () => void,
    image: any,
}
const ConfirmationMessage = ({title, description, buttonTitle, onClickHandler, image}: ConfirmationMessageType) => {
    return (
        <Box>
            <VStack
                gap={10}>
                <Heading letterSpacing={'1px'} fontWeight={'700'} fontSize={'20px'} lineHeight={'36px'} color={'white'}
                         mt={'35px'}> {title}</Heading>
                font-style: normal;

                <Text letterSpacing={'1px'} fontWeight={400} fontSize={'16px'} lineHeight={'24px'} fontStyle={'normal'}
                      color={'white'}>{description}</Text>
                <Button
                    type="button"
                    loadingText="Отправка..."
                    colorScheme="twitter"
                    onClick={onClickHandler}
                    // isDisabled={!isValid || isSubmitting}
                    border="none"
                    fontWeight={'400'} fontSize={'20px'} lineHeight={'36px'}
                >
                    {buttonTitle}
                </Button>
                <Image src={image} alt={'img'}/>
            </VStack>
        </Box>
    );
};

export default ConfirmationMessage;