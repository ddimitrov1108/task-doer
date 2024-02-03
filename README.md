# [Task-Doer](https://the-wild-oasis-six-eta.vercel.app/)
#### Application that will help you to manage your day to day and future activities.

## Functionalities:
- **users:** 
  - CRUD operations over the user via forms and server actions
  - forms for forgotten password using crypt key and reset password
- **projects:** 
  - a list of tasks to be separated for individual purposes
  - CRUD operations over the project via forms and server actions
  - custom name and selectable color
- **labels:** 
  - a list of tasks, that can distinguish tasks with a specific keyword
  - CRUD operations over the label via forms and server actions
  - custom names that are unique
- **tasks:** 
  - CRUD operations over the task via forms and server actions
  - sorting by name (A-Z/Z-A), oldest and newest tasks via url params
  - search field that uses url params to find tasks with a specific name

## Features:
- authentication, authorization, protected routes
- server actions
- email services
- compound components
- form validation
- sorting & filtering

## Tech stack:
  - Front-End technologies:
    - Next.js
    - React.js
    - TypeScript
    - TailwindCSS
    - HeadlessUI
    - sonner-toast
    - lucide-react
    - date-fns

  - Back-End technologies:
    - Next.js server actions
    - Prisma client
    - MySQL

  - Authentication and validation:
    - next-auth
    - bcryptjs
    - formik
    - zod
    - resend

## Getting Started:

#### Run command to install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### Create .env in your project folder

```bash
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
BASE_URL=http://localhost:3000
NEXTAUTH_SECRET=
HASH_SALT=
RESEND_API_KEY=
```

#### Run prisma migration script

```bash
npx prisma migrate dev
#or push database
npx prisma db push
```

#### Run the development server

```bash
npm run dev
# or
yarn run dev
# or
pnpm run dev
# or
bun --watch run dev
```

#### Build the app for production

```bash
npm run build
# or
yarn run build
# or
pnpm run build
# or
bun run build
```

#### Run the production server

```bash
npm run start
# or
yarn run start
# or
pnpm run start
# or
bun run start
```

Open http://localhost:3000 with your browser to see the result

## Previews:

![SignUp Page](https://i.imgur.com/OKM2AoZ.png)

![Core page](https://i.imgur.com/fNz09yF.png)

![Create a project](https://i.imgur.com/cpKHHWN.png)

![Create a task](https://i.imgur.com/bmZhRYh.png)

![Task details](https://i.imgur.com/C614Z8U.png)

![Task details on smaller screen](https://i.imgur.com/0CWR0QU.png)

![Completed tasks status](https://i.imgur.com/gsqK9Aq.png)

![Filtering and sorting](https://i.imgur.com/DW1QTOW.png)