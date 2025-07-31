// BurgerMenu.jsx
import { useState } from "react"
import { IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function BurgerMenu() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (state) => () => {
    setOpen(state)
  }

  const handleLogOut = () => {
    
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
          <ListItem button>
            <ListItemText primary="Log out" onClick={handleLogOut}/>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  )
}
