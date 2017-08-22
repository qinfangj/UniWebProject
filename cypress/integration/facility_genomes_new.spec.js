describe('Genomes - HTML Web Form', function() {

    context('New Genomes HTML form submission', function() {
        beforeEach(function () {
            cy.login("test", "test")
        })

        it('visit genomes new page', function(){
            cy.visit('/#/facility/genomes/new')

            //pull down columns
            cy.get('select#taxoId').select("117")

            //input columns
            cy.get('input#assembly').type('assembly1')
            cy.get('input#genomeFolder').type('genome_folder1')
            cy.get('input#url').type('ftp://url')
            cy.get('input#files').type('filename1')


            cy.get('button[type=submit]').click()

            cy.url().should('include', '/genomes/list')

        })

    })
})
