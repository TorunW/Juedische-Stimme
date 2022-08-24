import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import Post from 'components/posts/Post'
import { Provider } from 'react-redux';
import { store } from 'store/store';
import post from '__test_data__/post.json'

describe('Test for Post.tsx',()=>{

    beforeEach(()=>{
        render(<Provider store={store}><Post post={post}/></Provider>)
    })

    afterEach(()=>{
        cleanup()
    })

    it('should render the post container',()=>{
        expect(screen.getByTestId('post-container')).toBeInTheDocument()
    })
})