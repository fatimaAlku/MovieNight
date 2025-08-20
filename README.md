# 🎬 MovieNight

**Plan Your Perfect Movie Night - Together!**

A modern web application that helps you discover movies, plan watch parties, and coordinate movie nights with friends. Add events to your calendar and share the experience - because the best movies are enjoyed together.

![MovieNight Hero](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop)

---

##  Features

###  Core Functionality
- **Movie Discovery**: Search the OMDb database by title, genre, and year
- **Smart Results**: Grid-based movie display with posters and key information
- **Detailed Views**: Comprehensive movie information including plot, cast, and ratings
- **Calendar Integration**: Add movie nights to your Google Calendar
- **Social Planning**: Share and coordinate movie nights with friends

###  User Experience
- **Modern UI**: Netflix-inspired design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Intuitive Navigation**: Clean, user-friendly interface
- **Dark Theme**: Easy on the eyes for late-night browsing

### 🔧 Technical Features
- **Real-time Search**: Instant movie results as you type
- **Local Storage**: Remember your search history and preferences
- **API Integration**: Powered by OMDb (Open Movie Database)
- **Progressive Web App**: Fast loading and smooth interactions

---

##  Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **OMDb API Key** (free registration required)

### Environment Setup

1. **Get Your OMDb API Key**
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Register for a free API key
   - Copy your key

2. **Configure Environment Variables**
   ```bash
   # Create .env file in project root
   VITE_OMDB_KEY=YOUR_OMDB_API_KEY_HERE
   ```

   > ⚠️ **Important**: After creating or modifying `.env`, restart your development server.

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd MovieNight

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to the displayed localhost URL.

---

##  Project Structure

```
MovieNight/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Form/           # Search form component
│   │   ├── MovieDisplay/   # Movie information display
│   │   ├── Nav/            # Navigation bar
│   │   └── ResultsGrid/    # Search results grid
│   ├── pages/              # Main application pages
│   │   ├── Home/           # Landing page
│   │   ├── Search/         # Movie search interface
│   │   ├── Details/        # Movie details page
│   │   └── Calendar/       # Calendar integration
│   ├── utils/              # Utility functions
│   │   └── omdb.js         # OMDb API integration
│   └── assets/             # Static assets
├── public/                 # Public assets
├── index.html              # Main HTML file
└── package.json            # Dependencies and scripts
```

---

##  How It Works

### 1. **Discover Movies**
   - Use the search bar to find movies by title
   - Browse through results with movie posters and details
   - Filter and sort results as needed

### 2. **Plan Your Night**
   - Select a movie that interests you
   - View comprehensive details including plot, cast, and ratings
   - Choose the perfect movie for your group

### 3. **Coordinate Together**
   - Add the movie night to your Google Calendar
   - Share event details with friends
   - Set reminders and notes for the perfect movie night

---

##  Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Technology Stack

- **Frontend**: React + Vite
- **Styling**: CSS with modern features
- **API**: OMDb (Open Movie Database)
- **Calendar**: Google Calendar API
- **State Management**: React Hooks
- **Routing**: React Router

---

##  API Integration

### OMDb API Endpoints

The application integrates with OMDb API for movie data:

- **Search Movies**: `searchMovies(query, page)` - Find movies by title
- **Movie Details**: `getMovieById(imdbID)` - Get comprehensive movie information

---

##  Team

| Role | Team Member | Responsibilities |
|------|-------------|------------------|
| **PM & GitHub Manager** | Fatima Alkuwaiti | Project coordination & version control |
| **UI Lead** | Salman Alhashimee | User interface design & implementation |
| **Layout Lead** | Alia Burashid | Page structure & responsive design |
| **Page Developer A** | Salman Alhashimee | Core page functionality |
| **Page Developer B** | Hawra Ayoob | Additional page features |
| **QA/API/Docs** | Abdulrazaq Mohammed | Testing, API integration & documentation |

---

##  Why OMDb?

**OMDb (Open Movie Database)** was chosen for this project because:

- ✅ **Free API Key**: Quick setup for prototyping
- ✅ **Comprehensive Data**: Rich movie information
- ✅ **Reliable Service**: Stable and well-maintained
- ✅ **Wide Coverage**: Extensive movie database
- ✅ **Simple Integration**: Easy-to-use REST API

---

##  Screenshots

> 📸 **Coming Soon**: 

---


## 🙏 Acknowledgments

- **OMDb API** for providing comprehensive movie data
- **React Team** for the amazing framework
- **Vite** for the fast build tool
- **Unsplash** for beautiful stock photography

---


**Made with ❤️ by the MovieNight Team** 

