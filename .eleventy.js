const formatDate = require("date-fns/format");
const isFutureDate = require("date-fns/isFuture");
const isPastDate = require("date-fns/isPast");
const parseDate = require("date-fns/parse");
const addDays = require("date-fns/addDays");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("src");

  eleventyConfig.addFilter("formatTitleDate", function(date) {
    console.log(date, parseDate(date, "y-MM-dd", new Date()));

    return formatDate(parseDate(date, "y-MM-dd", new Date()), "MMM. do");
  });
  eleventyConfig.addFilter("formatBodyDate", function(date) {
    return formatDate(parseDate(date, "y-MM-dd", new Date()), "MMMM do");
  });

  eleventyConfig.addPairedShortcode("IfFutureDate", function(content, date) {
    const dayAfter = addDays(parseDate(date, "y-MM-dd", new Date()), 1);

    if (isFutureDate(dayAfter)) {
      return content;
    }

    return "";
  });
  eleventyConfig.addPairedShortcode("IfPastDate", function(content, date) {
    const dayAfter = addDays(parseDate(date, "y-MM-dd", new Date()), 1);

    if (isPastDate(dayAfter)) {
      return content;
    }

    return "";
  });

  return {
    passthroughFileCopy: true,
    pathPrefix: "/feedback-night"
  };
};
