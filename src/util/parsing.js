function parseSidebar($, term, split = false) {
  const el = $(`span:contains("${term}:")`);
  const re = new RegExp(`${term}:\n`, 'g');

  if (typeof el !== 'undefined' && el.length > 0) {
    if (split) {
      return el.parent().text().replace(re, '').trim()
        .split(',');
    }
    return el.parent().text().replace(re, '').trim();
  }
  return null;
}

module.exports = { parseSidebar };
