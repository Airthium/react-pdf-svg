import ReactDOM from 'react-dom/client'
import React, { useCallback, useEffect, useState } from 'react'
import ReactPDF, { Document, Page, PDFViewer, Svg } from '@react-pdf/renderer'

import {
  circleToCircle,
  clippathToClipPath,
  defsToDefs,
  ellipseToEllipse,
  getAttributes,
  gToG,
  lineargradientToLinearGradient,
  lineToLine,
  pathToPath,
  polygonToPolygon,
  polylineToPolyline,
  radialgradientToRadialGradient,
  rectToRect,
  stopToStop,
  textToText,
  tspanToTspan
} from './toSvg'

import graph from './__tests__/graph'
import simple from './__tests__/simple'

import blackGraph from './__tests__/blackGraph'

/**
 * Get children
 * @param parent Parent
 * @returns Children
 */
export const getChildren = (parent: Element): JSX.Element[] => {
  const children = []

  // Iterate children
  for (let item of parent.children) {
    // Type
    const type = item.tagName

    // Switch
    switch (type) {
      case 'line':
        children.push(lineToLine(item))
        break
      case 'polyline':
        children.push(polylineToPolyline(item))
        break
      case 'polygon':
        children.push(polygonToPolygon(item))
        break
      case 'path':
        children.push(pathToPath(item))
        break
      case 'rect':
        children.push(rectToRect(item))
        break
      case 'circle':
        children.push(circleToCircle(item))
        break
      case 'ellipse':
        children.push(ellipseToEllipse(item))
        break
      case 'text':
        children.push(textToText(item))
        break
      case 'tspan':
        children.push(tspanToTspan(item, parent))
        break
      case 'g':
        children.push(gToG(item))
        break
      case 'stop':
        children.push(stopToStop(item))
        break
      case 'defs':
        children.push(defsToDefs(item))
        break
      case 'clippath':
        children.push(clippathToClipPath(item))
        break
      case 'lineargradient':
        children.push(lineargradientToLinearGradient(item))
        break
      case 'radialgradient':
        children.push(radialgradientToRadialGradient(item))
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

  // Props
  const props: ReactPDF.SVGProps = {}
  getAttributes(
    svg,
    [
      { key: 'width', type: 'number' },
      { key: 'height', type: 'number' },
      { key: 'viewBox', type: 'string' },
      { key: 'preserveAspectRatio', type: 'number' }
    ],
    props
  )

  props.width = '500'

  // Children
  const children = getChildren(svg)

  /**
   * Render
   */
  return <Svg {...props}>{children}</Svg>
}

if (process.env.REACT_APP_RENDER_TEST) {
  const RenderTest = () => {
    const [SVG, setSVG] = useState<JSX.Element>()

    const div = document.createElement('div')
    const tmpRoot = ReactDOM.createRoot(div)
    tmpRoot.render(
      <>
        {/* {simple} */}
        {blackGraph}
        {graph}
      </>
    )

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
        <PDFViewer style={{ width: '100%', height: '90vh' }}>
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
