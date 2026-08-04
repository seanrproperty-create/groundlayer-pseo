// Vanilla-JS filter for the /local/ hub directory grid. Inlined into the hub
// page's <script> tag at render time (no separate network request, nothing to
// cache-bust) rather than served as its own route.
export const HUB_SEARCH_SCRIPT = `
(function () {
  var input = document.getElementById('directory-search');
  var cards = document.querySelectorAll('[data-search-text]');
  var counties = document.querySelectorAll('[data-county-group]');
  if (!input) return;

  input.addEventListener('input', function () {
    var query = input.value.trim().toLowerCase();
    counties.forEach(function (group) {
      var visibleInGroup = 0;
      group.querySelectorAll('[data-search-text]').forEach(function (card) {
        var match = card.getAttribute('data-search-text').indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) visibleInGroup++;
      });
      group.style.display = visibleInGroup > 0 ? '' : 'none';
    });
  });
})();
`;
