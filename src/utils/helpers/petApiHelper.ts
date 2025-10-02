import { APIRequestContext, expect } from '@playwright/test';

// export class PetApi {
//   readonly request: APIRequestContext;
//   readonly basePath = '/pet';
//   readonly baseURL: string;

//   constructor(request: APIRequestContext, baseURL: string) {
//     this.request = request;
//     this.baseURL = baseURL; // for logging full URL
//   }

//   async createPet(pet: any) {
//     // const fullUrl = `${this.baseURL}${this.basePath}`;
//     // console.log('[API REQUEST] POST', fullUrl);
//     // console.log('[REQUEST BODY]', JSON.stringify(pet, null, 2));

//     const response = await this.request.post(this.basePath, {
//       headers: { 'Content-Type': 'application/json' },
//       data: pet,
//     });

//     const rawBody = await response.text();
//     console.log('[RESPONSE STATUS]', response.status());
//     console.log('[RAW RESPONSE BODY]', rawBody);

//     // Parse JSON safely
//     let responseBody;
//     try {
//       responseBody = JSON.parse(rawBody);
//     } catch (err) {
//       throw new Error(`Expected JSON but got:\n${rawBody}`);
//     }

//     expect(response.ok()).toBeTruthy();
//     return responseBody;
//   }
// }


export class PetApiHelper {
  private request: APIRequestContext;
  private basePath = '/v2/pet';


  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addPet(petData: any): Promise<any> {
    // console.log('[REQUEST BODY]', JSON.stringify(petData, null, 2));
    const response = await this.request.post(`${this.basePath}`, {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Add Pet Response:', body);
    return body;
  }

  async addInvalidPetData(petData: any): Promise<any> {
    const response = await this.request.post(`${this.basePath}`, {
      headers: { 'Content-Type': 'application/json' },
      data: petData,
    });
    expect(response.ok()).toBeFalsy();
    expect([400, 500]).toContain(response.status());
    const body = await response.json();
    return body;
  }

  async getPetByStatus(petStatus: string): Promise<any> {
    const response = await this.request.get(`${this.basePath}/findByStatus`, {
      params: { status: petStatus },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Get Pet by Status Response:', body);
    return body;
  }

  async getPetById(petId: number): Promise<any> {
    const response = await this.request.get(`${this.basePath}/${petId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log('Get Pet by Id Response:', body);
    return body;
  }

    async getPetByInvalidId(invalidId: string): Promise<any> {
    const response = await this.request.get(`${this.basePath}/${invalidId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.ok()).toBeFalsy();
    expect([400, 404]).toContain(response.status());
    const body = await response.json();
    console.log('Get Pet by Id Response:', body);
    return body;
  }

  // async deletePetById(petId: number): Promise<void> {
  //   const response = await this.request.delete(`${this.basePath}/${petId}`, {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   const body = await response.text()
  //   console.log(`Delete Pet Response:`, body);
  //   expect(response.ok()).toBeTruthy();
  //   // expect(response.status()).toBe(200);
  //   console.log(`Deleted Pet Id: ${petId}`);
  // }

  async deletePetById(request: APIRequestContext, createdPetId: number) {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/${createdPetId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('Status:', response.status());
  console.log('Body:', await response.text()); // DELETE may return empty body
  // Assert that deletion was successful
  expect([200, 204]).toContain(response.status());
  return response.json();
  }

}