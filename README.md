# NewsHub Developer Documentation

NewsHub is a comprehensive client-side news aggregation and dashboard application. It allows users to fetch, filter, search, read, and bookmark news articles from various global categories. Features include local article bookmarking, text search filtering, category selection tab matrices, and a clean, responsive layout designed for reading articles.

---

## Directory Structure

This repository contains the following structural layout:
* index.html - Defines the primary dashboard layout, categories nav list, and article container grids.
* index_single.html - Provides an alternative single-page reader view for standalone article parsing.
* style/style.css - Contains custom layout styling, responsive flexbox/grid structures, and typography scales.
* JS/app.js - Coordinates main page state, category selection triggers, search bounds, and loads initial headlines.
* JS/api.js - Interfaces with news API providers using HTTP fetch requests to query categories and search parameters.
* JS/config.js - Contains global configurations, default parameters, and developer API keys.
* JS/storage.js - Serializes and deserializes bookmarked articles to localStorage.
* JS/ui.js - Updates DOM views, renders article cards, and manages article reader modals.
* JS/util.js - Reusable helpers (date formatters, query string builders, text truncators).

---

## Architectural Flow & Communication Diagram

```
[ User Action / Load ] ──► [ JS/app.js ] ──► [ JS/api.js ] ──► [ News Provider API ]
                                │                                      │
                                ▼                                      ▼
[ JS/storage.js ] ◄─────► [ JS/ui.js ] ◄─────────────────────── [ JSON Articles ]
 (Save/Unsave Favorites)  (Render Dashboard Grids & Modals)
```

---

## Module Specifications

### 1. Application Controller (JS/app.js)
Coordinates events for categories tabs, bookmarked views, and search inputs. It initializes variables, tracks active pages, and tells JS/ui.js what state to render when fetching updates from JS/api.js.

### 2. HTTP API Wrapper (JS/api.js)
Performs asynchronous queries against news endpoints. Returns normalized promise models of articles, captures HTTP errors, and handles parameter concatenation (e.g. source, category, search query).

### 3. LocalStorage Layer (JS/storage.js)
Integrates direct writes and reads to the browser storage namespace. It stores article objects as serialized JSON arrays, enabling bookmarks to persist between sessions.

### 4. DOM Rendering Engine (JS/ui.js)
Builds article preview components. It parses article publish dates into human-readable strings, manages loading spinners, configures card grids dynamically, and generates modals for deep reading.

### 5. Common Utilities (JS/util.js)
Provides sanitization tools and text formatting options. Includes:
* Truncation utility to prevent card overflows.
* Date format parser (translating ISO timestamps to localized formats).
* Parameter sanitizers to normalize search keywords.

---

## Design System & Styling Architecture

The visual layout is styled in style/style.css:
* Grid Layouts: Flex and grid systems auto-wrap columns to suit desktop, tablet, and mobile dimensions.
* Typography: Focuses on readability with clear line-height definitions and high contrast font pairings.
* Component States: Implements smooth state transitions on hover states for category buttons and article cards.

---

## Local Development & Setup

### Prerequisites
A modern browser and a command-line interface.

### Running Locally
1. Navigate to the project root directory:
   ```bash
   cd "OGT_Project(NEWS)"
   ```
2. Start a simple web server:
   ```bash
   python -m http.server 8000
   ```
3. Open a browser and navigate to `http://localhost:8000`.
