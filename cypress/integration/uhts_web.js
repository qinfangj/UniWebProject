describe('My First Test', function() {
  it("visit login page", function() {

    //cy.visit('/#/login')
    cy.login("test", "test");
  })
})