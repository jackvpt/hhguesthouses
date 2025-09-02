import "./PhotoCarouselModal.scss"

// 👉 FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faMapLocationDot } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

/**
 * PhotoCarouselModal
 * A reusable photo carousel modal component with:
 * - Dark theme
 * - Bottom arrows for navigation
 * - Two text lines: name + address
 * - Fixed URL prefix for photos
 */
const PhotoCarouselModal = ({ open, onClose, photos, title }) => {
  const { t } = useTranslation()
  // Current index of the displayed photo
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLocation, setShowLocation] = useState(false)

  // Return null if no photos provided
  if (!photos || photos.length === 0) return null

  // Navigate to previous photo (loops to last if at first)
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  // Navigate to next photo (loops to first if at last)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "512px",
        },
      }}
    >
      {/* Modal title */}
      <DialogTitle>{title || "Photo Gallery"}</DialogTitle>

      <DialogContent>
        <Box textAlign="center" flex={1}>
          <div className="flip-scene">
            {/* Display the current image */}
            {showLocation ? (
              <img
                src={`/images/parking-lot/${photos[currentIndex].url_location}`}
                alt={`Photo ${currentIndex + 1}`}
              />
            ) : (
              <img
                src={`/images/parking-lot/${photos[currentIndex].url}`}
                alt={`Photo ${currentIndex + 1}`}
              />
            )}
            <IconButton
              className="button-icon"
              onClick={() => setShowLocation((prev) => !prev)}
            >
              {showLocation ? (
                <FontAwesomeIcon icon={faCamera} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faMapLocationDot} size="lg" />
              )}
            </IconButton>
          </div>
          {/* Display the name of the photo/location */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {photos[currentIndex].name}
          </Typography>

          {/* Display the address or description */}
          <Typography variant="body2" color="text.secondary">
            {photos[currentIndex].address}
          </Typography>

          {/* Navigation arrows below the image */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            mt={1}
          >
            <IconButton onClick={handlePrev}>
              <ArrowBack />
            </IconButton>
            {currentIndex + 1} / {photos.length}
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>

      {/* Close button */}
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="contained">
          {t("actions.close")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PhotoCarouselModal
