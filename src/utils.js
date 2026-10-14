// Format a latitude/longitude pair as a short, readable string, e.g. "42.99°N, 71.46°W".
export function formatCoords(lat, lng) {
  const latDirection = lat >= 0 ? 'N' : 'S'
  const lngDirection = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(2)}°${latDirection}, ${Math.abs(lng).toFixed(2)}°${lngDirection}`
}
