import { APIRequestContext, expect } from "@playwright/test";

export class PetApiHelper {
  private request: APIRequestContext;
  private basePath = "/v2/pet";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addPet(petData: any): Promise<any> {
    const response = await this.request.post(`${this.basePath}`, {
      headers: { "Content-Type": "application/json" },
      data: petData,
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("Add Pet Response:", body);
    return body;
  }

  async addInvalidPetData(petData: any): Promise<any> {
    const response = await this.request.post(`${this.basePath}`, {
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("Get Pet by Status Response:", body);
    return body;
  }

  async getPetById(petId: number): Promise<any> {
    const response = await this.request.get(`${this.basePath}/${petId}`, {
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("Get Pet by Id Response:", body);
    return body;
  }

  async getPetByInvalidId(invalidId: string): Promise<any> {
    const response = await this.request.get(`${this.basePath}/${invalidId}`, {
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok()).toBeFalsy();
    expect([400, 404]).toContain(response.status());
    const body = await response.json();
    console.log("Get Pet by Id Response:", body);
    return body;
  }

  async deletePetById(request: APIRequestContext, createdPetId: number) {
    const response = await request.delete(
      `https://petstore.swagger.io/v2/pet/${createdPetId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Status:", response.status());
    console.log("Body:", await response.text()); // DELETE may return empty body
    expect([200, 204]).toContain(response.status());
    return response.json();
  }
}