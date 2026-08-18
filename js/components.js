// components.js — 动态导航栏与页脚（兼容 GitHub Pages 和 Cloudflare Pages）
(function () {
    // 根据当前页面 URL 是否包含 "/html/" 来判断是否需要返回上级目录
    const basePath = window.location.pathname.includes('/html/') ? '../' : './';

    document.addEventListener('DOMContentLoaded', () => {
        // 注入导航栏
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = getNavbarHTML(basePath);
            highlightCurrentPage();
            initNavbar();
        }

        // 注入页脚
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = getFooterHTML(basePath);
        }
    });

    function getNavbarHTML(basePath) {
        return `
        <nav class="navbar">
            <a href="${basePath}index.html" class="nav-logo">🧱 PullNail</a>
            <button class="nav-toggle" id="navToggle">☰</button>
            <ul class="nav-links" id="navLinks">
                <li><a href="${basePath}index.html">首页</a></li>
                <li><a href="${basePath}html/links.html">🕹️ 更多游戏</a></li>
                <li class="dropdown" id="communityDropdown">
                    <span class="dropdown-toggle" id="communityToggle">🗣️ 社区与反馈 ▾</span>
                    <ul class="dropdown-menu">
                        <li><a href="https://github.com/NullLis/PullNail/issues">💬 问题反馈</a></li>
                        <li><a href="mailto:NullLis@example.com">📧 联系开发者</a></li>
                        <li><a href="https://github.com/NullLis/PullNail">🌟 支持项目</a></li>
                    </ul>
                </li>
                <li><a href="${basePath}html/download.html">📥 下载游戏</a></li>
                <li><a href="${basePath}html/update.html">📅 更新日志</a></li>
                <li><a href="${basePath}html/upload.html">📤 上传文件</a></li>
                <li><a href="${basePath}html/encode.html">🔧 文件编码</a></li>
            </ul>
        </nav>`;
    }

    function getFooterHTML(basePath) {
        return `
        <div class="footer">
            <div class="footer-links">
                <a href="#">服务条款</a>
                <a href="${basePath}html/privacy.html">隐私政策</a>
            </div>
            Built with ❤️ and Unreal Engine 5 &nbsp;|&nbsp; © 2026 NullLis
        </div>`;
    }

    function highlightCurrentPage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.endsWith('/' + currentPath) || href === currentPath)) {
                link.classList.add('active');
            }
        });
    }

    function initNavbar() {
        const toggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggleBtn = dropdown.querySelector('.dropdown-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                });
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            dropdowns.forEach(d => {
                if (!d.contains(e.target)) d.classList.remove('active');
            });
        });
    }
})();
