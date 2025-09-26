 // Global variables
        let favorites = JSON.parse(localStorage.getItem('bondmaxx-favorites') || '[]');
        let currentLanguage = 'ar';
        let colorFamilies = [];

        // Initialize color families data
        function initializeColorFamilies() {
            colorFamilies = [
                // Blues (12 families)
                { name: 'الأزرق السماوي الكلاسيكي', category: 'blues', shades: ['#E3F2FD', '#90CAF9', '#42A5F5', '#1E88E5', '#0D47A1'] },
                { name: 'الأزرق الملكي الفاخر', category: 'blues', shades: ['#E8EAF6', '#9FA8DA', '#5C6BC0', '#3F51B5', '#1A237E'] },
                { name: 'الأزرق البحري العميق', category: 'blues', shades: ['#E1F5FE', '#81D4FA', '#29B6F6', '#0288D1', '#01579B'] },
                { name: 'الأزرق الفولاذي المعدني', category: 'blues', shades: ['#E0F2F1', '#80CBC4', '#26A69A', '#00695C', '#004D40'] },
                { name: 'الأزرق الكوبالت النقي', category: 'blues', shades: ['#E8F4FD', '#A3D5FF', '#4FC3F7', '#0277BD', '#01579B'] },
                { name: 'الأزرق البروسي التقليدي', category: 'blues', shades: ['#E3F2FD', '#90CAF9', '#2196F3', '#1976D2', '#0D47A1'] },
                { name: 'الأزرق التركوازي الاستوائي', category: 'blues', shades: ['#E0F7FA', '#80DEEA', '#26C6DA', '#00ACC1', '#006064'] },
                { name: 'الأزرق الآكوا المنعش', category: 'blues', shades: ['#E0F2F1', '#80CBC4', '#4DB6AC', '#26A69A', '#004D40'] },
                { name: 'الأزرق الجليدي الشفاف', category: 'blues', shades: ['#F0F8FF', '#B0E0E6', '#87CEEB', '#4682B4', '#2F4F4F'] },
                { name: 'الأزرق الكهربائي المشع', category: 'blues', shades: ['#E0F6FF', '#87CEFA', '#00BFFF', '#1E90FF', '#0000CD'] },
                { name: 'الأزرق الدنيم العصري', category: 'blues', shades: ['#E6F3FF', '#B3D9FF', '#6699CC', '#4169E1', '#191970'] },
                { name: 'الأزرق الباستيل الناعم', category: 'blues', shades: ['#F0F8FF', '#E6F3FF', '#CCDDFF', '#99BBFF', '#6699FF'] },

                // Reds (12 families)
                { name: 'الأحمر القرمزي الملكي', category: 'reds', shades: ['#FFEBEE', '#FFCDD2', '#EF5350', '#F44336', '#B71C1C'] },
                { name: 'الأحمر الوردي الرومانسي', category: 'reds', shades: ['#FCE4EC', '#F8BBD9', '#E91E63', '#C2185B', '#880E4F'] },
                { name: 'الأحمر البرتقالي الدافئ', category: 'reds', shades: ['#FFF3E0', '#FFCC80', '#FF9800', '#F57C00', '#E65100'] },
                { name: 'الأحمر العنابي الغني', category: 'reds', shades: ['#FFEBEE', '#FFCDD2', '#F44336', '#D32F2F', '#B71C1C'] },
                { name: 'الأحمر الكرزي الطبيعي', category: 'reds', shades: ['#FCE4EC', '#F8BBD9', '#E91E63', '#AD1457', '#880E4F'] },
                { name: 'الأحمر الناري المتوهج', category: 'reds', shades: ['#FFF8E1', '#FFECB3', '#FFC107', '#FF8F00', '#FF6F00'] },
                { name: 'الأحمر المرجاني البحري', category: 'reds', shades: ['#FFF3E0', '#FFCC80', '#FF9800', '#F57C00', '#E65100'] },
                { name: 'الأحمر الروبي الثمين', category: 'reds', shades: ['#FFEBEE', '#FFCDD2', '#EF5350', '#E53935', '#C62828'] },
                { name: 'الأحمر الطوبي التراثي', category: 'reds', shades: ['#FFF0F0', '#FFD0D0', '#CD5C5C', '#B22222', '#8B0000'] },
                { name: 'الأحمر الوردي الفاتح', category: 'reds', shades: ['#FFF5F8', '#FFE4E1', '#FFC0CB', '#FF69B4', '#C71585'] },
                { name: 'الأحمر البورجوندي النبيل', category: 'reds', shades: ['#FFF0F5', '#FFCCCB', '#DC143C', '#B22222', '#800020'] },
                { name: 'الأحمر الأرجواني الملكي', category: 'reds', shades: ['#FFF0F5', '#FFB6C1', '#FF1493', '#DC143C', '#8B008B'] },

                // Greens (12 families)
                { name: 'الأخضر الزمردي الفاخر', category: 'greens', shades: ['#E8F5E8', '#C8E6C9', '#66BB6A', '#4CAF50', '#1B5E20'] },
                { name: 'الأخضر الغابات البري', category: 'greens', shades: ['#F1F8E9', '#DCEDC8', '#8BC34A', '#689F38', '#33691E'] },
                { name: 'الأخضر الليموني المنعش', category: 'greens', shades: ['#F9FBE7', '#F0F4C3', '#CDDC39', '#AFB42B', '#827717'] },
                { name: 'الأخضر الزيتوني المتوسطي', category: 'greens', shades: ['#F1F8E9', '#DCEDC8', '#9CCC65', '#7CB342', '#558B2F'] },
                { name: 'الأخضر النعناعي البارد', category: 'greens', shades: ['#E0F2F1', '#B2DFDB', '#4DB6AC', '#26A69A', '#00695C'] },
                { name: 'الأخضر البحري الهادئ', category: 'greens', shades: ['#E8F5E8', '#C8E6C9', '#81C784', '#66BB6A', '#2E7D32'] },
                { name: 'الأخضر الربيعي الحيوي', category: 'greens', shades: ['#F1F8E9', '#DCEDC8', '#AED581', '#9CCC65', '#689F38'] },
                { name: 'الأخضر التفاحي الطازج', category: 'greens', shades: ['#F9FBE7', '#F0F4C3', '#DCE775', '#CDDC39', '#9E9D24'] },
                { name: 'الأخضر الباستيل الناعم', category: 'greens', shades: ['#F0FFF0', '#E0FFE0', '#98FB98', '#90EE90', '#32CD32'] },
                { name: 'الأخضر الصنوبري الجبلي', category: 'greens', shades: ['#F5FFFA', '#E0F2E0', '#228B22', '#006400', '#013220'] },
                { name: 'الأخضر الجيري الحمضي', category: 'greens', shades: ['#F9FFF9', '#F0FFF0', '#ADFF2F', '#7FFF00', '#32CD32'] },
                { name: 'الأخضر الكلوروفيل الطبيعي', category: 'greens', shades: ['#F0FFF0', '#C1FFC1', '#7CFC00', '#32CD32', '#228B22'] },

                // Yellows (12 families)
                { name: 'الأصفر الذهبي الملكي', category: 'yellows', shades: ['#FFFDE7', '#FFF9C4', '#FFEB3B', '#FBC02D', '#F57F17'] },
                { name: 'الأصفر الليموني الحامض', category: 'yellows', shades: ['#F9FBE7', '#F0F4C3', '#CDDC39', '#AFB42B', '#827717'] },
                { name: 'الأصفر الكناري المشرق', category: 'yellows', shades: ['#FFFDE7', '#FFF9C4', '#FFEB3B', '#FDD835', '#F9A825'] },
                { name: 'الأصفر الكهرماني العتيق', category: 'yellows', shades: ['#FFF8E1', '#FFECB3', '#FFC107', '#FF8F00', '#FF6F00'] },
                { name: 'الأصفر الشمسي المتوهج', category: 'yellows', shades: ['#FFFDE7', '#FFF9C4', '#FFEB3B', '#FFCA28', '#FFA000'] },
                { name: 'الأصفر الذرة الطبيعي', category: 'yellows', shades: ['#FFF8E1', '#FFECB3', '#FFD54F', '#FFCA28', '#FF8F00'] },
                { name: 'الأصفر الموز الاستوائي', category: 'yellows', shades: ['#FFFDE7', '#FFF9C4', '#FFEB3B', '#FDD835', '#F9A825'] },
                { name: 'الأصفر العسلي الحلو', category: 'yellows', shades: ['#FFF8E1', '#FFECB3', '#FFC107', '#FFB300', '#FF8F00'] },
                { name: 'الأصفر الباستيل الهادئ', category: 'yellows', shades: ['#FFFFFE', '#FFFACD', '#FFFFE0', '#FFFF99', '#FFFF00'] },
                { name: 'الأصفر النحاسي المعدني', category: 'yellows', shades: ['#FFF8DC', '#F0E68C', '#DAA520', '#B8860B', '#8B7355'] },
                { name: 'الأصفر الرملي الصحراوي', category: 'yellows', shades: ['#FFFAF0', '#F5DEB3', '#DEB887', '#D2B48C', '#BC9A6A'] },
                { name: 'الأصفر الكريمي الناعم', category: 'yellows', shades: ['#FFFDD0', '#FFF8DC', '#F5DEB3', '#DEB887', '#D2B48C'] },

                // Purples (12 families)
                { name: 'البنفسجي الملكي الفاخر', category: 'purples', shades: ['#F3E5F5', '#CE93D8', '#AB47BC', '#8E24AA', '#4A148C'] },
                { name: 'البنفسجي اللافندر العطر', category: 'purples', shades: ['#EDE7F6', '#B39DDB', '#7E57C2', '#5E35B1', '#311B92'] },
                { name: 'البنفسجي الأرجواني النبيل', category: 'purples', shades: ['#F3E5F5', '#CE93D8', '#BA68C8', '#9C27B0', '#6A1B9A'] },
                { name: 'البنفسجي الماجنتا الحيوي', category: 'purples', shades: ['#FCE4EC', '#F8BBD9', '#F06292', '#E91E63', '#AD1457'] },
                { name: 'البنفسجي الإندجو العميق', category: 'purples', shades: ['#E8EAF6', '#C5CAE9', '#7986CB', '#3F51B5', '#283593'] },
                { name: 'البنفسجي الأمثيست الثمين', category: 'purples', shades: ['#F3E5F5', '#CE93D8', '#AB47BC', '#8E24AA', '#6A1B9A'] },
                { name: 'البنفسجي الفيوليت الكلاسيكي', category: 'purples', shades: ['#EDE7F6', '#B39DDB', '#9575CD', '#7E57C2', '#512DA8'] },
                { name: 'البنفسجي الوردي الرقيق', category: 'purples', shades: ['#FCE4EC', '#F8BBD9', '#F06292', '#EC407A', '#C2185B'] },
                { name: 'البنفسجي الباستيل الحالم', category: 'purples', shades: ['#F8F0FF', '#E6E6FA', '#DDA0DD', '#DA70D6', '#BA55D3'] },
                { name: 'البنفسجي الغامق الليلي', category: 'purples', shades: ['#F0E6FF', '#D8BFD8', '#9370DB', '#8A2BE2', '#4B0082'] },
                { name: 'البنفسجي الليلكي الربيعي', category: 'purples', shades: ['#FAF0E6', '#E6E6FA', '#C8A2C8', '#B19CD9', '#9370DB'] },
                { name: 'البنفسجي الأوركيد الاستوائي', category: 'purples', shades: ['#FFF0F5', '#FFE4E1', '#DA70D6', '#BA55D3', '#9932CC'] },

                // Oranges (12 families)
                { name: 'البرتقالي الفاتح المشمس', category: 'oranges', shades: ['#FFF3E0', '#FFCC80', '#FF9800', '#F57C00', '#E65100'] },
                { name: 'البرتقالي الداكن الغني', category: 'oranges', shades: ['#FBE9E7', '#FFAB91', '#FF5722', '#E64A19', '#BF360C'] },
                { name: 'البرتقالي المحروق التراثي', category: 'oranges', shades: ['#FFF3E0', '#FFCC80', '#FFB74D', '#FF9800', '#F57C00'] },
                { name: 'البرتقالي المرجاني البحري', category: 'oranges', shades: ['#FBE9E7', '#FFAB91', '#FF7043', '#FF5722', '#D84315'] },
                { name: 'البرتقالي الخوخي الناعم', category: 'oranges', shades: ['#FFF3E0', '#FFCC80', '#FFB74D', '#FFA726', '#FF8F00'] },
                { name: 'البرتقالي المشمشي الحلو', category: 'oranges', shades: ['#FFF8E1', '#FFECB3', '#FFD54F', '#FFC107', '#FF8F00'] },
                { name: 'البرتقالي النيون المتوهج', category: 'oranges', shades: ['#FBE9E7', '#FFAB91', '#FF6E40', '#FF5722', '#DD2C00'] },
                { name: 'البرتقالي التانجرين الحمضي', category: 'oranges', shades: ['#FFF3E0', '#FFCC80', '#FF9800', '#F57C00', '#EF6C00'] },
                { name: 'البرتقالي الباستيل الهادئ', category: 'oranges', shades: ['#FFF8F0', '#FFEFD5', '#FFDAB9', '#FFB347', '#FF8C00'] },
                { name: 'البرتقالي الذهبي الملكي', category: 'oranges', shades: ['#FFFAF0', '#FFF8DC', '#FFD700', '#FFA500', '#FF8C00'] },
                { name: 'البرتقالي الصدئ المعدني', category: 'oranges', shades: ['#FFF5EE', '#FFDAB9', '#CD853F', '#A0522D', '#8B4513'] },
                { name: 'البرتقالي الكانتالوب الطازج', category: 'oranges', shades: ['#FFF8F0', '#FFEFD5', '#FFDAB9', '#FFA366', '#FF7F50'] }
            ];
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initializeColorFamilies();
            renderColorFamilies();
            updateFavoritesDisplay();
        });

        // Navigation functions
        function showHomePage() {
            document.getElementById('homePage').style.display = 'block';
            document.getElementById('allColorsPage').style.display = 'none';
            closeSidebar();
        }

        function showColorsPage() {
            document.getElementById('homePage').style.display = 'none';
            document.getElementById('allColorsPage').style.display = 'block';
            renderColorFamilies();
            closeSidebar();
        }

        // Sidebar functions
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const menuIcon = document.getElementById('menuIcon');
            
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                menuIcon.className = 'fas fa-times';
            }
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const menuIcon = document.getElementById('menuIcon');
            
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
        }

        // Favorites functions
        function toggleFavorites() {
            const favoritesSidebar = document.getElementById('favoritesSidebar');
            
            if (favoritesSidebar.classList.contains('active')) {
                closeFavorites();
            } else {
                favoritesSidebar.classList.add('active');
                updateFavoritesDisplay();
            }
        }

        function closeFavorites() {
            const favoritesSidebar = document.getElementById('favoritesSidebar');
            favoritesSidebar.classList.remove('active');
        }

        function toggleFavorite(id, color, name) {
            const existingIndex = favorites.findIndex(fav => fav.id === id);
            
            if (existingIndex > -1) {
                favorites.splice(existingIndex, 1);
            } else {
                favorites.push({ id, color, name });
            }
            
            localStorage.setItem('bondmaxx-favorites', JSON.stringify(favorites));
            updateFavoritesDisplay();
            updateHeartIcons();
        }

        function updateFavoritesDisplay() {
            const favoritesContent = document.getElementById('favoritesContent');
            
            if (favorites.length === 0) {
                favoritesContent.innerHTML = `
                    <div class="favorites-empty">
    <i class="fas fa-heart"></i>
    <h3>لا توجد ألوان مفضلة</h3>
    <p>ابدأ بإضافة الألوان التي تعجبك إلى قائمة المفضلة</p>
</div>

                `;
            } else {
                favoritesContent.innerHTML = favorites.map(fav => `
                    <div class="favorite-item">
                        <div class="favorite-color" style="background-color: ${fav.color};"></div>
                        <div class="favorite-info">
                            <div class="favorite-name">${fav.name}</div>
                            <div class="favorite-code">${fav.color}</div>
                        </div>
                        <button class="favorite-remove" onclick="toggleFavorite('${fav.id}', '${fav.color}', '${fav.name}')">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                `).join('');
            }
        }

        function updateHeartIcons() {
            document.querySelectorAll('.heart-btn').forEach(btn => {
                const onclick = btn.getAttribute('onclick');
                if (onclick) {
                    const match = onclick.match(/toggleFavorite\('([^']+)'/);
                    if (match) {
                        const id = match[1];
                        const isFavorite = favorites.some(fav => fav.id === id);
                        const icon = btn.querySelector('i');
                        icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
                        icon.style.color = isFavorite ? '#ef4444' : '#6b7280';
                    }
                }
            });
        }

        // Language functions
        function toggleLanguageMenu() {
            const languageMenu = document.getElementById('languageMenu');
            languageMenu.classList.toggle('active');
        }

        function selectLanguage(code, name, flag) {
            currentLanguage = code;
            document.getElementById('currentFlag').src = flag;
            document.getElementById('currentLanguage').textContent = name;
            document.getElementById('languageMenu').classList.remove('active');
        }

        // Color filtering functions
        function filterColors() {
            const searchTerm = document.getElementById('colorSearch').value.toLowerCase();
            const selectedCategory = document.getElementById('categoryFilter').value;
            
            let filteredFamilies = colorFamilies;
            
            if (selectedCategory !== 'all') {
                filteredFamilies = filteredFamilies.filter(family => family.category === selectedCategory);
            }
            
            if (searchTerm) {
                filteredFamilies = filteredFamilies.filter(family => 
                    family.name.toLowerCase().includes(searchTerm)
                );
            }
            
            renderColorFamilies(filteredFamilies);
            updateResultsCount(filteredFamilies.length);
        }

        function renderColorFamilies(families = colorFamilies) {
            const grid = document.getElementById('colorFamiliesGrid');
            const noResults = document.getElementById('noResults');
            
            if (families.length === 0) {
                grid.innerHTML = '';
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
                grid.innerHTML = families.map((family, index) => `
                    <div class="color-family-card">
                        <h3 class="family-title">${family.name}</h3>
                        <div class="family-shades">
                            ${family.shades.map((shade, shadeIndex) => `
                                <div class="shade-swatch" style="background-color: ${shade};" title="${shade}">
                                    <button class="heart-btn" onclick="toggleFavorite('${family.category}-${index}-${shadeIndex}', '${shade}', '${family.name} ${shadeIndex + 1}')">
                                        <i class="far fa-heart"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                        <div class="family-explore-btn">
                            <button><i class="fas fa-arrow-left" style="margin-left: 8px;"></i>استكشف المزيد</button>
                        </div>
                    </div>
                `).join('');
                
                updateHeartIcons();
            }
        }

        function updateResultsCount(count) {
            const resultsCount = document.getElementById('resultsCount');
            resultsCount.textContent = `عدد عائلات الألوان: ${count} عائلة (${count * 5} لون إجمالي)`;
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            const languageDropdown = document.querySelector('.language-dropdown');
            const languageMenu = document.getElementById('languageMenu');
            
            if (!languageDropdown.contains(event.target)) {
                languageMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add loading states for better UX
        function showLoading(element) {
            element.innerHTML = '<div class="loading"></div>';
        }

        // Initialize tooltips for color swatches
        document.addEventListener('mouseover', function(e) {
            if (e.target.classList.contains('color-swatch') || e.target.classList.contains('shade-swatch')) {
                const title = e.target.getAttribute('title');
                if (title) {
                    e.target.style.position = 'relative';
                }
            }
        });




        function openSidebar() {
  document.querySelector(".sidebar").classList.add("active");
}

document.getElementById("menuBtn").addEventListener("click", openSidebar);






















function toggleSubmenu() {
    const submenu = document.querySelector('.sidebar-submenu');
    submenu.classList.toggle('open');
}
