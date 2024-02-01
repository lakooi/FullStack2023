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
      cy.login('cypress','salainen')
      cy.visit('http://localhost:5173')
    })

    it('fails with wrong credentials', function() {
      cy.login('cypress','ei niin salainen')

      cy.contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('Blog app', function() {
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login('cypress','salainen')
      })

      it('A blog can be created', function() {
        cy.createBlog('titteli','authori','url.com')
        cy.contains('a new blog titteli by authori has been added')
        cy.get('div.blog').contains('titteli authori')
      })

      it('A blog can be liked', function() {
        cy.createBlog('titteli','authori','url.com')
        cy.openBlog('titteli', 'authori')
        cy.get('div.blog').contains('titteli authori').contains('likes 0')
        cy.likeBlog('titteli', 'authori')
        cy.get('div.blog').contains('titteli authori').contains('likes 1')
      })
      it('A blog can be deleted by the user that created the blog', function() {
        cy.createBlog('titteli','authori','url.com')
        //This refresh of the page seems to make the test much less flaky, as sometimes the remove button is not visible without it.
        cy.visit('http://localhost:5173')
        cy.openBlog('titteli', 'authori')
        cy.get('button').contains('remove').should('exist')
        cy.get('div.blog').contains('titteli authori').find('button').contains('remove').click()
        cy.contains('blog titteli by authori has been removed')
        cy.contains('titteli authori').should('not.exist')
      })
      it('A blog can not be deleted by non creator users', function() {
        const user = {
          name: 'cypress2',
          username: 'cypress2',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.createBlog('titteli','authori','url.com')
        cy.visit('http://localhost:5173')
        cy.contains('logout').click()
        cy.login('cypress2','salainen')
        cy.get('div.blog').contains('titteli authori').find('button').contains('view').click()
        cy.get('button').contains('remove').should('not.exist')
      })
      it('A blog with the most likes should be the first blog', function() {
        cy.createBlog('titteli','authori','url.com')
        cy.visit('http://localhost:5173')
        cy.createBlog('testi','testeri','url.com')
        cy.get('.blog').eq(0).should('contain', 'titteli')
        cy.get('.blog').eq(1).should('contain', 'testi')
        cy.openBlog('testi', 'testeri')
        cy.likeBlog('testi', 'testeri')
        cy.get('.blog').eq(0).should('contain', 'testi')
        cy.get('.blog').eq(1).should('contain', 'titteli')
        cy.openBlog('titteli', 'authori')
        cy.likeBlog('titteli', 'authori')
        cy.likeBlog('titteli', 'authori')
        cy.get('.blog').eq(0).should('contain', 'titteli')
        cy.get('.blog').eq(1).should('contain', 'testi')
      })
    })
  })
})