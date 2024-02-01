describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cypress',
      username: 'cypress',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })



  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in')
      cy.get('#username').type('cypress')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('cypress logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in')
      cy.get('#username').type('cypress')
      cy.get('#password').type('ei niin salainen')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  /*describe('Blog app', function() {
    // ...
    describe('When logged in', function() {
      beforeEach(function() {
        // log in user here
      })
      it('A blog can be created', function() {
        // ...
      })

      it('A blog can be liked', function() {

      })
      it('A blog can be liked', function() {

      })
      it('A blog can be liked', function() {

      })
      it('A blog can be liked', function() {

      })

    })
  })
   */

})