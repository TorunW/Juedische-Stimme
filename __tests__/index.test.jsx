import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import {store} from '../store/store'

describe('Home', () => {
  it('renders a heading', () => {
    render(
        <Provider store={store}>
            <Home/>
        </Provider>
    )

    const heading = screen.getByRole('heading', {
      name: "LATEST POSTS:",
    })

    expect(heading).toBeInTheDocument()
  })
})