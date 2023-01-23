const mockOffersByType = [
  {
    type: 'taxi',
    offers: [0, 1, 2, 3]
  },
  {
    type: 'bus',
    offers: [0, 1, 2]
  },
  {
    type: 'train',
    offers: [2, 3]
  },
  {
    type: 'ship',
    offers: [3, 4]
  },
  {
    type: 'drive',
    offers: [1, 4]
  },
  {
    type: 'flight',
    offers: [2, 4]
  },
  {
    type: 'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [0, 1, 3]
  },
  {
    type: 'restaurant',
    offers: [0, 1, 2, 3, 4]
  },
];

function getOffersByType() {
  return mockOffersByType;
}

export { getOffersByType };
