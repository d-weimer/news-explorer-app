import { API_KEY } from "./constants";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://nomoreparties.co/news/v2/everything";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getNewsArticles = (query) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const to = currentDate.toISOString();
  const from = sevenDaysAgo.toISOString();

  const params = new URLSearchParams({
    q: query,
    apiKey: API_KEY,
    from: from,
    to: to,
    pageSize: 100,
  });

  return fetch(`${BASE_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
