Cypress STE  Automation Challenge - Paylocity Benefits Dashboard

## 📌 Project Overview
This project automates UI testing for the **Paylocity Benefits Dashboard** using Cypress. It covers:
- **Login validation** (required fields, incorrect credentials)
- **Employee Management** (Add, Edit, Delete with dynamic data)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Faker.js for Random Test Data](#fakerjs-for-random-test-data)
- [Running Cypress Tests](#running-cypress-tests)
- [Custom Commands](#custom-commands)

---

## Prerequisites

1. **Node.js (LTS or Current)**
   - Download from [https://nodejs.org](https://nodejs.org) if not installed.
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Install Git if not already installed.
   - Verify:
     ```bash
     git --version
     ```

3. **Visual Studio Code** (recommended)
   - Download from [https://code.visualstudio.com](https://code.visualstudio.com).

4. **Cypress**
   - Installed locally via `npm install`.

---

## Installation & Setup, Running

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/erodm09/CypressUIpcty.git
   cd CypressUIpcty

2. 	**Install Dependencies**
     ```bash
     npm install
3. **Faker.js for Random Test Data**
    ```bash
    npm install @faker-js/faker --save-dev
4.**Running Cypress Tests**
   ```bash
   npx cypress open
   ```
  -Opens the interactive GUI.
	- Choose your spec file (e.g., cypress/e2e/paylocitycy.cy.js) to run tests visually.
