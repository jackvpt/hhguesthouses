# HH Guesthouses

[![Vite](https://img.shields.io/badge/Vite-7.0.4-blue)](https://vitejs.dev/) 
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/) 
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple)](https://redux-toolkit.js.org/) 
[![React Query](https://img.shields.io/badge/React%20Query-5.83.0-orange)](https://tanstack.com/query/latest) 
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> Web application for managing guesthouses, built with **React**, **Material UI (MUI)**, **Redux Toolkit**, and **React Query**.

---

## Table of Contents

- [Installation](#installation)  
- [Available Scripts](#available-scripts)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Internationalization](#internationalization)  
- [React Query DevTools](#react-query-devtools)  
- [Example: Logs Table](#example-logs-table)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd hhguesthouses
npm install

Available Scripts
Command	Description
npm run dev	Start the Vite development server
npm run build	Build the app for production
npm run preview	Preview the production build
npm run lint	Run ESLint checks

Tech Stack

React 19 – Front-end library

Vite – Fast development and build tool

Material UI (MUI v7) – Modern UI components

Redux Toolkit – Global state management

React Query – Server state, caching, and API management

React Router DOM v7 – Client-side routing

i18next & react-i18next – Internationalization (i18n)

Axios – HTTP requests

date-fns – Date manipulation

Sass – CSS preprocessor

Font Awesome – Icons

Country Flag Icons – Country flags

Project Structure
hhguesthouses/
├─ src/
│  ├─ components/      # Reusable components
│  ├─ pages/           # Main pages
│  ├─ store/           # Redux Toolkit slices
│  ├─ api/             # API calls with Axios
│  ├─ i18n/            # Internationalization setup
│  ├─ styles/          # SCSS files
│  └─ App.jsx          # React entry point
├─ public/             # Static assets
├─ package.json
└─ vite.config.js

Internationalization

This app uses i18next for multilingual support.
Translation files are located in src/i18n/locales.

Example usage:

import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t("welcome.message")}</h1>;
};

React Query DevTools

You can enable React Query DevTools to debug and inspect queries:

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

Example: Logs Table (MUI + Redux + React Query)
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LogTable = () => {
  const { t } = useTranslation();
  const token = useSelector(state => state.auth.token);

  const { data: logs = [] } = useQuery(["logs"], () =>
    axios.get("/api/logs", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data)
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t("logs.date")}</TableCell>
            <TableCell align="center">{t("logs.user")}</TableCell>
            <TableCell align="center">{t("logs.action")}</TableCell>
            <TableCell align="center">{t("logs.remarks")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(log => (
            <TableRow key={log._id}>
              <TableCell>{new Date(log.date).toLocaleString()}</TableCell>
              <TableCell>{log.userName}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Contributing

Fork the repository

Create a feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -m "Add my feature"

Push to branch: git push origin feature/my-feature

Open a Pull Request

License

This project is licensed under the MIT License.