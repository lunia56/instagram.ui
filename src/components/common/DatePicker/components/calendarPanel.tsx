import {Box, Heading, SimpleGrid, Stack,} from '@chakra-ui/react';
import {Props as DayzedHookProps, useDayzed} from 'dayzed';
import {ArrowKeysReact} from '../utils/reactKeysArrow';
import React, {useCallback, useMemo} from 'react';
import {CalendarConfigs, DatepickerProps} from '../utils/commonTypes';
import {DatepickerBackBtns, DatepickerForwardBtns} from './dateNavBtns';
import {DayOfMonth} from './dayOfMonth';
import s from './calendarPanelStyle.module.scss';

interface CalendarPanelProps extends DatepickerProps {
  dayzedHookProps: Omit<DayzedHookProps, 'children' | 'render'>;
  configs: CalendarConfigs;
  onMouseEnterHighlight?: (date: Date) => void;
  isInRange?: (date: Date) => boolean | null;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
                                                              dayzedHookProps,
                                                              configs,
                                                              propsConfigs,
                                                              onMouseEnterHighlight,
                                                              isInRange,
                                                            }) => {
  const renderProps = useDayzed(dayzedHookProps);
  const {calendars, getBackProps, getForwardProps} = renderProps;
  const weekdayNames = useMemo(() => {
    const firstDayOfWeek = configs.firstDayOfWeek;
    const dayNames = configs.dayNames;
    if (firstDayOfWeek && firstDayOfWeek > 0) {
      return configs.dayNames
        .slice(firstDayOfWeek, dayNames.length)
        .concat(dayNames.slice(0, firstDayOfWeek));
    }
    return dayNames;
  }, [configs.firstDayOfWeek, configs.dayNames]);

  const getKeyOffset = useCallback((num: number) => {
    const e = document.activeElement;
    let buttons = document.querySelectorAll('button');
    buttons.forEach((el, i) => {
      const newNodeKey = i + num;
      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }, []);

  const arrowKeysReact = new ArrowKeysReact({
    left: () => {
      getKeyOffset(-1);
    },
    right: () => {
      getKeyOffset(1);
    },
    up: () => {
      getKeyOffset(-7);
    },
    down: () => {
      getKeyOffset(7);
    },
  });

  if (calendars.length <= 0) {
    return null;
  }
  return (
    <Stack
      className="datepicker-calendar"
      direction={['column', 'column', 'row']}
      {...arrowKeysReact.getEvents()}
    >
      {calendars.map((calendar, calendarIdx) => {
        return (
          <Box
            className={s.calendar}
            key={calendarIdx}
          >
            <Box className={s.heading}>
              <Heading className={s.month}>
                {configs.monthNames[calendar.month]} {calendar.year}
              </Heading>
              <Box className={s.buttons}>
                <DatepickerBackBtns
                  calendars={calendars}
                  getBackProps={getBackProps}
                  propsConfigs={propsConfigs}
                />
                <DatepickerForwardBtns
                  calendars={calendars}
                  getForwardProps={getForwardProps}
                  propsConfigs={propsConfigs}
                />
              </Box>
            </Box>
            <SimpleGrid columns={7} spacing={1} color="#4C4C4C" textAlign="center">
              {weekdayNames.map((day, dayIdx) => (
                <Box key={dayIdx}>
                  {day}
                </Box>
              ))}
              {calendar.weeks.map((week, weekIdx) => {
                return week.map((dateObj, index) => {
                  const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`;
                  if (!dateObj) return <Box key={key}/>;
                  const {date} = dateObj;
                  return (
                    <DayOfMonth
                      key={key}
                      dateObj={dateObj}
                      propsConfigs={propsConfigs}
                      renderProps={renderProps}
                      isInRange={isInRange && isInRange(date)}
                      onMouseEnter={() => {
                        if (onMouseEnterHighlight) onMouseEnterHighlight(date);
                      }}
                    />
                  );
                });
              })}
            </SimpleGrid>
          </Box>
        );
      })}
    </Stack>
  );
};
