const allContent = [
    {
        type: 'Blog',
        title: "How Not to Love: A Manual of Restraint",
        date: 'Sep 13, 2025',
        readTime: '4 min',
        category: 'Life',
        url: '/blog/how-not-to-love',
        contentFile: 'blog/how-not-to-love.html',
        emoji: '📝',
        preview: "A quick recap of my first few days hitting the gym. It's been a journey of sore muscles and small victories..."
    },
	{
        type: 'Blog',
        title: 'My First Few Days at the Gym',
        date: 'Sep 10, 2025',
        readTime: '5 min',
        category: 'Life',
        url: '/blog/first-few-days',
        contentFile: 'blog/first-few-days.html',
        emoji: '🏋️',
        preview: "A quick recap of my first few days hitting the gym. It's been a journey of sore muscles and small victories..."
    },
    {
        type: 'Project',
        projectType: 'fun',
        title: 'CrushGPT',
        description: 'An experimental project using language models to generate creative text formats.',
        url: 'https://crush-gpt.netlify.app/',
        imageUrl: 'project-preview/crush-gpt.png',
        external: true,
        emoji: '💗',
        github: 'https://github.com/kyahikahein/crush-gpt',
        date: 'Jul 15, 2025',
        duration: '1 week',
        tech: 'JavaScript',
        tags: ['Web App', 'Fun']
    },
    {
        type: 'Project',
        projectType: 'fun',
        title: 'Star-Vault',
        description: 'A web tool for bookmarking and organizing your favorite online resources with a stellar-themed interface.',
        url: 'https://star-vault.netlify.app/',
        imageUrl: 'project-preview/vault.png',
        external: true,
        emoji: '⭐',
        github: 'https://github.com/kyahikahein/star-vault',
        date: 'Jun 01, 2025',
        duration: '3 weeks',
        tech: 'HTML/CSS',
        tags: ['Utility']
    }
];

const createListItem = (item, options = {}) => {
    const { showPreview = true, cardType = 'full' } = options;

    if (item.type === 'Project') {
        const element = document.createElement('li');

        const githubLinkIcon = item.github ? `
            <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="project-icon-link" title="View on GitHub">
                <svg fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.014c0 4.43 2.864 8.167 6.84 9.49.5.092.683-.217.683-.482 0-.237-.009-.868-.014-1.704-2.782.604-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.89 1.53 2.34 1.09 2.912.833.091-.647.35-1.09.635-1.34-2.22-.253-4.555-1.113-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.025A9.547 9.547 0 0112 6.844c.85.004 1.705.115 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.375.202 2.392.1 2.645.64.698 1.027 1.59 1.027 2.682 0 3.84-2.337 4.687-4.565 4.935.358.308.679.92.679 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.578.688.48A10.01 10.01 0 0022 12.014C22 6.477 17.523 2 12 2z" clip-rule="evenodd"></path></svg>
            </a>
        ` : '';

        const imageLinkUrl = item.url && item.url !== '#' ? item.url : '#';
        const imageHTML = `
            <a href="${imageLinkUrl}" ${imageLinkUrl !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                <img src="${item.imageUrl}" alt="${item.title} preview" loading="lazy">
            </a>
        `;

        const tagsHTML = item.tags && item.tags.length > 0 ? `
            <div class="project-tags">
                ${item.tags.slice(0, 3).map(tag => tag ? `<span class="tag-item">${tag}</span>` : '').join('')}
            </div>
        ` : '';

        if (cardType === 'featured') {
            element.className = 'project-card featured-project-card';
        } else {
            element.className = 'project-card';
        }

        element.innerHTML = `
            <div class="project-image-placeholder">
                ${imageHTML}
            </div>
            <div class="project-content">
                <div class="project-title-row">
                    <span class="item-title">${item.emoji} ${item.title}</span>
                    <div class="project-links">
                        ${githubLinkIcon}
                    </div>
                </div>
                <p class="item-description">${item.description}</p>
                <h4 class="technologies-heading">Technologies</h4>
                ${tagsHTML}
            </div>
        `;
        return element;

    } else {
        const element = document.createElement('div');
        element.className = 'list-item';
        const previewHTML = (item.preview && showPreview) ? `<p class="item-description">${item.preview}</p>` : '';
        const linkUrl = item.url;
        element.innerHTML = `
            <a href="${linkUrl}" class="item-title-link internal-app-link">
                <span class="item-title">${item.emoji} ${item.title}</span>
            </a>
            <div class="item-meta">${item.date} • ${item.readTime} • ${item.category}</div>
            ${previewHTML}
        `;
        return element;
    }
};

const renderPage = (pageType, containerId, options = {}) => {
    const { showPreview = true } = options;
    const templateId = {
        'project': 'projects-template',
        'blog': 'blog-list-template',
        'about': 'more-template'
    }[pageType];
    const templateNode = document.getElementById(templateId);

    if (!templateNode) {
        console.error(`Template with ID "${templateId}" not found.`);
        return document.createElement('div');
    }

    const template = templateNode.content.cloneNode(true);

    if (pageType === 'about') {
        return template;
    }

    if (pageType === 'project') {
        const allContainer = template.querySelector('#all-projects-list-container');
        const projects = allContent.filter(item => item.type === 'Project');

        projects.forEach(item => {
            const projectItem = createListItem(item, { cardType: 'full' });
            allContainer.appendChild(projectItem);
        });
    } else if (pageType === 'blog') {
        const container = template.querySelector(`#${containerId}`);
        const items = allContent.filter(item => item.type.toLowerCase() === pageType);
        items.forEach(item => container.appendChild(createListItem(item, { showPreview })));
    }

    return template;
};

const renderBlogPost = async (post) => {
    const template = document.getElementById('blog-post-template').content.cloneNode(true);
    const contentContainer = template.querySelector('#blog-post-content');
    const headerContainer = template.querySelector('#blog-post-header');

    const meta = `${post.date} • ${post.readTime} • ${post.category}`;
    const titleBlockHTML = `
        <h1 class="page-title">${post.emoji} ${post.title}</h1>
        <div class="meta-and-toggle-container">
            <p class="item-meta">${meta}</p>
            <button id="reading-mode-toggle" title="Toggle Reading Mode">
                <svg id="read-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                <svg id="exit-read-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                <span id="read-text">Read</span>
                <span id="exit-read-text">Exit</span>
            </button>
            <button id="share-button" title="Share Post">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /> </svg>
                 <span>Share</span>
            </button>
        </div>
    `;
    headerContainer.innerHTML = titleBlockHTML;

    try {
        const contentFilePath = `/${post.contentFile}`;
        const response = await fetch(contentFilePath);
        if (!response.ok) throw new Error(`Post content file not found: ${contentFilePath} (Status: ${response.status})`);
        contentContainer.innerHTML = await response.text();
    } catch (error) {
        console.error('Error fetching blog post:', error);
        contentContainer.innerHTML = `<p>Could not load the blog post content. Check if the file exists at '${post.contentFile}' and the path is correct relative to the root.</p>`;
    }

    const readingToggle = headerContainer.querySelector('#reading-mode-toggle');
    if (readingToggle) {
        readingToggle.addEventListener('click', () => {
            document.body.classList.toggle('reading-mode-active');
        });
    }

    const shareButton = headerContainer.querySelector('#share-button');
    const shareModal = document.getElementById('share-modal');
    const copyButton = document.getElementById('copy-url-button');
    const copyStatus = document.getElementById('copy-status');

    if(shareButton && shareModal && copyButton && copyStatus) {
        shareButton.addEventListener('click', () => {
            copyStatus.textContent = '';
            shareModal.classList.remove('hidden');
        });

        copyButton.addEventListener('click', async () => {
             const urlToCopy = window.location.href;
             try {
                 const textArea = document.createElement("textarea");
                 textArea.value = urlToCopy;
                 textArea.style.position = "fixed";
                 textArea.style.left = "-9999px";
                 document.body.appendChild(textArea);
                 textArea.focus();
                 textArea.select();
                 document.execCommand('copy');
                 document.body.removeChild(textArea);

                 copyStatus.textContent = 'Link copied!';
                 setTimeout(() => { shareModal.classList.add('hidden'); }, 1000);
             } catch (err) {
                 console.error('Failed to copy: ', err);
                 copyStatus.textContent = 'Failed to copy!';
             }
         });

         shareModal.addEventListener('click', (event) => {
             if (event.target === shareModal || event.target.closest('.share-modal-close')) {
                 shareModal.classList.add('hidden');
             }
         });
    }


    return template;
};


const mainContent = document.getElementById('main-content');
const siteHeader = document.getElementById('site-header');
const pageContent = document.getElementById('page-content');
let headerHeight = 60;
let isNavigating = false;

function calculateHeaderHeight() {
    if(!siteHeader) return 60;
    const initialStyles = {
        position: siteHeader.style.position,
        visibility: siteHeader.style.visibility,
        display: siteHeader.style.display
    };
    siteHeader.style.position = 'absolute';
    siteHeader.style.visibility = 'hidden';
    siteHeader.style.display = 'block';

    const height = siteHeader.offsetHeight;

    siteHeader.style.position = initialStyles.position;
    siteHeader.style.visibility = initialStyles.visibility;
    siteHeader.style.display = initialStyles.display;

    return height > 0 ? height : 60;
}

function updatePagePadding() {
    headerHeight = calculateHeaderHeight();
    if (pageContent) {
        // Increased padding between header and content from 20px to 40px
        pageContent.style.paddingTop = `${headerHeight + 40}px`;
    }
}


const updateActiveNav = (currentPath) => {
    const mainNav = document.querySelector('#site-header nav');
    if (!mainNav) return;

    const navLinks = mainNav.querySelectorAll('a.nav-link');
    let activeLinkElement = null;

    navLinks.forEach(link => link.classList.remove('active'));

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
            activeLinkElement = link;
        }
    });

    if (!activeLinkElement && (currentPath === '/' || currentPath === '')) {
         const homeLink = mainNav.querySelector('a.nav-link[href="/"]');
         if (homeLink) {
             homeLink.classList.add('active');
             activeLinkElement = homeLink;
         }
     }
};

const applyStaggerAnimation = (currentPath) => {
    let items;
    if (currentPath === '/') {
        items = mainContent.querySelectorAll('.page-title-container, #about-intro > *, .resume-button, .social-links-container > *, #featured-projects .flex.items-center.justify-between > *, #featured-projects-container > *, #recent-posts > *');
    } else {
        const mainPageElement = mainContent.firstElementChild;
        if (mainPageElement) {
            items = mainPageElement.children;
        } else {
            items = [];
        }
    }

    Array.from(items).forEach((item, index) => {
        if (item.classList && !item.classList.contains('stagger-load')) {
            item.classList.add('stagger-load');
            item.style.animationDelay = `${index * 50}ms`;
        }
    });
};

const routes = {
    '/': {
        title: "haku's desktop",
        template: () => {
            const template = document.getElementById('about-template').content.cloneNode(true);
            const recentPostsContainer = template.querySelector('#recent-posts-container');
            const recentPosts = allContent.filter(item => item.type === 'Blog').slice(0, 3);
            recentPosts.forEach(post => recentPostsContainer.appendChild(createListItem(post)));
            const featuredContainer = template.querySelector('#featured-projects-container');
            const featuredProjects = allContent.filter(item => item.type === 'Project').slice(0, 3);
            featuredProjects.forEach(project => featuredContainer.appendChild(createListItem(project, { cardType: 'featured' })));
            return template;
        }
    },
    '/projects': {
        title: "haku's Projects",
        template: () => renderPage('project')
    },
    '/blog': {
        title: "haku's Blog",
        template: () => renderPage('blog', 'blog-list-container', { showPreview: false })
    },
    '/about': {
        title: "About haku",
        template: () => renderPage('about')
    },
};

const getPageTitle = (path) => {
    if (routes[path]) {
        return routes[path].title;
    }
    const blogPostMatch = path.match(/^\/blog\/(.*)$/);
    if (blogPostMatch) {
        const postSlug = blogPostMatch[1];
        const post = allContent.find(p => p.url === `/blog/${postSlug}`);
        return post ? `${post.title} | haku's Blog` : "Blog Post | haku";
    }
    return "haku's desktop";
};


const loadContent = async () => {
    mainContent.innerHTML = '';
    mainContent.style.animation = '';
    document.body.classList.remove('reading-mode-active');

    let currentPath = window.location.pathname;
    if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;
    if (currentPath.endsWith('/index.html')) currentPath = currentPath.slice(0, -10) || '/';

    document.title = getPageTitle(currentPath);


    updateActiveNav(currentPath);
    const currentBlogPostMatch = currentPath.match(/^\/blog\/(.*)$/);

    try {
        let contentFragment;
        if (currentBlogPostMatch) {
            const postSlug = currentBlogPostMatch[1];
            const post = allContent.find(p => p.url === `/blog/${postSlug}`);
            if (post) {
                contentFragment = await renderBlogPost(post);
            } else {
                 console.warn("Blog post not found in allContent:", currentPath);
                 contentFragment = document.createTextNode('404 - Post not found.');
            }
        } else if (routes[currentPath]) {
            contentFragment = routes[currentPath].template();
        } else {
             console.warn("Route not found:", currentPath);
             contentFragment = document.createTextNode('404 - Page not found.');
        }

        mainContent.appendChild(contentFragment);
        mainContent.style.animation = 'fade-in 0.2s forwards';

        requestAnimationFrame(() => {
            if (currentPath === '/about') initDockEffect('.skills-grid');
            if (currentPath === '/') {
                initDockEffect('.social-links-container');
                initFeaturedScroll();
            }
            initDockEffect('#site-header a.nav-link');


            applyStaggerAnimation(currentPath);
        });

        window.scrollTo(0, 0);

    } catch (error) {
        console.error("Error loading content:", error);
        mainContent.textContent = 'Error loading page content.';
    } finally {
        requestAnimationFrame(() => {
            isNavigating = false;
        });
    }
};


const router = async (isInitialLoad = false) => {
    if (isNavigating && !isInitialLoad) return;
    isNavigating = true;

    if (!isInitialLoad && mainContent.innerHTML.trim() !== '') {
        mainContent.style.animation = 'fade-out 0.15s forwards';
        setTimeout(loadContent, 150);
    } else {
        loadContent();
    }
};

const initDockEffect = (selector) => {
    const containers = new Set(
        Array.from(document.querySelectorAll(selector))
            .map(item => item.closest('nav, .skills-grid, .social-links-container'))
            .filter(Boolean)
    );

    if (containers.size === 0) {
        return;
    }

    containers.forEach(eventTarget => {
        const items = eventTarget.querySelectorAll(selector);
        if (items.length === 0) return;

        let containerRect = eventTarget.getBoundingClientRect();
        const updateRect = () => {
            containerRect = eventTarget.getBoundingClientRect();
        };

        eventTarget.addEventListener('mouseenter', updateRect);
        window.addEventListener('resize', updateRect);

        eventTarget.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX - containerRect.left;

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = (itemRect.left - containerRect.left) + itemRect.width / 2;
                const distance = Math.abs(mouseX - itemCenter);

                const effectWidth = 80;
                let maxScale = 1.2;

                if (item.classList.contains('nav-link')) {
                    maxScale = 1.1;
                } else if (item.classList.contains('skill-item')) {
                    maxScale = 1.2;
                } else if (item.classList.contains('social-link')) {
                    maxScale = 1.15;
                }

                const minScale = 1;
                let scale = minScale;

                if (distance < effectWidth) {
                    scale = minScale + (maxScale - minScale) * (1 + Math.cos(Math.PI * distance / effectWidth)) / 2;
                }

                item.style.transformOrigin = 'center bottom';
                item.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 8}px)`;
                item.style.zIndex = distance < effectWidth / 2 ? '10' : '1';
            });
        });

        eventTarget.addEventListener('mouseleave', () => {
            items.forEach(el => {
                el.style.transform = 'scale(1) translateY(0)';
                el.style.zIndex = '1';
                el.style.transformOrigin = 'center center';
            });
        });
    });
};


const initFeaturedScroll = () => {
    const container = document.getElementById('featured-projects-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!container || !scrollLeftBtn || !scrollRightBtn) return;

    let cardWidth = 200 + 12;

    const updateCardWidth = () => {
        const card = container.querySelector('.featured-project-card');
        if (card) {
             const style = window.getComputedStyle(card);
             const gap = parseFloat(window.getComputedStyle(container).gap) || 12;
            cardWidth = card.offsetWidth + gap;
        }
    };

    const checkScrollButtons = () => {
        if (!container) return;
        updateCardWidth();
        const scrollTolerance = 5;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        scrollLeftBtn.disabled = container.scrollLeft <= scrollTolerance;
        scrollRightBtn.disabled = container.scrollLeft >= maxScrollLeft - scrollTolerance;
    };

    scrollLeftBtn.addEventListener('click', () => {
        updateCardWidth();
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
         updateCardWidth();
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    container.addEventListener('scroll', checkScrollButtons);

    const resizeObserver = new ResizeObserver(() => {
        checkScrollButtons();
    });
    resizeObserver.observe(container);
    resizeObserver.observe(document.body);


    setTimeout(checkScrollButtons, 100);
};


const initTheme = () => {
    const themeToggle = document.getElementById('theme-switch-v2-container');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('light-mode', !isDark);
        document.body.classList.toggle('light-mode', !isDark);
        if (themeToggle) {
            themeToggle.classList.toggle('light-mode', !isDark);
        }
        localStorage.setItem('theme', theme);
    };

    setTheme(currentTheme || (prefersDark.matches ? 'dark' : 'light'));


    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
};


window.addEventListener('popstate', () => router(false));
window.addEventListener('resize', updatePagePadding);

window.addEventListener('load', () => {
    initTheme();
    updatePagePadding();

    router(true);

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#resume-download-btn')) {
            e.preventDefault();
            alert('Resume link coming soon!');
        }

        const internalLink = e.target.closest('.internal-app-link');
        if (internalLink && !e.metaKey && !e.ctrlKey) {
             e.preventDefault();
            const href = internalLink.getAttribute('href');
            if (href && href !== window.location.pathname && !isNavigating) {
                 history.pushState({}, '', href);
                 router(false);
            } else if (href === window.location.pathname) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        const navLink = e.target.closest('.nav-link');
        const themeToggleClicked = e.target.closest('#theme-switch-v2-container');
        if (navLink && !themeToggleClicked) {
            const rect = navLink.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const pulseEl = document.createElement('div');
            pulseEl.className = 'gradient-pulse';

            const size = 800;
            pulseEl.style.width = `${size}px`;
            pulseEl.style.height = `${size}px`;
            pulseEl.style.left = `${x - size / 2}px`;
            pulseEl.style.top = `${y - size / 2}px`;

            document.body.appendChild(pulseEl);
            pulseEl.addEventListener('animationend', () => {
                pulseEl.remove();
            }, { once: true });
        }
    });

});
