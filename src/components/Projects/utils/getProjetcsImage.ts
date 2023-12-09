import BombeirosImage from '@/assets/ProjectsLogos/bombeiros-wallpaper.png'
import CrudApiImage from '@/assets/ProjectsLogos/crud-api-wallpaper.png'
import BancoInterImage from '@/assets/ProjectsLogos/banco-inter-wallpaper.png'
import NlwSpacetimeImage from '@/assets/ProjectsLogos/nlw-spacetime-wallpaper.png'
import ShoppingCartImage from '@/assets/ProjectsLogos/shopping-cart-wallpaper.png'
import WeatherApiImage from '@/assets/ProjectsLogos/weather-api-wallpaper.png'

const getProjectImage = (projectName: string) => {
  switch (projectName) {
    case 'sa-senai-bombeiros':
      return BombeirosImage
    case 'Banco-Inter':
      return BancoInterImage
    case 'nlw-spacetime':
      return NlwSpacetimeImage
    case 'shopping-cart':
      return ShoppingCartImage
    case 'crud-api':
      return CrudApiImage
    case 'weather-api':
      return WeatherApiImage
    default:
      return 'https://i0.wp.com/ouvidoria.jaboatao.pe.gov.br/wp-content/uploads/2023/10/placeholder-23-1.png?fit=1200%2C800&ssl=1'
  }
}

export default getProjectImage
