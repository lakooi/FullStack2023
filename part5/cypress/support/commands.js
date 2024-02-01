// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (user, password) => {
  cy.visit('http://localhost:5173')
  cy.contains('log in')
  cy.get('[data-cy="username"]').type(user)
  cy.get('[data-cy="password"]').type(password)
  cy.get('[data-cy=login-button]').click()
})

Cypress.Commands.add('createBlog', (title,author,url) => {
  cy.contains('new blog').click()
  cy.get('[data-cy="title-input"]').type(title)
  cy.get('[data-cy="author-input"]').type(author)
  cy.get('[data-cy="url-input"]').type(url)
  cy.get('[data-cy="blog-form-submit"]').click()
})

Cypress.Commands.add('likeBlog', (title, author) => {
  cy.get('div.blog').contains(title + ' ' + author).find('button').contains('like').click()
})

Cypress.Commands.add('openBlog', (title, author) => {
  cy.get('div.blog').contains(title + ' ' + author).find('button').contains('view').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })