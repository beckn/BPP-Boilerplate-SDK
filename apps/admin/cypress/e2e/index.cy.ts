/// <reference types="Cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit(`http://localhost:${Cypress.env('DEV_PORT')}`)
    cy.contains('ADMIN UI')
  })
})
