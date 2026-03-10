# CLAUDE.md

This file provides guidance for AI assistants working on **BadmintonDb2** — a badminton stats tracker web application.

## Project Overview

A full-stack web app for tracking badminton tournaments, events, brackets, and player statistics. Players can sign up, join tournaments, and track game scores.

- **Repository**: https://github.com/Epicnessism/BadmintonDb2
- **Production URL**: https://badmintonstatstracker.com/
- **Author**: Tony Wang

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Backend    | Node.js + Express.js                          |
| Frontend   | Angular 13 + Angular Material + Flex Layout   |
| Database   | PostgreSQL via Knex.js query builder           |
| Auth       | Cookie-session + bcrypt                        |
| Testing    | Jest (backend), Karma + Jasmine (frontend)     |
| Deployment | Docker → AWS ECR → AWS ECS                    |

## Project Structure

```
BadmintonDb2/
├── src/                     # Express.js backend
│   ├── server.js            # Main entry point (serves API + static frontend)
│   ├── routes/              # API route handlers
│   │   ├── auth.js          # Login, signup, signout, currentUser
│   │   ├── players.js       # Player search, profiles
│   │   ├── games.js         # Game CRUD with validation
│   │   ├── sets.js          # Set operations
│   │   ├── tournaments.js   # Tournament management
│   │   ├── events.js        # Event management
│   │   └── search.js        # Search functionality
│   ├── controllers/         # Business logic & validation
│   │   ├── Games.js         # Game validation, score calculation
│   │   ├── Sets.js          # Set validation
│   │   ├── Events.js        # Event logic
│   │   ├── Brackets.js      # Tournament bracket logic
│   │   └── Players.js       # Player operations
│   ├── models/              # Data models & enums
│   └── dbconfig.js          # Knex DB connection setup
├── bst-frontend/            # Angular 13 frontend
│   └── src/app/
│       ├── components/      # UI components (login, profile, tournament, etc.)
│       ├── services/        # Angular services (auth, players, tournaments, search)
│       ├── interfaces/      # TypeScript data models
│       ├── directives/      # Custom directives
│       └── app-routing.module.ts  # Hash-based SPA routing
├── migrations/              # Knex database migrations (13 files)
├── seeds/                   # Knex database seeds (12 files)
├── aws/                     # ECS task definitions
├── Dockerfile               # Production Docker build
├── knexfile.js              # Knex config (dev/staging/prod)
├── jest.config.ts           # Jest backend test config
└── .github/workflows/       # CI/CD (deploy on push to develop)
```

## Common Commands

```bash
# Backend
npm run dev              # Start Express server with nodemon
npm test                 # Run Jest backend tests

# Frontend
npm run frontend         # Start Angular dev server on port 4200
cd bst-frontend && ng build   # Build frontend
cd bst-frontend && ng test    # Run Angular tests (Karma + Jasmine)

# Database
npm run knexup           # Run pending migrations
npm run knexdown         # Rollback last migration
npm run knexups          # Run migrations + seeds
npm run knexfull         # Rollback all, migrate, and seed (full reset)
```

## Development Setup

1. PostgreSQL must be running locally on `127.0.0.1:5432`
2. Create database `bst_db`
3. Set environment variables (see `.env` section below)
4. `npm install` in root and `bst-frontend/`
5. `npm run knexfull` to initialize the database
6. `npm run dev` for backend, `npm run frontend` for frontend

### Environment Variables

```
PORT=80
LOCAL_DB_URL='127.0.0.1'
LOCAL_DB_USER='postgres'
LOCAL_DB_PWD=''
LOCAL_DB_NAME='bst_db'
PROD_DATABASE_URL=''
PROD_DATABASE_NAME=''
PROD_DATABASE_USER=''
PROD_DATABASE_PASSWORD=''
```

## Architecture Notes

- **Backend serves frontend**: In production, Express serves the Angular dist from `bst-frontend/dist/bst-frontend/`
- **UUIDs everywhere**: All primary keys use UUIDs (not auto-increment)
- **Session auth**: Cookie-session based authentication (not JWT)
- **Hash routing**: Frontend uses `#` hash-based routing for SPA compatibility
- **State machine**: Tournaments/events use states: `NOT_STARTED`, `IN_PROGRESS`, `FINISHED` (see `src/models/StateEnum.js`)
- **Port 8888**: Docker exposes port 8888; dev backend defaults to port 80

## Database Schema (Key Tables)

- `users` — Authentication (uuid PK, email, password hash)
- `players` — Player profiles (linked to users)
- `tournaments` — Tournament metadata
- `events` — Events within tournaments
- `brackets` — Tournament bracket trees
- `sets` — Match sets with player references
- `games` — Individual games with scores (team_1_points, team_2_points)
- `teams_to_players` — Team composition (many-to-many)
- `events_to_players` / `events_to_teams` — Participation junction tables
- `tournament_admins` — Admin access control

## Coding Conventions

- **No linter or formatter configured** — follow existing code style
- **Backend**: CommonJS modules (`require`/`module.exports`), callbacks and promises mixed
- **Frontend**: Angular conventions with TypeScript strict mode enabled
- **Tests**: Backend tests use Jest (`*.test.js` alongside controller files); frontend uses Karma+Jasmine (`*.spec.ts`)
- **Commit messages**: Descriptive messages, often with PR references: `Description (#PR_Number)`

## CI/CD

- **Trigger**: Push to `develop` branch or manual `workflow_dispatch`
- **Pipeline**: Build Docker image → Push to AWS ECR (us-east-2) → Deploy to AWS ECS cluster `badminton-stat-tracker`
- **No automated test step in CI** — run tests locally before pushing

## Key Gotchas

- CORS is hardcoded for `localhost:4200` in `server.js` — only works in dev mode
- Some AWS DynamoDB integration code is commented out in routes (legacy, now uses PostgreSQL)
- Knex transaction code is partially commented out in some routes (WIP)
- Frontend environment files (`environment.ts` / `environment.prod.ts`) control API base URLs
