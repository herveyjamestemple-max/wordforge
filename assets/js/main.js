(function () {
  "use strict";

  var header = document.querySelector("[data-site-header]");
  var footer = document.querySelector("[data-site-footer]");
  var current = window.location.pathname.split("/").pop() || "index.html";
  var navItems = [
    ["WordForge app", "index.html#app-features"],
    ["Explore projects", "explore.html"],
    ["About", "about.html"],
    ["Support", "contact.html"],
    ["Try browser demo", "wordforge-preview.html"]
  ];
  var socialLinks = [
    ["GitHub", "https://github.com/herveyjamestemple-max", "assets/images/github.svg"],
    ["Facebook", "https://www.facebook.com/hervey.james.200920", "assets/images/facebook.svg"],
    ["Instagram", "https://www.instagram.com/hervey4387/", "assets/images/instagram.svg"]
  ];

  function makeBrandLink() {
    var link = document.createElement("a");
    link.className = "brand";
    link.href = "index.html";
    var mark = document.createElement("span");
    mark.className = "brand-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "W";
    var name = document.createElement("span");
    name.textContent = "WordForge";
    link.append(mark, name);
    return link;
  }

  if (header) {
    var headerInner = document.createElement("div");
    headerInner.className = "container header-inner";
    var brand = makeBrandLink();
    brand.setAttribute("aria-label", "WordForge home");
    var toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");
    toggle.textContent = "Menu";
    var nav = document.createElement("nav");
    nav.className = "primary-nav";
    nav.id = "primary-navigation";
    nav.setAttribute("aria-label", "Main navigation");

    navItems.forEach(function (item) {
      var link = document.createElement("a");
      link.href = item[1];
      link.textContent = item[0];
      if (item[1].split("#")[0] === current) link.setAttribute("aria-current", "page");
      if (item[0] === "Try browser demo") link.className = "nav-cta";
      nav.appendChild(link);
    });
    headerInner.append(brand, toggle, nav);
    header.appendChild(headerInner);

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.dataset.open = String(!isOpen);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.dataset.open === "true") {
        nav.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  if (footer) {
    var groups = [
      ["Discover", [["WordForge app", "index.html#app-features"], ["Explore projects", "explore.html"], ["Submit a project", "submit.html"], ["About WordForge", "about.html"]]],
      ["Help", [["Contact & reporting", "contact.html"], ["Not found", "404.html"]]],
      ["Policies", [["Terms of Service", "terms.html"], ["Privacy Policy", "privacy.html"], ["Community Guidelines", "guidelines.html"], ["Developer Rules", "developer-guidelines.html"], ["Copyright & Takedowns", "copyright.html"], ["Security & downloads", "security.html"]]]
    ];
    var outer = document.createElement("div");
    outer.className = "container";
    var inner = document.createElement("div");
    inner.className = "footer-inner";
    var identity = document.createElement("div");
    identity.className = "footer-brand";
    identity.appendChild(makeBrandLink());
    var tagline = document.createElement("p");
    tagline.textContent = "An English vocabulary app in development, alongside a fictional directory demonstration.";
    identity.appendChild(tagline);
    var social = document.createElement("nav");
    social.className = "social-links social-links-footer";
    social.setAttribute("aria-label", "Personal social profiles");
    socialLinks.forEach(function (item) {
      var link = document.createElement("a");
      link.href = item[1];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      var icon = document.createElement("img");
      icon.src = item[2];
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.textContent = item[0];
      link.append(icon, label);
      social.appendChild(link);
    });
    identity.appendChild(social);
    var links = document.createElement("div");
    links.className = "footer-links";
    groups.forEach(function (group) {
      var section = document.createElement("section");
      var heading = document.createElement("h2");
      heading.textContent = group[0];
      var list = document.createElement("ul");
      group[1].forEach(function (item) {
        var entry = document.createElement("li");
        var link = document.createElement("a");
        link.href = item[1];
        link.textContent = item[0];
        entry.appendChild(link);
        list.appendChild(entry);
      });
      section.append(heading, list);
      links.appendChild(section);
    });
    var bottom = document.createElement("div");
    bottom.className = "footer-bottom";
    var copyright = document.createElement("span");
    var yearText = document.createElement("span");
    yearText.setAttribute("data-year", "");
    copyright.append("© ", yearText, " WordForge. Independent directory concept.");
    var disclaimer = document.createElement("span");
    disclaimer.textContent = "Sample listings are demonstrations, not endorsements.";
    bottom.append(copyright, disclaimer);
    inner.append(identity, links);
    outer.append(inner, bottom);
    footer.appendChild(outer);
    var year = footer.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var field = form.querySelector("input[name='q']");
      var query = field ? field.value.trim() : "";
      window.location.href = "explore.html" + (query ? "?q=" + encodeURIComponent(query) : "");
    });
  });
})();
