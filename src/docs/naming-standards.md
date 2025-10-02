# Project Naming Conventions

## 📂 Project Structure Naming
- **Directories:** Use `kebab-case` (lowercase with hyphens)  
  - Test modules - `auth-portal/`, `betting/`
  - Other directories - `utils/`
  - Portal files - `auth-portal.ts`, `account-portal.ts`
  
- **Files:** Use `camelCase.ts`
  - Page objects - `loginPage.ts`, `userProfile.ts`, `helper.ts`

---

## 🏷️ Naming Conventions
### 1️⃣ **Test Files**
- Test files should be named in **camelCase** and end with `.page.ts` for Page Object classes and `.e2e.ts` for Test specs.
   `betBuilder.page.ts`, `promotions.e2e.ts`

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
class LoginPage {
    async enterUsername(username: string) { ... }
    async enterPassword(password: string) { ... }
    async clickLogin() { ... }
}
export default new LoginPage();
```
Example file: `loginPage.ts`

### 4️⃣ **Locators & Selectors**
- Use `camelCase` for element selectors.
- Keep names **descriptive** and **short**.
- Prefix relevant to element type [refer](https://coingaming.atlassian.net/wiki/spaces/CSP/pages/11078664301/Sportsbet+Mobile+Automation#Best-Practices-to-follow%3A) 

```typescript
public get txt_username() {
  return $('//android.widget.EditText[1]');
}
```
Example element: `txt_username`, `btn_signIn`

### 5️⃣ **Constants & Configs**
- Use `UPPER_CASE` for global constants.
- Store in a separate file like `helper.ts` or `.env`.

```typescript
ANDROID_DEVICE_NAME=emulator-5554
ANDROID_PLATFORM_VERSION=14
```
Example files: `helper.ts` `.env`



## Best Practices
✅ Follow **consistent** naming conventions throughout the project.  
✅ Keep names **short**, **descriptive**, and **action-oriented**.  
✅ Use **PascalCase** for classes, **camelCase** for variables & functions.  

Following these conventions ensures **clean, readable, and maintainable** test automation code. 