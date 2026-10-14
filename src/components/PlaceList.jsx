import { formatCoords } from '../utils'

// The running list of places shown beside the map while the user is still adding them.
// Clicking an entry opens that place's info box (the same box a marker click opens),
// which is also where a place can be deleted.
export default function PlaceList({ places, onSelect }) {
  return (
    <aside className="place-list" aria-label="Places you have added">
      <h2>
        Your places <span className="count">{places.length}</span>
      </h2>

      {places.length === 0 ? (
        <p className="empty">Nothing yet. Click the map to add your first place.</p>
      ) : (
        <ol>
          {places.map((place) => (
            <li key={place.id}>
              <button type="button" className="place-item" onClick={() => onSelect(place.id)}>
                <span className="place-info">{place.info || 'No details entered'}</span>
                <span className="place-coords">{formatCoords(place.lat, place.lng)}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </aside>
  )
}