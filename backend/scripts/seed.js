require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const Insight = require("../src/models/Insight");

const DATA_FILE = path.join(__dirname, "..", "..", "jsondata.json");

function toNumberOrNull(value) {
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function toDateOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function transform(record) {
  return {
    end_year: toNumberOrNull(record.end_year),
    start_year: toNumberOrNull(record.start_year),
    intensity: toNumberOrNull(record.intensity),
    likelihood: toNumberOrNull(record.likelihood),
    relevance: toNumberOrNull(record.relevance),
    sector: record.sector || "",
    topic: record.topic || "",
    region: record.region || "",
    country: record.country || "",
    pestle: record.pestle || "",
    source: record.source || "",
    title: record.title || "",
    insight: record.insight || "",
    url: record.url || "",
    impact: record.impact || "",
    added: toDateOrNull(record.added),
    published: toDateOrNull(record.published),
  };
}

async function seed() {
  console.log("Reading data file:", DATA_FILE);
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const records = JSON.parse(raw);
  console.log(`Loaded ${records.length} records`);

  await connectDB();

  console.log("Clearing existing collection...");
  await Insight.deleteMany({});

  const docs = records.map(transform);
  console.log("Inserting documents...");
  await Insight.insertMany(docs);

  console.log(`Seed complete: ${docs.length} documents inserted into "insights" collection.`);
  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
