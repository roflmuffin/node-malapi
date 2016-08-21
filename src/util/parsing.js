function parseSidebar($, term, split = false) {
  const el = $(`span:contains("${term}:")`).get(0);
  if (typeof el !== 'undefined') {
    if (split) {
      return el.nextSibling.nodeValue.trim().split(',');
    }
    return el.nextSibling.nodeValue.trim();
  }
  return null;
}

module.exports = { parseSidebar };
