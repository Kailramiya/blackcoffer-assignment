const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    end_year: { type: Number, default: null },
    start_year: { type: Number, default: null },
    intensity: { type: Number, default: null, index: true },
    likelihood: { type: Number, default: null, index: true },
    relevance: { type: Number, default: null, index: true },
    sector: { type: String, default: "", index: true },
    topic: { type: String, default: "", index: true },
    region: { type: String, default: "", index: true },
    country: { type: String, default: "", index: true },
    pestle: { type: String, default: "", index: true },
    source: { type: String, default: "", index: true },
    title: { type: String, default: "" },
    insight: { type: String, default: "" },
    url: { type: String, default: "" },
    impact: { type: String, default: "" },
    added: { type: Date, default: null },
    published: { type: Date, default: null },
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.model("Insight", insightSchema, "insights");
