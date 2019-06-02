import React from 'react'
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react'
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect'
import { CATEGORIES } from '@/constants'
import App from '../pages'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Check if env variables are set', () => {
  it('Checking if NEWS_API_KEY is set', () => {
    expect(process.env.NEWS_API_KEY).toBeDefined()
  })
})

describe('Test all categories load and test micro interaction for each category on card media click', () => {
  CATEGORIES.forEach(category => {
    it(`Testing category: ${category}`, async () => {
      const router = {
        category,
        query: { title: 'Top Headlines' },
      }
      const { getByTestId, asFragment } = render(<App router={router} />)

      // Check if DOM loads as usual before dynamic content loads
      expect(asFragment()).toMatchSnapshot()

      // Let's wait for the news API call to finish and trigger render of article container
      const articleContainer = await waitForElement(() => getByTestId('article-container'))

      // Check if child nodes of article container has been populated after API call
      expect(articleContainer.children.length).toBeGreaterThan(0)

      // Act
      fireEvent.click(getByTestId('card-0'))

      // Check if class is added to card container for micro interaction animation
      expect(getByTestId('card-parent-0').classList.contains('card-inner__absolute')).toBe(true)
    })
  })
})
