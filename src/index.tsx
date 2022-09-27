import ReactDOM from 'react-dom/client'
import React, { useCallback, useEffect, useState } from 'react'
import ReactPDF, {
  Circle,
  ClipPath,
  Defs,
  Document,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Page,
  Path,
  PDFViewer,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Text,
  Tspan
} from '@react-pdf/renderer'
import { v4 as uuid } from 'uuid'

/**
 * Get children
 * @param parent Parent
 * @returns Children
 */
const getChildren = (parent: Element): JSX.Element[] => {
  const children = []

  // Iterate children
  for (let item of parent.children) {
    // Type
    const type = item.tagName

    // Props
    const attributes = item.attributes
    let props: { [key: string]: string } = {}
    for (const attribute of attributes) {
      props[attribute.name] = attribute.value
    }
    props.key = uuid()

    // Switch
    switch (type) {
      case 'line':
        children.push(
          <Line {...(props as unknown as ReactPDF.LineProps)}>
            {getChildren(item)}
          </Line>
        )
        break
      case 'polyline':
        children.push(
          <Polyline {...(props as unknown as ReactPDF.PolylineProps)}>
            {getChildren(item)}
          </Polyline>
        )
        break
      case 'polygon':
        children.push(
          <Polygon {...(props as unknown as ReactPDF.PolygonProps)}>
            {getChildren(item)}
          </Polygon>
        )
        break
      case 'path':
        children.push(
          <Path {...(props as unknown as ReactPDF.PathProps)}>
            {getChildren(item)}
          </Path>
        )
        break
      case 'rect':
        children.push(
          <Rect {...(props as unknown as ReactPDF.RectProps)}>
            {getChildren(item)}
          </Rect>
        )
        break
      case 'circle':
        children.push(
          <Circle {...(props as unknown as ReactPDF.CircleProps)}>
            {getChildren(item)}
          </Circle>
        )
        break
      case 'ellipse':
        children.push(
          <Ellipse {...(props as unknown as ReactPDF.EllipseProps)}>
            {getChildren(item)}
          </Ellipse>
        )
        break
      case 'text':
        console.log(item.innerHTML)
        console.log(props)
        children.push(
          <Text {...(props as unknown as ReactPDF.SVGTextProps)}>
            {getChildren(item)}
          </Text>
        )
        break
      case 'tspan':
        children.push(
          <Tspan {...(props as unknown as ReactPDF.TspanProps)}>
            {getChildren(item)}
          </Tspan>
        )
        break
      case 'g':
        children.push(
          <G {...(props as unknown as ReactPDF.GProps)}>{getChildren(item)}</G>
        )
        break
      case 'stop':
        children.push(
          <Stop {...(props as unknown as ReactPDF.StopProps)}>
            {getChildren(item)}
          </Stop>
        )
        break
      case 'defs':
        children.push(
          <Defs {...(props as unknown as ReactPDF.DefsProps)}>
            {getChildren(item)}
          </Defs>
        )
        break
      case 'clippath':
        children.push(
          <ClipPath {...(props as unknown as ReactPDF.ClipPathProps)}>
            {getChildren(item)}
          </ClipPath>
        )
        break
      case 'lineargradient':
        children.push(
          <LinearGradient
            {...(props as unknown as ReactPDF.LinearGradientProps)}
          >
            {getChildren(item)}
          </LinearGradient>
        )
        break
      case 'radialgradient':
        children.push(
          <RadialGradient
            {...(props as unknown as ReactPDF.RadialGradientProps)}
          >
            {getChildren(item)}
          </RadialGradient>
        )
        break
      default:
        break
    }
  }

  return children
}

/**
 * svg to Svg
 * @param svg SVG
 * @returns ReactPDF Svg
 */
const svgToSvg = (svg: SVGElement): JSX.Element => {
  if (!svg || svg.tagName !== 'svg')
    throw new Error('Your element is not a svg element')

  // Attributes -> props
  const attributes = svg.attributes
  let props: { [key: string]: string } = {}
  for (const attribute of attributes) {
    props[attribute.name] = attribute.value
  }

  // Children
  const children = getChildren(svg)

  /**
   * Render
   */
  // @ts-ignore
  return <Svg {...props}>{children}</Svg>
}

if (process.env.REACT_APP_RENDER_TEST) {
  const RenderTest = () => {
    const [SVG, setSVG] = useState<JSX.Element>()

    const htmlSvg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="300"
        height="200"
      >
        <rect width="100" height="80" x="0" y="70" fill="green" />
        <line x1="5" y1="5" x2="250" y2="95" stroke="red" />
        <circle cx="90" cy="80" r="50" fill="blue" />
        <text x="180" y="60">
          A text
        </text>
      </svg>
    )

    const div = document.createElement('div')
    const tmpRoot = ReactDOM.createRoot(div)
    tmpRoot.render(htmlSvg)

    const convert = useCallback(() => {
      const svg = div.children?.[0] as SVGElement
      if (!svg) {
        setTimeout(convert, 500)
        return
      }

      const ReactSVG = svgToSvg(svg)
      setSVG(ReactSVG)
    }, [])

    useEffect(() => {
      convert()
    }, [])

    if (SVG)
      return (
        <PDFViewer width={800} height={600}>
          <Document>
            <Page size="A4">{SVG}</Page>
          </Document>
        </PDFViewer>
      )
    return null
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )

  root.render(
    <React.StrictMode>
      <RenderTest />
    </React.StrictMode>
  )
}

export default svgToSvg
