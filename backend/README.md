

# HHGuestHouses - HeliHolland Guest Houses Management
# 🖥️ BACK END


**HH Guest Houses** is a modern React-based application for managing guesthouses in Heli Holland company.





  


  



  

---
## 🛠️ Tech Stack

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)**Node.js** – JavaScript runtime  
- ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff) **Express** – Web framework for building APIs  
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff) + ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=fff) **MongoDB + Mongoose** – Database and ODM  
- ![Helmet](https://img.shields.io/badge/Helmet-000000?logo=helmet&logoColor=fff) **Helmet** – Security middleware for HTTP headers  
- ![Rate Limit](https://img.shields.io/badge/express--rate--limit-3178C6?logo=express&logoColor=fff) **express-rate-limit** – Rate limiting middleware  
- ![Validator](https://img.shields.io/badge/express--validator-FFCA28?logo=checkmarx&logoColor=000) **express-validator** – Request validation  
- ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=fff) **jsonwebtoken (JWT)** – Authentication and authorization  
- ![bcrypt](https://img.shields.io/badge/bcrypt-004080?logo=keybase&logoColor=fff) **bcrypt** – Password hashing  
- ![Multer](https://img.shields.io/badge/Multer-FF6F00?logo=files&logoColor=fff) **Multer** – File upload handling  
- ![Sharp](https://img.shields.io/badge/Sharp-00BFFF?logo=sharp&logoColor=fff) **Sharp** – Image processing  
- ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?logo=dotenv&logoColor=000) **dotenv** – Environment variables management  
- ![nodemon](https://img.shields.io/badge/nodemon-76D04B?logo=nodemon&logoColor=fff) **nodemon** – Development tool for automatic server restart  
- ![Brevo](https://img.shields.io/badge/Brevo-0A84FF?logo=mailgun&logoColor=fff) **@getbrevo/brevo / sib-api-v3-sdk** – Email sending via Brevo API  



## 📦 Installation
 Install npm
 
 ```bash
 npm install npm@latest -g
 ```


## 🚀 Run locally

1. Clone the project

```bash
  git clone https://github.com/jackvpt/hhguesthouses.git
```

2. Go to the project directory

```bash
  cd hhguesthouses
```

3. Install dependencies

```bash
  npm install
```

4. Start the server

```bash
  nodemon server
```

5. Access the server
  http://localhost:7000

## 📡 API reference
Go to swagger page: http://localhost:3000/api-docs

## 🗂️ Models schemas
Go to swagger page: http://localhost:3000/api-docs
## 👨‍💻 Author
Developed by **jackvpt**

GitHub: https://github.com/jackvpt

## 🛡️ License
Licensed under the MIT License.

See the `LICENSE` file for details.

## 📁 Structure
```
📁 root/
├─ 📁 controllers
├─ 📁 middleware
├─ 📁 models
├─ 📁 routes
├─ 📁 swagger
├─ 📁 utils
├─ 📄 app.js
├─ 📄 package.json
├─ 📄 server.js
├─ 📄 swagger.js
```