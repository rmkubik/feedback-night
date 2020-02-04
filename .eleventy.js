const formatDate = require("date-fns/format");
const isFutureDate = require("date-fns/isFuture");
const isPastDate = require("date-fns/isPast");
const parseDate = require("date-fns/parse");

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
    if (isFutureDate(parseDate(date, "y-MM-dd", new Date()))) {
      return content;
    }

    return "";
  });
  eleventyConfig.addPairedShortcode("IfPastDate", function(content, date) {
    if (isPastDate(parseDate(date, "y-MM-dd", new Date()))) {
      return content;
    }

    return "";
  });

  return {
    passthroughFileCopy: true,
    pathPrefix: "/feedback-night"
  };
};
