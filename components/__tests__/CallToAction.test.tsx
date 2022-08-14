import { render, screen, cleanup } from '@testing-library/react'
import CallToAction from '../CallToAction'

beforeEach(()=>{
    render(<CallToAction/>)
})

describe('Tests for CallToAction.tsx',() => {
    it('should render',()=>{
        expect(true).toBe(true)
    })
})