
describe('Lambda Tests', () => {

    const button = () => cy.get('button')

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    context('All tests', () => {

        it('Name test', () => {
            cy.get('[name=name]')
                .type('Rhea Manuel')
                .should('have.value', 'Rhea Manuel')
        })

        it('Email test', () => {
            cy.get('[name="email"]')
                .type('email@domain.com')
                .should('have.value', 'email@domain.com')
                .clear()
                .type('Not an email')

            button()
                .should('have.disabled', false)
        })

        it('Password test', () => {
            cy.get('[name="password"]')
                .type('short')
                .should('have.value', 'short')
            button()
                .should('have.disabled', false)
        })

        it('Terms of Service Test', () => {
            cy.get('[name="terms"]')
                .click()
                .should('have.checked')
                .click()
                .not('have.checked')
        })

        it('Can Submit', () => {
            cy.get('[name"name"]')
                .type('Rhea Manuel')

            cy.get('[name="email"]')
                .type('validemail@domain.com')

            cy.get('[name=""]')
        })
    })
})
