const mockDestinations = [
  {
    id: 0,
    description: 'Ashgabat is the capital of Turkmenistan. It’s known for its white marble buildings and grandiose national monuments.',
    name: 'Ashgabat',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Ashgabat parliament building',
      }
    ]
  },
  {
    id: 1,
    description: 'Kabul is the capital and largest city of Afghanistan. Located in the eastern half of the country, it is also a municipality, forming part of the Kabul Province.',
    name: 'Kabul',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Kabul parliament building',
      }
    ]
  },
  {
    id: 2,
    description: 'Caracas, Venezuela\'s capital, is a commercial and cultural center located in a northern mountain valley.',
    name: 'Caracas',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Caracas parliament building',
      }
    ]
  },
  {
    id: 3,
    description: 'Pyongyang is the capital and largest city of North Korea, where it is known as the "Capital of the Revolution".',
    name: 'Pyongyang',
    pictures: [
      {
        src: 'https://i.ibb.co/CPm5sb1/kim.jpg',
        description: 'The leader of the Workers\' Party',
      }
    ]
  },
];

function getDestinations() {
  return mockDestinations;
}

export { getDestinations };
