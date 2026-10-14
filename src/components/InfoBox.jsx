import { useEffect, useRef, useState } from 'react'

// A popup box used in two ways:
//   mode="edit" - the user types info about a newly clicked spot
//   mode="view" - the user reads the info they saved earlier
// In both modes, Esc or Enter closes the box (in edit mode it also saves the text).
// Shift+Enter inserts a new line while typing.
//
// Optional buttons:
//   onDiscard (edit mode) - throw the new spot away, for when the user misclicked
//   onDelete  (view mode) - remove the saved place; needs a second click to confirm
export default function InfoBox({
  mode,
  title,
  subtitle,
  initialText = '',
  maxLength = 500,
  onClose,
  onDiscard,
  onDelete,
}) {
  const isEditing = mode === 'edit'
  const [text, setText] = useState(initialText)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  // Refs let the keyboard listener always see the latest values without re-subscribing.
  const textRef = useRef(text)
  const onCloseRef = useRef(onClose)
  const hasClosedRef = useRef(false)
  textRef.current = text
  onCloseRef.current = onClose

  // Normal close (Esc, Enter, Save/Close button). Runs exactly once, even if the key is
  // held down and fires several events before the box disappears.
  function finish() {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    onCloseRef.current(textRef.current)
  }

  // Close in a different way (Discard or Delete)
  function closeWith(action) {
    if (hasClosedRef.current) return
    hasClosedRef.current = true
    action()
  }

  // double discard(confirm deletion).
  function handleDeleteClick() {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      return
    }
    closeWith(onDelete)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      // dont treat Enter as "finished" while an input method (IME) is composing text.
      if (event.isComposing) return
      if (event.key === 'Escape') {
        event.preventDefault()
        finish()
      } else if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // dark area outside box also closes it.
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) finish()
  }

  return (
    <div className="backdrop" onMouseDown={handleBackdropClick}>
      <div className="info-box" role="dialog" aria-modal="true" aria-label={title}>
        <h2>{title}</h2>
        <p className="info-subtitle">{subtitle}</p>

        {isEditing ? (
          <>
            <textarea
              className="info-input"
              value={text}
              maxLength={maxLength}
              autoFocus
              placeholder="e.x. My sisters dogs cousin's Aunt used to live here."
              onChange={(event) => setText(event.target.value)}
            />
            <p className="char-count">
              {text.length} / {maxLength}
            </p>
          </>
        ) : (
          <p className="info-text">{text || 'No details were entered for this place.'}</p>
        )}

        <p className="info-hint">
          {isEditing
            ? 'Press Esc or Enter to save and close. (Shift+Enter starts a new line.) Misclicked? Press Discard.'
            : 'Press Esc or Enter to close, or click anywhere outside this box.'}
        </p>

        <div className="info-actions">
          {isEditing && onDiscard && (
            <button type="button" className="btn btn-secondary" onClick={() => closeWith(onDiscard)}>
              Discard
            </button>
          )}
          {!isEditing && onDelete && (
            <button type="button" className="btn btn-secondary" onClick={handleDeleteClick}>
              {confirmingDelete ? 'Click again to delete' : 'Delete'}
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={finish}>
            {isEditing ? 'Save' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}