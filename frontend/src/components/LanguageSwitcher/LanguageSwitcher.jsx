// 👉 React Redux hooks
import { useDispatch, useSelector } from "react-redux"

// 👉 Material UI components
import { Select, MenuItem } from "@mui/material"

// 👉 Country flags
import { NL, GB } from "country-flag-icons/react/3x2"

// 👉 Redux actions pour mettre à jour la langue
import { setLanguage } from "../../features/parametersSlice"
import { setPreferredLanguage } from "../../features/userSlice"

// 👉 Custom hook pour mettre à jour l'utilisateur dans le backend
import { useUpdateUser } from "../../hooks/useUpdateUser"

/**
 * LanguageSwitcher component.
 * Allows the user to switch the application language.
 * Updates both Redux state and user settings in the backend (if logged in).
 *
 * @component
 * @returns {JSX.Element} Rendered language selector dropdown
 */
const LanguageSwitcher = () => {
  const dispatch = useDispatch()

  // Get current user from Redux store
  const user = useSelector((state) => state.user)

  // Get current application language from Redux store
  const lang = useSelector((state) => state.parameters.language)

  // Custom hook to update user data in backend
  const updateUserMutation = useUpdateUser()

  /**
   * Handle language change event.
   * Updates Redux state and user's preferred language in backend if user is logged in.
   *
   * @param {React.ChangeEvent<{ value: unknown }>} event - The select change event
   */
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value
    // Update application language in Redux
    dispatch(setLanguage(newLanguage))
    dispatch(setPreferredLanguage(newLanguage))

    // Update user's preferred language in backend if logged in
    if (user?.userId) {
      updateUserMutation.mutate({
        id: user.userId,
        updatedData: {
          ...user,
          settings: {
            ...user.settings,
            preferredLanguage: newLanguage,
          },
        },
      })
    }
  }

  return (
    <Select
      value={lang}
      onChange={handleLanguageChange}
      size="small"
      IconComponent={null} // Remove default MUI dropdown icon
      renderValue={(value) => {
        // Show country flag for the selected language
        switch (value) {
          case "en":
            return <GB title="English" style={{ width: 20 }} />
          case "nl":
            return <NL title="Nederlands" style={{ width: 20 }} />
          default:
            return null
        }
      }}
      sx={{
        minWidth: 40,
        "& .MuiSelect-select": {
          padding: "2px 4px !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      {/* Menu items with flags */}
      <MenuItem value="en">
        <GB title="English" style={{ width: 18, marginRight: 6 }} />
        English
      </MenuItem>
      <MenuItem value="nl">
        <NL title="Nederlands" style={{ width: 18, marginRight: 6 }} />
        Nederlands
      </MenuItem>
    </Select>
  )
}

export default LanguageSwitcher
