import { useDispatch, useSelector } from "react-redux"
import { Select, MenuItem } from "@mui/material"
import { NL, GB } from "country-flag-icons/react/3x2"
import { setLanguage } from "../../features/parametersSlice"

const LanguageSwitcher = () => {
  const dispatch = useDispatch()
  const lang = useSelector((state) => state.parameters.language)

  return (
    <Select
      value={lang}
      onChange={(e) => dispatch(setLanguage(e.target.value))}
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
