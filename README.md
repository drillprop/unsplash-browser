# Unsplash Searcher

Simple app which allows you search images on unsplash.

## Technologies

#### Frontend

- [react](https://reactjs.org/)
- [downshift](downshift-js.com)
- [react-masonry-css](https://github.com/paulcollett/react-masonry-css)
- [react-router-dom](https://reactrouter.com/)

#### Backend

- [express](https://expressjs.com/)

At first, I wanted to stick to just frontend code, but unfortunately unsplash API doesn't provide autocomplete feature. By looking on the network tab in chrome, I figured out where search queries go. Then, I create my own express server and connected to autocomplete endpoint.
Without a custom server, it wouldn't be possible to get a proper response because of CORS.

## Installation

1. Clone this repo

```sh
git clone https://github.com/drillprop/unsplash-search
```

2. Install NPM packages

```sh
npm install && cd client && npm install
```

3. Create .env file in root directory and add `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY` like in `.env.example`

4. Start a development server

```sh
npm run dev
```

## Demo
