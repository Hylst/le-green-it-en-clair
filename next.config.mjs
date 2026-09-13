/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Génère un site statique dans le dossier 'out'
  basePath: '/greenit', // Indique que le site sera hébergé dans /greenit/
  trailingSlash: true, // Ajoute / à la fin des URLs pour compatibilité Nginx
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Requis pour l'export statique
    qualities: [75, 85], // quality={85} utilisé partout (convention projet)
  },
}

export default nextConfig
