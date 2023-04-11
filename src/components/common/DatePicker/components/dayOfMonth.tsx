import { Button } from '@chakra-ui/react';
import { DateObj, RenderProps } from 'dayzed';
import React, { useMemo } from 'react';
import { DatepickerProps, DayOfMonthBtnStyleProps } from '../utils/commonTypes';

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
  const { date, selected, selectable, today } = dateObj;
  const { getDateProps } = renderProps;
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
        variant: 'outline',
        background: 'red',
        borderColor: 'yellow',
        
        _after: {
          content: "''",
          position: 'absolute',
          top: `-${halfGap}rem`,
          left: `-${halfGap}rem`,
          bottom: `-${halfGap}rem`,
          right: `-${halfGap}rem`,
          borderWidth: `${halfGap}rem`,
          borderColor: 'transparent',
        },
        ...defaultBtnProps,
        _hover: selectable
          ? {
              bg: 'purple.400',
              ...defaultBtnProps?._hover,
            }
          : undefined,
      },
      isInRangeBtnProps: {
        background: 'purple.200',
        ...isInRangeBtnProps,
      },
      selectedBtnProps: {
        background: 'blue.200',
        ...selectedBtnProps,
      },
      todayBtnProps: {
        borderColor: 'blue.400',
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
