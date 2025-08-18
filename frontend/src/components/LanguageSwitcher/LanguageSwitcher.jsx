import { useDispatch, useSelector } from "react-redux"
import { Select, MenuItem } from "@mui/material"
import { NL, GB } from "country-flag-icons/react/3x2"
import { setLanguage } from "../../features/parametersSlice"
import { useUpdateUser } from "../../hooks/useUpdateUser"

const LanguageSwitcher = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const lang = useSelector((state) => state.parameters.language)
  const updateUserMutation = useUpdateUser()

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value
    dispatch(setLanguage(newLanguage))
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
      IconComponent={null}
      renderValue={(value) => {
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
