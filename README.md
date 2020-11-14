## reference
- https://blog.sapegin.me/all/react-testing-4-cypress/
- https://www.youtube.com/watch?v=F8LH9d9eN3M

test for what:

test의 추상화

## list
순서로 테스트가 깨짐 -> mock up data 를 이용

- hard coding 되어있던 값을 -> 변수로 변환
.should('have.attr', 'src', 'hard coding img url')
.should('have.attr', 'src', article.author.image)

- date format으로 'Mon Jun 22 2020' 같은 값을 비교 할때 -> Cypress.moment 사용

## selector 

- css selector -> testing library query


## tip

1. Use the data
2. Query the dom at the highest level possible
3. Narrow yhour scope

final: Always optimize for change