// ***********************************************
// This example commands.js shows you how to
// create the custom command: 'login'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************
//
Cypress.addParentCommand("login", function(username, password){
  var username = username || ""
  var password = password || ""

  var log = Cypress.Log.command({
    name: "login",
    message: [username, password],
    consoleProps: function(){
      return {
        email: username,
        password: password
      }
    }
  })

  cy
    .visit("/#/login", {log: false})
    .contains("Log In", {log: false})
    .get("input#username", {log: false})
    .get("input#password", {log: false}).type("{enter}", {log: false})
    .get("button[type=submit]", {log: false}).click({log: false}) //this should submit the form

    //.get("h1", {log: false}).should('contain','Welcome',{log: false}) //we should be on the home now
    .url({log: false}).should("contain", "/home", {log: false})
    .then(function(){
      log.snapshot().end()
    })
})