import "./style.css";
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

let favorites = JSON.parse(localStorage.getItem("bondmaxx-favorites") || "[]");
// cart state
let cart = JSON.parse(localStorage.getItem("bondmaxx-cart") || "[]");
let currentLanguage = "ar";
let colorFamilies = [];

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(cart.length || 0);
}

// Initialize favorites container on page load
function initializeFavoritesContainer() {
  const container = document.getElementById("favoritesContent");
  if (!container) return;

  // Check if container is empty or only has the default "no favorites" message
  if (container.children.length === 0) {
    showEmptyFavoritesMessage();
  } else {
    // Check if the only content is the empty message
    const hasOnlyEmptyMessage =
      container.children.length === 1 &&
      (container.firstElementChild.textContent.includes(
        "لا توجد ألوان مفضلة"
      ) ||
        container.firstElementChild.innerHTML.includes("fa-heart"));

    if (hasOnlyEmptyMessage) {
      // Keep the empty message as is
      container.firstElementChild.setAttribute("data-empty-message", "true");
    }
  }
}

// Initialize color families data
function initializeColorFamilies() {
  colorFamilies = [
    // Blues (12 families)
    {
      name: "الأزرق السماوي الكلاسيكي",
      category: "blues",
      shades: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1E88E5", "#0D47A1"],
    },
    {
      name: "الأزرق الملكي الفاخر",
      category: "blues",
      shades: ["#E8EAF6", "#9FA8DA", "#5C6BC0", "#3F51B5", "#1A237E"],
    },
    {
      name: "الأزرق البحري العميق",
      category: "blues",
      shades: ["#E1F5FE", "#81D4FA", "#29B6F6", "#0288D1", "#01579B"],
    },
    {
      name: "الأزرق الفولاذي المعدني",
      category: "blues",
      shades: ["#E0F2F1", "#80CBC4", "#26A69A", "#00695C", "#004D40"],
    },
    {
      name: "الأزرق الكوبالت النقي",
      category: "blues",
      shades: ["#E8F4FD", "#A3D5FF", "#4FC3F7", "#0277BD", "#01579B"],
    },
    {
      name: "الأزرق البروسي التقليدي",
      category: "blues",
      shades: ["#E3F2FD", "#90CAF9", "#2196F3", "#1976D2", "#0D47A1"],
    },
    {
      name: "الأزرق التركوازي الاستوائي",
      category: "blues",
      shades: ["#E0F7FA", "#80DEEA", "#26C6DA", "#00ACC1", "#006064"],
    },
    {
      name: "الأزرق الآكوا المنعش",
      category: "blues",
      shades: ["#E0F2F1", "#80CBC4", "#4DB6AC", "#26A69A", "#004D40"],
    },
    {
      name: "الأزرق الجليدي الشفاف",
      category: "blues",
      shades: ["#F0F8FF", "#B0E0E6", "#87CEEB", "#4682B4", "#2F4F4F"],
    },
    {
      name: "الأزرق الكهربائي المشع",
      category: "blues",
      shades: ["#E0F6FF", "#87CEFA", "#00BFFF", "#1E90FF", "#0000CD"],
    },
    {
      name: "الأزرق الدنيم العصري",
      category: "blues",
      shades: ["#E6F3FF", "#B3D9FF", "#6699CC", "#4169E1", "#191970"],
    },
    {
      name: "الأزرق الباستيل الناعم",
      category: "blues",
      shades: ["#F0F8FF", "#E6F3FF", "#CCDDFF", "#99BBFF", "#6699FF"],
    },

    // Reds (12 families)
    {
      name: "الأحمر القرمزي الملكي",
      category: "reds",
      shades: ["#FFEBEE", "#FFCDD2", "#EF5350", "#F44336", "#B71C1C"],
    },
    {
      name: "الأحمر الوردي الرومانسي",
      category: "reds",
      shades: ["#FCE4EC", "#F8BBD9", "#E91E63", "#C2185B", "#880E4F"],
    },
    {
      name: "الأحمر البرتقالي الدافئ",
      category: "reds",
      shades: ["#FFF3E0", "#FFCC80", "#FF9800", "#F57C00", "#E65100"],
    },
    {
      name: "الأحمر العنابي الغني",
      category: "reds",
      shades: ["#FFEBEE", "#FFCDD2", "#F44336", "#D32F2F", "#B71C1C"],
    },
    {
      name: "الأحمر الكرزي الطبيعي",
      category: "reds",
      shades: ["#FCE4EC", "#F8BBD9", "#E91E63", "#AD1457", "#880E4F"],
    },
    {
      name: "الأحمر الناري المتوهج",
      category: "reds",
      shades: ["#FFF8E1", "#FFECB3", "#FFC107", "#FF8F00", "#FF6F00"],
    },
    {
      name: "الأحمر المرجاني البحري",
      category: "reds",
      shades: ["#FFF3E0", "#FFCC80", "#FF9800", "#F57C00", "#E65100"],
    },
    {
      name: "الأحمر الروبي الثمين",
      category: "reds",
      shades: ["#FFEBEE", "#FFCDD2", "#EF5350", "#E53935", "#C62828"],
    },
    {
      name: "الأحمر الطوبي التراثي",
      category: "reds",
      shades: ["#FFF0F0", "#FFD0D0", "#CD5C5C", "#B22222", "#8B0000"],
    },
    {
      name: "الأحمر الوردي الفاتح",
      category: "reds",
      shades: ["#FFF5F8", "#FFE4E1", "#FFC0CB", "#FF69B4", "#C71585"],
    },
    {
      name: "الأحمر البورجوندي النبيل",
      category: "reds",
      shades: ["#FFF0F5", "#FFCCCB", "#DC143C", "#B22222", "#800020"],
    },
    {
      name: "الأحمر الأرجواني الملكي",
      category: "reds",
      shades: ["#FFF0F5", "#FFB6C1", "#FF1493", "#DC143C", "#8B008B"],
    },

    // Greens (12 families)
    {
      name: "الأخضر الزمردي الفاخر",
      category: "greens",
      shades: ["#E8F5E8", "#C8E6C9", "#66BB6A", "#4CAF50", "#1B5E20"],
    },
    {
      name: "الأخضر الغابات البري",
      category: "greens",
      shades: ["#F1F8E9", "#DCEDC8", "#8BC34A", "#689F38", "#33691E"],
    },
    {
      name: "الأخضر الليموني المنعش",
      category: "greens",
      shades: ["#F9FBE7", "#F0F4C3", "#CDDC39", "#AFB42B", "#827717"],
    },
    {
      name: "الأخضر الزيتوني المتوسطي",
      category: "greens",
      shades: ["#F1F8E9", "#DCEDC8", "#9CCC65", "#7CB342", "#558B2F"],
    },
    {
      name: "الأخضر النعناعي البارد",
      category: "greens",
      shades: ["#E0F2F1", "#B2DFDB", "#4DB6AC", "#26A69A", "#00695C"],
    },
    {
      name: "الأخضر البحري الهادئ",
      category: "greens",
      shades: ["#E8F5E8", "#C8E6C9", "#81C784", "#66BB6A", "#2E7D32"],
    },
    {
      name: "الأخضر الربيعي الحيوي",
      category: "greens",
      shades: ["#F1F8E9", "#DCEDC8", "#AED581", "#9CCC65", "#689F38"],
    },
    {
      name: "الأخضر التفاحي الطازج",
      category: "greens",
      shades: ["#F9FBE7", "#F0F4C3", "#DCE775", "#CDDC39", "#9E9D24"],
    },
    {
      name: "الأخضر الباستيل الناعم",
      category: "greens",
      shades: ["#F0FFF0", "#E0FFE0", "#98FB98", "#90EE90", "#32CD32"],
    },
    {
      name: "الأخضر الصنوبري الجبلي",
      category: "greens",
      shades: ["#F5FFFA", "#E0F2E0", "#228B22", "#006400", "#013220"],
    },
    {
      name: "الأخضر الجيري الحمضي",
      category: "greens",
      shades: ["#F9FFF9", "#F0FFF0", "#ADFF2F", "#7FFF00", "#32CD32"],
    },
    {
      name: "الأخضر الكلوروفيل الطبيعي",
      category: "greens",
      shades: ["#F0FFF0", "#C1FFC1", "#7CFC00", "#32CD32", "#228B22"],
    },

    // Yellows (12 families)
    {
      name: "الأصفر الذهبي الملكي",
      category: "yellows",
      shades: ["#FFFDE7", "#FFF9C4", "#FFEB3B", "#FBC02D", "#F57F17"],
    },
    {
      name: "الأصفر الليموني الحامض",
      category: "yellows",
      shades: ["#F9FBE7", "#F0F4C3", "#CDDC39", "#AFB42B", "#827717"],
    },
    {
      name: "الأصفر الكناري المشرق",
      category: "yellows",
      shades: ["#FFFDE7", "#FFF9C4", "#FFEB3B", "#FDD835", "#F9A825"],
    },
    {
      name: "الأصفر الكهرماني العتيق",
      category: "yellows",
      shades: ["#FFF8E1", "#FFECB3", "#FFC107", "#FF8F00", "#FF6F00"],
    },
    {
      name: "الأصفر الشمسي المتوهج",
      category: "yellows",
      shades: ["#FFFDE7", "#FFF9C4", "#FFEB3B", "#FFCA28", "#FFA000"],
    },
    {
      name: "الأصفر الذرة الطبيعي",
      category: "yellows",
      shades: ["#FFF8E1", "#FFECB3", "#FFD54F", "#FFCA28", "#FF8F00"],
    },
    {
      name: "الأصفر الموز الاستوائي",
      category: "yellows",
      shades: ["#FFFDE7", "#FFF9C4", "#FFEB3B", "#FDD835", "#F9A825"],
    },
    {
      name: "الأصفر العسلي الحلو",
      category: "yellows",
      shades: ["#FFF8E1", "#FFECB3", "#FFC107", "#FFB300", "#FF8F00"],
    },
    {
      name: "الأصفر الباستيل الهادئ",
      category: "yellows",
      shades: ["#FFFFFE", "#FFFACD", "#FFFFE0", "#FFFF99", "#FFFF00"],
    },
    {
      name: "الأصفر النحاسي المعدني",
      category: "yellows",
      shades: ["#FFF8DC", "#F0E68C", "#DAA520", "#B8860B", "#8B7355"],
    },
    {
      name: "الأصفر الرملي الصحراوي",
      category: "yellows",
      shades: ["#FFFAF0", "#F5DEB3", "#DEB887", "#D2B48C", "#BC9A6A"],
    },
    {
      name: "الأصفر الكريمي الناعم",
      category: "yellows",
      shades: ["#FFFDD0", "#FFF8DC", "#F5DEB3", "#DEB887", "#D2B48C"],
    },

    // Purples (12 families)
    {
      name: "البنفسجي الملكي الفاخر",
      category: "purples",
      shades: ["#F3E5F5", "#CE93D8", "#AB47BC", "#8E24AA", "#4A148C"],
    },
    {
      name: "البنفسجي اللافندر العطر",
      category: "purples",
      shades: ["#EDE7F6", "#B39DDB", "#7E57C2", "#5E35B1", "#311B92"],
    },
    {
      name: "البنفسجي الأرجواني النبيل",
      category: "purples",
      shades: ["#F3E5F5", "#CE93D8", "#BA68C8", "#9C27B0", "#6A1B9A"],
    },
    {
      name: "البنفسجي الماجنتا الحيوي",
      category: "purples",
      shades: ["#FCE4EC", "#F8BBD9", "#F06292", "#E91E63", "#AD1457"],
    },
    {
      name: "البنفسجي الإندجو العميق",
      category: "purples",
      shades: ["#E8EAF6", "#C5CAE9", "#7986CB", "#3F51B5", "#283593"],
    },
    {
      name: "البنفسجي الأمثيست الثمين",
      category: "purples",
      shades: ["#F3E5F5", "#CE93D8", "#AB47BC", "#8E24AA", "#6A1B9A"],
    },
    {
      name: "البنفسجي الفيوليت الكلاسيكي",
      category: "purples",
      shades: ["#EDE7F6", "#B39DDB", "#9575CD", "#7E57C2", "#512DA8"],
    },
    {
      name: "البنفسجي الوردي الرقيق",
      category: "purples",
      shades: ["#FCE4EC", "#F8BBD9", "#F06292", "#EC407A", "#C2185B"],
    },
    {
      name: "البنفسجي الباستيل الحالم",
      category: "purples",
      shades: ["#F8F0FF", "#E6E6FA", "#DDA0DD", "#DA70D6", "#BA55D3"],
    },
    {
      name: "البنفسجي الغامق الليلي",
      category: "purples",
      shades: ["#F0E6FF", "#D8BFD8", "#9370DB", "#8A2BE2", "#4B0082"],
    },
    {
      name: "البنفسجي الليلكي الربيعي",
      category: "purples",
      shades: ["#FAF0E6", "#E6E6FA", "#C8A2C8", "#B19CD9", "#9370DB"],
    },
    {
      name: "البنفسجي الأوركيد الاستوائي",
      category: "purples",
      shades: ["#FFF0F5", "#FFE4E1", "#DA70D6", "#BA55D3", "#9932CC"],
    },

    // Oranges (12 families)
    {
      name: "البرتقالي الفاتح المشمس",
      category: "oranges",
      shades: ["#FFF3E0", "#FFCC80", "#FF9800", "#F57C00", "#E65100"],
    },
    {
      name: "البرتقالي الداكن الغني",
      category: "oranges",
      shades: ["#FBE9E7", "#FFAB91", "#FF5722", "#E64A19", "#BF360C"],
    },
    {
      name: "البرتقالي المحروق التراثي",
      category: "oranges",
      shades: ["#FFF3E0", "#FFCC80", "#FFB74D", "#FF9800", "#F57C00"],
    },
    {
      name: "البرتقالي المرجاني البحري",
      category: "oranges",
      shades: ["#FBE9E7", "#FFAB91", "#FF7043", "#FF5722", "#D84315"],
    },
    {
      name: "البرتقالي الخوخي الناعم",
      category: "oranges",
      shades: ["#FFF3E0", "#FFCC80", "#FFB74D", "#FFA726", "#FF8F00"],
    },
    {
      name: "البرتقالي المشمشي الحلو",
      category: "oranges",
      shades: ["#FFF8E1", "#FFECB3", "#FFD54F", "#FFC107", "#FF8F00"],
    },
    {
      name: "البرتقالي النيون المتوهج",
      category: "oranges",
      shades: ["#FBE9E7", "#FFAB91", "#FF6E40", "#FF5722", "#DD2C00"],
    },
    {
      name: "البرتقالي التانجرين الحمضي",
      category: "oranges",
      shades: ["#FFF3E0", "#FFCC80", "#FF9800", "#F57C00", "#EF6C00"],
    },
    {
      name: "البرتقالي الباستيل الهادئ",
      category: "oranges",
      shades: ["#FFF8F0", "#FFEFD5", "#FFDAB9", "#FFB347", "#FF8C00"],
    },
    {
      name: "البرتقالي الذهبي الملكي",
      category: "oranges",
      shades: ["#FFFAF0", "#FFF8DC", "#FFD700", "#FFA500", "#FF8C00"],
    },
    {
      name: "البرتقالي الصدئ المعدني",
      category: "oranges",
      shades: ["#FFF5EE", "#FFDAB9", "#CD853F", "#A0522D", "#8B4513"],
    },
    {
      name: "البرتقالي الكانتالوب الطازج",
      category: "oranges",
      shades: ["#FFF8F0", "#FFEFD5", "#FFDAB9", "#FFA366", "#FF7F50"],
    },
  ];
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize favorites container
  initializeFavoritesContainer();
  updateCartCount();

  // Sidebar
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  window.toggleSidebar = function () {
    sidebar.classList.toggle("translate-x-full");
    sidebarOverlay.classList.toggle("hidden");
  };
  window.closeSidebar = function () {
    sidebar.classList.add("translate-x-full");
    sidebarOverlay.classList.add("hidden");
  };

  // Favorites Sidebar
  const favoritesSidebar = document.getElementById("favoritesSidebar");
  const favoritesOverlay = document.getElementById("favoritesOverlay");

  window.toggleFavorites = function () {
    if (!favoritesSidebar) return;
    favoritesSidebar.classList.remove("hidden");
    favoritesSidebar.classList.toggle("-translate-x-full");
    if (favoritesOverlay) {
      favoritesOverlay.classList.remove("hidden");
    }
  };
  window.closeFavorites = function () {
    if (!favoritesSidebar) return;
    favoritesSidebar.classList.add("-translate-x-full");
    if (favoritesOverlay) {
      favoritesOverlay.classList.add("hidden");
    }
    // Hide after animation completes
    setTimeout(() => {
      if (favoritesSidebar.classList.contains("-translate-x-full")) {
        favoritesSidebar.classList.add("hidden");
      }
    }, 50);
  };

  // Pages
  window.showHomePage = function () {
    const homePage = document.getElementById("homePage");
    const allColorsPage = document.getElementById("allColorsPage");
    if (homePage) homePage.classList.remove("hidden");
    if (allColorsPage) allColorsPage.classList.add("hidden");
  };
  window.showColorsPage = function () {
    const homePage = document.getElementById("homePage");
    const allColorsPage = document.getElementById("allColorsPage");
    if (homePage) homePage.classList.add("hidden");
    if (allColorsPage) allColorsPage.classList.remove("hidden");
  };

  // Original Favorites function (for other parts of the site)
  window.toggleFavorite = function (id, img, name) {
    const container = document.getElementById("favoritesContent");
    if (!container) return;

    let existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    } else {
      let item = document.createElement("div");
      item.id = id;
      item.className = "flex items-center gap-3 p-2 border rounded";
      item.innerHTML = `
                <img alt="" src="${img}" class="w-12 h-12 object-cover rounded-md border">
                <span>${name}</span>
            `;
      container.appendChild(item);
    }
  };

  // Language Menu
  const languageMenu = document.getElementById("languageMenu");
  window.toggleLanguageMenu = function () {
    if (languageMenu) languageMenu.classList.toggle("hidden");
  };
  window.selectLanguage = function (code, name, flag) {
    const currentLanguage = document.getElementById("currentLanguage");
    const currentFlag = document.getElementById("currentFlag");
    if (currentLanguage) currentLanguage.innerText = name;
    if (currentFlag) currentFlag.src = flag;
    if (languageMenu) languageMenu.classList.add("hidden");
  };

  // Search Colors
  window.filterColors = function () {
    const input = document.getElementById("colorSearch");
    if (!input) return;

    let inputValue = input.value.toLowerCase();
    let cards = document.querySelectorAll(".color-card");
    cards.forEach((card) => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(inputValue) ? "block" : "none";
    });
  };

  // Initialize sliders with favorites
  initSwiperWithFavorites();

  // Original carousel code (for other parts of site)
  const carouselsData = [
    {
      title: "دهانات داخلية",
      link: "#",
      products: [
        {
          name: "دهان أبيض داخلي",
          img: "https://images.unsplash.com/photo-1590689962103-97f0b7f63c43?auto=format&fit=crop&w=220&q=80",
        },
      ],
    },
    {
      title: "دهانات خارجية",
      link: "#",
      products: [
        {
          name: "دهان خارجي أبيض",
          img: "https://images.unsplash.com/photo-1616628186608-1f5f87f87b65?auto=format&fit=crop&w=220&q=80",
        },
      ],
    },
    {
      title: "ألوان متاحة",
      link: "#",
      products: [
        {
          name: "أحمر",
          img: "https://via.placeholder.com/220x220/ff0000/ffffff?text=Red",
        },
        {
          name: "أزرق",
          img: "https://via.placeholder.com/220x220/0000ff/ffffff?text=Blue",
        },
        {
          name: "أخضر",
          img: "https://via.placeholder.com/220x220/00ff00/ffffff?text=Green",
        },
      ],
    },
    {
      title: "العوازل وأنواعها",
      link: "#",
      products: [
        {
          name: "عازل حراري",
          img: "https://via.placeholder.com/220x220/cccccc/000000?text=Insulation",
        },
      ],
    },
  ];

  const container = document.getElementById("carousels-container");
  const template = document.getElementById("carousel-template");

  // Only run carousel code if elements exist (on index.html)
  if (container && template) {
    carouselsData.forEach((c) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".carousel-title").textContent = c.title;
      clone.querySelector(".carousel-link").setAttribute("href", c.link);
      const track = clone.querySelector(".carousel-track");

      c.products.forEach((p) => {
        const prodDiv = document.createElement("div");
        prodDiv.className =
          "min-w-[220px] bg-white rounded-xl shadow p-4 text-center relative group hover:shadow-lg transition filter hover:blur-none";
        prodDiv.innerHTML = `
                <img alt="" src="${p.img}" class="w-full h-48 object-cover rounded-md mb-2">
                <p class="text-gray-800 font-medium">${p.name}</p>
                <button title="button" type="button" onclick="toggleFavorite('${p.name}','${p.img}','${p.name}')" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">
                    <i class="fas fa-heart"></i>
                </button>
            `;
        track.appendChild(prodDiv);
      });

      const prevBtn = clone.querySelector(".prev-btn");
      const nextBtn = clone.querySelector(".next-btn");
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -240, behavior: "smooth" });
      });
      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: 240, behavior: "smooth" });
      });

      container.appendChild(clone);
    });
  }
});

// Initialize Swiper sliders with favorites functionality
function initSwiperWithFavorites() {
  // Interior Colors Swiper
  const interiorSwiper = new Swiper(".interior-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: ".interior-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".interior-next",
      prevEl: ".interior-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Exterior Colors Swiper
  const exteriorSwiper = new Swiper(".exterior-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: ".exterior-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".exterior-next",
      prevEl: ".exterior-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Insulation Swiper
  const insulationSwiper = new Swiper(".insulation-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: ".insulation-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".insulation-next",
      prevEl: ".insulation-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Collection Swiper
  const collectionSwiper = new Swiper(".collection-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: ".collection-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".collection-next",
      prevEl: ".collection-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

// Enhanced favorite toggle function for sliders with visual feedback
window.toggleSliderFavorite = function (id, name, type, color) {
  const heartIcon = document.querySelector(`[data-fav-id="${id}"]`);

  if (!heartIcon) return;

  // Check if item is currently favorited
  const isFavorited = heartIcon.classList.contains("text-red-500");

  if (isFavorited) {
    // Remove from favorites
    heartIcon.classList.remove("text-red-500", "fas");
    heartIcon.classList.add("text-gray-400", "far");
    removeFavoriteItem(id);
  } else {
    // Add to favorites
    heartIcon.classList.remove("text-gray-400", "far");
    heartIcon.classList.add("text-red-500", "fas");
    addFavoriteItem(id, name, type, color);
  }

  // Add a small animation effect
  heartIcon.style.transform = "scale(1.3)";
  setTimeout(() => {
    heartIcon.style.transform = "scale(1)";
  }, 150);
};

function addFavoriteItem(id, name, type, color) {
  const container = document.getElementById("favoritesContent");
  if (!container) return;

  // Remove "no favorites" message if it exists (check for multiple possible selectors)
  const emptyMessage = container.querySelector("[data-empty-message]");
  if (emptyMessage) {
    emptyMessage.remove();
  }

  // Also remove any existing empty state content by checking for the specific text
  const existingContent = container.children;
  for (let i = existingContent.length - 1; i >= 0; i--) {
    const element = existingContent[i];
    if (
      element.textContent.includes("لا توجد ألوان مفضلة") ||
      (element.innerHTML.includes("fa-heart") &&
        element.textContent.includes("لا توجد"))
    ) {
      element.remove();
    }
  }

  // Check if item already exists to avoid duplicates
  const existingItem = document.getElementById(`fav-${id}`);
  if (existingItem) {
    return; // Item already in favorites
  }

  // Create favorite item
  const item = document.createElement("div");
  item.id = `fav-${id}`;
  item.className =
    "flex items-center gap-3 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow";
  item.innerHTML = `
    <div class="w-12 h-12 rounded-lg border-2 border-gray-200" style="background-color: ${color}"></div>
    <div class="flex-1">
      <h4 class="font-semibold text-gray-800">${name}</h4>
      <p class="text-sm text-gray-500">${type}</p>
    </div>
    <button onclick="toggleSliderFavorite('${id}', '${name}', '${type}', '${color}')" 
            class="p-2 text-red-500 hover:text-red-700 transition-colors"
            title="إزالة من المفضلة">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;
  container.appendChild(item);

  console.log("Added item to favorites:", name); // Debug log
}

function removeFavoriteItem(id) {
  const item = document.getElementById(`fav-${id}`);
  if (item) {
    item.remove();
  }

  // Check if favorites container is empty
  const container = document.getElementById("favoritesContent");
  if (container && container.children.length === 0) {
    showEmptyFavoritesMessage();
  }
}

function showEmptyFavoritesMessage() {
  const container = document.getElementById("favoritesContent");
  if (!container) return;

  const emptyMessage = document.createElement("div");
  emptyMessage.setAttribute("data-empty-message", "true");
  emptyMessage.style.cssText =
    "text-align: center; color: #6b7280; padding: 48px 28px";
  emptyMessage.innerHTML = `
    <i class="fas fa-heart" style="font-size: 3rem; color: #fca5a5; margin-bottom: 16px"></i>
    <h3 style="color: #374151; margin-bottom: 8px">لا توجد ألوان مفضلة</h3>
    <p>ابدأ بإضافة الألوان التي تعجبك إلى قائمة المفضلة</p>
  `;
  container.appendChild(emptyMessage);
}

// Legacy functions for old initSwiper
function initSwiper(className) {
  return new Swiper(`.${className}-swiper`, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: `.${className}-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `.${className}-next`,
      prevEl: `.${className}-prev`,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function renderCart() {
  const container = document.getElementById("cartContent");
  const totalEl = document.getElementById("cartTotal");
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = `
      <div style="text-align:center; color:#6b7280; padding: 28px 16px">
        <i class="fas fa-shopping-basket" style="font-size:2.25rem; color:#86efac; margin-bottom: 10px"></i>
        <h3 style="color:#374151; margin-bottom:6px">السلة فارغة</h3>
        <p>أضف المنتجات إلى السلة للمتابعة</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = "0";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    total += Number(item.price || 0);
    const row = document.createElement("div");
    row.className =
      "flex items-center justify-between gap-3 p-2 border rounded bg-white";
    row.innerHTML = `
      <div class="flex items-center gap-3">
        <img alt="" src="${
          item.img || ""
        }" class="w-12 h-12 object-cover rounded-md border" />
        <div>
          <div class="font-medium">${item.name || "منتج"}</div>
          <div class="text-sm text-gray-500">${
            item.price ? item.price + " ₺" : ""
          }</div>
        </div>
      </div>
      <button
        title="remove"
        type="button"
        class="text-red-600 hover:text-red-700"
        onclick="removeFromCart(${idx})"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    container.appendChild(row);
  });

  if (totalEl) totalEl.textContent = total + " ₺";
}

window.toggleCart = function () {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  if (!cartSidebar) return;
  cartSidebar.classList.remove("hidden");
  cartSidebar.classList.toggle("-translate-x-full");
  if (cartOverlay) cartOverlay.classList.remove("hidden");
  renderCart();
};

window.closeCart = function () {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  if (!cartSidebar) return;
  cartSidebar.classList.add("-translate-x-full");
  if (cartOverlay) cartOverlay.classList.add("hidden");
  setTimeout(() => {
    if (cartSidebar.classList.contains("-translate-x-full")) {
      cartSidebar.classList.add("hidden");
    }
  }, 50);
};

// public helpers to use from product cards later
window.addToCart = function (id, name, price = 0, img = "") {
  cart.push({ id, name, price, img });
  localStorage.setItem("bondmaxx-cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
};

window.removeFromCart = function (index) {
  cart.splice(index, 1);
  localStorage.setItem("bondmaxx-cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
};

// WhatsApp checkout function
window.submitCartToWhatsApp = function () {
  if (!cart.length) {
    alert("السلة فارغة! يرجى إضافة منتجات قبل المتابعة");
    return;
  }

  const phoneNumber = "4917666990043";
  let message = "مرحباً! أود طلب المنتجات التالية:\n\n";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;

    if (item.price && item.price > 0) {
      message += `   السعر: ${item.price} ₺\n`;
      total += Number(item.price);
    }

    // Add image URL if available
    if (item.img || item.image || item.imageUrl) {
      const imageUrl = item.img || item.image || item.imageUrl;
      // Convert relative URLs to absolute URLs
      const fullImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : window.location.origin + "/" + imageUrl;
      message += `   الصورة: ${fullImageUrl}\n`;
    }

    message += "\n";
  });

  if (total > 0) {
    message += `الإجمالي: ${total} ₺\n\n`;
  }

  message += "شكراً لكم!";

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  // Clear cart
  cart = [];
  localStorage.setItem("bondmaxx-cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
  closeCart();
};
