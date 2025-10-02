import { test, expect , request} from '@playwright/test';
import { createPet, createInvalidPet } from '../../fixtures/api_data/createPet.ts';
import { PetApiHelper } from '../../../src/utils/helpers/petApiHelper.ts';


test.describe.serial('Verify Pet API Functionality', () => {
  let createdPetId = Math.floor(1000 + Math.random() * 9000); //  Global variable - random 4-digit id
  let petHelper: PetApiHelper;

  test('Test - Create Pet with valid pet data', async ({request} ) => {
    petHelper = new PetApiHelper(request);

    // Create a new pet
    const petData = createPet({
      id: createdPetId
    });

    const response = await petHelper.addPet(petData);
    expect(response.id).toBe(createdPetId);
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('status');

    createdPetId = response.id; // Store the created pet ID for later use
    console.log('Created Pet ID:', createdPetId);
  });


test('Test - Retrieve Pets by Status "available"', async ({request} ) => {
   petHelper = new PetApiHelper(request);
  
    const getPetResponse = await petHelper.getPetByStatus('available');
    console.log('Pets with status available:', getPetResponse);
    expect(getPetResponse.length).toBeGreaterThan(0);
  });

  test('Test - Retrieve Pets by Status "pending"', async ({request} ) => {
   petHelper = new PetApiHelper(request);
  
    const getPetResponse = await petHelper.getPetByStatus('pending');
    console.log('Pets with status pending:', getPetResponse);
    expect(getPetResponse.length).toBeGreaterThan(0);
  });

    test('Test - Retrieve Pets by Status "sold"', async ({request} ) => {
   petHelper = new PetApiHelper(request);
  
    const getPetResponse = await petHelper.getPetByStatus('sold');
    console.log('Pets with status sold:', getPetResponse);
    expect(getPetResponse.length).toBeGreaterThan(0);
  });

  test('Test - Retrieve Pet by valid ID', async ({request} ) => {
   petHelper = new PetApiHelper(request);
   console.log('Retrieving Pet with ID:', createdPetId);
  
    // Retrieve the created pet using the stored ID
    const response = await petHelper.getPetById(createdPetId);
    expect(response.id).toBe(createdPetId);
  });


test('Test - Retrieve Pet by invalid Id', async ({request} ) => {
   petHelper = new PetApiHelper(request);
  
    // Retrieve the created pet using the stored ID
    const response = await petHelper.getPetByInvalidId('invalidId');
    expect(response).toHaveProperty('code');
  expect(response).toHaveProperty('type');
  expect(response).toHaveProperty('message'); 
  console.log('Retrieve Pet by invalid data response:', response);
  });


test('DELETE /pet/{id} should remove pet', async ({ request }) => {

     petHelper = new PetApiHelper(request);
  
    // Delete the created pet using the stored ID
    const response = await petHelper.deletePetById(request, createdPetId);
        expect(response).toHaveProperty('code');
  expect(response).toHaveProperty('type');
  expect(response).toHaveProperty('message'); 
  expect(response.message).toContain(createdPetId);
  console.log('Delete Pet response:', response);
});



  test('Test - Create Pet with invalid pet data', async ({request} ) => {
     petHelper = new PetApiHelper(request);

  const response = await petHelper.addInvalidPetData(createInvalidPet);
  expect(response).toHaveProperty('code');
  expect(response).toHaveProperty('type');
  expect(response).toHaveProperty('message'); 
  console.log('Create Pet with invalid data Response:', response);
  });







});




// test('POST /pets returns 200 and valid data', async ({request} ) => {
//         // Create a new pet

//   const petData = createPet({
//     id: createdPetId,
//     name: 'Buddy',
//     status: 'sold',
//     category: { id: 2, name: 'Cats' },
//   });

//   const response = await request.post('/v2/pet', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             data: petData
//         })

//         expect(response.status()).toBe(200);
//         const respBody = await response.json();
//         expect(respBody).toHaveProperty('id');
//         expect(respBody).toHaveProperty('name');
//         expect(respBody).toHaveProperty('status');

//         createdPetId = respBody.id; // Store the created pet ID for later use
//         console.log('Created Pet ID:', createdPetId);

       

// });



// test('GET /pets returns 200 and valid data', async ({request} ) => {
        
//   // Retrieve the created pet using the stored ID

//   const response = await request.get(`/v2/pet/${createdPetId}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//         })
//   // const data = await response.json();
//   // console.log(data);
//   //       expect(response.status()).toBe(200);
//   //       const respBody = await response.json();
//   //       expect(respBody.id).toBe(createdPetId);
//   expect(response.status()).toBe(200);
//         const respBody1 = await response.json();
//         console.log(respBody1);
//         expect(respBody1.id).toBe(createdPetId);

//  // Retrieve the created pet using the stored ID

  
        

//   // const response = await request.get(`https://petstore.swagger.io/v2/pet/123`);
//   // expect(response.status()).toBe(200);

//   // const data = await response.json();
//   // console.log(data);
//   // expect(data).toHaveProperty('id', 123);
//   // expect(data).toHaveProperty('name');
//   // expect(data).toHaveProperty('status');
// });



