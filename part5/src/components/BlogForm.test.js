import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm event handler should receive the correct props when a new blog is created', async () => {
  const addBlog =  jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={addBlog}/>)

  const titleInput = screen.getByPlaceholderText('input title here')
  const authorInput = screen.getByPlaceholderText('input author here')
  const urlInput = screen.getByPlaceholderText('input url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testTitle')
  await user.type(authorInput, 'testAuthor')
  await user.type(urlInput, 'testUrl.com')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  const expectedContent = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl.com'
  }
  expect(addBlog.mock.calls[0][0]).toStrictEqual(expectedContent)
})


