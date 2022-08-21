import { render, screen, cleanup, waitFor } from '@testing-library/react';
import AboutInfo from 'components/about/AboutInfo'

describe('Tests for AboutInfo.tsx', () => {
    const aboutInfo = {text_top: '<p>Die “Jüdische Stimme für gerechten Frieden in N…imme für gerechten Frieden in Nahost</strong></p>', text_bottom: '<p>Die “Jüdische Stimme für gerechten Frieden in N…ionen lebensfähigen Friedens beiträgt.</p><p></p>', about_gallery_id: '5', header_slogan: '<p>Nicht in userem Namen!<br></p><p>Jüdische Stimme für gerechten Frieden in Nahost<br></p>'}
    const gallery = {gallery_id: 5, gallery_name: 'About Gallery', gallery_description: '', imageSrcs: '2022/07/ZYX1269_korr.jpg.jpeg,2022/07/ZYX1229_korr.jpg.jpeg,2022/07/ZYX1164_korr.jpg.jpeg'}
    beforeEach(() => {
        render(<AboutInfo aboutInfo={aboutInfo} gallery={gallery}/>)
    })
    afterEach(() => {
        cleanup();
    });
    it('should render the about info container',()=>{
        const aboutInfoContainer = screen.getByTestId('about-info-container');
        expect(aboutInfoContainer).toBeInTheDocument();
    })
    it('should render the gallery', () => {
        const aboutInfoGallery = screen.getByTestId('about-info-gallery')
        expect(aboutInfoGallery).toBeInTheDocument()
    })
})