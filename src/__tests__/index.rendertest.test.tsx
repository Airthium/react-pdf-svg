import React from 'react'
import { render } from '@testing-library/react'

import { RenderTest } from '..'

describe('index - rendertest', () => {
  test('render', async () => {
    const { unmount } = render(<RenderTest />)

    await new Promise((resolve) => setTimeout(resolve, 1_000))

    unmount()
  })
})
