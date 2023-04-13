import React, {useState} from 'react';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverBodyProps,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import {format} from 'date-fns';
import FocusLock from 'react-focus-lock';
import {Month_Names_Full, Weekday_Names_Short} from './utils/calanderUtils';
import {CalendarPanel} from './components/calendarPanel';
import {CalendarConfigs, DatepickerConfigs, DatepickerProps, OnDateSelected,} from './utils/commonTypes';
import {CalendarIcon} from '@chakra-ui/icons';

export interface SingleDatepickerProps extends DatepickerProps {
  date?: Date;
  onDateChange: (date: Date) => void;
  configs?: DatepickerConfigs;
  disabled?: boolean;
  defaultIsOpen?: boolean;
  closeOnSelect?: boolean;
  id?: string;
  name?: string;
  usePortal?: boolean;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: 'dd.MM.yyyy',
  monthNames: Month_Names_Full,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};
const styleInputProps: InputProps = {
  width: '158px',
  height: '58px',
  backgroundColor: '#171717',
  focusBorderColor: '#333333',
}
const popoverBodyProps: PopoverBodyProps = {
  padding: 0,
}


export const SingleDatepicker: React.FC<SingleDatepickerProps> = ({
                                                                    configs,
                                                                    propsConfigs,
                                                                    usePortal,
                                                                    defaultIsOpen = false,
                                                                    closeOnSelect = true,
                                                                    ...props
                                                                  }) => {
  const {
    date: selectedDate,
    name,
    disabled,
    onDateChange,
    id,
    minDate,
    maxDate,
  } = props;

  const [dateInView, setDateInView] = useState(selectedDate);

  const [offset, setOffset] = useState(0);

  const {onOpen, onClose, isOpen} = useDisclosure({defaultIsOpen});

  const calendarConfigs: CalendarConfigs = {
    ...DefaultConfigs,
    ...configs,
  };

  const onPopoverClose = () => {
    onClose();
    setDateInView(selectedDate);
    setOffset(0);
  };

  const handleOnDateSelected: OnDateSelected = ({selectable, date}) => {

    if (!selectable) return;
    if (date instanceof Date && !isNaN(date.getTime())) {
      onDateChange(date);
      if (closeOnSelect) onClose();
      return;
    }
  };

  const PopoverContentWrapper = usePortal ? Portal : React.Fragment;
  return (
    <Popover
      placement="bottom-start"
      variant="responsive"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onPopoverClose}
      isLazy
    >
      <PopoverTrigger>
        <InputGroup position="relative">
          <Input
            onKeyPress={(e) => {
              if (e.key === ' ' && !isOpen) {
                e.preventDefault();
                onOpen();
              }
            }}
            id={id}
            autoComplete="off"
            isDisabled={disabled}
            name={name}
            value={
              selectedDate ? format(selectedDate, calendarConfigs.dateFormat) : (new Date).toLocaleDateString('ru')
            }
            onChange={(e) => e.target.value}
            {...styleInputProps}
          />
          <InputRightElement right={'335px'} top="-7px" ><CalendarIcon/></InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContentWrapper>
        <PopoverContent
          width="100%"
          {...propsConfigs?.popoverCompProps?.popoverContentProps}
        >
          <PopoverBody {...popoverBodyProps}>
            <FocusLock>
              <CalendarPanel
                dayzedHookProps={{
                  showOutsideDays: true,
                  onDateSelected: handleOnDateSelected,
                  selected: selectedDate,
                  date: dateInView,
                  minDate: minDate,
                  maxDate: maxDate,
                  offset: offset,
                  onOffsetChanged: setOffset,
                  firstDayOfWeek: calendarConfigs.firstDayOfWeek,
                }}
                configs={calendarConfigs}
                propsConfigs={propsConfigs}
              />
            </FocusLock>
          </PopoverBody>
        </PopoverContent>
      </PopoverContentWrapper>
    </Popover>
  );
};
