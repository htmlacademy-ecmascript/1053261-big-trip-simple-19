export const FILTER_VALUE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

export const DEFAULT_FILTER_VALUE = FILTER_VALUE.EVERYTHING;

export const FILTER_VALUE_EMPTY_MESSAGE = {
  [FILTER_VALUE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_VALUE.FUTURE]: 'There are no future events now',
};
