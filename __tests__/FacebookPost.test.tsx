import { render, screen, cleanup } from '@testing-library/react'
// import renderer from 'react-test-renderer'
import FacebookPost from 'components/facebook/FacebookPost'
import fbPost from '__test_data__/fbPost.json'

describe('Test for FacebookPost.tsx',() => {

    beforeEach(()=>{
        render(<FacebookPost post={fbPost}/>);
    })
    
    afterEach(() => {   
        cleanup();
    })

    it('should render facebook post container & from',() => {
        const fbPostContainer = screen.getByTestId('container');
        expect(fbPostContainer).toBeInTheDocument();
        const fbPostFrom = screen.getByTestId('from');
        expect(fbPostFrom).toHaveTextContent("Jüdische Stimme für gerechten Frieden in Nahost");
    })
    
    it('should render facebook post attachment', () => {
        const fbPostAttachment = screen.getByTestId('attachment-0')
        expect(fbPostAttachment).toBeInTheDocument()
        const fbPostAttachmentTitle = screen.getByTestId('attachment-0-title')
        expect(fbPostAttachmentTitle).toHaveTextContent('Israels Sicherheitsindustrie')
    })

    it.todo('matches snapshot')
    it.todo('should render facebook post reaction svgs')

    // it('matches snapshot', () => {
    //     const tree = renderer.create(<FacebookPost post={JSON.parse(fbPost)}/>).toJSON()
    //     expect(tree).toMatchSnapshot();
    // })
    
    // test('should render facebook post reactions svgs', () => {
    //     render(<FacebookPost post={JSON.parse(fbPost)}/>);
    //     const fbPostReactions = screen.getByTestId('reactions');
    //     // expect(fbPostReactions).toContainHTML('<svg>') better move the entire svg to a seperate file?
    // })
})
