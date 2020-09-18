// const { values } = require("cypress/types/lodash")

describe('Lambda Tests', () => {

    const button = () => cy.get('button')

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    function valueWorks(toCheck, content) {
        const item = () => cy.get(toCheck)

        item()
            .type(content)
            .should('have.value', content)
    }

    function checkedTest(){
        cy.get('[name="terms"]')
        .not('have.checked')
        .click()
        .should('have.checked')
    }

    function rolesTest(toSelect){
        cy.get('[name="role"]').select(toSelect)
    }

    it('Name test', () => {
        valueWorks('[name=name]', 'Rhea Manuel')
        // cy.get('[name=name]')
        //     .type('Rhea Manuel')
        //     .should('have.value', 'Rhea Manuel')
    })

    it('Email test', () => {
        const email = () => cy.get('[name="email"]')

        email()
            .type('Not an email')

        button()
            .should('have.disabled')

        email().clear()

        valueWorks('[name="email"]', 'working@domain.com')
    })

    it('Password test', () => {
        valueWorks('[name="password"]', 'longpassword')
    })

    it('Terms of Service Test', () => {
        checkedTest()

    })

    it('Roles test', () => {
        const allRoles = ['Frontend developer', 'Backend devloper', 'Designer']

        for (let i = 0; i < allRoles.length; i++) {
            rolesTest(allRoles[i])
        }
    })

    it('Can Submit', () => {
        valueWorks('[name=name]', 'Rhea Manuel')
        valueWorks('[name="email"]', 'working@domain.com')
        valueWorks('[name="password"]', 'longpassword')
        checkedTest()
        rolesTest('Frontend developer')

        button()
        .not('have.disabled')
        .click()
    
    })

})
