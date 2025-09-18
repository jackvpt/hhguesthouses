// 📁 CSS imports
import "./BurgerMenu.scss"

// 🌍 Library imports
import { useTranslation } from "react-i18next"

// 📦 React imports
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// 🗃️ State & Data fetching
import { useDispatch, useSelector } from "react-redux"

// 🧩 MUI Core imports
import {
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

// 🌐 React Query hooks
import { useFetchLogs } from "../../hooks/useFetchLogs"
import { useFetchUsers } from "../../hooks/useFetchUsers"

// 🧰 Local utilities
import { convertRole } from "../../utils/stringTools"

// 👉 Internal components
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import LogTable from "../LogTable/LogTable"
import PhotoCarouselModal from "../PhotoCarouselModal/PhotoCarouselModal"
import ContactFormModal from "../ContactFormModal/ContactFormModal"

// 👉 Data
import parkingLot from "../../data/parking-lot"

/**
 * BurgerMenu component providing:
 * - Navigation options
 * - User account management
 * - Access to logs (admin only)
 * - Language switcher
 * - Parking lot photo carousel
 * - Contact form modal
 * - Logout functionality
 */
export default function BurgerMenu() {
  // Translation module
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const { data: logs, isLoadingLogs, errorLogs } = useFetchLogs()
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useFetchUsers()

  // States
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [parkingModalOpen, setParkingModalOpen] = useState(false)
  const [contactFormModalOpen, setContactFormModalOpen] = useState(false)

  /**
   * Toggle the drawer state.
   * @param {boolean} state - Whether the drawer should be open.
   * @returns {Function} Event handler to change drawer state.
   */
  const toggleDrawer = (state) => () => setOpen(state)

  /** Open logs modal */
  const handleModalOpen = () => setModalOpen(true)
  /** Close logs modal */
  const handleModalClose = () => setModalOpen(false)

  /** Open parking lot modal */
  const handleParkingModalOpen = () => {
    setOpen(false)
    setParkingModalOpen(true)
  }
  /** Close parking lot modal */
  const handleParkingModalClose = () => setParkingModalOpen(false)

  /** Open contact form modal */
  const handleContactFormModalOpen = () => {
    setOpen(false)
    setContactFormModalOpen(true)
  }
  /** Close contact form modal */
  const handleContactFormModalClose = () => setContactFormModalOpen(false)

  /** Log out the current user */
  const handleLogOut = () => {
    navigate("/login")
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    dispatch({ type: "user/clearUser" })
    dispatch({ type: "parameters/reset" })
    setOpen(false)
  }

  /** Navigate to signup page */
  const handleSignUp = () => {
    navigate("/signup")
    setOpen(false)
  }

  /** Navigate to account page */
  const handleAccount = () => {
    navigate("/account")
    setOpen(false)
  }

  // Loading and error handling
  if (isLoadingLogs || isLoadingUsers) {
    return <Loader />
  }

  if (errorLogs || errorUsers) {
    return (
      <Error
        message={[
          t("error.fetch-data"),
          t("error.network"),
          t("error.contact-support"),
          t("error.apologies"),
        ]}
      />
    )
  }

  return (
    <>
      <section className="burger-menu">
        {/* Burger menu button */}
        <IconButton
          className="burger-menu__icon"
          edge="start"
          color="inherit"
          aria-label={t("burger-menu.open")}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ fontSize: "3rem" }} />
        </IconButton>

        {/* Drawer with navigation and user options */}
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <List sx={{ width: "100%", padding: 2 }}>
            {user.userId && (
              <>
                {/* Account info */}
                <ListItem className="burger-menu__account">
                  <p className="burger-menu__name">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                  <div className={`burger-menu__role ${user.role}`}>
                    {convertRole(user.role)}
                  </div>
                </ListItem>
                <Divider />

                {/* Account settings */}
                <ListItemButton onClick={handleAccount}>
                  <ListItemText primary={t("burger-menu.account-settings")} />
                </ListItemButton>
              </>
            )}

            {/* Language switcher */}
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ListItemText
                primary={`${t("burger-menu.language")}:`}
                sx={{ flex: "0 0 auto" }}
              />
              <LanguageSwitcher />
            </ListItem>

            {/* Parking lot photos */}
            {user.userId && (
              <ListItemButton onClick={handleParkingModalOpen}>
                <ListItemText primary={t("burger-menu.parking-lot")} />
              </ListItemButton>
            )}

            {/* Admin options */}
            {user.role === "super-admin" && (
              <>
                <ListItemButton onClick={handleSignUp} size="small">
                  <ListItemText primary={t("burger-menu.signup")} />
                </ListItemButton>
                <ListItemButton onClick={handleModalOpen}>
                  <ListItemText primary={t("burger-menu.view-log")} />
                </ListItemButton>
              </>
            )}

            {/* Contact form */}
            <ListItemButton onClick={handleContactFormModalOpen}>
              <ListItemText primary={t("burger-menu.contact")} />
            </ListItemButton>

            {/* Log out */}
            <ListItemButton onClick={handleLogOut}>
              <ListItemText primary={t("burger-menu.log-out")} />
            </ListItemButton>

            <Divider />

            {/* Software version */}
            <ListItem>
              <div className="burger-menu__version">
                <img src="/logo-hh.png" alt="HH Guest Houses Logo" width={16} />
                <p>
                  {t("burger-menu.software-version")}: {__APP_VERSION__}
                </p>
              </div>
            </ListItem>
          </List>
        </Drawer>
      </section>

      {/* Logs modal (admin only) */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Log details</DialogTitle>
        <DialogContent>
          <LogTable logs={logs} users={users} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Parking lot photo carousel */}
      <PhotoCarouselModal
        open={parkingModalOpen}
        onClose={handleParkingModalClose}
        photos={parkingLot}
        title={t("carousel-parking.title")}
      />

      {/* Contact form modal */}
      <ContactFormModal
        open={contactFormModalOpen}
        onClose={handleContactFormModalClose}
      />
    </>
  )
}
