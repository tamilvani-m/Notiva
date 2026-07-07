function Modal({ children, title }) {
  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-card">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
