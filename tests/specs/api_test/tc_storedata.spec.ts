import { test, expect } from "@playwright/test";
import { StoreApiHelper } from "../../../src/utils/helpers/storeApiHelper";
import { createOrder } from "../../fixtures/api_data/createOrder.ts"; 

test.describe.serial("Store API Tests", () => {
  let storeHelper: StoreApiHelper;
  let createOrderId = Math.floor(1000 + Math.random() * 9000); //  Global variable - random 4-digit id

  test("Test - Create Order with valid data", async ({ request }) => {
    storeHelper = new StoreApiHelper(request);

    // Create a new order
    const orderData = createOrder({
      id: createOrderId,
    });

    const response = await storeHelper.placeOrder(orderData);
    expect(response.id).toBe(createOrderId);
    expect(response).toHaveProperty("petId");
    expect(response).toHaveProperty("quantity");
    expect(response).toHaveProperty("shipDate");
    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("complete");
  });

test("Test - Retrieve Store Inventory", async ({ request }) => {
    storeHelper = new StoreApiHelper(request);
    const inventoryResponse = await storeHelper.getInventory();
    expect(inventoryResponse).toHaveProperty("available");
    expect(inventoryResponse).toHaveProperty("pending");
    expect(inventoryResponse).toHaveProperty("sold");
  });


  test("Test - Retrieve Order by ID", async ({
    request,
  }) => {
    storeHelper = new StoreApiHelper(request);

    // Retrieve the created order using the stored ID
    const getOrderResponse = await storeHelper.getOrderById(createOrderId);
    expect(getOrderResponse.id).toBe(createOrderId);
  });

  test("Test - Delete Order by ID", async ({ request }) => {
    storeHelper = new StoreApiHelper(request);

    // Delete the created order using the stored ID
   const response = await storeHelper.deleteOrderById(createOrderId);
   expect(response).toHaveProperty('code');
  expect(response).toHaveProperty('type');
  expect(response).toHaveProperty('message'); 
  console.log('Delete Order response:', response);
  });
});
