# News Explorer

## About the project

News Explorer is a React application that allows users to search for news articles by keyword using the [News API](https://newsapi.org/) service. Users can explore recent articles, create a personal account, and save their favorite articles to a dedicated profile page.

## Live Demo

- **Deploved Site:** [News Explorer](https://d-weimer.github.io/news-explorer-app/)

## Tech Stack & Features

**Frontend Technologies:**

- **React:** Component-based UI architecture for building dynamic single-page applications.
- **React Router (`HashRouter`):** Client-side navigation supporting seamless page transitions and protected routing.
- **Vite:** Next-generation frontend tooling providing lightning-fast development and optimized build performance.
- **CSS3:** Custom responsive styling designed to adapt smoothly across mobile, tablet, and desktop viewports.
- **JavaScript (ES6+):** Modern asynchronous JavaScript handling REST API integrations and state management.

**Core Features:**

- **Keyword Search:** Send asynchronous requests to the News API to fetch and render relevant articles from the past week.
- **Card Pagination:** Display results in structured card grids with an expandable "Show more" button.
- **User Authentication:** Modal-based registration and login flows for custom user accounts.
- **Saved Articles (Protected Route):** Access restricted pages to manage and remove personal saved news cards.

## Running the Project Locally

`npm run dev` — Launch the local development server in Vite

`npm run build` — Build the production-ready static bundle

`npm run preview` — Preview the local production build

`npm run deploy` — Build and deploy the application directly to GitHub Pages

## Repositories & Links

- **Backend Repository:** [News Explorer Backend](https://github.com/d-weimer/news-explorer-backend) [UNDER CONSTRUCTION]
- **Figma Design:** [News Explorer UI Specification](https://www.figma.com/)
