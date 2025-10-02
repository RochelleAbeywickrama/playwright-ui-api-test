# Test Plan – Petstore API

This document covers the **API Testing** of [Swagger Petstore](https://petstore.swagger.io/).

We test two key sets of APIs from the Swagger Petstore service:  
- **Pet API** (`/pet`)  
- **Store API** (`/store`)  

## Scope

- Verify key **CRUD operations** of the Pet API (`/pet` endpoints) and Store API (`/store` endpoints).
- Cover **positive** and **negative** scenarios.
- Ensure test data is cleaned up (pets created are later deleted as same for store orders).
- Implement tests in **serial mode** so data dependencies flow correctly.

---

## Framework Choices
- **Playwright**: Chosen to keep UI and API frameworks consistent.  
- **Page Object–like Helpers**: Implemented utility classes to encapsulates requests ( eg: `PetApiHelper` class for `addPet`, `getPetById`, `deletePetById`, etc.).  
- **Fixtures**: Test data (valid/invalid pets) stored in `fixtures/api_data`.  
- **Serial Tests**: Ensure order creation happens before retrieval and deletion.


---

### Pet API Tests

#### Scope
- Validate **pet creation, retrieval, and deletion**.
- Cover **status-based queries**.
- Include **negative tests** (invalid ID, invalid data).

#### Test Cases

| **TC ID** | **Test Case Description** | **Pre-Condition** | **Steps** | **Expected Result** |
|-----------|---------------------------|-------------------|------------|----------------------|
| TC_API_001 | Create Pet with valid pet data | PetStore service is available | 1. Call `addPet` API with valid `id`, `name`, and `status` <br> 2. Capture response | Response should include the same `id` <br> Response contains `name` and `status` properties |
| TC_API_002 | Retrieve Pets by Status = `available` | At least one pet exists with status `"available"` | 1. Call `getPetByStatus("available")` <br> 2. Capture response list | Response is an array with length > 0 |
| TC_API_003 | Retrieve Pets by Status = `pending` | At least one pet exists with status `"pending"` | 1. Call `getPetByStatus("pending")` | Response list length > 0 |
| TC_API_004 | Retrieve Pets by Status = `sold` | At least one pet exists with status `"sold"` | 1. Call `getPetByStatus("sold")` | Response list length > 0 |
| TC_API_005 | Retrieve Pet by valid ID | A pet was created earlier and ID is stored in `createdPetId` | 1. Call `getPetById(createdPetId)` | Response contains `id` matching `createdPetId` |
| TC_API_006 | Retrieve Pet by invalid ID | Use a non-numeric or non-existent ID (e.g., `"invalidId"`) | 1. Call `getPetByInvalidId("invalidId")` | Response contains error JSON with `code`, `type`, and `message` |
| TC_API_007 | Delete Pet by valid ID | A pet with `createdPetId` exists | 1. Call `deletePetById(createdPetId)` | Response contains `code`, `type`, and `message` <br> Message contains deleted pet ID |
| TC_API_008 | Create Pet with invalid pet data | Use payload with missing/invalid attributes | 1. Call `addInvalidPetData(createInvalidPet)` | Response contains error JSON with `code`, `type`, and `message` |



---

### Store API Tests

#### Scope
- Validate the **order lifecycle**: create → get → delete.
- Validate **store inventory API**.

#### Test Cases

| **TC ID** | **Test Case Description** | **Pre-Condition** | **Steps** | **Expected Result** |
|-----------|---------------------------|-------------------|------------|----------------------|
| TC_STORE_001 | Create Order with valid data | Store API is available | 1. Call `placeOrder` with valid `id`, `petId`, `quantity`, `status` <br> 2. Capture response | Response contains correct `id` <br> Response has properties `petId`, `quantity`, `shipDate`, `status`, `complete` |
| TC_STORE_002 | Retrieve Store Inventory | Store API is available | 1. Call `getInventory` <br> 2. Capture response | Response contains inventory properties: `available`, `pending`, `sold` |
| TC_STORE_003 | Retrieve Order by valid ID | A valid order was created earlier | 1. Call `getOrderById(createOrderId)` | Response contains `id` matching `createOrderId` |
| TC_STORE_004 | Delete Order by valid ID | A valid order exists | 1. Call `deleteOrderById(createOrderId)` | Response contains `code`, `type`, and `message` <br> `message` confirms deletion of correct ID |


---
