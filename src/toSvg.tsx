/** @module ToSVG */

import ReactPDF, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Text
} from '@react-pdf/renderer'
import { Fragment } from 'react'
import { v4 as uuid } from 'uuid'

import { getChildren } from '.'
import { attributeToNumber, cssToCamelCase } from './utils'

/**
 * SVG attributes
 */
export interface SVGAttribute {
  key: string
  type: 'string' | 'number'
}

/**
 * Presentation attributes
 */
const presentationAttributes: SVGAttribute[] = [
  {
    key: 'color',
    type: 'string'
  },
  {
    key: 'dominant-baseline',
    type: 'string'
  },
  { key: 'fill', type: 'string' },
  { key: 'fill-opacity', type: 'number' },
  { key: 'fill-rule', type: 'string' },
  { key: 'opacity', type: 'number' },
  { key: 'stroke', type: 'string' },
  { key: 'stroke-width', type: 'number' },
  { key: 'stroke-opacity', type: 'number' },
  { key: 'stroke-linecap', type: 'string' },
  { key: 'stroke-dasharray', type: 'string' },
  { key: 'transform', type: 'string' },
  { key: 'text-anchor', type: 'string' },
  { key: 'visibility', type: 'string' }
]

/**
 * Get atrtibutes
 * @param item Item
 * @param attributes Attributes
 * @param props Props
 */
export const getAttributes = (
  item: Element,
  attributes: SVGAttribute[],
  props: any
): void => {
  attributes.forEach((attribute) => {
    let value = item.getAttribute(attribute.key)

    // BUG wrong formatting of stroke-dasharray: "3 3" instead of stroke-dasharray: "3, 3"
    if (attribute.key === 'stroke-dasharray' && value)
      value = value.split(' ').join(', ')

    if (value) {
      const key = cssToCamelCase(attribute.key)
      if (attribute.type === 'number')
        props[key] = attributeToNumber(item, value)
      else props[key] = value
    }
  })
}

/**
 * Get presentation attributes
 * @param item Item
 * @param props Props
 */
export const getPresentationAtributes = (item: Element, props: any): void => {
  getAttributes(item, presentationAttributes, props)
}

export const svgToSvg = (item: Element): JSX.Element => {
  const props: ReactPDF.SVGProps & { key: string } = { key: uuid() }
  getAttributes(
    item,
    [
      { key: 'width', type: 'number' },
      { key: 'height', type: 'number' },
      { key: 'viewBox', type: 'string' },
      { key: 'preserveAspectRatio', type: 'string' }
    ],
    props
  )

  return <Svg {...props}>{getChildren(item)}</Svg>
}

/**
 * line to Line
 * @param item Item
 * @returns Line
 */
export const lineToLine = (item: Element): JSX.Element => {
  const props: ReactPDF.LineProps & { key: string } = {
    key: uuid(),
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'x1', type: 'number' },
      { key: 'x2', type: 'number' },
      { key: 'y1', type: 'number' },
      { key: 'y2', type: 'number' }
    ],
    props
  )

  return <Line {...props}>{getChildren(item)}</Line>
}

/**
 * polyline to Polyline
 * @param item Item
 * @returns Polyline
 */
export const polylineToPolyline = (item: Element): JSX.Element => {
  const props: ReactPDF.PolylineProps & { key: string } = {
    key: uuid(),
    points: ''
  }
  getPresentationAtributes(item, props)
  getAttributes(item, [{ key: 'points', type: 'string' }], props)

  return <Polyline {...props}>{getChildren(item)}</Polyline>
}

/**
 * polygon to Polygon
 * @param item Item
 * @returns Polygon
 */
export const polygonToPolygon = (item: Element): JSX.Element => {
  const props: ReactPDF.PolygonProps & { key: string } = {
    key: uuid(),
    points: ''
  }
  getPresentationAtributes(item, props)
  getAttributes(item, [{ key: 'points', type: 'string' }], props)

  return <Polygon {...props}>{getChildren(item)}</Polygon>
}

/**
 * path To Path
 * @param item Item
 * @returns Path
 */
export const pathToPath = (item: Element): JSX.Element => {
  const props: ReactPDF.PathProps & { key: string } = { key: uuid(), d: '' }
  getPresentationAtributes(item, props)
  getAttributes(item, [{ key: 'd', type: 'string' }], props)

  if (!props.fill) props.fill = '#abc'

  return <Path {...props}>{getChildren(item)}</Path>
}

/**
 * rect to Rect
 * @param item Item
 * @returns Rect
 */
export const rectToRect = (item: Element): JSX.Element => {
  const props: ReactPDF.RectProps & { key: string } = {
    key: uuid(),
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' },
      { key: 'width', type: 'number' },
      { key: 'height', type: 'number' },
      { key: 'rx', type: 'number' },
      { key: 'ry', type: 'number' }
    ],
    props
  )

  return <Rect {...props}>{getChildren(item)}</Rect>
}

/**
 * circle to Circle
 * @param item Item
 * @returns Circle
 */
export const circleToCircle = (item: Element): JSX.Element => {
  const props: ReactPDF.CircleProps & { key: string } = {
    key: uuid(),
    cx: 0,
    cy: 0,
    r: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'cx', type: 'number' },
      { key: 'cy', type: 'number' },
      { key: 'r', type: 'number' }
    ],
    props
  )

  return <Circle {...props}>{getChildren(item)}</Circle>
}

/**
 * ellipse to Ellipse
 * @param item Item
 * @returns Ellipse
 */
export const ellipseToEllipse = (item: Element): JSX.Element => {
  const props: ReactPDF.EllipseProps & { key: string } = {
    key: uuid(),
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'cx', type: 'number' },
      { key: 'cy', type: 'number' },
      { key: 'rx', type: 'number' },
      { key: 'ry', type: 'number' }
    ],
    props
  )

  return <Ellipse {...props}>{getChildren(item)}</Ellipse>
}

/**
 * text to Text
 * @param item Item
 * @returns Text
 */
export const textToText = (item: Element): JSX.Element => {
  const props: ReactPDF.SVGTextProps & { key: string } = {
    key: uuid(),
    x: 0,
    y: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' },
      { key: 'width', type: 'number' },
      { key: 'height', type: 'number' }
    ],
    props
  )

  const children = item.children
  if (children.length) {
    const texts: JSX.Element[] = []
    for (const child of children) {
      texts.push(tspanToTspan(child, item))
    }
    return <Fragment key={uuid()}>{texts}</Fragment>
  } else {
    return <Text {...props}>{item.innerHTML}</Text>
  }
}

/**
 * tspan to Tspan
 * @param item Item
 * @returns Tspan
 */
export const tspanToTspan = (item: Element, parent: Element): JSX.Element => {
  const props: ReactPDF.TspanProps & { dx?: number; dy?: number } = {
    x: 0,
    y: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' },
      { key: 'dx', type: 'number' },
      { key: 'dy', type: 'number' }
    ],
    props
  )

  const parentProps: ReactPDF.SVGTextProps & { key: string } = {
    key: uuid(),
    x: 0,
    y: 0
  }
  getPresentationAtributes(parent, parentProps)
  getAttributes(
    parent,
    [
      { key: 'x', type: 'number' },
      { key: 'y', type: 'number' }
    ],
    parentProps
  )

  parentProps.x = +parentProps.x + (props.dx ?? 0)
  parentProps.y = +parentProps.y + (props.dy ?? 0)

  return <Text {...parentProps}>{item.innerHTML}</Text>
}

/**
 * g to G
 * @param item Item
 * @returns G
 */
export const gToG = (item: Element): JSX.Element => {
  const props: ReactPDF.GProps & { key: string } = { key: uuid() }
  getPresentationAtributes(item, props)

  return <G {...props}>{getChildren(item)}</G>
}

/**
 * stop to Stop
 * @param item Item
 * @returns Stop
 */
export const stopToStop = (item: Element): JSX.Element => {
  const props: ReactPDF.StopProps & { key: string } = {
    key: uuid(),
    offset: 0,
    stopColor: ''
  }
  getAttributes(
    item,
    [
      { key: 'offset', type: 'number' },
      { key: 'stop-color', type: 'string' },
      { key: 'stop-opacity', type: 'number' }
    ],
    props
  )

  return <Stop {...props}>{getChildren(item)}</Stop>
}

/**
 * defs to Defs
 * @param item Item
 * @returns Defs
 */
export const defsToDefs = (item: Element): JSX.Element => {
  const props = { key: uuid() }

  return <Defs {...props}>{getChildren(item)}</Defs>
}

/**
 * clipPath to ClipPath
 * @param item Item
 * @returns ClipPath
 */
export const clipPathToClipPath = (item: Element): JSX.Element => {
  const props: ReactPDF.ClipPathProps & { key: string } = { key: uuid() }

  return <ClipPath {...props}>{getChildren(item)}</ClipPath>
}

/**
 * linearGradient to LinearGradient
 * @param item Item
 * @returns LinearGradient
 */
export const linearGradientToLinearGradient = (item: Element): JSX.Element => {
  const props: ReactPDF.LinearGradientProps & { key: string } = {
    key: uuid(),
    id: '',
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  }
  getAttributes(
    item,
    [
      { key: 'id', type: 'string' },
      { key: 'x1', type: 'number' },
      { key: 'x2', type: 'number' },
      { key: 'y1', type: 'number' },
      { key: 'y2', type: 'number' }
    ],
    props
  )

  return <LinearGradient {...props}>{getChildren(item)}</LinearGradient>
}

/**
 * radialgradient to RadialGradient
 * @param item Item
 * @returns RadialGradient
 */
export const radialGradientToRadialGradient = (item: Element): JSX.Element => {
  const props: ReactPDF.RadialGradientProps & { key: string } = {
    key: uuid(),
    id: '',
    cx: 0,
    cy: 0,
    fr: 0,
    fx: 0,
    fy: 0
  }
  getPresentationAtributes(item, props)
  getAttributes(
    item,
    [
      { key: 'id', type: 'string' },
      { key: 'cx', type: 'number' },
      { key: 'cy', type: 'number' },
      { key: 'fr', type: 'number' },
      { key: 'fx', type: 'number' },
      { key: 'fy', type: 'number' }
    ],
    props
  )

  return <RadialGradient {...props}>{getChildren(item)}</RadialGradient>
}
