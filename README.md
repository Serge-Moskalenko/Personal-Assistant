# Personal Assistant

## Project Description

**Personal Assistant** is a multi-service web application designed to help users manage tasks, reminders, and other personal data through a responsive web interface. The system consists of:

- **Backend (Django API)**

  - Provides RESTful endpoints for user registration, authentication (JWT), task management, notifications, and more.
  - Utilizes Celery for background task processing (e.g., sending reminder emails, parsing RSS feeds).
  - Stores all persistent data in PostgreSQL and uses Redis as both a cache and Celery broker.

- **Frontend (Next.js + React)**
  - Offers a modern, responsive UI built with Next.js, React, and Material UI.
  - Integrates React Query for efficient data fetching and caching.
  - Uses Zustand for global state management and React Hook Form + Yup for form validation.
  - Communicates with the Django API via Axios using a base URL configured from an environment variable.

All services are packaged into Docker containers and orchestrated via Docker Compose, enabling one-command setup and deployment on any machine that supports Docker.

---

## Technical Stack

### Backend

- **Language & Framework**:

  - Python 3.13
  - Django 5.2
  - Django REST Framework (DRF)

- **Database & Caching**:

  - PostgreSQL 17 (primary relational database)
  - Redis 7-alpine (cache layer and Celery broker)

- **Asynchronous Processing**:

  - Celery 5.5 (worker and beat scheduler)

- **Authentication & Authorization**:

  - `djangorestframework-simplejwt` (JWT-based auth)

- **Storage & File Uploads**:

  - `django-storages` + Boto3 (optional, for Amazon S3 uploads)

- **Environment & Settings**:

  - `pydantic-settings` (manage all `.env` values via a Pydantic `BaseSettings` class)
  - `django-environ` (alternate configuration handling if desired)

- **Other Libraries**:

  - `django-filter` (query filtering)
  - `django-cors-headers` (CORS configuration)
  - `psycopg[binary]` (PostgreSQL driver)
  - `gunicorn` (production WSGI server)
  - `feedparser` (RSS/Atom parsing)

- **Development & CI**:
  - Poetry (dependency management)
  - Black (code formatting)

### Frontend

- **Framework & Libraries**:

  - Next.js 15.3.1 (React framework with SSR / SSG support)
  - React 19 (UI library)
  - Material UI (MUI) 7 (component library)
  - React Hook Form 7 + Yup 1.6 (form state management and validation)
  - React Query 5 (data fetching and caching)
  - Zustand 5 (lightweight global state)

- **HTTP & Utilities**:

  - Axios 1.9 (HTTP client)
  - jwt-decode 4.0 (decode JWT tokens on client side)

- **Tooling & Linting**:
  - TypeScript 5.8 (type safety)
  - ESLint 9 + `eslint-config-next` (linting)
  - Prettier (code formatting)

### Infrastructure & DevOps

- **Containerization & Orchestration**:

  - Docker (for each service: backend, frontend, PostgreSQL, Redis, Celery)
  - Docker Compose v3.8 (to define and run multi-container application)

- **Web Server (Backend)**:

  - Gunicorn (WSGI HTTP server with multiple workers)

- **Task Scheduler (Backend)**:

  - Celery Beat (for periodic jobs, e.g., sending scheduled reminders)

- **Version Control & CI/CD** (recommended):
  - Git / GitHub (repository hosting)
  - GitHub Actions (CI/CD pipelines)

---

## Running the Project with Docker Compose

> **Prerequisites:**
>
> - Docker Engine (version ≥ 20.10) installed
> - Docker Compose (version ≥ 1.29) installed
> - A valid `.env` file in the project root (see “Environment Variables” section below)

1. **Clone the repository**

   ```bash
   git clone https://github.com/Serge-Moskalenko/Personal-Assistant.git
   cd Personal-Assistant

   ```

2. Create and configure your .env file
   backend:
  ```bash
# PostgreSQL Credentials

POSTGRES_DB=personal_assistant_db
POSTGRES_USER=postgresuser
POSTGRES_PASSWORD=postgrespassword

DB_HOST=db
DB_PORT=5432
DATABASE_URL=postgresql://postgresuser:postgrespassword@db:5432/personal_assistant_db

# Django Settings

SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

SITE_HOST_URL=http://localhost:3000

# AWS (optional, if using S3)

AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=us-west-2
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Email (SMTP)

EMAIL_HOST=smtp.example.com
EMAIL_HOST_USER=you@example.com
EMAIL_HOST_PASSWORD=your_email_password

# Redis (Celery broker & cache)

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redispassword
REDIS_URL=redis://:redispassword@redis:6379/0
 ```

    frontend:
```bash
NEXT_PUBLIC_DJANGO_API_URL=http://localhost:8000
```

3. Verify Docker & Docker Compose are running

   ```bash
   docker --version
   docker-compose --version

   ```

4. Build and start all services

   ```bash
   docker-compose up --build

   ```

5. Access the running application

   Frontend (Next.js UI):

   ```bash
      http://localhost:3000
   ```

   Backend (Django API):

   ```bash
      http://localhost:8000

   ```

6. Stopping the services
   ```bash
   docker-compose down
   ```
