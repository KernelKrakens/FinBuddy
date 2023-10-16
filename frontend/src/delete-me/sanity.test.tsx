import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import HelloWorld from '~/delete-me/HelloWorld'

describe('Testing whether vitest, RTL is working', () => {
  it('should pass 1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('should mount the HelloWorld component', () => {
    render(<HelloWorld />)

    const title = screen.getByRole('heading', {
      level: 1,
      name: /hello world/i,
    })

    expect(title).toBeInTheDocument()
  })

  it('should mimic user clicking', async () => {
    const user = userEvent.setup()
    render(<HelloWorld />)

    const button = screen.getByRole('button', {
      name: /you click/i,
    })

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(button.textContent).includes(3)
  })
})
