import {Box, Button, ButtonProps} from '@chakra-ui/react';
import {Calendar, GetBackForwardPropsOptions} from 'dayzed';
import React from 'react';
import {DatepickerProps} from '../utils/commonTypes';

export interface DatepickerBackBtnsProps extends DatepickerProps {
  calendars: Calendar[];
  getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

const DefaultBtnStyle: ButtonProps = {
  variant: 'ghost',
  size: 'sm',
};

export const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps> = (props) => {
  const {calendars, getBackProps} = props;
  const customBtnProps = props.propsConfigs?.dateNavBtnProps;
  return (
    <Box width={'36px'} height={'36px'} bgColor="#4C4C4C" borderRadius={'50%'}>
      <Button
        {...getBackProps({calendars})}
        {...DefaultBtnStyle}
        {...customBtnProps}
      >
        {'<'}
      </Button>
    </Box>
  );
};

export interface DatepickerForwardBtnsProps extends DatepickerProps {
  calendars: Calendar[];
  getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

export const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps> = (
  props
) => {
  const {calendars, getForwardProps} = props;
  const customBtnProps = props.propsConfigs?.dateNavBtnProps;
  return (
    <Box width={'36px'} height={'36px'} bgColor="#4C4C4C" borderRadius={'50%'}>
      <Button
        {...getForwardProps({calendars})}
        {...DefaultBtnStyle}
        {...customBtnProps}
      >
        {'>'}
      </Button>

    </Box>
  );
};
