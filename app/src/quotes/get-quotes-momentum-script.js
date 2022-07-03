let quotes = [];
$('.cquote').each((i, el) => {
  const body = $($(el).find('.cquote-body')[0]).text();
  const author = $($(el).find('.cquote-source')[0]).text();
  quotes.push(`${body} -- ${author}`);
});
copy(quotes);
