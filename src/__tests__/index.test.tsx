import convert, { getChildren } from '..'

describe('index', () => {
  test('getChildren', () => {
    const parent = document.createElement('svg')

    let children = getChildren(parent)
    expect(children.length).toBe(0)

    let count = 0

    //svg
    const svg = document.createElement('svg')
    parent.appendChild(svg)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // line
    const line = document.createElement('line')
    parent.appendChild(line)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // polyline
    const polyline = document.createElement('polyline')
    parent.appendChild(polyline)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // polygon
    const polygon = document.createElement('polygon')
    parent.appendChild(polygon)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // path
    const path = document.createElement('path')
    parent.appendChild(path)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // rect
    const rect = document.createElement('rect')
    parent.appendChild(rect)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // circle
    const circle = document.createElement('circle')
    parent.appendChild(circle)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // ellipse
    const ellipse = document.createElement('ellipse')
    parent.appendChild(ellipse)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // text
    const text = document.createElement('text')
    parent.appendChild(text)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // tspan
    const tspan = document.createElement('tspan')
    parent.appendChild(tspan)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // g
    const g = document.createElement('g')
    parent.appendChild(g)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // stop
    const stop = document.createElement('stop')
    parent.appendChild(stop)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // defs
    const defs = document.createElement('defs')
    parent.appendChild(defs)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // clipPath
    const clipPath = document.createElement('clippath')
    parent.appendChild(clipPath)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // linearGradient
    const linearGradient = document.createElement('linearGradient')
    parent.appendChild(linearGradient)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // radialGradient
    const radialGradient = document.createElement('radialGradient')
    parent.appendChild(radialGradient)
    children = getChildren(parent)
    expect(children.length).toBe(++count)

    // default
    const unknown = document.createElement('div')
    parent.appendChild(unknown)
    children = getChildren(parent)
    expect(children.length).toBe(count)
  })

  test('convert', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const Svg = convert(svg)
    expect(Svg.type).toBe('SVG')

    // Wrong element
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    try {
      convert(rect)
      expect(true).toBe(false)
    } catch (err: any) {
      expect(err.message).toBe('Your element is not a svg element')
    }
  })
})
