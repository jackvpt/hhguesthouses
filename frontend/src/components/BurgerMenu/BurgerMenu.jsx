// BurgerMenu.jsx
import { useState } from "react"
import { IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function BurgerMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State to control the drawer open/close
  const [open, setOpen] = useState(false)

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

  return (
    <ThemeProvider theme={darkTheme}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: "100%" }}>
          <ListItemButton onClick={handleLogOut}>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Drawer>
    </ThemeProvider>
  )
}
