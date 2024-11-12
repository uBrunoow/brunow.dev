import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoadingButton from './index' // Adjust the import path as necessary

describe('LoadingButton', () => {
  it('renders the button with loading state', () => {
    render(<LoadingButton isLoading={true}>Entrar</LoadingButton>)
    const loadingIndicator = screen.getByRole('status')
    expect(loadingIndicator).toBeInTheDocument()
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('renders the button with normal state', () => {
    render(<LoadingButton>Entrar</LoadingButton>)
    const button = screen.getByRole('button', { name: /entrar/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
  })

  it(' button is disabled when loading', () => {
    render(<LoadingButton isLoading={true}>Entrar</LoadingButton>)
    const loadingIndicator = screen.getByRole('status')
    expect(loadingIndicator).toBeInTheDocument()
    const button = screen.getByTestId('ButtonIsLoading')
    expect(button).toBeDisabled()
  })
})
