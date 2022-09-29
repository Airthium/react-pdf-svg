import {
  circleToCircle,
  clipPathToClipPath,
  defsToDefs,
  ellipseToEllipse,
  getAttributes,
  getPresentationAtributes,
  gToG,
  linearGradientToLinearGradient,
  lineToLine,
  pathToPath,
  polygonToPolygon,
  polylineToPolyline,
  radialGradientToRadialGradient,
  rectToRect,
  stopToStop,
  svgToSvg,
  textToText,
  tspanToTspan
} from '../toSvg'

const mockChildren = jest.fn()
jest.mock('..', () => ({
  getChildren: () => mockChildren()
}))

const mockAttributeToNumber = jest.fn()
const mockCssToCamelCase = jest.fn()
jest.mock('../utils', () => ({
  attributeToNumber: () => mockAttributeToNumber(),
  cssToCamelCase: () => mockCssToCamelCase()
}))

describe('toSvg', () => {
  beforeEach(() => {
    mockChildren.mockReset()
    mockChildren.mockImplementation(() => null)

    mockAttributeToNumber.mockReset()
    mockAttributeToNumber.mockImplementation(() => 10)

    mockCssToCamelCase.mockReset()
    mockCssToCamelCase.mockImplementation(() => 'camelCase')
  })

  test('getAttributes', () => {
    const item = document.createElement('svg')
    const props = {}

    // No value
    getAttributes(item, [{ key: 'key', type: 'string' }], props)
    expect(props).toEqual({})

    // stroke-dasharray
    getAttributes(item, [{ key: 'stroke-dasharray', type: 'string' }], props)
    expect(props).toEqual({})

    // value
    item.setAttribute('stroke-dasharray', 'value')
    getAttributes(item, [{ key: 'stroke-dasharray', type: 'string' }], props)
    expect(props).toEqual({ camelCase: 'value' })

    // number
    getAttributes(item, [{ key: 'stroke-dasharray', type: 'number' }], props)
    expect(props).toEqual({ camelCase: 10 })
  })

  test('getPresentationAttributes', () => {
    const item = document.createElement('rect')
    const props = {}
    getPresentationAtributes(item, props)
  })

  test('svgToSvg', () => {
    const item = document.createElement('svg')
    const render = svgToSvg(item)
    expect(render.type).toBe('SVG')
  })

  test('lineToLine', () => {
    const item = document.createElement('line')
    const render = lineToLine(item)
    expect(render.type).toBe('LINE')
  })

  test('polylineToPolyline', () => {
    const item = document.createElement('polyline')
    const render = polylineToPolyline(item)
    expect(render.type).toBe('POLYLINE')
  })

  test('polygonToPolygon', () => {
    const item = document.createElement('polygon')
    const render = polygonToPolygon(item)
    expect(render.type).toBe('POLYGON')
  })

  test('pathToPath', () => {
    const item = document.createElement('path')
    const render = pathToPath(item)
    expect(render.type).toBe('PATH')

    mockCssToCamelCase.mockImplementation(() => 'fill')
    item.setAttribute('fill', '#abc')
    const render2 = pathToPath(item)
    expect(render2.type).toBe('PATH')
  })

  test('rectToRect', () => {
    const item = document.createElement('rect')
    const render = rectToRect(item)
    expect(render.type).toBe('RECT')
  })

  test('circleToCircle', () => {
    const item = document.createElement('circle')
    const render = circleToCircle(item)
    expect(render.type).toBe('CIRCLE')
  })

  test('ellipseToEllipse', () => {
    const item = document.createElement('ellipse')
    const render = ellipseToEllipse(item)
    expect(render.type).toBe('ELLIPSE')
  })

  test('textToText', () => {
    const item = document.createElement('text')
    const render = textToText(item)
    expect(render.type).toBe('TEXT')

    const tspan = document.createElement('tspan')
    item.appendChild(tspan)
    const render2 = textToText(item)
    expect(render2.props.children.length).toBe(1)
  })

  test('tspanToTspan', () => {
    const parent = document.createElement('text')
    const item = document.createElement('tspan')
    const render = tspanToTspan(item, parent)
    expect(render.type).toBe('TEXT')
  })

  test('gToG', () => {
    const item = document.createElement('g')
    const render = gToG(item)
    expect(render.type).toBe('G')
  })

  test('stopToStop', () => {
    const item = document.createElement('stop')
    const render = stopToStop(item)
    expect(render.type).toBe('STOP')
  })

  test('defsToDefs', () => {
    const item = document.createElement('defs')
    const render = defsToDefs(item)
    expect(render.type).toBe('DEFS')
  })

  test('clipPathToClipPath', () => {
    const item = document.createElement('clipPath')
    const render = clipPathToClipPath(item)
    expect(render.type).toBe('CLIP_PATH')
  })

  test('linearGradientToLinearGradient', () => {
    const item = document.createElement('linearGradient')
    const render = linearGradientToLinearGradient(item)
    expect(render.type).toBe('LINEAR_GRADIENT')
  })

  test('radialGradientToRadialGradient', () => {
    const item = document.createElement('radialGradient')
    const render = radialGradientToRadialGradient(item)
    expect(render.type).toBe('RADIAL_GRADIENT')
  })
})
