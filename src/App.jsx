import { useRef, useState } from 'react'
import MapView from './components/MapView'
import PlaceList from './components/PlaceList'
import InfoBox from './components/InfoBox'
import { formatCoords } from './utils'

// Limits that keep the app responsive no matter what the user does.
const MAX_PLACES = 100
const MAX_INFO_LENGTH = 500

export default function App() {
  // Every saved place: { id, lat, lng, info }
  const [places, setPlaces] = useState([])
  // false = the user is still adding places, true = just show the map and markers
  const [isDone, setIsDone] = useState(false)
  // A spot the user just clicked that is waiting for its info to be entered
  const [pendingSpot, setPendingSpot] = useState(null)
  // The id of the saved place whose info box is open (after clicking its marker)
  const [selectedId, setSelectedId] = useState(null)
  // A friendly (non-error) message, e.g. when the place limit is reached
  const [notice, setNotice] = useState('')
  // Counter that hands out a unique id to each place
  const nextId = useRef(1)

  const selectedIndex = places.findIndex((place) => place.id === selectedId)
  const selectedPlace = selectedIndex >= 0 ? places[selectedIndex] : null

  // The user clicked an empty part of the map: start collecting info for that spot.
  function handleMapClick(latlng) {
    // Ignore clicks once Done was pressed, or while an info box is already open.
    if (isDone || pendingSpot || selectedPlace) return

    if (places.length >= MAX_PLACES) {
      setNotice(`That's the limit of ${MAX_PLACES} places. Press Reset to start over.`)
      return
    }
    setNotice('')
    setPendingSpot({ lat: latlng.lat, lng: latlng.lng })
  }

  // Esc/Enter was pressed in the "new place" box: save the place and close the box.
  function handleSavePending(text) {
    if (!pendingSpot) return
    const info = text.trim().slice(0, MAX_INFO_LENGTH)
    const newPlace = { id: nextId.current++, lat: pendingSpot.lat, lng: pendingSpot.lng, info }
    setPlaces((previous) => [...previous, newPlace])
    setPendingSpot(null)
  }

  // The user clicked a saved marker: show the info they entered for it.
  function handleMarkerClick(id) {
    if (pendingSpot) return
    setSelectedId(id)
  }

  // The user misclicked: throw the pending spot away without saving anything.
  function handleDiscardPending() {
    setPendingSpot(null)
  }

  // Remove one saved place (the others keep their markers and the list renumbers itself).
  function handleDeletePlace(id) {
    setPlaces((previous) => previous.filter((place) => place.id !== id))
    setSelectedId(null)
  }

  function handleDone() {
    setPendingSpot(null)
    setIsDone(true)
  }

  // Clear everything and start over.
  function handleReset() {
    setPlaces([])
    setPendingSpot(null)
    setSelectedId(null)
    setNotice('')
    setIsDone(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Oh, the places you've been</h1>
        <div className="actions">
          <button type="button" className="btn btn-primary" onClick={handleDone} disabled={isDone}>
            Done
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </header>

      <p className="hint">
        {isDone
          ? 'Click any marker to see what you wrote about that place. Press Reset to start over.'
          : 'Click the map to mark a place you’ve lived, visited, or want to visit. Press Done when you’ve added them all.'}
      </p>
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      <main className={isDone ? 'content content-done' : 'content'}>
        <MapView
          places={places}
          pendingSpot={pendingSpot}
          onMapClick={handleMapClick}
          onMarkerClick={handleMarkerClick}
        />
        {!isDone && <PlaceList places={places} onSelect={handleMarkerClick} />}
      </main>

      {pendingSpot && (
        <InfoBox
          mode="edit"
          title="Tell us about this place"
          subtitle={formatCoords(pendingSpot.lat, pendingSpot.lng)}
          maxLength={MAX_INFO_LENGTH}
          onClose={handleSavePending}
          onDiscard={handleDiscardPending}
        />
      )}

      {selectedPlace && (
        <InfoBox
          key={selectedPlace.id}
          mode="view"
          title={`Place ${selectedIndex + 1}`}
          subtitle={formatCoords(selectedPlace.lat, selectedPlace.lng)}
          initialText={selectedPlace.info}
          onClose={() => setSelectedId(null)}
          onDelete={() => handleDeletePlace(selectedPlace.id)}
        />
      )}
    </div>
  )
}
