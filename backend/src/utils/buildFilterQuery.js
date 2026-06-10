function parseList(value) {
  if (!value) return null;
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

function parseNumberList(value) {
  const list = parseList(value);
  if (!list) return null;
  const nums = list.map(Number).filter((n) => !Number.isNaN(n));
  return nums.length ? nums : null;
}

/**
 * Builds a MongoDB match query from request query params.
 * Supported params: endYear, topics, sector, region, pestle, source, country,
 * likelihood, intensityMin, intensityMax, relevanceMin, relevanceMax
 */
function buildFilterQuery(query = {}) {
  const match = {};

  const endYears = parseNumberList(query.endYear);
  if (endYears) match.end_year = { $in: endYears };

  const topics = parseList(query.topics);
  if (topics) match.topic = { $in: topics };

  const sectors = parseList(query.sector);
  if (sectors) match.sector = { $in: sectors };

  const regions = parseList(query.region);
  if (regions) match.region = { $in: regions };

  const pestles = parseList(query.pestle);
  if (pestles) match.pestle = { $in: pestles };

  const sources = parseList(query.source);
  if (sources) match.source = { $in: sources };

  const countries = parseList(query.country);
  if (countries) match.country = { $in: countries };

  const likelihoods = parseNumberList(query.likelihood);
  if (likelihoods) match.likelihood = { $in: likelihoods };

  const intensityMin = query.intensityMin !== undefined ? Number(query.intensityMin) : null;
  const intensityMax = query.intensityMax !== undefined ? Number(query.intensityMax) : null;
  if (intensityMin !== null && !Number.isNaN(intensityMin)) {
    match.intensity = { ...(match.intensity || {}), $gte: intensityMin };
  }
  if (intensityMax !== null && !Number.isNaN(intensityMax)) {
    match.intensity = { ...(match.intensity || {}), $lte: intensityMax };
  }

  const relevanceMin = query.relevanceMin !== undefined ? Number(query.relevanceMin) : null;
  const relevanceMax = query.relevanceMax !== undefined ? Number(query.relevanceMax) : null;
  if (relevanceMin !== null && !Number.isNaN(relevanceMin)) {
    match.relevance = { ...(match.relevance || {}), $gte: relevanceMin };
  }
  if (relevanceMax !== null && !Number.isNaN(relevanceMax)) {
    match.relevance = { ...(match.relevance || {}), $lte: relevanceMax };
  }

  return match;
}

module.exports = buildFilterQuery;
