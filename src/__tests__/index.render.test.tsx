Object.defineProperty(process.env, 'REACT_APP_RENDER_TEST', { value: 1 })

jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: jest.fn()
  })
}))

describe('index - render', () => {
  test('test', async () => {
    await import('..')
    await new Promise((resolve) => setTimeout(resolve, 2_000))
  }, 10_000)
})
