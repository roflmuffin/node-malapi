function parseSidebar($, term, split = false) {
  const el = $(`span:contains("${term}:")`);
  if (typeof el !== 'undefined' && el.length > 0) {
    if (split) {
      return el.next().text().trim().split(',');
    }
    return el.next().text().trim();
  }
  return null;
}

module.exports = { parseSidebar };
