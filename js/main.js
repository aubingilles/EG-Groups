/* EG GROUPS — Global Wholesale Trade & Agricultural Equipment */

const COMPANY = {
  name: "EG GROUPS",
  full: "EG Groups Yönetim Danışmanlığı Limited Şirketi",
  address: "Talatpaşa Mah. 1022. Sk. Acunkent D Blok No: 2 F İç Kapı No: 14, Esenyurt / İstanbul, Türkiye",
  phone: "+90 534 309 1752",
  email: "info@eggrouplimited.com",
  emailAlt: "eggroupslimited@gmail.com",
  ceoName: "Oben Elton George Tanyi",
  ceoTitle: "Chief Executive Officer",
};

const NAV_LINKS = [
  { label: "Agricultural Machinery", href: "category.html" },
  { label: "Our Products", href: "products.html" },
  { label: "Services", href: "services.html" },
  { label: "About Us", href: "about.html" },
  { label: "Contact", href: "contact.html" },
];

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderHeader() {
  const path = window.location.pathname.replace(/\/index(\.html)?$/, "/").replace(/\.html$/, "");
  const navHTML = NAV_LINKS.map(l => {
    const active = path === l.href.split("?")[0];
    return `<a href="${l.href}"${active ? ' style="color:var(--green-dark-2);border-bottom-color:var(--lime)"' : ""}>${l.label}</a>`;
  }).join("");

  return `
  <div class="topbar">
    <div class="container">
      <div class="topbar-left">
        <span>📍 ${COMPANY.address}</span>
      </div>
      <div class="topbar-left">
        <a href="tel:${COMPANY.phone.replace(/\s/g, "")}">📞 ${COMPANY.phone}</a>
        <a href="mailto:${COMPANY.email}">✉️ ${COMPANY.email}</a>
        <a href="mailto:${COMPANY.emailAlt}">✉️ ${COMPANY.emailAlt}</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="logo">
        <img src="images/logo.png" alt="EG GROUPS" style="height:48px;width:auto">
      </a>
      <nav class="main-nav">${navHTML}</nav>
      <div class="header-actions">
        <a href="contact.html" class="btn btn-outline">Contact Us</a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
      </div>
    </div>
    <div id="mobileNav" style="display:none;border-top:1px solid var(--border);padding:14px 20px">
      ${NAV_LINKS.map(l => `<a href="${l.href}" style="display:block;padding:10px 0;font-weight:600">${l.label}</a>`).join("")}
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div style="margin-bottom:14px"><img src="images/logo.png" alt="EG GROUPS" style="height:40px;width:auto;background:#fff;border-radius:8px;padding:4px 8px"></div>
          <p>Global wholesale trading and agricultural machinery solutions — direct sourcing, quality assurance, and logistics expertise across 48+ categories.</p>
        </div>
        <div>
          <h5>Product Groups</h5>
          <ul>
            <li><a href="category.html">Agricultural Machinery</a></li>
            <li><a href="products.html">Food & Beverages</a></li>
            <li><a href="products.html">Raw Materials</a></li>
            <li><a href="products.html">Industrial Supplies</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="about.html">About us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="certificates.html">Certificates & Compliance</a></li>
            <li><a href="refund-policy.html">Refund Policy</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul class="footer-contact">
            <li><span>📧</span><a href="mailto:info@eggrouplimited.com">info@eggrouplimited.com</a></li>
            <li><span>📧</span><a href="mailto:eggroupslimited@gmail.com">eggroupslimited@gmail.com</a></li>
            <li><span>📞</span><a href="tel:+905343091752">+90 534 309 1752</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Copyright EG GROUPS ${new Date().getFullYear()} ©</span>
        <span>Istanbul • Global Reach</span>
      </div>
    </div>
  </footer>`;
}

function mountLayout() {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = renderHeader();
  if (f) f.innerHTML = renderFooter();
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.style.display = mobileNav.style.display === "none" ? "block" : "none";
    });
  }
}

/* ---------- Product card ---------- */
function productCardHTML(p) {
  // Check if it's a wholesale product or machinery product
  const isWholesale = p.group !== undefined;

  return `
  <div class="product-card">
    <a href="${isWholesale ? 'products.html' : 'product.html?id=' + p.id}" class="img-wrap">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </a>
    <div class="body">
      <a href="${isWholesale ? 'products.html' : 'product.html?id=' + p.id}"><h3>${p.name}</h3></a>
      ${isWholesale ? `
        <div class="specs">
          <span><b>${p.category}</b></span>
          <span><b>${p.group}</b></span>
        </div>
      ` : `
        <div class="specs">
          <span><b>${p.year}</b> Year</span>
          <span><b>${p.hp} HP</b> Engine</span>
          <span><b>${p.hours.toLocaleString()} h</b> Hours</span>
        </div>
        <div class="country">📍 ${p.country}</div>
      `}
      <div class="actions">
        <a class="btn btn-primary" href="${isWholesale ? 'products.html' : 'product.html?id=' + p.id + '&intent=purchase'}">View</a>
        <a class="btn btn-outline" href="contact.html?intent=message&product=${encodeURIComponent(p.name)}">Message</a>
      </div>
    </div>
  </div>`;
}

function renderCardRow(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(productCardHTML).join("");
}

function renderGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!products.length) {
    el.innerHTML = `<div class="empty-state">No machines match your filters yet. Try widening your search or <a href="/contact">contact our team</a> — we'll find it for you.</div>`;
    return;
  }
  el.innerHTML = products.map(productCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", mountLayout);
