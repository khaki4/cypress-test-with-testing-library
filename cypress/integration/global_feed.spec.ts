import { DateFormats } from '../support/enums'

describe('Global Feed', () => {
  beforeEach(() => {
    cy.server()

    cy.route('**/api/articles**', 'fx:global_feed.json').as('getArticles')
  })

  it('Should show all articles correctly', () => {
    cy.visit('/')

    cy.wait('@getArticles').then((xhr) => {
      const { articles } = xhr.responseBody as GetArticles

      cy.findAllByTestId('article-preview')
        .should('have.length', articles.length)
        .each(($articlePreview, index) => {
          const article: Article = articles[index]

          cy.wrap($articlePreview).within(() => {
            cy.findByRole('img', { name: /Article author avatar/i }).should(
              'have.attr',
              'src',
              article.author.image
            )

            // cy.findByRole('link', { name: article.author.username }).should(
            //   'exist'
            // )

            cy.findByRole('link', { name: article.author.username }).should(
              'have.attr',
              'href',
              `/@${article.author.username}`
            )

            cy.findByText(
              Cypress.moment(article.createdAt).format(
                DateFormats.ArticlePreview
              )
            ).should('exist')

            cy.findByRole('button', { name: /Favorite article/i }).should(
              'exist'
            )

            cy.findByRole('heading', { name: article.title }).should('exist')

            cy
              // 디스크립션이 다른 곳에서 쓰일 수 있으므로 selector를 사용한다.
              .findByText(article.description, { selector: 'p' })
              .should('exist')

            cy.findAllByRole('list').within(($list) => {
              if (Cypress._.isEmpty(article.tagList)) {
                expect($list).to.be.empty
              } else {
                cy.findAllByRole('listitem').each(($tag, tagIndex) => {
                  expect($tag).to.have.text(article.tagList[tagIndex])
                })
              }
            })
          })
        })
    })
  })
})
