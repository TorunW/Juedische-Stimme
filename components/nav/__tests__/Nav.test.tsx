import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Nav from '../Nav'
describe('Tests for Navbar.tsx', () => { 

    beforeEach(()=>{
        render(<Provider store={store}><Nav/></Provider>)
    })
    afterEach(()=>{
        cleanup()
    })
    it('should change class on scroll if on home page',async ()=>{
        fireEvent.scroll(window, { target: { scrollY: 100 } });
        await waitFor(()=>{
            expect(screen.getByTestId('nav')).toHaveClass('navActive')
        })
    })
    // it('should navigate to english website on EN button click',async () => {
    //     const user = userEvent.setup()
    //     await user.click(screen.getByTestId('english-button'))
    //     await waitFor(()=>{
    //         expect(global.window.location.pathname).toContain('/en_US')
    //     })
    // })
})