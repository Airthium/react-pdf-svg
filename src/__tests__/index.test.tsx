import React from 'react'
import ReactDOM from 'react-dom/client'
import svgToSvg from '..'

describe('svgToSvg', () => {
  test('simple', async () => {
    const htmlSvg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="300"
        height="200"
      >
        <title>Exemple simple de figure SVG</title>
        <desc>
          Cette figure est constituée d'un rectangle, d'un segment de droite et
          d'un cercle.
        </desc>

        <rect width="100" height="80" x="0" y="70" fill="green" />
        <line x1="5" y1="5" x2="250" y2="95" stroke="red" />
        <circle cx="90" cy="80" r="50" fill="blue" />
        <text x="180" y="60">
          Un texte
        </text>
      </svg>
    )

    const div = document.createElement('div')
    const root = ReactDOM.createRoot(div)
    root.render(htmlSvg)

    let svg: SVGElement | null = null
    while (!svg) {
      svg = div.children?.[0] as SVGElement
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    root.unmount()

    const reactSvg = svgToSvg(svg)
    expect(reactSvg).toBeDefined()
  })

  test('recharts', async () => {
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
              stroke-dasharray="3 3"
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
                text-anchor="middle"
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
                text-anchor="middle"
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
                text-anchor="middle"
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
                text-anchor="end"
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
                text-anchor="end"
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
                text-anchor="end"
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
                text-anchor="end"
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
                text-anchor="end"
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
                        stop-color="#0091f2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stop-color="#00b9f3"
                        stop-opacity="1"
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
                        stop-color="#0091f2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stop-color="#00b9f3"
                        stop-opacity="1"
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
                        stop-color="#0091f2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stop-color="#00b9f3"
                        stop-opacity="1"
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
                        stop-color="#0091f2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stop-color="#00b9f3"
                        stop-opacity="1"
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
                        stop-color="#0091f2"
                        stop-opacity="1"
                      ></stop>
                      <stop
                        offset="50%"
                        stop-color="#00b9f3"
                        stop-opacity="1"
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
    const root = ReactDOM.createRoot(div)
    root.render(htmlSvg)

    let svg: SVGElement | null = null
    while (!svg) {
      svg = div.children?.[0] as SVGElement
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    root.unmount()

    const reactSvg = svgToSvg(svg)
    expect(reactSvg).toBeDefined()
  })
})
