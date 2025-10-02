// export const pets = {
//   default: {
//     id: Math.floor(1000 + Math.random() * 9000), // random 4 digit id
//     category: { id: 1, name: 'Dogs' },
//     name: 'doggie',
//     photoUrls: ['https://example.com/photo.png'],
//     tags: [{ id: 1, name: 'cute' }],
//     status: 'available',
//   },
// };


//id: Math.floor(1000 + Math.random() * 9000),

export const createPet = (overrides: Partial<any> = {}) => {
  return {
    id: Math.floor(1000 + Math.random() * 9000), // random 4-digit id
    category: { id: 1, name: 'Dogs' },
    name: 'doggie',
    photoUrls: ['https://example.com/photo.png'],
    tags: [{ id: 1, name: 'cute' }],
    status: 'available',
    ...overrides, // apply overrides last
  };
};

export const createInvalidPet = {
    id: 'abc',
    category: { id: 1, name: 'Dogs' },
    name: 'doggie',
    photoUrls: ['https://example.com/photo.png'],
    tags: [{ id: 1, name: 'cute' }],
    status: 'available',
};