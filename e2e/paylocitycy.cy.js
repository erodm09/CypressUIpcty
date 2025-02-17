describe('Login Validation Tests (UI Only)', () => {
  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/LogIn');
  });

  it('should display required field errors when both username and password are missing', () => {
    // Click the Log In button without entering any credentials
    cy.get('button[type="submit"]').click();

    // Verify that both error messages are displayed
    cy.get('.validation-summary-errors ul li')
      .should('contain', 'The Username field is required.')
      .and('contain', 'The Password field is required.');
  });

  it('should display an error when only username is provided', () => {
    // Fill in the username only
    cy.get('#Username').type('SomeUser');
    cy.get('button[type="submit"]').click();

    // Verify that the error for missing password is shown
    cy.get('.validation-summary-errors ul li')
      .should('contain', 'The Password field is required.');
  });

  it('should display an error when only password is provided', () => {
    // Fill in the password only
    cy.get('#Password').type('SomePassword');
    cy.get('button[type="submit"]').click();

    // Verify that the error for missing username is shown
    cy.get('.validation-summary-errors ul li')
      .should('contain', 'The Username field is required.');
  });

  it('should show a blank page when wrong credentials are entered', () => {
    // Enter wrong credentials
    cy.get('#Username').type('WrongUser');
    cy.get('#Password').type('WrongPassword');

    // Click the "Log In" button
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.document().its('body.innerHTML').should('match', /^\s*$/);
  });

});
// ---------------------- LOGIN TESTS ----------------------
describe('Login Tests', () => {
  it('should log in successfully', () => {
    cy.login();
  });
});

// ---------------------- EMPLOYEE MANAGEMENT  ----------------------
describe('Employee Management - Add, Edit, and Delete (UI Only)', () => {
  let employeeId;
  let originalData, editedData;

  // Log in and navigate to the dashboard before each test
  beforeEach(() => {
    cy.login();
    cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits');
    cy.get('#employeesTable', { timeout: 10000 }).should('be.visible');
  });

  // Log out after each test
  afterEach(() => {
    cy.logout();
  });

  it('should add a new employee with correct benefit cost', () => {
    // Generate random employee data using Faker
    cy.generateEmployeeData().then((data) => {
      originalData = data;
      const totalAnnualCost = 1000 + (Number(data.dependents) * 500);
      const expectedBenefitCost = (totalAnnualCost / 26).toFixed(2);

      // Open the "Add Employee" modal and fils out the form
      cy.get('#add').click();
      cy.get('#employeeModal').should('be.visible');
      cy.get('#firstName').type(data.firstName);
      cy.get('#lastName').type(data.lastName);
      cy.get('#dependants').type(data.dependents);
      cy.get('#addEmployee').click();

      // Wait briefly for the table to update
      cy.wait(1000);

      // Locate the new row by the unique first name and capture the employee ID from column 0
      cy.get('#employeesTable tbody tr').contains('td', data.firstName)
        .parent()
        .then(($row) => {
          employeeId = $row.find('td').eq(0).text().trim();
        });

      // Verify that the new row displays the correct details including benefit cost (assumed in column index 6)
      cy.get('#employeesTable tbody tr').contains('td', data.firstName)
        .parent()
        .within(() => {
          cy.get('td').eq(1).should('contain', data.firstName);
          cy.get('td').eq(2).should('contain', data.lastName);
          cy.get('td').eq(3).should('contain', data.dependents);
          cy.get('td').eq(6).should('contain', expectedBenefitCost);
        });
    });
  });

  it('should edit the newly added employee and update benefit cost correctly', () => {
    // Generate new random data for editing
    cy.generateEmployeeData().then((data) => {
      editedData = data;
      const totalAnnualCost = 1000 + (Number(data.dependents) * 500);
      const expectedBenefitCost = (totalAnnualCost / 26).toFixed(2);

      // Locate the row by the stored employeeId and click the edit icon
      cy.get('#employeesTable tbody tr').contains('td', employeeId)
        .parent()
        .within(() => {
          cy.get('.fa-edit').click();
        });

      // Wait for the edit modal, update details, and click Update
      cy.get('#employeeModal').should('be.visible');
      cy.get('#firstName').clear().type(data.firstName);
      cy.get('#lastName').clear().type(data.lastName);
      cy.get('#dependants').clear().type(data.dependents);
      cy.get('#updateEmployee').click();
      cy.wait(1000);
      cy.get('#employeesTable tbody tr').contains('td', employeeId)
        .parent()
        .within(() => {
          cy.get('td').eq(1).should('contain', data.firstName);
          cy.get('td').eq(2).should('contain', data.lastName);
          cy.get('td').eq(3).should('contain', data.dependents);
          cy.get('td').eq(6).should('contain', expectedBenefitCost);
        });
    });
  });

  it('should delete the newly edited employee', () => {
    cy.get('#employeesTable tbody tr').contains('td', employeeId)
      .parent()
      .within(() => {
        cy.get('.fa-times').click();
      });
    cy.get('#deleteModal').should('be.visible');
    cy.get('#deleteEmployee').click();
    cy.wait(1000);
    cy.get('#employeesTable tbody tr').should('not.contain', employeeId);
  });

});