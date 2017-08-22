describe('Logging In - HTML Web Form', function() {
    // before(function () {
    //     // change the baseUrl since we do lots of separate
    //     // visits and requests in these tests
    //     Cypress.config('baseUrl', 'http://localhost:3000')
    // })


    context('XHR form submission', function() {

        beforeEach(function () {
            cy.visit('/#/login')
        })

        it('displays errors on login', function () {
            cy.server()

            // alias this route so we can wait on it later
            cy.route('POST', '/#/login')

            cy.get('input[id=username]')
            cy.get('input[id=password]').type('{enter}')

            // we should always explictly wait for
            // the response for this POST to come back
            // so our tests are not potentially flaky or brittle


            // we should have visible errors now
            // cy.get('p.error')
            //     .should('be.visible')
            //     .and('contain', 'Username and/or password is incorrect')

            // and still be on the same URL
            cy.url().should('include', '/home')
        })
    })


    context('Unauthorized', function () {
        it('visit to /home when no session', function () {
            // we must have a valid session cookie to be logged
            // in else we are redirected to /unauthorized
            cy.visit('/#/home')
            cy.get('div').should('contain', 'Please log in')
        })
    })

    context('HTML form submission', function() {
        beforeEach(function () {
            cy.visit('/#/login')
        })

        it('redirects to /home on success', function(){
            cy.get('input#username')
            cy.get('input#password')
            cy.get('button[type=submit]').click()

            // we should be redirected to /home
            cy.url().should('include', '/home')

        })


    })
})

