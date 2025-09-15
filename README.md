# HRnet – Employee Management Application

**HRnet** is a modern React-based application for managing employee records in a company.  
This project is a full refactor of an old jQuery-based application, built as part of the **OpenClassrooms Front-End Developer path**.

---

## 🖥️ Demo

> 💡 You can deploy the app on GitHub Pages, Vercel, Netlify or similar platforms.

---

## 🚀 Features

- Create new employee profiles via form
- Live form validation with user feedback
- Custom confirmation modal after submission
- Employee list with search, sort, and pagination
- State management with Redux Toolkit
- Unit and integration tests with Vitest and Testing Library
- Responsive design with Material UI

---

## 🛠️ Tech Stack

- **React + Vite** – Front-end framework and tooling
- **Redux Toolkit** – Global state management
- **Material UI (MUI)** – Component library
- **SCSS / CSS** – Style customization
- **Vitest** – Test runner
- **React Testing Library** – Component testing

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/hrnet.git
cd hrnet
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Then open your browser at: http://localhost:5173

---

## 🧪 Run Tests

To run tests from the terminal:

```bash
npx vitest
```

To launch the test UI:

```bash
npx vitest --ui
```

---

## 📁 Project Structure

```
src/
├── assets/             # Static assets (icons, images)
├── components/         # Reusable UI components (Modal, Input, Table...)
├── data/               # Constant data (departments, states)
├── features/           # Redux slices (employeeSlice)
├── models/             # Models
├── pages/              # Main pages (CreateEmployee, EmployeeList)
├── store/              # Redux store
├── styles/             # SCSS styles
├── __tests__/          # Unit and integration tests
├── App.jsx             # Main routing logic
└── main.jsx            # React entry point
```

---

## 📌 Modal Component

The project includes a custom, reusable modal component written in pure React for form submission confirmations, replacing the jQuery modal.

---

## 🛡️ License

Licensed under the MIT License.  
See the `LICENSE` file for details.

---

## 👨‍💻 Author

Developed by **jackvpt**  
GitHub: https://github.com/jackvpt

---
