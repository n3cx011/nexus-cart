# 🛒 NexusCart

A full-stack, microservices-based e-commerce application built with **Spring Boot** backends and a **React** frontend. NexusCart demonstrates a Service-Oriented Architecture (SOA) with independently deployable services for authentication, product management, order/cart management, and payments.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                 │
│              http://localhost:5173                        │
└───────┬────────────┬────────────┬──────────────┬─────────┘
        │            │            │              │
        ▼            ▼            ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│  Auth    │ │ Product  │ │  Order   │ │   Payment    │
│ Service  │ │ Service  │ │ Service  │ │   Service    │
│ :8081    │ │ :8082    │ │  :8083   │ │    :8084     │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘
     │            │            │              │
     ▼            ▼            ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│ auth-db  │ │product-db│ │ order-db │ │  payment-db  │
│ :5433    │ │  :5435   │ │  :5434   │ │    :5436     │
│(Postgres)│ │(Postgres)│ │(Postgres)│ │  (Postgres)  │
└──────────┘ └──────────┘ └──────────┘ └──────────────┘
```

All services communicate over a shared **Docker bridge network** (`nexus-network`).

---

## 🚀 Services

| Service | Port | Description | Database Port |
|---|---|---|---|
| **auth-service** | `8081` | User registration, login & JWT issuance | `5433` |
| **product-service** | `8082` | Product catalog CRUD | `5435` |
| **order-service** | `8083` | Cart & order management | `5434` |
| **payment-service** | `8084` | Payment processing | `5436` |
| **frontend** | `5173` | React SPA (Vite dev server) | — |

---

## 🛠️ Tech Stack

### Backend (all 4 services)
- **Java** with **Spring Boot 4.1.0**
- **Spring Security** (auth & order services)
- **Spring Data JPA** with **Hibernate**
- **PostgreSQL** – dedicated DB per service
- **Lombok** – boilerplate reduction
- **JJWT 0.11.5** – JWT token generation & validation (auth service)
- **Gradle** – build tool
- **Docker** – containerisation

### Frontend
- **React 19** with **Vite 8**
- **React Router DOM v7** – client-side routing
- **Axios** – HTTP client with JWT interceptor
- **Tailwind CSS v4** – utility-first styling
- **Lucide React** – icon library

---

## 📁 Project Structure

```
nexus-cart/
├── docker-compose.yml          # Orchestrates all services & databases
├── auth-service/               # Spring Boot – authentication & JWT
│   ├── src/
│   ├── build.gradle
│   └── dockerfile
├── product-service/            # Spring Boot – product catalog
│   ├── src/
│   ├── build.gradle
│   └── Dockerfile
├── order-service/              # Spring Boot – cart & orders
│   ├── src/
│   ├── build.gradle
│   └── Dockerfile
├── payment-service/            # Spring Boot – payments
│   ├── src/
│   ├── build.gradle
│   └── dockerfile
└── frontend/                   # React + Vite SPA
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Shop.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Orders.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js          # Axios instances per service
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for running all services via Docker Compose)
- [Node.js 18+](https://nodejs.org/) and npm (for the frontend)
- [Java 17+](https://adoptium.net/) (only if running backend services locally without Docker)

---

## 🐳 Running with Docker Compose (Recommended)

This is the easiest way to spin up all backend services and their databases.

```bash
# From the project root
docker-compose up --build
```

This will start:
- 4 PostgreSQL databases
- 4 Spring Boot microservices

> **Note:** First build may take several minutes while Gradle downloads dependencies and Docker builds images.

To stop all services:
```bash
docker-compose down
```

To stop and remove all volumes (fresh DB state):
```bash
docker-compose down -v
```

---

## 💻 Running the Frontend

After the backend services are running, start the React dev server:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔑 API Endpoints

### Auth Service (`http://localhost:8081`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login & receive a JWT token |

### Product Service (`http://localhost:8082`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/{id}` | Get a product by ID |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/{id}` | Update a product |
| `DELETE` | `/api/products/{id}` | Delete a product |

### Order Service (`http://localhost:8083`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cart/{username}` | Get cart for a user |
| `POST` | `/cart/{username}/add` | Add item to cart |
| `DELETE` | `/cart/{username}/clear` | Clear user cart |
| `POST` | `/orders` | Place an order |
| `GET` | `/orders/{username}` | Get orders for a user |

### Payment Service (`http://localhost:8084`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments` | Process a payment |
| `GET` | `/api/payments/{orderId}` | Get payment status |

---

## 🔐 Authentication

The auth service issues **JWT tokens** upon successful login. The frontend automatically attaches the token to every subsequent request via an Axios request interceptor:

```js
// frontend/src/services/api.js
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

Tokens are stored in `localStorage` under the key `token`. The current username is stored under `currentUser`.

---

## 🗄️ Database Configuration

Each service has its own isolated PostgreSQL database. The default credentials (used in Docker Compose) are:

| Service | DB Name | Host (Docker) | External Port |
|---|---|---|---|
| auth-service | `nexus_auth_db` | `auth-db` | `5433` |
| product-service | `nexus_product_db` | `product-db` | `5435` |
| order-service | `nexus_order_db` | `order-db` | `5434` |
| payment-service | `nexus_payment_db` | `payment-db` | `5436` |

**Default credentials:** username `postgres`, password `password`

---

## 🖥️ Frontend Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Login.jsx` | User login form |
| `/register` | `Register.jsx` | New user registration |
| `/shop` | `Shop.jsx` | Browse product catalog & add to cart |
| `/cart` | `Cart.jsx` | View & manage shopping cart |
| `/checkout` | `Checkout.jsx` | Review order & proceed to payment |

---

## 🏗️ Building Backend Services Individually

Each Spring Boot service can be built independently using Gradle:

```bash
# Example for auth-service
cd auth-service
./gradlew build

# Run locally (requires a local PostgreSQL instance)
./gradlew bootRun
```

---

## 📦 Environment Variables

The following environment variables can be configured for each backend service (set via Docker Compose or system env):

| Variable | Service | Description |
|---|---|---|
| `SPRING_DATASOURCE_URL` | All | JDBC connection URL |
| `SPRING_DATASOURCE_USERNAME` | auth-service | DB username |
| `SPRING_DATASOURCE_PASSWORD` | auth-service | DB password |
| `DB_HOST` | product/order service | Database hostname |

---

## 📚 Course Context

This project was developed as a **Mini Project** for **IT41073 – Service Oriented Computing** (Semester 6). It demonstrates key SOA and microservices principles:

- **Loose coupling** – services communicate via REST APIs
- **High cohesion** – each service owns a single business domain
- **Database per service** – no shared data stores
- **Independent deployability** – each service has its own Dockerfile
- **Technology heterogeneity** – same stack but independently configurable

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is for academic purposes under IT41073 – Service Oriented Computing.
