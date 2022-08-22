import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from '../Gallery';

describe('Tests for Gallery.tsx', () => { 
    const gallery = {gallery_id: 5, gallery_name: 'About Gallery', gallery_description: '', imageSrcs: '2022/07/ZYX1269_korr.jpg.jpeg,2022/07/ZYX1229_korr.jpg.jpeg,2022/07/ZYX1164_korr.jpg.jpeg'}
    beforeEach(() => {
        render(<Gallery gallery={gallery} />)
    })
    afterEach(() => {
        cleanup();
    });
    it('should render the gallery',() => {
        const galleryContainer = screen.getByTestId('gallery-container')
        expect(galleryContainer).toBeInTheDocument()
    })
    it('should set activeSlide to next slide on click',async  () => {
        expect(screen.getByTestId('slide-0')).toHaveClass('slideActive')
        const nextbutton = screen.getByTestId('next-button')
        const user = userEvent.setup()
        await user.click(nextbutton);
        await waitFor(()=>{
            expect(screen.getByTestId('slide-1')).toHaveClass('slideActive')
        })
    })
    it('should set activeSlide to previous (last) slide on click',async  () => {
        expect(screen.getByTestId('slide-0')).toHaveClass('slideActive')
        const previousButton = screen.getByTestId('previous-button')
        const user = userEvent.setup()
        await user.click(previousButton);
        await waitFor(()=>{
            expect(screen.getByTestId('slide-2')).toHaveClass('slideActive')
        })
    })
    it('should disable clicking on buttons until next slide is activeSlide',async () => {
        expect(screen.getByTestId('slide-0')).toHaveClass('slideActive')
        const previousButton = screen.getByTestId('previous-button')
        const user = userEvent.setup()
        user.click(previousButton);
        user.click(previousButton);
        user.click(previousButton);
        user.click(previousButton);
        await waitFor(()=>{
            expect(screen.getByTestId('slide-2')).toHaveClass('slideActive')
        })
    })
 })