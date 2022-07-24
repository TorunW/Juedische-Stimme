import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import {store} from '../store/store'

describe('Home', () => {
  it('renders components', () => {
    render(
        <Provider store={store}>
            <Home/>
        </Provider>
    )

    // check if main header is in the document
    const mainHeader = screen.getByRole('main-header')
    expect(mainHeader).toBeInTheDocument()

    // check if heading (h1) with the text 'LATEST POSTS:' is in the document
    const heading = screen.getByRole('heading', {
      name: "LATEST POSTS:",
    })
    expect(heading).toBeInTheDocument()
  })
})