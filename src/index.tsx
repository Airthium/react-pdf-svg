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

const stringToCamelCase = (str: string): string => {
  const splitted = str.split('-')
  if (splitted.length === 1) return splitted[0]

  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join('')
  )
}

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

    // // Props
    // const attributes = item.attributes
    // let props: { [key: string]: string } = {}
    // for (const attribute of attributes) {
    //   if (attribute.name === 'stroke-dasharray') {
    //     // BUG wrong formatting of stroke-dasharray: "3 3" instead of stroke-dasharray: "3, 3"
    //     props[stringToCamelCase(attribute.name)] = attribute.value
    //       .split(' ')
    //       .join(', ')
    //   } else {
    //     props[stringToCamelCase(attribute.name)] = attribute.value
    //   }
    // }
    // props.key = uuid()

    //TODO set presentation attributes

    // Switch
    switch (type) {
      case 'line':
        const lineProps: ReactPDF.LineProps = { x1: 0, x2: 0, y1: 0, y2: 0 }
        {
          const x1 = item.getAttribute('x1')
          x1 && (lineProps.x1 = x1)
          const x2 = item.getAttribute('x2')
          x2 && (lineProps.x2 = x2)
          const y1 = item.getAttribute('y1')
          y1 && (lineProps.y1 = y1)
          const y2 = item.getAttribute('y2')
          y2 && (lineProps.y2 = y2)
        }

        children.push(<Line {...lineProps}>{getChildren(item)}</Line>)
        break
      case 'polyline':
        const polylineProps: ReactPDF.PolylineProps = { points: '' }
        {
          const points = item.getAttribute('points')
          points && (polylineProps.points = points)
        }

        children.push(
          <Polyline {...polylineProps}>{getChildren(item)}</Polyline>
        )
        break
      case 'polygon':
        const polygonProps: ReactPDF.PolygonProps = { points: '' }
        {
          const points = item.getAttribute('points')
          points && (polygonProps.points = points)
        }

        children.push(
          <Polygon {...(polygonProps as unknown as ReactPDF.PolygonProps)}>
            {getChildren(item)}
          </Polygon>
        )
        break
      case 'path':
        const pathProps: ReactPDF.PathProps = { d: '' }
        {
          const d = item.getAttribute('d')
          d && (pathProps.d = d)
        }

        children.push(<Path {...pathProps}>{getChildren(item)}</Path>)
        break
      case 'rect':
        const rectProps: ReactPDF.RectProps = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
        {
          const x = item.getAttribute('x')
          x && (rectProps.x = x)
          const y = item.getAttribute('y')
          y && (rectProps.y = y)
          const width = item.getAttribute('width')
          width && (rectProps.width = width)
          const height = item.getAttribute('height')
          height && (rectProps.height = height)
          const rx = item.getAttribute('rx')
          rx && (rectProps.rx = rx)
          const ry = item.getAttribute('ry')
          ry && (rectProps.ry = ry)
        }

        children.push(<Rect {...rectProps}>{getChildren(item)}</Rect>)
        break
      case 'circle':
        const circleProps: ReactPDF.CircleProps = { cx: 0, cy: 0, r: 0 }
        {
          const cx = item.getAttribute('cx')
          cx && (circleProps.cx = cx)
          const cy = item.getAttribute('cy')
          cy && (circleProps.cy = cy)
          const r = item.getAttribute('r')
          r && (circleProps.r = r)
        }

        children.push(<Circle {...circleProps}>{getChildren(item)}</Circle>)
        break
      case 'ellipse':
        const ellipseProps: ReactPDF.EllipseProps = {
          cx: 0,
          cy: 0,
          rx: 0,
          ry: 0
        }
        {
          const cx = item.getAttribute('cx')
          cx && (ellipseProps.cx = cx)
          const cy = item.getAttribute('cy')
          cy && (ellipseProps.cy = cy)
          const rx = item.getAttribute('rx')
          rx && (ellipseProps.rx = rx)
          const ry = item.getAttribute('ry')
          ry && (ellipseProps.ry = ry)
        }

        children.push(<Ellipse {...ellipseProps}>{getChildren(item)}</Ellipse>)
        break
      case 'text':
        const textProps: ReactPDF.SVGTextProps = { x: 0, y: 0 }
        {
          const x = item.getAttribute('x')
          x && (textProps.x = x)
          const y = item.getAttribute('y')
          y && (textProps.y = y)
        }

        children.push(<Text {...textProps}>{getChildren(item)}</Text>)
        break
      case 'tspan':
        const tspanProps: ReactPDF.TspanProps = { x: 0, y: 0 }
        {
          const x = item.getAttribute('x')
          x && (tspanProps.x = x)
          const y = item.getAttribute('y')
          y && (tspanProps.y = y)
        }

        children.push(<Tspan {...tspanProps}>{getChildren(item)}</Tspan>)
        break
      case 'g':
        const gProps: ReactPDF.GProps = {}

        children.push(<G {...gProps}>{getChildren(item)}</G>)
        break
      case 'stop':
        const stopProps: ReactPDF.StopProps = { offset: 0, stopColor: '' }
        {
          const offset = item.getAttribute('offset')
          offset && (stopProps.offset = offset)
          const stopColor = item.getAttribute('stopColor')
          stopColor && (stopProps.stopColor = stopColor)
          const stopOpacity = item.getAttribute('stopOpacity')
          stopOpacity && (stopProps.stopOpacity = stopOpacity)
        }

        children.push(<Stop {...stopProps}>{getChildren(item)}</Stop>)
        break
      case 'defs':
        children.push(<Defs>{getChildren(item)}</Defs>)
        break
      case 'clippath':
        const clipPathProps: ReactPDF.ClipPathProps = {}

        children.push(
          <ClipPath {...clipPathProps}>{getChildren(item)}</ClipPath>
        )
        break
      case 'lineargradient':
        const linearGradientProps: ReactPDF.LinearGradientProps = {
          id: '',
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0
        }
        {
          const id = item.getAttribute('id')
          id && (linearGradientProps.id = id)
          const x1 = item.getAttribute('x1')
          x1 && (linearGradientProps.x1 = x1)
          const x2 = item.getAttribute('x2')
          x2 && (linearGradientProps.x2 = x2)
          const y1 = item.getAttribute('y1')
          y1 && (linearGradientProps.y1 = y1)
          const y2 = item.getAttribute('y2')
          y2 && (linearGradientProps.y1 = y2)
        }

        children.push(
          <LinearGradient {...linearGradientProps}>
            {getChildren(item)}
          </LinearGradient>
        )
        break
      case 'radialgradient':
        const radialGradientProps: ReactPDF.RadialGradientProps = {
          id: '',
          cx: 0,
          cy: 0,
          fr: 0,
          fx: 0,
          fy: 0
        }
        {
          const id = item.getAttribute('id')
          id && (radialGradientProps.id = id)
          const cx = item.getAttribute('cx')
          cx && (radialGradientProps.cx = cx)
          const cy = item.getAttribute('cy')
          cy && (radialGradientProps.cy = cy)
          const fr = item.getAttribute('fr')
          fr && (radialGradientProps.fr = fr)
          const fx = item.getAttribute('fx')
          fx && (radialGradientProps.fx = fx)
          const fy = item.getAttribute('fy')
          fy && (radialGradientProps.fy = fy)
        }

        children.push(
          <RadialGradient {...radialGradientProps}>
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

  // Props
  const props: ReactPDF.SVGProps = {}
  const width = svg.getAttribute('width')
  width && (props.width = width)
  const height = svg.getAttribute('height')
  height && (props.height = height)
  const viewBox = svg.getAttribute('viewBox')
  viewBox && (props.viewBox = viewBox)
  const presetAspectRatio = svg.getAttribute('preserveAspectRatio')
  presetAspectRatio && (props.preserveAspectRatio = presetAspectRatio)

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
        className="recharts-surface"
        width="500"
        height="500"
        viewBox="0 0 500 500"
        version="1.1"
      >
        <defs>
          <clipPath id="recharts109-clip">
            <rect x="80" y="0" height="470" width="420"></rect>
          </clipPath>
        </defs>
        <g className="recharts-cartesian-grid">
          <g className="recharts-cartesian-grid-horizontal">
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="470"
              x2="500"
              y2="470"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="352.5"
              x2="500"
              y2="352.5"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="235"
              x2="500"
              y2="235"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="117.5"
              x2="500"
              y2="117.5"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="0"
              x2="500"
              y2="0"
            ></line>
          </g>
          <g className="recharts-cartesian-grid-vertical">
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="122"
              y1="0"
              x2="122"
              y2="470"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="290"
              y1="0"
              x2="290"
              y2="470"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="458"
              y1="0"
              x2="458"
              y2="470"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="80"
              y1="0"
              x2="80"
              y2="470"
            ></line>
            <line
              strokeDasharray="3 3"
              stroke="#ccc"
              fill="none"
              x="80"
              y="0"
              width="420"
              height="470"
              offset="[object Object]"
              x1="500"
              y1="0"
              x2="500"
              y2="470"
            ></line>
          </g>
        </g>
        <g className="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis">
          <line
            type="category"
            orientation="bottom"
            width="420"
            height="30"
            x="80"
            y="470"
            className="recharts-cartesian-axis-line"
            stroke="#666"
            fill="none"
            x1="80"
            y1="470"
            x2="500"
            y2="470"
          ></line>
          <g className="recharts-cartesian-axis-ticks">
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="80"
                y="470"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="122"
                y1="476"
                x2="122"
                y2="470"
              ></line>
              <text
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="122"
                y="478"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="middle"
              >
                <tspan x="122" dy="0.71em">
                  Airthium
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="80"
                y="470"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="290"
                y1="476"
                x2="290"
                y2="470"
              ></line>
              <text
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="290"
                y="478"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="middle"
              >
                <tspan x="290" dy="0.71em">
                  Gas boiler
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="80"
                y="470"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="458"
                y1="476"
                x2="458"
                y2="470"
              ></line>
              <text
                type="category"
                orientation="bottom"
                width="420"
                height="30"
                x="440.8984375"
                y="478"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="middle"
              >
                <tspan x="440.8984375" dy="0.71em">
                  Biomass boiler
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g className="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis">
          <line
            type="number"
            orientation="left"
            width="60"
            height="470"
            x="20"
            y="0"
            className="recharts-cartesian-axis-line"
            stroke="#666"
            fill="none"
            x1="80"
            y1="0"
            x2="80"
            y2="470"
          ></line>
          <g className="recharts-cartesian-axis-ticks">
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="20"
                y="0"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="74"
                y1="470"
                x2="80"
                y2="470"
              ></line>
              <text
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="72"
                y="470"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
              >
                <tspan x="72" dy="0.355em">
                  0
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="20"
                y="0"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="74"
                y1="352.5"
                x2="80"
                y2="352.5"
              ></line>
              <text
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="72"
                y="352.5"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
              >
                <tspan x="72" dy="0.355em">
                  70
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="20"
                y="0"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="74"
                y1="235"
                x2="80"
                y2="235"
              ></line>
              <text
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="72"
                y="235"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
              >
                <tspan x="72" dy="0.355em">
                  140
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="20"
                y="0"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="74"
                y1="117.5"
                x2="80"
                y2="117.5"
              ></line>
              <text
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="72"
                y="117.5"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
              >
                <tspan x="72" dy="0.355em">
                  210
                </tspan>
              </text>
            </g>
            <g className="recharts-layer recharts-cartesian-axis-tick">
              <line
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="20"
                y="0"
                className="recharts-cartesian-axis-tick-line"
                stroke="#666"
                fill="none"
                x1="74"
                y1="0"
                x2="80"
                y2="0"
              ></line>
              <text
                type="number"
                orientation="left"
                width="60"
                height="470"
                x="72"
                y="12.5"
                stroke="none"
                fill="#666"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
              >
                <tspan x="72" dy="0.355em">
                  280
                </tspan>
              </text>
            </g>
          </g>
        </g>
        <g className="recharts-layer recharts-bar">
          <g className="recharts-layer recharts-bar-rectangles">
            <g className="recharts-layer">
              <g className="recharts-layer recharts-bar-rectangle">
                <svg
                  x="88.4"
                  y="426.78632100726475"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="linearGradientco2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0091f2"
                        stopOpacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stopColor="#00b9f3"
                        stopOpacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#linearGradientco2)"
                    width="67"
                    height="43.213678992735254"
                  ></rect>
                </svg>
              </g>
              <g className="recharts-layer recharts-bar-rectangle">
                <svg
                  x="172.4"
                  y="360.1186065345646"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="linearGradientco2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0091f2"
                        stopOpacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stopColor="#00b9f3"
                        stopOpacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#linearGradientco2)"
                    width="67"
                    height="109.8813934654354"
                  ></rect>
                </svg>
              </g>
              <g className="recharts-layer recharts-bar-rectangle">
                <svg
                  x="256.4"
                  y="68.09147975705605"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="linearGradientco2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0091f2"
                        stopOpacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stopColor="#00b9f3"
                        stopOpacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#linearGradientco2)"
                    width="67"
                    height="401.90852024294395"
                  ></rect>
                </svg>
              </g>
              <g className="recharts-layer recharts-bar-rectangle">
                <svg
                  x="340.4"
                  y="15.254368259600085"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="linearGradientco2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0091f2"
                        stopOpacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stopColor="#00b9f3"
                        stopOpacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#linearGradientco2)"
                    width="67"
                    height="454.7456317403999"
                  ></rect>
                </svg>
              </g>
              <g className="recharts-layer recharts-bar-rectangle">
                <svg
                  x="424.4"
                  y="405.6550398625829"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="linearGradientco2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0091f2"
                        stopOpacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stopColor="#00b9f3"
                        stopOpacity="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <rect
                    fill="url(#linearGradientco2)"
                    width="67"
                    height="64.3449601374171"
                  ></rect>
                </svg>
              </g>
            </g>
          </g>
        </g>
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

      console.log(svg)

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
