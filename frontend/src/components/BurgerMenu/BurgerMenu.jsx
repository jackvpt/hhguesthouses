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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function BurgerMenu() {
  const { data: logs, isLoading, error } = useLogs()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  // State to control the drawer open/close
  const [open, setOpen] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

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

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <Error
        message={[
          "An error occurred while loading log data.",
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
              <ListItem className="burger-menu__account">
                <p className="burger-menu__name">{`${user.firstName} ${user.lastName}`}</p>
                <div
                  className={`burger-menu__role ${user.role}`}
                >{`${convertRole(user.role)}`}</div>
              </ListItem>
              <Divider />
              {user.role === "super-admin" && (
                <>
                  <ListItemButton onClick={handleSignUp}>
                    <ListItemText primary="Sign up" />
                  </ListItemButton>
                  <ListItemButton onClick={handleModalOpen}>
                    <ListItemText primary="View log" />
                  </ListItemButton>
                </>
              )}

              <ListItemButton onClick={handleLogOut}>
                <ListItemText primary="Log out" />
              </ListItemButton>
              <Divider />
              <ListItem>
                <p className="burger-menu__version">
                  Software version : {__APP_VERSION__}{" "}
                </p>
              </ListItem>
            </List>
          </Drawer>
        </section>
      </ThemeProvider>

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
                  <TableCell>Email</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.date).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.email}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.remarks}</TableCell>
                    </TableRow>
                  ))}
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
