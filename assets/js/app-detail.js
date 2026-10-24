(function () {
  "use strict";

  var root = document.querySelector("[data-app-detail]");
  if (!root) return;
  var apps = window.WORDFORGE_APPS || [];
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var app = apps.find(function (item) { return item.id === id; });

  function addText(container, tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    container.appendChild(element);
    return element;
  }

  function safeExternalURL(value) {
    if (typeof value !== "string") return null;
    try {
      var url = new URL(value);
      if ((url.protocol !== "https:" && url.protocol !== "http:") || url.username || url.password) return null;
      return url.href;
    } catch (error) {
      return null;
    }
  }

  function addExternalLink(container, label, value) {
    var url = safeExternalURL(value);
    if (!url) {
      addText(container, "p", "demo-note", label + " could not be shown because its URL is invalid.");
      return false;
    }
    var paragraph = document.createElement("p");
    var link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label + " (opens in a new tab) ↗";
    paragraph.appendChild(link);
    container.appendChild(paragraph);
    return true;
  }

  function appendScreenshots(container, screenshots) {
    if (!Array.isArray(screenshots) || screenshots.length === 0) return;
    var section = document.createElement("section");
    section.className = "panel";
    addText(section, "h2", "", "Screenshots");
    var grid = document.createElement("div");
    grid.className = "screenshot-grid";
    var invalidImage = false;
    screenshots.forEach(function (screenshot) {
      if (!screenshot || typeof screenshot.src !== "string") {
        invalidImage = true;
        return;
      }
      var url;
      try {
        url = new URL(screenshot.src, document.baseURI);
      } catch (error) {
        invalidImage = true;
        return;
      }
      var base = new URL(".", document.baseURI);
      if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) {
        invalidImage = true;
        return;
      }
      var figure = document.createElement("figure");
      var image = document.createElement("img");
      image.src = url.href;
      image.alt = typeof screenshot.alt === "string" && screenshot.alt.trim()
        ? screenshot.alt
        : app.name + " screenshot";
      image.loading = "lazy";
      image.decoding = "async";
      if (Number.isInteger(screenshot.width) && screenshot.width > 0) image.width = screenshot.width;
      if (Number.isInteger(screenshot.height) && screenshot.height > 0) image.height = screenshot.height;
      figure.appendChild(image);
      if (typeof screenshot.caption === "string" && screenshot.caption.trim()) {
        addText(figure, "figcaption", "", screenshot.caption);
      }
      grid.appendChild(figure);
    });
    if (grid.childElementCount) section.appendChild(grid);
    if (invalidImage) addText(section, "p", "demo-note", "One or more screenshots could not be displayed because their local image details are invalid.");
    container.appendChild(section);
  }

  if (!app) {
    addText(root, "div", "panel", "This sample listing could not be found. Browse the directory for available demonstrations.");
    var browse = document.createElement("a");
    browse.className = "button";
    browse.href = "explore.html";
    browse.textContent = "Explore projects";
    root.appendChild(browse);
    document.title = "Project not found | WordForge";
    return;
  }

  document.title = app.name + " | WordForge";
  var layout = document.createElement("div");
  layout.className = "detail-layout";
  var main = document.createElement("div");
  main.className = "detail-main";
  var summary = document.createElement("section");
  summary.className = "panel";
  var titleRow = document.createElement("div");
  titleRow.className = "detail-title";
  var icon = addText(titleRow, "span", "app-icon", app.icon);
  icon.setAttribute("aria-hidden", "true");
  var nameArea = document.createElement("div");
  addText(nameArea, "h1", "", app.name);
  addText(nameArea, "span", "tag", app.category);
  titleRow.appendChild(nameArea);
  summary.appendChild(titleRow);
  addText(summary, "p", "lead", app.description);
  addText(summary, "p", "demo-note", "Demonstration content only. This is not a live or reviewed project listing; WordForge does not provide a download for this sample.");
  main.appendChild(summary);
  appendScreenshots(main, app.screenshots);

  var info = document.createElement("section");
  info.className = "panel";
  addText(info, "h2", "", "Listing information");
  var dl = document.createElement("dl");
  dl.className = "detail-list";
  [
    ["Developer / publisher", app.developer],
    ["Supported platforms", app.platforms.join(", ")],
    ["Version", app.version || "Not supplied"],
    ["Last updated", app.updated || "Not supplied"],
    ["Permissions", app.permissions || "Not supplied"],
    ["Requirements", app.requirements || "Not supplied"],
    ["License", app.license || "Not supplied"],
    ["Attribution", app.attribution || "Not supplied"],
    ["Safety notes", "WordForge does not verify software safety. Review the publisher, source, permissions, and security information independently."]
  ].forEach(function (pair) {
    addText(dl, "dt", "", pair[0]);
    addText(dl, "dd", "", pair[1]);
  });
  info.appendChild(dl);
  main.appendChild(info);

  var aside = document.createElement("aside");
  aside.className = "detail-aside";
  var links = document.createElement("section");
  links.className = "panel";
  addText(links, "h2", "", "Project links");
  var hasLink = false;
  if (app.website) {
    hasLink = true;
    addExternalLink(links, "Official website", app.website);
  }
  if (app.download) {
    hasLink = true;
    addExternalLink(links, "Official download", app.download);
  }
  if (Array.isArray(app.thirdPartyDownloads)) {
    app.thirdPartyDownloads.forEach(function (download) {
      hasLink = true;
      if (!download || typeof download.label !== "string") {
        addText(links, "p", "demo-note", "A third-party download link is missing a descriptive label.");
        return;
      }
      addExternalLink(links, "Third-party download — " + download.label + " (not an official source)", download.url);
    });
  }
  if (!hasLink) addText(links, "p", "", "No project website or download link has been supplied for this sample.");
  addText(links, "p", "", "Prefer the publisher's official website. Third-party downloads may carry additional risks; review the source and security information before proceeding.");
  aside.appendChild(links);
  layout.append(main, aside);
  root.appendChild(layout);
})();
