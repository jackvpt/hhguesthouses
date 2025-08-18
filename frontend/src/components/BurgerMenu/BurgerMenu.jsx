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
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { convertRole } from "../../utils/stringTools"
import { useLogs } from "../../hooks/useLogs"
import { useTranslation } from "react-i18next"
import { useUsers } from "../../hooks/useUsers"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function BurgerMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const { data: logs, isLoadingLogs, errorLogs } = useLogs()
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useUsers()

  // State to control the drawer open/close
  const [open, setOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const { t } = useTranslation()

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

  const toggleDrawer = (state) => () => {
    setOpen(state)
  }

  const handleLogOut = () => {
    navigate("/login")
    localStorage.removeItem("token")
    dispatch({ type: "user/clearUser" })
    dispatch({ type: "parameters/reset" })
    setOpen(false)
  }

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
          "An error occurred while loading data.",
          "Please check your network connection.",
          "If the problem persists, contact support.",
          "We apologize for the inconvenience.",
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
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
            <List sx={{ width: "100%", padding: 2 }}>
              {user.userId  && (
                <>
                  <ListItem className="burger-menu__account">
                    <p className="burger-menu__name">{`${user.firstName} ${user.lastName}`}</p>
                    <div
                      className={`burger-menu__role ${user.role}`}
                    >{`${convertRole(user.role)}`}</div>
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

      {/** Modal for viewing logs */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Log Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">User name</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Remarks</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {logs
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((log) => {
                    const user = users.find((u) => u.email === log.email)
                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.date).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.remarks}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
