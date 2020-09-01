describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('shows login form', function() {
    cy.get('#loginForm')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('sekret')
      cy.get('#loginButton').click()
      cy.contains('logged in as Test User')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.contains('Invalid username or password')
    })
  })

  describe('logged in user', function() {
    beforeEach(function() {
      cy.login('testuser', 'sekret')
    })

    it.only('can create a new blog', function() {
      cy.contains('new note').click()
      cy.get('#title').type('Title for a new blog')
      cy.get('#author').type('Author Name')
      cy.get('#url').type('http://www.example.com')
      cy.get('#submitButton').click()
      cy.contains('a new blog Title for a new blog by Author Name added')
    })
  })
})
