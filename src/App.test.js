// Description: This file contains the tests for the App component.

/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })
global.scrollTo = jest.fn()

// Connect jsdom to have a virtual browser environment
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// Create a virtual environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document

// Connect a library for testing (e.g., Jest)
const { expect } = require('@jest/globals')

describe('App', () => {
  it('1.render our App without crashing', () => {
    // Ensure that the component renders without errors
    render(<App />)
  })

  it('2.correct renders of navigation elements ', () => {
    render(<App />)

    const scrollDownButton = screen.getByText('Scroll Down')
    const scrollTopButton = screen.getByText('Scroll to Top')
    const datePicker = screen.getByLabelText('Select a Date')

    expect(scrollDownButton).toBeVisible()
    expect(scrollDownButton).toBeInTheDocument()

    expect(scrollTopButton).toBeVisible()
    expect(scrollTopButton).toBeInTheDocument()
    expect(datePicker).toBeVisible()
    expect(datePicker).toBeInTheDocument()
  })

  it('3.fetches images and displays them', async () => {
    render(<App />)

    // Wait for the loading to complete
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    )
    // Ensure that at least one image is displayed
    const images = screen.queryAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
    expect(images[0]).toBeInTheDocument() // Check if the first image is in the document
  })

  it('4."Scroll to Top" button  was called with true arguments', async () => {
    // Create a mock function for window.scrollTo
    const scrollToMock = jest.fn()

    // Replace the global scrollTo function with the mock
    global.scrollTo = scrollToMock

    // Render App component
    render(<App />)

    // Find the "Scroll to Top" button by text
    const toTopButton = screen.getByText('Scroll to Top')

    // Simulate a click on the button
    fireEvent.click(toTopButton)

    // Check that global.scrollTo was called with arguments matching the scrollToTop function call
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      left: 0,
      top: 0,
    })
  })
})
