import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutInfo from 'components/about/AboutInfo'
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
 })