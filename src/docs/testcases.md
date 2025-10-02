# Demo Application Test Plan

## Project Information
- **Project:** Demo Application Testing  
- **Prepared By:** Rochelle Abeywickrama 
- **Date:** 1st October 2025
- **Tools:** Playwright (UI + API), TypeScript/JavaScript  
- **Applications Under Test:**  
  - [SauceDemo UI Application](https://www.saucedemo.com/)  
  - [Swagger Petstore API Collection](https://petstore.swagger.io/#/pet/addPet)

---

## Part 1: UI Testing (SauceDemo)

### Features & Test Scenarios

| Feature | Test Scenario | Test Steps | Expected Result | Priority | Status |
|---------|---------------|------------|----------------|----------|--------|
| Login Functionality | Valid login | 1. Go to login page <br> 2. Enter valid username & password <br> 3. Click login | User should be redirected to inventory page | High | Pending |
| Login Functionality | Invalid password | 1. Go to login page <br> 2. Enter valid username & invalid password <br> 3. Click login | Error message "Epic sadface" should appear | High | Pending |
| Login Functionality | Locked out user | 1. Go to login page <br> 2. Enter locked_out_user credentials <br> 3. Click login | Error message "Epic sadface" should appear | Medium | Pending |
| Add to Cart & Checkout | Add single product to cart | 1. Login as standard_user <br> 2. Click "Add to Cart" on a product <br> 3. Go to cart | Product should appear in cart | High | Pending |
| Add to Cart & Checkout | Add multiple products and remove one | 1. Add 2-3 products <br> 2. Remove 1 product <br> 3. Go to cart | Cart should show remaining products correctly | Medium | Pending |
| Add to Cart & Checkout | Complete checkout | 1. Add product(s) to cart <br> 2. Click Checkout <br> 3. Fill details <br> 4. Complete purchase | Order confirmation page should display | High | Pending |

---

## Part 2: API Testing (Swagger Petstore)

### APIs & Test Scenarios

| API | Test Scenario | HTTP Method | Request Example | Expected Result | Priority | Status |
|-----|---------------|------------|----------------|----------------|----------|--------|
| Add Pet | Add valid pet | POST | `{ "id": 1001, "name": "Buddy", "status": "available" }` | Response 200, petId returned, name matches | High | Pending |
| Add Pet | Missing required fields | POST | `{ "id": 1002, "status": "available" }` | Response 400, validation error | High | Pending |
| Add Pet | Duplicate pet ID | POST | `{ "id": 1001, "name": "Buddy", "status": "available" }` | Response depends on API behavior (verify duplicate handling) | Medium | Pending |
| Get Pet by ID | Retrieve existing pet | GET | `/pet/1001` | Response 200, pet details match | High | Pending |
| Get Pet by ID | Retrieve non-existing pet | GET | `/pet/99999` | Response 404, pet not found | High | Pending |
| Get Pet by ID | Retrieve pet after adding | GET | `/pet/{newlyAddedPetId}` | Response 200, details match previously added pet | Medium | Pending |

---

## Framework Architecture Summary

### UI Framework
- **Tool:** Playwright (TypeScript/JavaScript)  
- **Design Pattern:** Page Object Model (POM)  
- **Reporting:** Playwright HTML Reporter / Allure  
- **Folder Structure:**
```text
tests/
pages/
utils/
playwright.config.ts
