# News Explorer

## About the project

News Explorer is a React application that allows users to search for articles by keyword using this [News API](https://newsapi.org/). This option requires careful attention to detail and strict guidelines. We’ll provide a detailed Figma layout and instructions similar to those in your earlier projects.

## Project requirements

Develop a service where users can search for news articles and save them to their profiles.

### Frontend implementation

The frontend has two main features:

- When the user enters a keyword in the search bar, the website should send a request to the News API service, find all the relevant articles over the last week, and display these articles on the page.
- It should display all articles a user saves on a separate page (a protected route).

## Backend repository

- https://github.com/d-weimer/news-explorer-backend

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
