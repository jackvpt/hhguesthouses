
# HHGuestHouses - HeliHolland Guest Houses Management
  

**HHGuestHouses** is a modern React-based application for managing guesthouses in Heli Holland company.

---
## 🚀 BACK END URL routes
http://localhost:3000/api-docs



## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web framework for building APIs
- **MongoDB + Mongoose** – Database and ODM
- **Helmet** – Security middleware for HTTP headers
- **express-rate-limit** – Rate limiting middleware
- **express-validator** – Request validation
- **jsonwebtoken (JWT)** – Authentication and authorization
- **bcrypt** – Password hashing
- **Multer** – File upload handling
- **Sharp** – Image processing
- **dotenv** – Environment variables management
- **nodemon** – Development tool for automatic server restart
- **@getbrevo/brevo / sib-api-v3-sdk** – Email sending via Brevo API
---
## 📦 Installation

  

1. Clone the repository:

  

```bash

git  clone  https://github.com/your-username/hrnet.git

cd  hrnet

```

  

2. Install dependencies:

  

```bash

npm  install

```

  

3. Run the development server:

  

```bash

npm  run  dev

```

  

Then open your browser at: http://localhost:5173

  

---

  

## 🧪 Run Tests

  

To run tests from the terminal:

  

```bash

npx  vitest

```

  

To launch the test UI:

  

```bash

npx  vitest  --ui

```

  

---

  

## 📁 Project Structure

  

```

src/

├── assets/ # Static assets (icons, images)

├── components/ # Reusable UI components (Modal, Input, Table...)

├── data/ # Constant data (departments, states)

├── features/ # Redux slices (employeeSlice)

├── models/ # Models

├── pages/ # Main pages (CreateEmployee, EmployeeList)

├── store/ # Redux store

├── styles/ # SCSS styles

├── __tests__/ # Unit and integration tests

├── App.jsx # Main routing logic

└── main.jsx # React entry point

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