# UI Test Plan – SauceDemo (Playwright)

This document outlines the **UI automation test plan** for [SauceDemo](https://www.saucedemo.com/) using **Playwright** with the **Page Object Model (POM)** design pattern.

---

## Scope
- Validate **Login** and **Inventory (Products)** features.
- Automate functional tests for **sorting** and **basic navigation**.
- Build a **maintainable framework** for UI regression testing.

---

## Framework & Tools
- **Playwright** → UI automation framework.
- **TypeScript** → For strong typing and maintainability.
- **Page Object Model (POM)** → Encapsulation of page selectors and actions.
- **Locators** → Stable selectors (`id`, `data-test`, `css`) for reliable tests.
- **Playwright Test Reporter** → For HTML test reports.
- **Allure Test Reporter** → For Graphical test reports.

---

## Test Cases - Login Feature

| **TC ID** | **Title** | **Pre-Condition** | **Test Steps** | **Expected Result** |
|-----------|-----------|-------------------|----------------|----------------------|
| TC_UI_LOGIN_001 | Verify login with valid standard user | User is on login page | 1. Enter `standard_user` username <br> 2. Enter valid password <br> 3. Click `Login` | User is redirected to `/inventory.html` <br> Inventory list is visible |
| TC_UI_LOGIN_002 | Verify login with locked-out user | User is on login page | 1. Enter `locked_out_user` username <br> 2. Enter valid password <br> 3. Click `Login` | Error message is displayed: `"Epic sadface: Sorry, this user has been locked out."` <br>  User stays on login page |
| TC_UI_LOGIN_003 | Verify login with invalid credentials (wrong password) | User is on login page | 1. Enter `standard_user` username <br> 2. Enter invalid password <br> 3. Click `Login` | Error message is displayed: `"Username and password do not match any user in this service"` |
| TC_UI_LOGIN_004 | Verify login with invalid credentials (wrong username) | User is on login page | 1. Enter invalid username <br> 2. Enter valid password <br> 3. Click `Login` | Error message is displayed: `"Username and password do not match any user in this service"` |


---

##  Test Cases - Home Page Functionality

| **TC ID** | **Title** | **Pre-Condition** | **Test Steps** | **Expected Result** |
|-----------|-----------|-------------------|----------------|----------------------|
| TC_UI_HOME_001 | Verify Home Page elements | User is logged in as `standard_user` | 1. Navigate to `/inventory.html` <br> 2. Verify menu button <br> 3. Verify shopping cart link <br> 4. Verify product count > 0 <br> 5. Verify sorting dropdown <br> 6. Verify footer elements | Menu button is visible <br> Shopping cart link is visible <br> Product count > 0 <br> Sorting dropdown is visible <br> Footer elements are present |
| TC_UI_HOME_002 | Verify A–Z sorting functionality | User is logged in, products available | 1. Select sort option `Name (A to Z)` <br> 2. Capture product names | Product names are sorted alphabetically (ascending) |
| TC_UI_HOME_003 | Verify Z–A sorting functionality | User is logged in, products available | 1. Select sort option `Name (Z to A)` <br> 2. Capture product names | Product names are sorted alphabetically (descending) |
| TC_UI_HOME_004 | Verify Price Low → High sorting functionality | User is logged in, products available | 1. Select sort option `Price (low to high)` <br> 2. Capture product prices |  Product prices are sorted in ascending order |
| TC_UI_HOME_005 | Verify Price High → Low sorting functionality | User is logged in, products available | 1. Select sort option `Price (high to low)` <br> 2. Capture product prices |  Product prices are sorted in descending order |

