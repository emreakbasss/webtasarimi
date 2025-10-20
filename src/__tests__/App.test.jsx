import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import App from '../App.jsx'

describe('YOU App', () => {
  it('renders hero headline', () => {
    render(<App/>)
    expect(screen.getByText(/YOU/i)).toBeInTheDocument()
  })

  it('has Instagram and TikTok links', () => {
    render(<App/>)
    const insta = screen.getAllByRole('link', { name: /Instagram/i })[0]
    const tiktok = screen.getAllByRole('link', { name: /TikTok/i })[0]
    expect(insta).toHaveAttribute('href', expect.stringContaining('instagram.com'))
    expect(tiktok).toHaveAttribute('href', expect.stringContaining('tiktok.com'))
  })

  it('navigates to #collections link', () => {
    render(<App/>)
    const explore = screen.getByRole('link', { name: /Keşfet/i })
    expect(explore).toHaveAttribute('href', '#collections')
  })
})
