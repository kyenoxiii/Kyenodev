<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#14281e">
    <title>Kyeno Dev</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<div class="layout">
    <aside class="sidebar" aria-label="Portfolio navigation">
        <div class="side-top">
            <a class="brand" href="#home" data-view="home"><span class="brand-first">KYLE</span><span class="brand-last">GUILLANO.</span></a>
            <button id="menu-trigger" class="menu-trigger" type="button" aria-label="Toggle navigation" aria-controls="main-navigation" aria-expanded="false"><span id="menu-icon" aria-hidden="true"><i data-lucide="house"></i></span></button>
        </div>
        <div class="sidebar-center">
            <p class="sidebar-kicker">BASED IN THE PHILIPPINES</p>
            <p class="sidebar-title">Design<br>with<br>purpose.</p>
            <p class="sidebar-copy">Thoughtful digital experiences, lasting craftsmanship, and a clear point of view—made with purpose.</p>
            <nav id="main-navigation" class="nav-list" aria-label="Main navigation">
                @foreach (['home' => ['Home', 'house'], 'about' => ['About', 'user-round'], 'services' => ['Services', 'sparkles'], 'projects' => ['Projects', 'layers-3'], 'certifications' => ['Certifications', 'badge-check'], 'insights' => ['Insights', 'lightbulb']] as $view => [$label, $icon])
                    <a class="nav-link" href="#{{ $view }}" data-view="{{ $view }}" data-icon="{{ $icon }}" @if ($view === 'home') aria-current="page" @endif><i data-lucide="{{ $icon }}"></i><span>{{ $label }}</span></a>
                @endforeach
            </nav>
        </div>
        <div class="side-footer">
            <a class="side-contact" href="mailto:kylejannsenn@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg><span>kylejannsenn@gmail.com</span></a>
            <a class="side-contact" href="https://www.linkedin.com/in/kyenoxiii" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg><span>linkedin.com/in/kyenoxiii</span></a>
        </div>
    </aside>

    <main id="top" class="content" tabindex="-1">
        <div id="home" class="view active" role="region" aria-labelledby="hero-heading">
            <section class="hero content-inner">
                <div class="hero-top"><span></span><span class="availability">Open to new projects</span></div>
                <div id="intro-panel" class="video-panel" hidden>
                    <div class="video-panel-head"><h2>Meet Kyle</h2><button id="intro-close" class="video-close" type="button" aria-label="Close introduction"><i data-lucide="x"></i></button></div>
                    <p class="video-note">Introduction video coming soon. Reach out to start a conversation.</p>
                </div>
                <div class="hero-main">
                    <span class="eyebrow">Hello, I'm Kyle Guillano</span>
                    <h1 id="hero-heading">Ideas made<br><span class="accent">to matter.</span></h1>
                    <div class="hero-bottom">
                        <p class="hero-description">I help ambitious people and brands turn good ideas into clear, memorable digital experiences—designed with intention from the first thought to the final detail.</p>
                        <a class="button" href="mailto:kylejannsenn@gmail.com?subject=Project%20quote%20request">Request a quote <i data-lucide="arrow-up-right"></i></a>
                    </div>
                </div>
                <span class="eyebrow"></span>
            </section>
        </div>

        <div id="about" class="view" role="region" aria-labelledby="about-heading" hidden>
            <section class="section content-inner about-section">
                <div class="about-grid">
                    <div class="about-media">
                        <div class="about-art"><img src="{{ asset('Images/me.png') }}" alt="Kyle Guillano at work" loading="lazy"><button class="about-play" type="button" aria-label="Play introduction video" aria-controls="about-video-panel"><i data-lucide="play" aria-hidden="true"></i></button></div>
                    </div>
                    <div class="about-copy"><span class="eyebrow"></span><h2 id="about-heading">The person<br>behind the work.</h2><p>I’m Kyle, a creative who believes the strongest work starts with listening. I bring curiosity, clarity, and attention to detail to every project—so the final result feels as good as it looks.</p><p>Whether you’re shaping a new idea or refining an existing one, I’d love to hear where you want to go.</p></div>
                </div>
                <div id="about-video-panel" class="about-video-panel" hidden>
                    <div class="about-video-toolbar" aria-label="Video controls">
                        <button class="about-video-minimize" type="button" aria-label="Minimize video"><i data-lucide="minus"></i></button>
                        <button class="about-video-close" type="button" aria-label="Close introduction video"><i data-lucide="x" aria-hidden="true"></i></button>
                    </div>
                    <video playsinline preload="metadata">
                        <source src="{{ asset('Images/1.mp4') }}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                    <div class="about-video-controls" aria-label="Video controls">
                        <input type="range" min="0" max="0" value="0" step="0.1" data-video-seek aria-label="Seek video">
                        <div class="about-video-control-row">
                            <button type="button" data-video-action="backward" aria-label="Rewind 10 seconds"><i data-lucide="rewind"></i><span>10</span></button>
                            <button type="button" data-video-action="play" aria-label="Play video"><i data-lucide="play"></i></button>
                            <button type="button" data-video-action="forward" aria-label="Forward 10 seconds"><i data-lucide="fast-forward"></i><span>10</span></button>
                            <span class="about-video-time" data-video-time>0:00 / 0:00</span>
                            <button type="button" data-video-action="mute" aria-label="Mute video"><i data-lucide="volume-2"></i></button>
                            <input class="about-video-volume" type="range" min="0" max="1" value="1" step="0.05" data-video-volume aria-label="Video volume">
                        </div>
                    </div>
                </div>
                <div class="about-actions">
                    <div class="about-socials" aria-label="Social links">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="https://cdn.simpleicons.org/facebook/14281e" alt=""></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="https://cdn.simpleicons.org/instagram/14281e" alt=""></a>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="https://cdn.simpleicons.org/github/14281e" alt=""></a>
                        <a class="about-olj" href="https://www.onlinejobs.ph/" target="_blank" rel="noopener noreferrer" aria-label="OnlineJobs.ph">OLJ</a>
                    </div>
                    <button class="cv-button" type="button">CV Preview</button>
                </div>
                <div class="detail-strip"><div class="detail"><strong>Listen</strong><span>Understand the people, purpose, and possibilities behind the brief.</span></div><div class="detail"><strong>Explore</strong><span>Find a direction that feels distinct, useful, and true to your goals.</span></div><div class="detail"><strong>Refine</strong><span>Give the small details the same care as the big idea.</span></div></div>
            </section>
            @include('partials.closing', ['eyebrow' => "Let's collaborate", 'title' => "Let's make", 'accent' => 'it meaningful.', 'copy' => "Have an idea in mind? Tell me what you're building and where you'd like to take it.", 'subject' => 'Project enquiry'])
        </div>

        <div id="services" class="view" role="region" aria-labelledby="services-heading" hidden>
            <section class="section content-inner"><div class="section-head"><div><span class="eyebrow">02 / What I can do</span><h2 id="services-heading">How I can help</h2></div><p class="section-note">From the first conversation to the finishing touches, every decision should serve a purpose.</p></div>
                <div class="service-grid">
                    @foreach ([['sparkles', 'Brand direction', 'Find the visual language that makes your idea feel unmistakably yours.'], ['layout-template', 'Digital experiences', 'Design clear, considered interfaces that people enjoy using.'], ['pen-tool', 'Creative craft', 'Shape the details, systems, and stories that bring good work to life.']] as $service)
                        <article class="service-card"><i data-lucide="{{ $service[0] }}"></i><h3>{{ $service[1] }}</h3><p>{{ $service[2] }}</p></article>
                    @endforeach
                </div>
            </section>
            @include('partials.closing', ['eyebrow' => 'A good place to start', 'title' => "Let's find", 'accent' => 'your direction.', 'copy' => 'Share what you are working on and we can make a thoughtful plan together.', 'subject' => 'Creative services enquiry'])
        </div>

        <div id="projects" class="view" role="region" aria-labelledby="projects-heading" hidden>
            <section class="section content-inner"><div class="section-head projects-head"><div><span class="eyebrow"></span><h2 id="projects-heading">Projects</h2><p class="section-note">A selection of ideas turned into useful, memorable experiences.</p></div>
                <nav class="project-island" aria-label="Project categories">
                    <button class="project-island-title" type="button" data-project-top aria-label="Return to Projects top">Projects</button>
                    @foreach (['web-development' => ['Web Development', 'code-2'], 'ai-automation' => ['AI & Automation', 'bot'], 'data-research' => ['Data & Research', 'database'], 'game-development' => ['Game Development', 'gamepad-2'], 'creative-multimedia' => ['Creative & Multimedia ', 'palette']] as $category => [$label, $icon])
                        <a href="#{{ $category }}" data-project-target="{{ $category }}"><i data-lucide="{{ $icon }}" aria-hidden="true"></i><span>{{ in_array($category, ['web-development', 'game-development']) ? str_replace('Development', 'Dev', $label) : $label }}</span></a>
                    @endforeach
                </nav>
            </div>
                <div class="project-categories">
                    @foreach ([
                        ['web-development', 'Web Development', 'Web experiences designed to be clear, useful, and memorable.', [['8534460', 'A softer way forward', 'Brand identity · Art direction'], ['3184423', 'Built for better days', 'Digital experience · Strategy']]],
                        ['ai-automation', 'AI & Automation', 'Thoughtful systems that reduce friction and give good ideas room to grow.', [['1647962', 'Digital, made human', 'Web experience · Digital design']]],
                        ['data-research', 'Data & Research', 'Research-led thinking that turns signals into practical direction.', [['7302118', 'Find the useful signal', 'Research · Insight mapping']]],
                        ['game-development', 'Game Development', 'Playful worlds and interactions built around curiosity and connection.', [['8534460', 'A world worth exploring', 'Game systems · Interaction design']]],
                        ['creative-multimedia', 'Creative & Multimedia Production', 'Visual stories, motion, and content with a clear point of view.', [['3184423', 'Made to be remembered', 'Creative direction · Multimedia']]]
                    ] as $category)
                        <section id="{{ $category[0] }}" class="project-category" aria-labelledby="{{ $category[0] }}-heading">
                            <div class="project-category-head"><div><span class="eyebrow">Project category</span><h3 id="{{ $category[0] }}-heading">{{ $category[1] }}</h3></div><p>{{ $category[2] }}</p></div>
                            <div class="project-grid">
                                @foreach ($category[3] as $project)
                                    <article class="project-card"><img class="project-image" src="https://images.pexels.com/photos/{{ $project[0] }}/pexels-photo-{{ $project[0] }}.jpeg" alt="{{ $project[1] }}" loading="lazy"><div class="project-info"><div><h3>{{ $project[1] }}</h3><p>{{ $project[2] }}</p></div><span class="project-number">{{ $loop->iteration < 10 ? '0' . $loop->iteration : $loop->iteration }}</span></div></article>
                                @endforeach
                            </div>
                        </section>
                    @endforeach
                </div>
            </section>
            @include('partials.closing', ['eyebrow' => 'Your idea could be next', 'title' => "Let's create", 'accent' => 'with intention.', 'copy' => "Looking for a creative partner? I’d love to hear about your project.", 'subject' => 'Project quote request'])
        </div>

        <div id="certifications" class="view" role="region" aria-labelledby="certifications-heading" hidden>
            <section class="section content-inner"><div class="section-head"><div><span class="eyebrow">04 / Credentials</span><h2 id="certifications-heading">Certifications</h2></div><p class="section-note">A transparent place for the qualifications and learning that support the work.</p></div><p class="lead">Good creative work is built on curiosity and continued learning. If a specific certification or technical qualification matters for your project, let’s talk through the requirements together.</p><article class="credential-card"><i data-lucide="badge-check"></i><h3>Credentials on request</h3><p>No specific certifications are listed here without verification. Reach out to discuss relevant experience, tools, and any credentials you need to review before starting a project.</p></article></section>
            @include('partials.closing', ['eyebrow' => 'Have a requirement?', 'title' => "Let's talk", 'accent' => 'specifics.', 'copy' => 'Tell me what your project calls for, and I’ll share the details that matter.', 'subject' => 'Qualifications enquiry'])
        </div>

        <div id="insights" class="view" role="region" aria-labelledby="insights-heading" hidden>
            <section class="section content-inner"><div class="section-head"><div><span class="eyebrow">05 / Notes on the process</span><h2 id="insights-heading">Insights</h2></div><p class="section-note">A few principles behind how I think about meaningful, memorable creative work.</p></div>
                <div class="insight-grid">@foreach ([['messages-square', 'Start by listening', 'The strongest direction comes from understanding the people on both sides of an experience: the client and the audience.'], ['focus', 'Clarity is a creative choice', 'A clear message gives good ideas room to breathe. What you leave out can be as important as what you put in.'], ['shapes', 'Details make it last', 'Thoughtful typography, rhythm, and interactions can turn a useful experience into one people remember.']] as $insight)<article class="insight-card"><i data-lucide="{{ $insight[0] }}"></i><span class="eyebrow">Perspective 0{{ $loop->iteration }}</span><h3>{{ $insight[1] }}</h3><p>{{ $insight[2] }}</p></article>@endforeach</div>
            </section>
            @include('partials.closing', ['eyebrow' => 'From thought to action', 'title' => "Let's make", 'accent' => 'it matter.', 'copy' => 'Have a question or a project idea? I’m always open to a good conversation.', 'subject' => 'Creative conversation'])
        </div>
    </main>
</div>
</body>
</html>
