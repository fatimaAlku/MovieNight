# MovieNight

Plan a cozy movie night in minutes. Search for a film, view details, then add the event to your calendar!

---

## Features

* **Home → Search → Details → Calendar** flow
* **Search** the OMDb database by title
* **Results Grid** with posters and a **“Choose to Watch”** button under each movie
* **Details Page** with plot, year, genre, poster
* **Add to Calendar** page
* Minimal, clean styling (CSS + a few utility classes)
* Client-side persistence using `localStorage`

---

## Setup

### Prerequisites

* Node.js 18+ and npm
* An OMDb API key

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_OMDB_KEY=YOUR_OMDB_KEY_HERE
```

> After creating or changing `.env`, **restart** the dev server (Vite only reads env at startup).

### Install

```bash
npm install
```

---

## Run Steps

### Development

```bash
npm run dev
```

Open the printed localhost URL in your browser.

### Production Build

```bash
npm run build
npm run preview 
```

---

## Team Roles

| Role              | Responsibilities                                                            |
| ----------------- | --------------------------------------------------------------------------- |
| PM-GitHub Manager     | Fatima Alkuwaiti                   |
| UI Lead | Salman Alhashimee             |
| Layout Lead    | Alia Burashid                    |
| Page Dev A      | Salman Alhashimee |
| Page Dev B     | Hawra Ayoob                                     |
| QA/API/Docs     | Abdulrazaq Mohammed                                     |


---

## API Choice

* **OMDb** (Open Movie Database) was chosen because it’s simple, widely used, and offers a free key for quick prototyping.
* Endpoints used (implemented in `src/utils/omdb.js`):

  * `searchMovies(query, page)` → uses the `s` query param for title search
  * `getMovieById(imdbID)` → uses the `i` param for detailed view
---

## Screenshots

Add images to a local `./screenshots/` folder and reference them here:

```md
![Overview](./screenshots/overview.png)
![Search](./screenshots/search.png)
![Details](./screenshots/details.png)
![Calendar](./screenshots/calendar.png)
```


---

## App Flow

1. **Home** (`/`): Click **Start Planning Your Movie Night**.
2. **Search** (`/search`): Enter a title, click **Search**.
   Under each result, click **Choose to Watch**.
3. **Details** (`/details/:id`): See the selected movie’s details.
   Click **Add to Calendar**.
4. **Calendar** (`/calendar`): Pick date/time, then:

   * **Add to Google Calendar** (opens a pre-filled event)

---

## How It Works

* **Search** calls OMDb via `src/utils/omdb.js`:

  * `searchMovies(query, page)`
  * `getMovieById(imdbID)`
* When you click **Add to Calendar** on the Details page, a compact movie object is saved to `localStorage` as `movienight.selectedMovie`.
* The **Calendar** page reads that data, builds:

  * A **Google Calendar URL** using event summary, description, and UTC start/end
  * An **iCalendar (.ics)** file for download

---


## Known Issues

* **OMDb rate limits** on free keys can cause intermittent “Too many requests” errors.
* Some titles return **`Poster: "N/A"`**; we display a fallback.
* Timezone nuances: calendar times are converted to UTC for Google; user display may vary by locale.
* Currently supports **one selected movie** for the calendar (no multi-movie watchlist yet).


---

## Next Steps

* Add **watchlist** (multiple selections) and create a combined event
* **Debounced search** and loading skeletons
* Better **error boundaries** & retry
* Input to add **location/notes** to calendar events

---

## NPM Scripts

```bash
npm run dev       # start local dev server
npm run build     # production build
npm run preview   # preview production build
```

---

## Acknowledgements

* Movie data by [OMDb API](https://www.omdbapi.com/)
* Bootstrapped with [Vite](https://vitejs.dev/) and React

---

happy movie night! 

