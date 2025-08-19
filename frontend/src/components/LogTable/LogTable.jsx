// 👉 Material UI components for table layout
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

// 👉 i18n translation hook
import { useTranslation } from "react-i18next"

/**
 * Component to display logs in a table format.
 * Sorts logs by date descending and maps each log to a table row.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.logs - Array of log objects with { id, date, email, action, remarks }
 * @param {Array<Object>} props.users - Array of user objects with { firstName, lastName, email }
 * @returns {JSX.Element} Rendered LogTable component
 */
const LogTable = ({ logs, users }) => {
  // i18n translation function
  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* Table headers with localization */}
            <TableCell align="center">{t("logs.date")}</TableCell>
            <TableCell align="center">{t("logs.user")}</TableCell>
            <TableCell align="center">{t("logs.action")}</TableCell>
            <TableCell align="center">{t("logs.remarks")}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {logs
            // Sort logs descending by date
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((log) => {
              // Find the user corresponding to the log email
              const user = users.find((u) => u.email === log.email)

              return (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
                  <TableCell>
                    {user ? `${user.firstName} ${user.lastName}` : log.email}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.remarks}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LogTable
