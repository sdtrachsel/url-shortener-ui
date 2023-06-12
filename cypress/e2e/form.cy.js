describe('Form', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls'
    }).as('getURLs')

    cy.visit('http://localhost:3000/')
  })

  it('has form fields', () => {
    cy.get("input[name ='title']").should('exist')
      .get("input[name ='urlToShorten']").should('exist')
      .get('button').contains('Shorten Please')
  })

  it('form fields reflect user input', () => {
    cy.get("input[name ='title']").type('Cool Link')
      .get("input[name ='urlToShorten']").type('https://unsplash.com/photos/xhC-pVI_Gno')

      .get("input[name ='title']").should('have.value', 'Cool Link')
      .get("input[name ='urlToShorten']").should('have.value', 'https://unsplash.com/photos/xhC-pVI_Gno')
  })

  it('should add the users shortened url when submitted', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'newURL'
    }).as('addNewURL')
      .wait('@getURLs')
      .get("input[name ='title']").type('Test Four')
      .get("input[name ='urlToShorten']").type('https://unsplash.com/photos/KBLY9VwVIpM')
      .get('button').click()
      .wait('@addNewURL')
      .get('.url').should('have.length', 4)
      .get('h3').last().contains('Test Four')
      .get('a').last().should('have.attr', 'href', "http://localhost:3001/useshorturl/4")
      .get('p').last().contains("https://unsplash.com/photos/KBLY9VwVIpM")
  })
})