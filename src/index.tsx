/** @module Index */

import ReactDOM from 'react-dom/client'
import React, { useCallback, useEffect, useState } from 'react'
import ReactPDF, { Document, Page, PDFViewer, Svg } from '@react-pdf/renderer'

import {
  circleToCircle,
  clipPathToClipPath,
  defsToDefs,
  ellipseToEllipse,
  getAttributes,
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
} from './toSvg'

import simple from './__tests__/simple'
import recharts from './__tests__/recharts'

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
    const type = item.tagName.toLowerCase()

    // Switch
    switch (type) {
      case 'svg':
        children.push(svgToSvg(item))
        break
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
        children.push(clipPathToClipPath(item))
        break
      case 'lineargradient':
        children.push(linearGradientToLinearGradient(item))
        break
      case 'radialgradient':
        children.push(radialGradientToRadialGradient(item))
        break
      default:
        console.error('Skip item', item)
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
const convert = (svg: SVGElement): JSX.Element => {
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

  /**
   * Render
   */
  return <Svg {...props}>{getChildren(svg)}</Svg>
}

/// TEST

/**
 * Render test
 * @returns RenderTest
 */
export const RenderTest = () => {
  // State
  const [div, setDiv] = useState<HTMLDivElement>()
  const [SVG, setSVG] = useState<JSX.Element>()

  /**
   * Get svg
   */
  const getSVG = useCallback(() => {
    const svg = div?.children?.[0] as SVGElement
    if (!svg) {
      setTimeout(getSVG, 500)
      return
    }

    const ReactSVG = convert(svg)
    setSVG(ReactSVG)
  }, [div])

  // Mount / unmount
  useEffect(() => {
    const div = document.createElement('div')
    const tmpRoot = ReactDOM.createRoot(div)
    tmpRoot.render(
      <>
        {recharts}
        {simple}
      </>
    )
    setDiv(div)

    // Start trying svg
    getSVG()

    return () => {
      tmpRoot.unmount()
      if (document.body.contains(div)) document.removeChild(div)
    }
  }, [])

  /**
   * Render
   */
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

if (process.env.REACT_APP_RENDER_TEST) {
  // Root
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )

  /**
   * Render
   */
  root.render(
    <React.StrictMode>
      <RenderTest />
    </React.StrictMode>
  )
}

export default convert
