# Project Naming Conventions

## 📂 Project Structure Naming
- **Directories:** Use `kebab-case` (lowercase with hyphens)  
  - Test modules - `api-test/`, `ui-test/`
  - Other directories - `utils/`
  
- **Files:** Use `camelCase.ts`
  - eg: `createOrder.ts`, `login.page.ts`, `petApiHelper.ts`
  


## 🏷️ Standards and Guidelines
### 1️⃣ **Test Files**
- Test files should be named in **camelCase** and end with `.page.ts` for Page Object classes and `.spec.ts` for Test specs.
   `login.page.ts`, `verifyLoginFeature.spec.ts`

### 2️⃣ **Test Suites & Descriptions**
- Use **descriptive names** inside `describe()`.
- Use **beforeEach & afterEach** inside `describe()`.
- Use **action-based names** inside `test()`.

```typescript
test.describe('Login Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    ....
  });

  test('Verify login with valid standard user', async () => {
    .....
  });

  test('Verify login with valid locked out user', async () => {
    ......
  });

});
```

### 3️⃣ **Page Object Classes**
- Page object class names should use **PascalCase**.
- File name should match the class name in `camelCase.ts`.

```typescript
export class LoginPage {

  async login(username: string, password: string) {...}

  async assertLoginSuccess() {...}
}
```
Example file: `login.page.ts`

### 4️⃣ **Locators & Selectors**
- Use `camelCase` for element selectors.
- Keep names **descriptive** and **short**.
- Mark locators as `readonly` so they cannot be reassigned accidentally.

```typescript
  readonly txt_username: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txt_username = page.locator('#user-name'); // by id
  }
```
Example element: `txt_password`, `btn_login`




## Best Practices
✅ Follow **consistent** naming conventions throughout the project.  
✅ Keep names **short**, **descriptive**, and **action-oriented**.  
✅ Use **PascalCase** for classes, **camelCase** for variables & functions.  

Following these conventions ensures **clean, readable, and maintainable** test automation code. 