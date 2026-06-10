const Insight = require("../models/Insight");
const buildFilterQuery = require("../utils/buildFilterQuery");

// GET /api/filters/options
async function getFilterOptions(req, res, next) {
  try {
    const [endYears, topics, sectors, regions, pestles, sources, countries, ranges] =
      await Promise.all([
        Insight.distinct("end_year", { end_year: { $ne: null } }),
        Insight.distinct("topic", { topic: { $ne: "" } }),
        Insight.distinct("sector", { sector: { $ne: "" } }),
        Insight.distinct("region", { region: { $ne: "" } }),
        Insight.distinct("pestle", { pestle: { $ne: "" } }),
        Insight.distinct("source", { source: { $ne: "" } }),
        Insight.distinct("country", { country: { $ne: "" } }),
        Insight.aggregate([
          {
            $group: {
              _id: null,
              minIntensity: { $min: "$intensity" },
              maxIntensity: { $max: "$intensity" },
              minLikelihood: { $min: "$likelihood" },
              maxLikelihood: { $max: "$likelihood" },
              minRelevance: { $min: "$relevance" },
              maxRelevance: { $max: "$relevance" },
            },
          },
        ]),
      ]);

    res.json({
      endYears: endYears.sort((a, b) => a - b),
      topics: topics.sort(),
      sectors: sectors.sort(),
      regions: regions.sort(),
      pestles: pestles.sort(),
      sources: sources.sort(),
      countries: countries.sort(),
      ranges: ranges[0] || {},
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/insights
async function getInsights(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Insight.find(match).sort({ intensity: -1 }).skip(skip).limit(limit).lean(),
      Insight.countDocuments(match),
    ]);

    res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/insights/stats
async function getInsightStats(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);

    const [
      overviewAgg,
      intensityBySector,
      intensityByRegion,
      yearlyTrend,
      pestleDistribution,
      topTopics,
      topSources,
      countryIntensity,
      likelihoodRelevanceBubble,
    ] = await Promise.all([
      // Overview KPIs
      Insight.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            totalRecords: { $sum: 1 },
            avgIntensity: { $avg: "$intensity" },
            avgLikelihood: { $avg: "$likelihood" },
            avgRelevance: { $avg: "$relevance" },
            countries: { $addToSet: "$country" },
            topics: { $addToSet: "$topic" },
            sectors: { $addToSet: "$sector" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRecords: 1,
            avgIntensity: { $round: ["$avgIntensity", 2] },
            avgLikelihood: { $round: ["$avgLikelihood", 2] },
            avgRelevance: { $round: ["$avgRelevance", 2] },
            countriesCount: { $size: "$countries" },
            topicsCount: { $size: "$topics" },
            sectorsCount: { $size: "$sectors" },
          },
        },
      ]),

      // Intensity by sector
      Insight.aggregate([
        { $match: { ...match, sector: { ...(match.sector || {}), $ne: "" } } },
        {
          $group: {
            _id: "$sector",
            avgIntensity: { $avg: "$intensity" },
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, sector: "$_id", avgIntensity: { $round: ["$avgIntensity", 2] }, count: 1 } },
        { $sort: { avgIntensity: -1 } },
      ]),

      // Intensity by region
      Insight.aggregate([
        { $match: { ...match, region: { ...(match.region || {}), $ne: "" } } },
        {
          $group: {
            _id: "$region",
            avgIntensity: { $avg: "$intensity" },
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, region: "$_id", avgIntensity: { $round: ["$avgIntensity", 2] }, count: 1 } },
        { $sort: { avgIntensity: -1 } },
        { $limit: 12 },
      ]),

      // Yearly trend (by end_year)
      Insight.aggregate([
        { $match: { ...match, end_year: { ...(match.end_year || {}), $ne: null } } },
        {
          $group: {
            _id: "$end_year",
            avgIntensity: { $avg: "$intensity" },
            avgLikelihood: { $avg: "$likelihood" },
            avgRelevance: { $avg: "$relevance" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id",
            avgIntensity: { $round: ["$avgIntensity", 2] },
            avgLikelihood: { $round: ["$avgLikelihood", 2] },
            avgRelevance: { $round: ["$avgRelevance", 2] },
            count: 1,
          },
        },
        { $sort: { year: 1 } },
      ]),

      // PEST(LE) distribution
      Insight.aggregate([
        { $match: { ...match, pestle: { ...(match.pestle || {}), $ne: "" } } },
        {
          $group: {
            _id: "$pestle",
            count: { $sum: 1 },
            avgIntensity: { $avg: "$intensity" },
          },
        },
        { $project: { _id: 0, pestle: "$_id", count: 1, avgIntensity: { $round: ["$avgIntensity", 2] } } },
        { $sort: { count: -1 } },
      ]),

      // Top topics
      Insight.aggregate([
        { $match: { ...match, topic: { ...(match.topic || {}), $ne: "" } } },
        {
          $group: {
            _id: "$topic",
            count: { $sum: 1 },
            avgIntensity: { $avg: "$intensity" },
          },
        },
        { $project: { _id: 0, topic: "$_id", count: 1, avgIntensity: { $round: ["$avgIntensity", 2] } } },
        { $sort: { count: -1 } },
        { $limit: 12 },
      ]),

      // Top sources
      Insight.aggregate([
        { $match: { ...match, source: { ...(match.source || {}), $ne: "" } } },
        { $group: { _id: "$source", count: { $sum: 1 } } },
        { $project: { _id: 0, source: "$_id", count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),

      // Country intensity (for world map)
      Insight.aggregate([
        { $match: { ...match, country: { ...(match.country || {}), $ne: "" } } },
        {
          $group: {
            _id: "$country",
            avgIntensity: { $avg: "$intensity" },
            avgLikelihood: { $avg: "$likelihood" },
            avgRelevance: { $avg: "$relevance" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            country: "$_id",
            avgIntensity: { $round: ["$avgIntensity", 2] },
            avgLikelihood: { $round: ["$avgLikelihood", 2] },
            avgRelevance: { $round: ["$avgRelevance", 2] },
            count: 1,
          },
        },
        { $sort: { avgIntensity: -1 } },
      ]),

      // Likelihood vs Relevance bubble (size = avg intensity, count = volume)
      Insight.aggregate([
        {
          $match: {
            ...match,
            likelihood: { ...(match.likelihood || {}), $ne: null },
            relevance: { ...(match.relevance || {}), $ne: null },
            intensity: { ...(match.intensity || {}), $ne: null },
          },
        },
        {
          $group: {
            _id: { likelihood: "$likelihood", relevance: "$relevance" },
            avgIntensity: { $avg: "$intensity" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            likelihood: "$_id.likelihood",
            relevance: "$_id.relevance",
            avgIntensity: { $round: ["$avgIntensity", 2] },
            count: 1,
          },
        },
        { $sort: { likelihood: 1, relevance: 1 } },
      ]),
    ]);

    const overview = overviewAgg[0] || {
      totalRecords: 0,
      avgIntensity: 0,
      avgLikelihood: 0,
      avgRelevance: 0,
      countriesCount: 0,
      topicsCount: 0,
      sectorsCount: 0,
    };

    res.json({
      overview,
      intensityBySector,
      intensityByRegion,
      yearlyTrend,
      pestleDistribution,
      topTopics,
      topSources,
      countryIntensity,
      likelihoodRelevanceBubble,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFilterOptions,
  getInsights,
  getInsightStats,
};
