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

    // Props
    const attributes = item.attributes
    let props: { [key: string]: string } = {}
    for (const attribute of attributes) {
      if (attribute.name === 'stroke-dasharray') {
        props[stringToCamelCase(attribute.name)] = attribute.value
          .split(' ')
          .join(', ')
      } else {
        props[stringToCamelCase(attribute.name)] = attribute.value
      }
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
    props[stringToCamelCase(attribute.name)] = attribute.value
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
