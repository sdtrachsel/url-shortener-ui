describe('Landing page spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
    }).as('getURLs')

    cy.visit('http://localhost:3000/')
  })

  it('Should display the title and existing urls', () => {
    cy.wait("@getURLs")
      .get('h1').contains('URL Shortener')
      .get('.url').should('have.length', 3)
      .get('h3').first().contains('Test One')
      .get('a').first().should('have.attr', 'href', "http://localhost:3001/useshorturl/1")
      .get('p').first().contains("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")

      .get('h3').last().contains('Test Three')
      .get('a').last().should('have.attr', 'href', "http://localhost:3001/useshorturl/3")
      .get('p').last().contains("https://unsplash.com/photos/CoYlQBP67w8")
  })
})