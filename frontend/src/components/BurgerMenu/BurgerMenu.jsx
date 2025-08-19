import "./BurgerMenu.scss"
import { useState } from "react"
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
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { convertRole } from "../../utils/stringTools"
import { useFetchLogs } from "../../hooks/useFetchLogs"
import { useTranslation } from "react-i18next"
import { useFetchUsers } from "../../hooks/useFetchUsers"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

import Loader from "../Loader/Loader"
import Error from "../Error/Error"
import LogTable from "../LogTable/LogTable"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

/**
 * BurgerMenu component with user options and logs display.
 */
export default function BurgerMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const { data: logs, isLoadingLogs, errorLogs } = useFetchLogs()
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useFetchUsers()

  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { t } = useTranslation()

  /**
   * Toggle the drawer state.
   * @param {boolean} state
   */
  const toggleDrawer = (state) => () => setOpen(state)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

  /** Handle user logout */
  const handleLogOut = () => {
    navigate("/login")
    localStorage.removeItem("token")
    dispatch({ type: "user/clearUser" })
    dispatch({ type: "parameters/reset" })
    setOpen(false)
  }

  /** Navigate to signup page */
  const handleSignUp = () => {
    navigate("/signup")
    setOpen(false)
  }

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
      <ThemeProvider theme={darkTheme}>
        <section className="burger-menu">
          <IconButton
            className="burger-menu__icon"
            edge="start"
            color="inherit"
            aria-label={t("burger-menu.open")}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "3rem" }} />
          </IconButton>

          <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
            <List sx={{ width: "100%", padding: 2 }}>
              {user.userId && (
                <>
                  <ListItem className="burger-menu__account">
                    <p className="burger-menu__name">
                      {`${user.firstName} ${user.lastName}`}
                    </p>
                    <div className={`burger-menu__role ${user.role}`}>
                      {convertRole(user.role)}
                    </div>
                  </ListItem>
                  <Divider />
                </>
              )}

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

              <ListItemButton onClick={handleLogOut}>
                <ListItemText primary={t("burger-menu.log-out")} />
              </ListItemButton>

              <Divider />

              <ListItem>
                <div className="burger-menu__version">
                  <img
                    src="/logo-hh.png"
                    alt="HH Guest Houses Logo"
                    width={16}
                  />
                  <p>
                    {t("burger-menu.software-version")}: {__APP_VERSION__}
                  </p>
                </div>
              </ListItem>
            </List>
          </Drawer>
        </section>
      </ThemeProvider>

      {/* Modal to display logs */}
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
    </>
  )
}
