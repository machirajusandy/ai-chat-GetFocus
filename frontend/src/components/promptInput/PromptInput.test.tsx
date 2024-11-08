import PromptInput from './PromptInput'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('PromptInput', () => {
  it('should render the component', () => {
    render(<PromptInput handleSubmit={() => {}} />)
    expect(screen.getByLabelText(/prompt/i)).toBeInTheDocument()
  })

  it('should submit the message', async () => {
    const handleSubmit = vi.fn()
    render(<PromptInput handleSubmit={handleSubmit} />)
    const input = screen.getByLabelText('prompt')
    const message = 'Hello World'
    await userEvent.type(input, message)
    await userEvent.click(screen.getByLabelText(/submit/i))
    expect(handleSubmit).toHaveBeenCalledWith(message)
  })

  it('should cancel the prompt', async () => {
    const cancelPrompt = vi.fn()
    render(
      <PromptInput
        handleSubmit={() => {}}
        cancelPrompt={cancelPrompt}
        isFetching
      />
    )
    await userEvent.click(screen.getByLabelText(/cancel/i))
    expect(cancelPrompt).toHaveBeenCalled()
  })
})
