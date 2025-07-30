import { Button } from "@mui/material"
import "./Error.scss"
import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate=useNavigate()
  return (
    <section className="error">
      <p className="error__message">Page Not Found</p>
      <h1 className="error__title">404</h1>
      <p className="error__message">Oops... Something went wrong</p>
      <p className="error__message">Sorry for the inconvenience</p>
      <Button variant="contained" color="primary" onClick={() => navigate("/display")}>
        Go to Homepage
      </Button>
    </section>
  )
}

export default Error
