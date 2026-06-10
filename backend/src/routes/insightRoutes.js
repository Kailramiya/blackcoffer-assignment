const express = require("express");
const {
  getFilterOptions,
  getInsights,
  getInsightStats,
} = require("../controllers/insightController");

const router = express.Router();

router.get("/filters/options", getFilterOptions);
router.get("/insights/stats", getInsightStats);
router.get("/insights", getInsights);

module.exports = router;
