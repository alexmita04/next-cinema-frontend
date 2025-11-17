# Next Cinema Frontend

A concise frontend interface built with React and TypeScript. The app uses this [backend](https://github.com/alexmita04/next-cinema-api).

- The routing is done via **React Router**.
- The forms are handled via **React Hook Form and Zod**
- The asynchronous state management and fetching are handled via **react query and axios**
- The payment processing is handled via **Stripe**
- Design is built with **Tailwind and Shadcn**

This app is an interface for two types of users:

- Admins (create/edit/delete screenings, preview cinema dashboard, see sold tickets)
  - Admin credentials:
    - Username: NextCinemaRetro-admin
    - Password: adminpass1234
- Normal Users (buy tickets)

**_There havent been any LLMs used for writing code in this project_**

## Important Functionalities

- The entire routing logic resides in main.js (react router)
- For navigation purposes, I've used Link and useNavigation (react router)
- There is a global axios client configured for the API
- I've used axios response interceptors for handling expired access token (jwt).
- I've used axios request interceptors for attaching accessToken (jwt) on every request.
- For authentication the app uses JWT. Access token is being stored in react state and the refresh token in an HTTP-only cookie
- For authorization purposes, the app uses two components wrappers (AdminRoute, UserRoute)
- For fetching I've used useQuery and for mutations I've used useMutation (react query)
- Forms are being handled by react hook form and the validation side is made possible with zod

## Dedicated Client Side

- This service powers the application's user interface. For the server-side implementation, please see the [**Backend Repository**](https://github.com/alexmita04/next-cinema-api)
- [**The Client Side is live!**](https://next-cinema-frontend.onrender.com)
  - Please note that as it's hosted on a free tier (backend + frontend), there may be a brief delay while the server wakes up on your first request:

# Table of Contents

- [Tech Stack](#tech-stack)
- [Installation and Local Configuration](#installation-and-local-configuration)
- [Contact](#contact)

## Tech Stack

### Core Technologies

- React
- TypeScript
- Vite

### Dependencies

- React Hook Form
- React Stripe
- Stripe.js
- Tailwindcss + Shadcn
- Axios
- React Query
- Zod

## Installation and Local Configuration

### Clone This Repo

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

## Contact

- **Email:** alexmita04@gmail.com
- [**LinkedIn:**](https://www.linkedin.com/in/alexandru-mita-ba74b2299/)

## License

See [LICENSE](LICENSE.md)
