// const { values } = require("cypress/types/lodash")

// const { values } = require("cypress/types/lodash")

describe('Lambda Tests', () => {

    const button = () => cy.get('button')

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    

    // Helper function for all input values
    function valueWorks(toCheck, content) {
        const item = () => cy.get(toCheck)

        button().not('has.disabled')

        item()
            .type(content)
            .should('have.value', content)
    }

    // Function for the terms of service
    function checkedTest() {
        cy.get('[name="terms"]')
            .not('have.checked')
            .click()
            .should('have.checked')
    }

    // helper function for the roles
    function rolesTest(toSelect) {
        cy.get('[name="role"]').select(toSelect)
    }

    // Task 1: Name test
    it('Name test', () => {
        valueWorks('[name=name]', 'Rhea Manuel')
        // cy.get('[name=name]')
        //     .type('Rhea Manuel')
        //     .should('have.value', 'Rhea Manuel')
    })

    // Task 2: Email test
    it('Email test', () => {
        const email = () => cy.get('[name="email"]')

        email()
            .type('Not an email')

        button()
            .should('have.disabled')

        email().clear()

        button()
            .should('have.disabled')

        valueWorks('[name="email"]', 'working@domain.com')
    })

    // Task 3 password test
    it('Password test', () => {
        valueWorks('[name="password"]', 'longpassword')
    })

    // Task 4 terms of service test
    it('Terms of Service Test', () => {
        checkedTest()

    })

    // Stretch goal (?) Roles test
    it('Roles test', () => {

        const allRoles = ['Frontend developer', 'Backend devloper', 'Designer']

        for (let i = 0; i < allRoles.length; i++) {
            rolesTest(allRoles[i])
        }
    })

    // Task 5 submit test
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

    // TASK 6: Empty value. Kind of a long-winded way of doing it, but it works. 
    // Basically: populates every field
    it('Empty value', () => {

        // Clicks terms
        cy.get('[name="terms"]').click()

        // Chooses a role
        cy.get('[name="role"]').select('Frontend developer')

        // Now, array for all the inputs
        const name = { toCheck: '[name="name"]', content: 'Rhea Manuel' }
        const email = { toCheck: '[name="email"]', content: 'working@domain.com' }
        const password = { toCheck: '[name="password"]', content: 'longpassword' }

        const toTest = [name, email, password]

        // Array that contains elements to clear in the next round
        let toClear = []

        // Loops through all the inputs 
        for (let i = 0; i < toTest.length; i++) {

            // Clears the form for the next round
            toClear.forEach((item)=>{
                cy.get(item).clear()
            })

            // For every input that ISNT currently being checked for blank input, populates it with verifiably valid data
            for (let other = 0; other < toTest.length; other++) {

                if (other != i) {
                    toClear.push(toTest[other].toCheck)
                    valueWorks(toTest[other].toCheck, toTest[other].content)

                }


            }

            // cy.log(toTest[i].toCheck)
            // makes sure the button is disabled.
            button().should('has.disabled')

        }
    })

})
