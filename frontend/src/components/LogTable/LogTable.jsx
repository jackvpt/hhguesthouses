import "./LogTable.scss"

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
    <section className="log-table">
      <TableContainer component={Paper} aria-label={t("logs.table")}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {/* Table headers with localization */}
              <TableCell align="center" sx={{ width: "20%" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ width: "30%" }}>
                User
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                Action
              </TableCell>
              <TableCell align="center" sx={{ width: "30%" }}>
                Remarks
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logs
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((log) => {
                const user = users.find((u) => u.email === log.email)

                return (
                  <TableRow key={log._id}>
                    <TableCell align="center">
                      {new Date(log.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="center" className="log-table__cell">
                      <div className={`${user.role}`}>
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : log.email}
                      </div>
                    </TableCell>
                    <TableCell align="center">{log.action}</TableCell>
                    <TableCell align="center">{log.remarks}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

export default LogTable
