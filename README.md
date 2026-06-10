# Blackcoffer Insights Dashboard

A full-stack data visualization dashboard built for the Blackcoffer test assignment. It visualizes the
provided `jsondata.json` dataset (1,000 records of intensity / likelihood / relevance signals across
sectors, regions, topics, and countries) with a fully filterable, interactive dashboard.

## Tech Stack

- **Backend**: Node.js, Express, Mongoose, MongoDB (Atlas)
- **Frontend**: React (Vite), Tailwind CSS v4, Recharts, react-simple-maps (D3 geo), react-select
- **Database**: MongoDB — single `insights` collection seeded from `jsondata.json`

## Project Structure

```
blackcoffer-assignment/
├── jsondata.json            # Source dataset
├── backend/
│   ├── server.js            # Express app entry point
│   ├── scripts/seed.js       # Loads jsondata.json into MongoDB
│   └── src/
│       ├── config/db.js
│       ├── models/Insight.js
│       ├── controllers/insightController.js
│       ├── routes/insightRoutes.js
│       └── utils/buildFilterQuery.js
└── frontend/
    └── src/
        ├── api/client.js
        ├── context/FilterContext.jsx
        ├── hooks/useDashboardData.js
        ├── components/
        │   ├── layout/        (Sidebar, Topbar)
        │   ├── filters/        (multi-selects, range sliders, active filter chips)
        │   ├── stats/          (KPI cards)
        │   └── charts/         (8 chart types)
        └── pages/Dashboard.jsx
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI with your Atlas connection string
npm run seed            # one-time: loads jsondata.json into MongoDB
npm run dev              # starts API on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install --legacy-peer-deps   # react-simple-maps currently lists React 16-18 as a peer dep
npm run dev   # starts on http://localhost:5173 (proxies /api -> localhost:5000)
```

Open http://localhost:5173 in your browser.

## API Endpoints

All endpoints accept the same set of optional filter query params:

`endYear, topics, sector, region, pestle, source, country, likelihood` (comma-separated values)
and `intensityMin, intensityMax, relevanceMin, relevanceMax` (numbers).

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/filters/options` | Distinct values for every filterable field + min/max ranges |
| GET | `/api/insights/stats` | All chart datasets in one call (overview KPIs + 8 aggregations) |
| GET | `/api/insights` | Paginated raw records (`page`, `limit`) |

## Dashboard Features

- **KPI cards**: total records, average intensity / likelihood / relevance, distinct countries & topics
- **World map**: average intensity by country (choropleth, hover for details)
- **Intensity by sector** (bar), **Intensity by region** (bar)
- **Trend by end year**: average intensity / likelihood / relevance over time
- **PEST distribution** (donut)
- **Top topics** and **top sources** (bar)
- **Likelihood vs Relevance** bubble chart (bubble size = volume, color = avg intensity)
- **Filters**: End Year, Topics, Sector, Region, PEST, Source, Country, Likelihood (all multi-select),
  plus Intensity & Relevance range sliders, with active-filter chips and one-click reset
- All charts update live (debounced) as filters change, computed server-side via MongoDB aggregation
  pipelines for performance

> Note: the assignment brief mentions optional "City" and "SWOT" filters, but neither field exists in
> the provided dataset, so they were omitted in favor of the Intensity/Likelihood/Relevance range
> filters that the data does support.
