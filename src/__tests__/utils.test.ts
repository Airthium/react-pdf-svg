import { cssToCamelCase, attributeToNumber } from '../utils'

describe('utils', () => {
  test('cssToCamelCase', () => {
    let camel: string

    camel = cssToCamelCase('test')
    expect(camel).toBe('test')

    camel = cssToCamelCase('test-test')
    expect(camel).toBe('testTest')
  })

  test('attributeToNumber', () => {
    let number: string | number
    let item = document.createElement('svg')

    number = attributeToNumber(item, '10px')
    expect(number).toBe('10px')

    try {
      number = attributeToNumber(item, '10rem')
      expect(true).toBe(false)
    } catch (err: any) {
      expect(err.message).toBe('rem size not implemented')
    }

    number = attributeToNumber(item, '0.5em')
    expect(number).toBe(10)

    jest.spyOn(global, 'getComputedStyle').mockImplementation(
      //@ts-ignore
      () => ({
        fontSize: 10
      })
    )
    number = attributeToNumber(item, '0.5em')
    expect(number).toBe(5)

    number = attributeToNumber(item, '10')
    expect(number).toBe(10)
  })
})
