# MovieNight
Plan a cozy movie night in minutes. Search for a film, view details, then add the event to your calendar (Google Calendar).


## Features
Home → Search → Details → Calendar flow
Search the OMDb database by title
Results Grid with posters and a “Choose to Watch” button under each movie
Details Page with plot, year, genre, poster
Add to Calendar page
Open a pre-filled Google Calendar event
Minimal, clean styling (CSS + a few utility classes)
Client-side persistence using localStorage


## Tech Stack
Vite + React
React Router
OMDb API (free API key needed)
Plain CSS (no external UI frameworks required)


## App Flow
Home (/): Click Start Planning Your Movie Night.
Search (/search): Enter a title, click Search.
 Under each result, click Choose to Watch.
Details (/details/:id): See the selected movie’s details.
 Click Add to Calendar.
Calendar (/calendar): Pick date/time, then:
Add to Google Calendar (opens a pre-filled event)
:jigsaw: How It Works
Search calls OMDb via src/utils/omdb.js:
searchMovies(query, page)
getMovieById(imdbID)
When you click Add to Calendar on the Details page, a compact movie object is saved to localStorage as movienight.selectedMovie.
The Calendar page reads that data, builds:
A Google Calendar URL using event summary, description, and UTC start/end


## Project Structure
src/
  components/
    Form.jsx
    ResultsGrid.jsx
    MovieDisplay.jsx
    Nav/
      Nav.jsx
      Nav.css
  pages/
    Home/
      Home.jsx
    Search/
      Search.jsx
    Details/
      Details.jsx
    Calendar/
      AddToCalendar.jsx
  utils/
    omdb.js
  App.jsx
  main.jsx
  index.css
.env                  # add your OMDb key here
