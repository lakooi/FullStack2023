import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  let container

  const blog = {
    author: 'testi1',
    likes: 23,
    title: 'testi3',
    url: 'kasa.com'
  }
  const updateBlog =  jest.fn()

  const removeBlog =  jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>).container
  })

  test('Blog renders author and title by default', async () => {
    await screen.findAllByText('testi3 testi1')
  })

  test('Blog does not render url and title by default', async() => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    //Test visibility of the content of toggleable
    const url = await screen.getByText('kasa.com likes 23 testi1')
    expect(url).not.toBeVisible()
  })

  test('After clicking view the url and title within the togglable should be visible', async() => {
    const user= userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    //Test visibility of the content of toggleable
    const url = await screen.getByText('kasa.com likes 23 testi1')
    expect(url).toBeVisible()
  })

  test('After clicking the like button twice, the event handler should have fired twice', async() => {
    const user= userEvent.setup()
    //Even though this locator should not be visible it is clickable in testing
    const div = container.querySelector('.like')
    await user.click(div)
    await user.click(div)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })

})

