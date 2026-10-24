(function () {
  "use strict";

  var apps = window.WORDFORGE_APPS || [];
  var list = document.querySelector("[data-app-list]");
  if (!list) return;

  var search = document.querySelector("#directory-search");
  var category = document.querySelector("#category-filter");
  var sort = document.querySelector("#sort-order");
  var count = document.querySelector("[data-result-count]");
  var empty = document.querySelector("[data-empty-state]");
  var reset = document.querySelector("[data-reset-filters]");

  function makeCard(app) {
    var article = document.createElement("article");
    article.className = "project-card";
    var top = document.createElement("div");
    top.className = "card-top";
    var icon = document.createElement("span");
    icon.className = "app-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = app.icon;
    var text = document.createElement("div");
    var title = document.createElement("h3");
    var link = document.createElement("a");
    link.href = "app.html?id=" + encodeURIComponent(app.id);
    link.textContent = app.name;
    title.appendChild(link);
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = app.category;
    text.append(title, tag);
    top.append(icon, text);
    var description = document.createElement("p");
    description.textContent = app.description;
    var metadata = document.createElement("div");
    metadata.className = "card-meta";
    var demo = document.createElement("span");
    demo.textContent = "Sample listing";
    var detail = document.createElement("a");
    detail.href = link.href;
    detail.textContent = "View details";
    metadata.append(demo, detail);
    article.append(top, description, metadata);
    return article;
  }

  function render() {
    var query = search.value.trim().toLocaleLowerCase();
    var selectedCategory = category.value;
    var matching = apps.filter(function (app) {
      var searchable = (app.name + " " + app.description).toLocaleLowerCase();
      return (!query || searchable.indexOf(query) !== -1) &&
        (!selectedCategory || app.category === selectedCategory);
    });
    matching.sort(function (first, second) {
      return sort.value === "az"
        ? first.name.localeCompare(second.name)
        : apps.indexOf(first) - apps.indexOf(second);
    });
    list.replaceChildren();
    matching.forEach(function (app) { list.appendChild(makeCard(app)); });
    count.textContent = matching.length + (matching.length === 1 ? " sample project" : " sample projects");
    empty.hidden = matching.length !== 0;
  }

  search.addEventListener("input", render);
  category.addEventListener("change", render);
  sort.addEventListener("change", render);
  reset.addEventListener("click", function () {
    search.value = "";
    category.value = "";
    sort.value = "featured";
    render();
    search.focus();
  });
  var params = new URLSearchParams(window.location.search);
  var initialQuery = params.get("q");
  var initialCategory = params.get("category");
  if (initialQuery) search.value = initialQuery.slice(0, 120);
  if (initialCategory && Array.from(category.options).some(function (option) { return option.value === initialCategory; })) {
    category.value = initialCategory;
  }
  render();
})();
