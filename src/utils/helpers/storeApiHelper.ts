import { APIRequestContext, expect } from "@playwright/test";

export class StoreApiHelper {
  private request: APIRequestContext;
  private basePath = "/v2/store";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getInventory(): Promise<any> {
    const response = await this.request.get(`${this.basePath}/inventory`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    return body;
  }

  async placeOrder(orderData: any): Promise<any> {
    const response = await this.request.post(`${this.basePath}/order`, {
      headers: { "Content-Type": "application/json" },
      data: orderData,
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log("Place Order Id:", body.id);
    return response.json();
  }

  async getOrderById(orderId: number): Promise<any> {
    const response = await this.request.get(
      `${this.basePath}/order/${orderId}`,
    );
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log("Get Order By Id:", body.id);
    return response.json();
  }

  async deleteOrderById(orderId: number): Promise<void> {
    const response = await this.request.delete(
      `${this.basePath}/order/${orderId}`,
    );
    expect(response.status()).toBe(200);
    return response.json();
  }
}
