import "./Loader.scss"

/**
 * Loader component displaying a loading animation.
 *
 * @component
 * @returns {JSX.Element} The Loader component.
 */
const Loader = () => {
  return (
    <section className="loader">
      <div className="loader__modal">
        <div className="loader__container">
          <div className="loader__spinner"></div>
          <div className="loader__text">
            Loading...
          </div>
        </div>
      </div>
    </section>
  )
}

export default Loader
