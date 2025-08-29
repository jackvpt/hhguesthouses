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
          margin: "12px",
          width: "100%",
          maxWidth: "512px",
        },
      }}
    >
      {/* Modal title */}
      <DialogTitle>{title || "Photo Gallery"}</DialogTitle>

      <DialogContent>
        <Box textAlign="center" flex={1}>
          {/* Display the current image */}
          <img
            src={`/images/parking-lot/${photos[currentIndex].url}`}
            alt={`Photo ${currentIndex + 1}`}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
            }}
          />

          {/* Display the name of the photo/location */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {photos[currentIndex].name}
          </Typography>

          {/* Display the address or description */}
          <Typography variant="body2" color="text.secondary">
            {photos[currentIndex].address}
          </Typography>

          {/* Navigation arrows below the image */}
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <IconButton onClick={handlePrev}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>

      {/* Close button */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("actions.close")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PhotoCarouselModal
