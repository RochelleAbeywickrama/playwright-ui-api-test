export const createOrder = (overrides: Partial<any> = {}) => {
  return {
    id: Math.floor(1000 + Math.random() * 9000), // random 4-digit id
    petId: 0,
    quantity: 0,
    shipDate: "2025-10-01T14:00:22.627Z",
    status: "placed",
    complete: true,
    ...overrides, // apply overrides last
  };
};
