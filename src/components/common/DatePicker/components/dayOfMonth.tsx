import {Button} from '@chakra-ui/react';
import {DateObj, RenderProps} from 'dayzed';
import React, {useMemo} from 'react';
import {DatepickerProps, DayOfMonthBtnStyleProps} from '../utils/commonTypes';

interface DayOfMonthProps extends DatepickerProps {
  renderProps: RenderProps;
  isInRange?: boolean | null;
  dateObj: DateObj;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const halfGap = 0.125;

export const DayOfMonth: React.FC<DayOfMonthProps> = ({
                                                        dateObj,
                                                        propsConfigs,
                                                        isInRange,
                                                        renderProps,
                                                        onMouseEnter,
                                                      }) => {
  const {date, selected, selectable, today} = dateObj;
  const {getDateProps} = renderProps;
  const {
    defaultBtnProps,
    isInRangeBtnProps,
    selectedBtnProps,
    todayBtnProps,
  } = propsConfigs?.dayOfMonthBtnProps || {};

  const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
    () => ({
      defaultBtnProps: {
        size: 'sm',
        variant: 'link',
        width: '36px',
        height: '36px',
        color: '#BDC1C7',

        ...defaultBtnProps,
        _hover: selectable
          ? {
            bg: '#397DF6',
            borderWidth: '4px',
            borderColor: '#234E99',
            borderRadius: '50%',
            ...defaultBtnProps?._hover,
          }
          : undefined,
      },
      isInRangeBtnProps: {
        background: 'purple.200',
        ...isInRangeBtnProps,
      },
      selectedBtnProps: {
        color: '#397DF6',
        ...selectedBtnProps,
      },
      todayBtnProps: {
        color: 'red',
        ...todayBtnProps,
      },
    }),
    [
      defaultBtnProps,
      isInRangeBtnProps,
      selectedBtnProps,
      todayBtnProps,
      selectable,
    ]
  );
  return (
    <Button
      {...getDateProps({
        dateObj,
        disabled: !selectable,
        onMouseEnter: onMouseEnter,
      })}
      isDisabled={!selectable}
      {...styleBtnProps.defaultBtnProps}
      {...(isInRange && selectable && styleBtnProps.isInRangeBtnProps)}
      {...(selected && selectable && styleBtnProps.selectedBtnProps)}
      {...(today && styleBtnProps.todayBtnProps)}
    >
      {date.getDate()}
    </Button>
  );
};
