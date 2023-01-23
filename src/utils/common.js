import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const capitalizeFirstLetter = (string) => string.charAt(0)
  .toUpperCase() + string.slice(1);

const isFuturePoint = (dateFrom) => dateFrom && (dayjs().isSame(dateFrom, 'D') || dayjs().isBefore(dateFrom, 'D'));

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, capitalizeFirstLetter, isFuturePoint, updateItem };
