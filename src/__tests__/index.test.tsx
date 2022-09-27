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
    console.log(reactSvg)
  })
})
