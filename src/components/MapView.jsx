import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

// Start zoomed out to show the whole world, since places can be anywhere on Earth.
const WORLD_CENTER = [20, 0]
const WORLD_ZOOM = 2
// Keep the user from panning off the edge of the world (and keeps clicked coordinates valid).
const WORLD_BOUNDS = [
  [-85, -180],
  [85, 180],
]

// Markers are drawn with CSS (see styles.css) so they don't depend on Leaflet's image files,

const savedIcon = L.divIcon({
  className: 'pin',
  html: '<span></span>',
  iconSize: [28, 34],
  iconAnchor: [14, 34],
})
const pendingIcon = L.divIcon({
  className: 'pin pin-pending',
  html: '<span></span>',
  iconSize: [28, 34],
  iconAnchor: [14, 34],
})

// Listens for clicks on the map itself and reports where they happened.
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      // wrap() keeps longitude within -180..180 even if the world has been scrolled sideways
      onMapClick(event.latlng.wrap())
    },
  })
  return null
}

// Tells Leaflet to redraw when its container changes size
// (for example when the place list disappears after pressing Done, or the phone rotates).
function MapResizer() {
  const map = useMap()
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])
  return null
}

export default function MapView({ places, pendingSpot, onMapClick, onMarkerClick }) {
  return (
    <div className="map-wrap">
      <MapContainer
        className="map"
        center={WORLD_CENTER}
        zoom={WORLD_ZOOM}
        minZoom={2}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onMapClick={onMapClick} />
        <MapResizer />

        {/* One marker for every saved place */}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={savedIcon}
            keyboard={false}
            eventHandlers={{ click: () => onMarkerClick(place.id) }}
          />
        ))}

        {/* A temporary marker while the user is typing info for a new spot */}
        {pendingSpot && (
          <Marker
            position={[pendingSpot.lat, pendingSpot.lng]}
            icon={pendingIcon}
            interactive={false}
            keyboard={false}
          />
        )}
      </MapContainer>
    </div>
  )
}
