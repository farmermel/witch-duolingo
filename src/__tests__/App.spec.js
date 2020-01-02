import React from 'react'
import App from '../App/App.js'
import {render, fireEvent, screen} from '@testing-library/react'

test ('runs tests', () => {
    render(<App />)
    expect(screen.queryByText("money")).toBeDefined();
    fireEvent.click(screen.getByText("Pay the Price"));
    expect(screen.queryByText("First Lesson")).toBeDefined();
})