# UI & API Automation Framework

This project demonstrates how to use **Playwright** to automate Web application and API testing using **Typescript (Node.js)**. It follows the **Page Object Model (POM)** for better maintainability and scalability.


## Project Information
- **Project:** SauceDemo Application & PetStore API Testing  
- **Prepared By:** Rochelle Abeywickrama 
- **Tools:** Playwright & TypeScript 
- **Design Pattern:** Page Object Model (POM), Data-driven + fixtures 
- **Reporting:** Playwright HTML Reporter / Allure 
- **Applications Under Test:**  
  - [SauceDemo UI Application](https://www.saucedemo.com/)  
  - [Petstore API Collection](https://petstore.swagger.io/#/)
- **Key Advantages:**  
    - Reusable Page Objects for UI elements
    - Consistent API request handling
    - Easy CI/CD integration
    - Clear separation of test data, page objects, and tests



### Folder Structure:
```text
src/
   docs/                      << Project docs
   utils/                     << Helpers, Postman Collection


object_repository/          << Page Objects
tests/                      << UI & API Test Scripts
helpers/                    << UI & API Helper classes
resources/                  << Test Data, Artefacts, Postman Collection
playwright.config.ts        << Configuration
```



## 📌 Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (as package manager)
- [VSCode](https://code.visualstudio.com/download) or any prefered IDE


Also, refer to naming standards [naming conventions for project](resources/artefacts/naming-standards.md)


---

## 🚀 Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone <url>
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```


---

## ▶️ Running Tests

Use following commands to run tests in different configurations:

   ```sh
   #To execute the UI tests:
   npm run run:ui:test
   
   #To execute the API:
   npm run run:api:test
   ```

---

## 📊 Test Results & Reporting

Generate Allure report locally:
   ```sh
   npm run allure:report
   ```





## 🔗 Reference

**Reading materials & Downloads:**

- [Playwright Docs](https://playwright.dev/docs/best-practices)
- [Playwright Video Guides](https://www.youtube.com/@Playwrightdev)
- [VSCode Download](https://code.visualstudio.com/download)


---

Happy Testing! 🚀