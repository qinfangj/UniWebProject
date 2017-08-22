describe('Admin Flowcell Type - HTML Web Form', function() {

    context('HTML form submission', function() {
        beforeEach(function () {
            cy.visit('/#/login')
        })

        it('visit admin Flowcell Type new page', function(){
            cy.get('input#username')
            cy.get('input#password')
            cy.get('button[type=submit]').click()

            // we should be redirected to /home
            cy.url().should('include', '/home')

            cy.visit('/#/admin/flowcell_types/new')

            cy.get('input#version').type("Ver3.0")
            cy.get('button[type=submit]').click()

            cy.url().should('include', '/flowcell_types/list')

        })

    })
})

