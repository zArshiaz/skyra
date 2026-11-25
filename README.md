# Skyra Weather

A weather dashboard built with React and TypeScript from a Figma design. The application supports Persian and English, RTL and LTR layouts, and light and dark themes.

## Features

- Location search through WeatherAPI with a 300 ms debounce and cancellation of previous requests
- Current weather, feels-like temperature, and daily highs and lows in Celsius
- Daily forecasts for up to 14 days, using the days returned by the service
- Monthly average temperature chart built with MUI X Charts and sample data
- Persian calendar for Persian and Gregorian calendar for English
- User name, selected location, language, and theme persisted in Local Storage
- Loading, error, and empty-location states
- Fixed header with independently scrollable content and footer

## Technology

React 19, TypeScript, Vite, Material UI, Emotion, MUI X Charts, Axios, and React Router. Code checks use ESLint, Oxlint, and Prettier.

## Getting started

Use a Node.js version matching the `engines` field in `package.json`, currently `^22.18.0 || >=24.12.0`.

Install dependencies and create the local environment file.

```sh
npm ci
cp .env.example .env.local
```

Update `.env.local` with your WeatherAPI account key.

```dotenv
VITE_WEATHER_API_KEY=your_weatherapi_key
VITE_WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
```

Start the development server and open the URL printed in the terminal.

```sh
npm run dev
```

Restart the development server after changing environment variables. The API base URL defaults to `https://api.weatherapi.com/v1` when undefined. An API key is required to fetch weather data.

Variables prefixed with `VITE_` are available to the browser in the frontend build. The configured API key is also visible in browser requests.

## Usage

Enter your name at `/login`. This browser-based entry flow stores the user name and grants access to the dashboard. At `/dashboard`, enter at least two characters in the header search field and select a location from the results.

The last selected location is restored after reloading. The header settings menu provides language switching, theme switching, and logout.

## Project structure

```text
src/
├── app/                     # Application, providers, and routes
├── assets/                  # Logos and images
├── features/
│   ├── auth/                # Login form and user persistence
│   └── weather/
│       ├── api/             # Requests, DTOs, and response mapping
│       ├── components/      # Header, current weather, chart, forecast, and footer
│       ├── data/            # Sample chart data
│       ├── hooks/           # Weather fetching and location search
│       ├── i18n/            # Weather condition translations by API code
│       ├── models/          # Models consumed by the UI
│       ├── pages/           # Dashboard page
│       └── weather.storage.ts
├── i18n/                    # Translations, language, direction, and date formatting
├── lib/http/                # Shared Axios client
├── shared/components/       # Shared UI components
└── theme/                   # Colors, typography, and theme configuration
```

API responses are described by DTOs and mapped to internal application models. Requests use the shared Axios client with a 10-second timeout. The dashboard owns the selected location and shares the forecast response with the current weather card and daily forecast section.

## Data and localization

Location search uses `/search.json`, and weather forecasts use `/forecast.json`. The application requests 14 days and displays the days available in the response.

Monthly temperatures currently come from `src/features/weather/data/monthlyTemperature.mock.ts` and stay the same when the selected location changes. These sample values demonstrate the chart design.

Persian weather descriptions are selected by condition code in `conditionText.ts`. Location names are displayed as returned by the service. Date and time formatting is centralized in `getDateTimeFormatter.ts`. The current weather card displays the city's local time, while the footer clock uses the device's local time.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Check TypeScript and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run type-check` | Run TypeScript checks |
| `npm run lint` | Run Oxlint and ESLint |
| `npm run lint:fix` | Apply available automatic lint fixes |
| `npm run format` | Format files in `src/` with Prettier |

## Deployment

Publish the generated `dist/` directory to a static hosting service. Configure the host to serve `index.html` for application routes such as `/dashboard` and `/login` so direct navigation works.
