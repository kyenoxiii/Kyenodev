import './bootstrap';

const views = [...document.querySelectorAll('.view')];
const links = [...document.querySelectorAll('[data-view]')];
const content = document.getElementById('top');
const menuTrigger = document.getElementById('menu-trigger');
const navigation = document.getElementById('main-navigation');
const projectsView = document.getElementById('projects');
const projectsHead = projectsView?.querySelector('.projects-head');
const projectIsland = projectsView?.querySelector('.project-island');
const projectCategories = projectsView ? [...projectsView.querySelectorAll('.project-category')] : [];
const projectTop = projectsView?.querySelector('[data-project-top]');
const aboutPlay = document.querySelector('.about-play');
const aboutVideoPanel = document.getElementById('about-video-panel');
const aboutVideo = aboutVideoPanel?.querySelector('video');
const aboutVideoClose = aboutVideoPanel?.querySelector('.about-video-close');
const aboutVideoMinimize = aboutVideoPanel?.querySelector('.about-video-minimize');
const aboutVideoSeek = aboutVideoPanel?.querySelector('[data-video-seek]');
const aboutVideoVolume = aboutVideoPanel?.querySelector('[data-video-volume]');
const aboutVideoTimes = aboutVideoPanel ? [...aboutVideoPanel.querySelectorAll('[data-video-time]')] : [];
let seekingVideo = false;
let pendingVideoSeek = null;
const aboutSection = aboutVideoPanel?.closest('.about-section');
const aboutVideoPlaceholder = aboutVideoPanel ? document.createComment('about-video-panel-placeholder') : null;
aboutVideoPanel?.parentNode?.insertBefore(aboutVideoPlaceholder, aboutVideoPanel);
const projectIslandPlaceholder = projectIsland ? document.createComment('project-island-placeholder') : null;
projectIsland?.parentNode?.insertBefore(projectIslandPlaceholder, projectIsland);
const viewStorageKey = 'kyenoport:last-view';
const scrollStorageKey = 'kyenoport:last-scroll';
let transitionTimer;

function syncNavigation(view) {
    links.forEach((link) => {
        const active = link.dataset.view === view.id;
        link.toggleAttribute('aria-current', active);
        link.classList.toggle('is-active', active);
    });
    updateMenuIcon(view);
}

function updateMenuIcon(view) {
    const currentMenuIcon = document.getElementById('menu-icon');
    const navigationLink = links.find((link) => link.dataset.view === view.id);
    if (currentMenuIcon) {
        currentMenuIcon.innerHTML = `<i data-lucide="${navigationLink?.dataset.icon || 'house'}"></i>`;
        window.lucide?.createIcons();
    }
}

function showView(name, focus = false, animate = false) {
    const selected = views.find((view) => view.id === name) || views[0];
    if (selected.classList.contains('active') && !animate) {
        syncNavigation(selected);
        return;
    }

    const swap = () => {
        views.forEach((view) => {
            const active = view === selected;
            view.hidden = !active;
            view.classList.toggle('active', active);
        });
        syncNavigation(selected);
        window.localStorage.setItem(viewStorageKey, selected.id);
        window.localStorage.setItem(scrollStorageKey, '0');
        content.scrollTop = 0;
        if (focus) content.focus({ preventScroll: true });
    };

    if (!animate) {
        swap();
        return;
    }

    clearTimeout(transitionTimer);
    content.classList.remove('content-switching');
    void content.offsetWidth;
    content.classList.add('content-switching');
    transitionTimer = window.setTimeout(() => {
        swap();
        window.setTimeout(() => content.classList.remove('content-switching'), 280);
    }, 235);
}

function closeAboutVideo() {
    if (aboutVideoPanel?.classList.contains('is-mini')) {
        return;
    }
    if (!aboutSection?.classList.contains('is-video-open')) {
        return;
    }
    aboutVideo?.pause();
    content?.classList.remove('is-video-playing');
    aboutVideoPanel.hidden = true;
    aboutSection.classList.remove('is-video-open');
}

links.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    if (link.dataset.view === 'about' || !aboutVideoPanel?.classList.contains('is-mini')) {
        closeAboutVideo();
    }
    showView(link.dataset.view, true, true);
    menuTrigger?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
}));

const projectLinks = [...document.querySelectorAll('[data-project-target]')];
projectTop?.addEventListener('click', () => {
    content.scrollTo({ top: 0, behavior: 'smooth' });
});
projectLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.getElementById(link.dataset.projectTarget);
    if (!target) {
        return;
    }
    projectLinks.forEach((item) => item.classList.toggle('is-active', item === link));
    updateProjectsMorph();
    const contentRect = content.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const islandHeight = projectIsland?.classList.contains('is-morphed')
        ? projectIsland.getBoundingClientRect().height
        : 0;
    const targetScrollTop = content.scrollTop + targetRect.top - contentRect.top - islandHeight - 28;
    content.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
    window.requestAnimationFrame(() => {
        updateProjectsMorph();
        updateProjectCategory();
    });
}));

aboutPlay?.addEventListener('click', () => {
    aboutSection?.classList.add('is-video-open');
    aboutVideoPanel.hidden = false;
    aboutVideoPanel.scrollIntoView({ behavior: 'auto', block: 'start' });
    content?.classList.add('is-video-playing');
    aboutVideo?.play();
});
function minimizeAboutVideo() {
    if (!aboutVideoPanel || !aboutVideoPlaceholder) {
        return;
    }
    aboutVideoPanel.classList.add('is-mini');
    aboutSection?.classList.remove('is-video-open');
    content?.classList.remove('is-video-playing');
    document.body.appendChild(aboutVideoPanel);
    aboutVideoPanel.hidden = false;
    aboutVideoMinimize?.setAttribute('aria-label', 'Restore video');
    if (aboutVideoMinimize) {
        aboutVideoMinimize.innerHTML = '<i data-lucide="maximize-2"></i>';
        window.lucide?.createIcons();
    }
}
function restoreAboutVideo() {
    if (!aboutVideoPanel || !aboutVideoPlaceholder) {
        return;
    }
    aboutVideoPanel.classList.remove('is-mini', 'is-dragging');
    aboutVideoPanel.removeAttribute('style');
    aboutVideoPlaceholder.parentNode?.insertBefore(aboutVideoPanel, aboutVideoPlaceholder.nextSibling);
    aboutVideoPanel.hidden = false;
    if (!aboutSection?.closest('.view')?.classList.contains('active')) {
        showView('about');
    }
    aboutSection?.classList.add('is-video-open');
    content?.classList.add('is-video-playing');
    content?.scrollTo({ top: 0, behavior: 'auto' });
    aboutVideoMinimize?.setAttribute('aria-label', 'Minimize video');
    if (aboutVideoMinimize) {
        aboutVideoMinimize.innerHTML = '<i data-lucide="minus"></i>';
        window.lucide?.createIcons();
    }
}
aboutVideoMinimize?.addEventListener('click', () => {
    if (aboutVideoPanel?.classList.contains('is-mini')) {
        restoreAboutVideo();
        return;
    }
    minimizeAboutVideo();
});
aboutVideoClose?.addEventListener('click', () => {
    if (aboutVideoPanel?.classList.contains('is-mini')) {
        aboutVideo?.pause();
        aboutVideoPanel.classList.remove('is-mini', 'is-dragging');
        aboutVideoPanel.removeAttribute('style');
        aboutVideoPlaceholder?.parentNode?.insertBefore(aboutVideoPanel, aboutVideoPlaceholder.nextSibling);
        aboutVideoPanel.hidden = true;
        aboutVideoMinimize?.setAttribute('aria-label', 'Minimize video');
        return;
    }
    closeAboutVideo();
    aboutPlay?.focus();
});

function updateMiniVideoControls() {
    if (!aboutVideo) {
        return;
    }
    if (aboutVideoSeek && !seekingVideo) {
        aboutVideoSeek.max = String(Number.isFinite(aboutVideo.duration) ? aboutVideo.duration : 0);
        aboutVideoSeek.value = String(aboutVideo.currentTime);
    }
    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds)) {
            return '0:00';
        }
        const minutes = Math.floor(seconds / 60);
        return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
    };
    aboutVideoTimes.forEach((time) => {
        time.textContent = `${formatTime(aboutVideo.currentTime)} / ${formatTime(aboutVideo.duration)}`;
    });
    aboutVideoPanel?.querySelectorAll('[data-video-action="play"]').forEach((button) => {
        button.innerHTML = `<i data-lucide="${aboutVideo.paused ? 'play' : 'pause'}"></i>`;
        button.setAttribute('aria-label', aboutVideo.paused ? 'Play video' : 'Pause video');
    });
    aboutVideoPanel?.querySelectorAll('[data-video-action="mute"]').forEach((button) => {
        button.innerHTML = `<i data-lucide="${aboutVideo.muted ? 'volume-x' : 'volume-2'}"></i>`;
        button.setAttribute('aria-label', aboutVideo.muted ? 'Unmute video' : 'Mute video');
    });
    if (aboutVideoVolume) {
        aboutVideoVolume.value = String(aboutVideo.muted ? 0 : aboutVideo.volume);
    }
    window.lucide?.createIcons();
}
function flushPendingVideoSeek() {
    if (!aboutVideo || !pendingVideoSeek || !Number.isFinite(aboutVideo.duration) || aboutVideo.duration <= 0) {
        return;
    }
    const pendingSeek = pendingVideoSeek;
    pendingVideoSeek = null;
    if (pendingSeek.type === 'offset') {
        seekVideoTo(aboutVideo.currentTime + pendingSeek.value);
    } else {
        seekVideoTo(pendingSeek.value);
    }
}

aboutVideo?.addEventListener('loadedmetadata', () => {
    updateMiniVideoControls();
    flushPendingVideoSeek();
});
aboutVideo?.addEventListener('durationchange', flushPendingVideoSeek);
aboutVideo?.addEventListener('timeupdate', updateMiniVideoControls);
aboutVideo?.addEventListener('play', updateMiniVideoControls);
aboutVideo?.addEventListener('pause', updateMiniVideoControls);
aboutVideoPanel?.querySelectorAll('[data-video-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!aboutVideo) {
            return;
        }
        const action = button.dataset.videoAction;
        if (action === 'play') {
            if (aboutVideo.paused) {
                aboutVideo.play();
            } else {
                aboutVideo.pause();
            }
        } else if (action === 'backward') {
            seekVideoBy(-10);
        } else if (action === 'forward') {
            seekVideoBy(10);
        } else if (action === 'mute') {
            aboutVideo.muted = !aboutVideo.muted;
        }
        updateMiniVideoControls();
    });
});

function seekVideoTo(time) {
    if (!aboutVideo) {
        return;
    }
    if (!Number.isFinite(aboutVideo.duration) || aboutVideo.duration <= 0) {
        pendingVideoSeek = { type: 'absolute', value: time };
        return;
    }
    pendingVideoSeek = null;
    aboutVideo.currentTime = Math.min(aboutVideo.duration, Math.max(0, time));
    if (aboutVideoSeek) {
        aboutVideoSeek.value = String(aboutVideo.currentTime);
    }
    updateMiniVideoControls();
}

function seekVideoBy(offset) {
    if (aboutVideo) {
        if (!Number.isFinite(aboutVideo.duration) || aboutVideo.duration <= 0) {
            pendingVideoSeek = { type: 'offset', value: offset };
            return;
        }
        const currentTime = Number.isFinite(aboutVideo.currentTime) ? aboutVideo.currentTime : 0;
        seekVideoTo(currentTime + offset);
    }
}

function seekVideoFromPointer(event) {
    if (!aboutVideoSeek || !aboutVideo || !Number.isFinite(aboutVideo.duration) || aboutVideo.duration <= 0) {
        return;
    }
    const rect = aboutVideoSeek.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    seekVideoTo(ratio * aboutVideo.duration);
}

aboutVideoSeek?.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    seekingVideo = true;
    aboutVideoSeek.setPointerCapture(event.pointerId);
    seekVideoFromPointer(event);
});
aboutVideoSeek?.addEventListener('pointermove', (event) => {
    if (!seekingVideo || !aboutVideo || !Number.isFinite(aboutVideo.duration)) {
        return;
    }
    event.stopPropagation();
    seekVideoFromPointer(event);
});
aboutVideoSeek?.addEventListener('pointerup', (event) => {
    event.stopPropagation();
    seekingVideo = false;
});
aboutVideoSeek?.addEventListener('pointercancel', () => {
    seekingVideo = false;
});
aboutVideoSeek?.addEventListener('input', (event) => {
    event.stopPropagation();
    if (aboutVideoSeek && aboutVideo && Number.isFinite(aboutVideo.duration) && aboutVideo.duration > 0 && Number.isFinite(Number(aboutVideoSeek.value))) {
        seekVideoTo(Number(aboutVideoSeek.value));
    }
});
aboutVideoSeek?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    seekVideoFromPointer(event);
});
aboutVideoVolume?.addEventListener('input', (event) => {
    event.stopPropagation();
    if (!aboutVideo) {
        return;
    }
    aboutVideo.volume = Number(aboutVideoVolume.value);
    aboutVideo.muted = aboutVideo.volume === 0;
    updateMiniVideoControls();
});
aboutVideoVolume?.addEventListener('pointerdown', (event) => event.stopPropagation());
aboutVideoPanel?.querySelectorAll('[data-video-action]').forEach((button) => {
    button.addEventListener('pointerdown', (event) => event.stopPropagation());
});

aboutVideo?.addEventListener('pointerdown', (event) => {
    if (!aboutVideoPanel?.classList.contains('is-mini')) {
        return;
    }
    const rect = aboutVideoPanel.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const startX = event.clientX;
    const startY = event.clientY;
    let dragging = false;
    const move = (moveEvent) => {
        if (!dragging) {
            const distance = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
            if (distance < 6) {
                return;
            }
            dragging = true;
            event.preventDefault();
            aboutVideoPanel.classList.add('is-dragging');
            aboutVideo.setPointerCapture(event.pointerId);
        }
        const maxLeft = Math.max(0, window.innerWidth - rect.width);
        const maxTop = Math.max(0, window.innerHeight - rect.height);
        const left = Math.min(maxLeft, Math.max(0, moveEvent.clientX - offsetX));
        const top = Math.min(maxTop, Math.max(0, moveEvent.clientY - offsetY));
        aboutVideoPanel.style.left = `${left}px`;
        aboutVideoPanel.style.top = `${top}px`;
        aboutVideoPanel.style.right = 'auto';
        aboutVideoPanel.style.bottom = 'auto';
    };
    const end = () => {
        if (dragging) {
            aboutVideoPanel.classList.remove('is-dragging');
        }
        aboutVideo.dataset.dragged = dragging ? 'true' : 'false';
        aboutVideo.removeEventListener('pointermove', move);
        aboutVideo.removeEventListener('pointerup', end);
        aboutVideo.removeEventListener('pointercancel', end);
    };
    aboutVideo.addEventListener('pointermove', move);
    aboutVideo.addEventListener('pointerup', end);
    aboutVideo.addEventListener('pointercancel', end);
});

aboutVideo?.addEventListener('click', (event) => {
    if (aboutVideoPanel?.classList.contains('is-mini') && aboutVideo.dataset.dragged === 'true') {
        aboutVideo.dataset.dragged = 'false';
        return;
    }
    if (event.target !== aboutVideo || !aboutVideo) {
        return;
    }
    if (aboutVideo.paused) {
        aboutVideo.play();
    } else {
        aboutVideo.pause();
    }
});

window.addEventListener('resize', () => {
    if (!aboutVideoPanel?.classList.contains('is-mini') || !aboutVideoPanel.style.left) {
        return;
    }
    const rect = aboutVideoPanel.getBoundingClientRect();
    const left = Math.min(Math.max(0, window.innerWidth - rect.width), rect.left);
    const top = Math.min(Math.max(0, window.innerHeight - rect.height), rect.top);
    aboutVideoPanel.style.left = `${left}px`;
    aboutVideoPanel.style.top = `${top}px`;
});

const introTrigger = document.getElementById('intro-trigger');
const introPanel = document.getElementById('intro-panel');
const introClose = document.getElementById('intro-close');

menuTrigger?.addEventListener('click', () => {
    const expanded = menuTrigger.getAttribute('aria-expanded') === 'true';
    menuTrigger.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
});

introTrigger?.addEventListener('click', () => {
    showView('home');
    introPanel.hidden = false;
    introTrigger.setAttribute('aria-expanded', 'true');
    introPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
introClose?.addEventListener('click', () => {
    introPanel.hidden = true;
    introTrigger.setAttribute('aria-expanded', 'false');
    introTrigger.focus();
});

window.lucide?.createIcons();
const storedView = window.localStorage.getItem(viewStorageKey);
const initialView = views.find((view) => view.id === storedView) || document.querySelector('.view.active') || views[0];
if (initialView) {
    showView(initialView.id);
    const storedScroll = Number.parseInt(window.localStorage.getItem(scrollStorageKey) || '0', 10);
    if (Number.isFinite(storedScroll) && storedScroll > 0) {
        content.scrollTop = storedScroll;
    }
}

function updateProjectsMorph() {
    if (projectsHead && projectIsland) {
        const projectsActive = projectsView?.classList.contains('active');
        const morphed = projectsActive && (
            content.scrollTop > 24 ||
            projectsHead.getBoundingClientRect().top <= 24
        );
        if (morphed && projectIsland.parentNode !== document.body) {
            document.body.appendChild(projectIsland);
        } else if (!morphed && projectIsland.parentNode === document.body && projectIslandPlaceholder) {
            projectIslandPlaceholder.parentNode?.insertBefore(projectIsland, projectIslandPlaceholder.nextSibling);
        }
        projectIsland.classList.toggle('is-morphed', morphed);
        if (morphed) {
            const width = Math.min(projectIsland.getBoundingClientRect().width, window.innerWidth - 24);
            projectIsland.style.width = `${width}px`;
            const contentRect = content.getBoundingClientRect();
            projectIsland.style.left = `${contentRect.left + contentRect.width / 2}px`;
        } else {
            projectIsland.style.width = '';
            projectIsland.style.left = '';
        }
    }
}

function updateProjectCategory() {
    if (!projectCategories.length) {
        return;
    }
    const marker = content.getBoundingClientRect().top + 140;
    let activeCategory = projectCategories[0];
    projectCategories.forEach((category) => {
        if (category.getBoundingClientRect().top <= marker) {
            activeCategory = category;
        }
    });
    projectLinks.forEach((link) => {
        const active = link.dataset.projectTarget === activeCategory.id;
        link.classList.toggle('is-active', active);
        link.setAttribute('aria-current', active ? 'true' : 'false');
    });
}

content.addEventListener('scroll', () => {
    window.localStorage.setItem(scrollStorageKey, String(content.scrollTop));
    updateProjectsMorph();
    updateProjectCategory();
}, { passive: true });
updateProjectsMorph();
updateProjectCategory();
window.addEventListener('resize', updateProjectsMorph);
