// import '@formkit/themes/genesis'
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import genesis from '@/node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'

// defaultConfig({
//   theme: 'genesis' // will load from CDN and inject into document head
// })

export default {
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(genesis),
  },
}