/**
 * Everything on the page that a person might want to change lives in this
 * one file. No database, no admin: edit, save, redeploy.
 *
 * ── The videos ─────────────────────────────────────────────────────
 *
 * Each entry's `src` can be ANY ONE of:
 *
 *   YouTube link      'https://www.youtube.com/watch?v=XXXXXXXXXXX'  or  'https://youtu.be/XXXXXXXXXXX'
 *   Vimeo link        'https://vimeo.com/123456789'
 *   A file you drop   'videos/compliance-walkthrough.mp4'   (put the file in site/public/videos/)
 *   Any direct link   'https://cdn.example.com/film.mp4'    (R2, S3, Bunny, Dropbox direct link...)
 *
 * Leave `src` as '' and the card says "Footage coming soon" instead of showing
 * a broken player.
 *
 * `poster` is optional — a still image shown before play. YouTube and Vimeo
 * thumbnails are fetched automatically, so it is mostly for .mp4 files:
 * drop a JPG in site/public/posters/ and reference it as 'posters/name.jpg'.
 *
 * `client` and `duration` are optional labels on the card.
 *
 * `service` must match one of the slugs in SERVICES below. `category` is an
 * optional sub-heading within a service (Animation splits into 2D and 3D).
 *
 * ── Link-only services ─────────────────────────────────────────────
 *
 * A service marked `kind: 'links'` in SERVICES (Articulate) shows courses,
 * not films. Its entries carry a `link` instead of a `src`:
 *
 *   { service: 'articulate', title: 'Sales and Operations Planning', link: 'https://rise.articulate.com/share/...' }
 *
 * The card opens the link in a new tab. Leave `link` as '' and the card says
 * "Link coming soon". `poster` works the same as it does for a film - drop a
 * JPG in site/public/posters/ and reference it as 'posters/name.jpg' - and is
 * shown in place of the generic course-slide frame when set.
 */
// NOTE: the 23 newest films carry a local poster and an empty `src`, so they
// read as "Footage coming soon" rather than as a broken player. The files are
// staged but not yet in R2. Once each one is uploaded to films/, set its `src`
// to https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/<name>.mp4 —
// the poster filename already matches the film's name.
export const videos = [
    // Articulate — courses, opened by link. Paste each course's share URL into `link`.
    { service: 'articulate', title: 'Data Cleaning Tasks', link: 'https://360.articulate.com/review/content/5b643c1a-df38-45fa-a90c-b0be85857cea/review', poster: 'posters/articulate-data-cleaning-tasks.jpg' },
    { service: 'articulate', title: 'Creating Dynamic Dashboards', link: 'https://360.articulate.com/review/content/ed567850-c2af-4137-a8ad-24ebbc1a9edf/review', poster: 'posters/articulate-creating-dynamic-dashboards.jpg' },
    { service: 'articulate', title: 'Rise Mahindra', link: 'https://360.articulate.com/review/content/0fbcd3f0-266b-4630-a3fc-4d736fa1d09d/review', poster: 'posters/articulate-rise-mahindra.jpg' },

    // Infographics
    { service: 'infographics', title: 'Advance Settings', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/infographics-advance-settings.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/infographics-advance-settings.jpg' },
    { service: 'infographics', title: 'Vision: The Golden Circle', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/infographics-vision-the-golden-circle.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/infographics-vision-the-golden-circle.jpg' },
    { service: 'infographics', title: 'BIT WR 1.1.1.1', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/infographics-bit-wr-1111.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/infographics-bit-wr-1111.jpg' },
    { service: 'infographics', title: 'Creating an Effective IMC Plan', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/infographics-creating-an-effective-imc-plan.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/infographics-creating-an-effective-imc-plan.jpg' },
    { service: 'infographics', title: 'Alliance University', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/articulate-introduction-to-semiotic-analysis.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/articulate-introduction-to-semiotic-analysis.jpg' },
    { service: 'infographics', title: 'Dayananda Sagar University', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/articulate-dsu-unit-81.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/articulate-dsu-unit-81.jpg' },
    { service: 'infographics', title: 'REVA University', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/articulate-problem-solving-using-c-unit-121.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/articulate-problem-solving-using-c-unit-121.jpg' },
    { service: 'infographics', title: 'Home and Enterprise E2E Diagram', client: '', duration: '2:00', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/infographics-home-and-enterprise-e2e-diagram.mp4', poster: 'posters/infographics-home-and-enterprise-e2e-diagram.jpg' },
    { service: 'infographics', title: 'OT Security', client: '', duration: '6:26', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/infographics-ot-security.mp4', poster: 'posters/infographics-ot-security.jpg' },
    { service: 'infographics', title: 'Introducing New Powerful Launches', client: '', duration: '2:03', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/infographics-introducing-new-powerful-launches.mp4', poster: 'posters/infographics-introducing-new-powerful-launches.jpg' },
    { service: 'infographics', title: 'All in One PoS Service', client: '', duration: '1:26', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/infographics-all-in-one-pos-service.mp4', poster: 'posters/infographics-all-in-one-pos-service.jpg' },
    { service: 'infographics', title: 'Reconciliation as a Service', client: '', duration: '13:59', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/infographics-reconciliation-as-a-service.mp4', poster: 'posters/infographics-reconciliation-as-a-service.jpg' },

    // 2D Animation
    { service: '2d-animation', title: 'Code of Conduct', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-code-of-conduct.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-code-of-conduct.jpg' },
    { service: '2d-animation', title: 'IEEE', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-ieee.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-ieee.jpg' },
    { service: '2d-animation', title: 'NBM 2024 Presentation Deck', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-nbm-2024-presentation-deck.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-nbm-2024-presentation-deck.jpg' },
    { service: '2d-animation', title: 'QR Charging', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-qr-charging.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-qr-charging.jpg' },
    { service: '2d-animation', title: 'Collection with a Smile', client: '', duration: '2:20', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/2d-animation-collection-with-a-smile.mp4', poster: 'posters/2d-animation-collection-with-a-smile.jpg' },
    { service: '2d-animation', title: 'The Cost of Confusion', client: '', duration: '2:54', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/2d-animation-the-cost-of-confusion.mp4', poster: 'posters/2d-animation-the-cost-of-confusion.jpg' },
    { service: '2d-animation', title: 'Back-to-Back Calls', client: '', duration: '4:24', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/2d-animation-back-to-back-calls.mp4', poster: 'posters/2d-animation-back-to-back-calls.jpg' },
    { service: '2d-animation', title: 'Jade Global — Slides 68 to 70', client: '', duration: '1:05', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/2d-animation-jade-slides-68-70.mp4', poster: 'posters/2d-animation-jade-slides-68-70.jpg' },
    { service: '2d-animation', title: 'Jade Global — Part 4, Scenes 16 to 19', client: '', duration: '1:20', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/2d-animation-jade-p4-s16-19.mp4', poster: 'posters/2d-animation-jade-p4-s16-19.jpg' },

    // 3D Animation
    { service: '3d-animation', title: 'Blood Vessel', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-blood-vessel.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-blood-vessel.jpg' },
    { service: '3d-animation', title: 'RedFx', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/animation-redfx.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-redfx.jpg' },
    { service: '3d-animation', title: 'Vehicle Safety', client: '', duration: '1:43', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/3d-animation-vehicle-safety.mp4', poster: 'posters/3d-animation-vehicle-safety.jpg' },

    // Ai Generated Videos
    { service: 'ai-generated-videos', title: 'AI Based Learning Sample', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/ai-videos-ai-based-learning-sample.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/ai-videos-ai-based-learning-sample.jpg' },
    { service: 'ai-generated-videos', title: 'Emversity EWS', client: '', duration: '', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/ai-videos-emversity-ews.mp4', poster: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/ai-videos-emversity-ews.jpg' },
    { service: 'ai-generated-videos', title: 'Scene 4', client: '', duration: '0:20', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/ai-generated-videos-scene-4.mp4', poster: 'posters/ai-generated-videos-scene-4.jpg' },
    { service: 'ai-generated-videos', title: 'Scene 22', client: '', duration: '0:17', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/ai-generated-videos-scene-22.mp4', poster: 'posters/ai-generated-videos-scene-22.jpg' },
    { service: 'ai-generated-videos', title: 'Scene 37', client: '', duration: '0:09', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/ai-generated-videos-scene-37.mp4', poster: 'posters/ai-generated-videos-scene-37.jpg' },

    // Marketing Videos — shot vertical (1080x1920), unlike everything else here.
    { service: 'marketing-videos', title: 'AI', client: '', duration: '0:34', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/marketing-videos-ai.mp4', poster: 'posters/marketing-videos-ai.jpg' },
    { service: 'marketing-videos', title: 'AIoT for Climate Change', client: '', duration: '0:49', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/marketing-videos-aiot-for-climate-change.mp4', poster: 'posters/marketing-videos-aiot-for-climate-change.jpg' },
    { service: 'marketing-videos', title: 'Digital Forensics I', client: '', duration: '0:29', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/marketing-videos-digital-forensics-i.mp4', poster: 'posters/marketing-videos-digital-forensics-i.jpg' },
    { service: 'marketing-videos', title: 'Digital Forensics II', client: '', duration: '0:46', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/marketing-videos-digital-forensics-ii.mp4', poster: 'posters/marketing-videos-digital-forensics-ii.jpg' },

    // Motion Graphics
    { service: 'motion-graphics', title: 'Azim Premji Scholarship', client: '', duration: '3:06', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/motion-graphics-azim-premji-scholarship.mp4', poster: 'posters/motion-graphics-azim-premji-scholarship.jpg' },
    { service: 'motion-graphics', title: 'Introduction to ASIC Design Flow', client: '', duration: '1:38', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/motion-graphics-introduction-to-asic-design-flow.mp4', poster: 'posters/motion-graphics-introduction-to-asic-design-flow.jpg' },
    { service: 'motion-graphics', title: 'Novo Nordisk', client: '', duration: '4:33', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/motion-graphics-novo-nordisk.mp4', poster: 'posters/motion-graphics-novo-nordisk.jpg' },
    { service: 'motion-graphics', title: 'Tech Academy', client: '', duration: '10:45', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/motion-graphics-tech-academy.mp4', poster: 'posters/motion-graphics-tech-academy.jpg' },
    { service: 'motion-graphics', title: 'Zydus', client: '', duration: '2:00', src: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/enterprise/films/motion-graphics-zydus.mp4', poster: 'posters/motion-graphics-zydus.jpg' },
]

/**
 * The four numbers in the "Who we are" panel beside the hero. Each is built
 * like a sample card, so it carries its own two colour stops too.
 * `value` is what counts up; `suffix` is printed after it (e.g. '+', '%').
 */
export const stats = [
    { value: '2018', suffix: '', label: 'Founded in Bengaluru', accent: ['#242424', '#050505'] },
    { value: '50', suffix: '+', label: 'Clients', accent: ['#1C1C1C', '#050505'] },
    { value: '100', suffix: '%', label: 'In-House Multidisciplinary Team', accent: ['#242424', '#050505'] },
]

/**
 * The exhibition wall beside the hero: five vertical panels, one per area of
 * the work. Edit freely - the interaction reads whatever is in this array, so
 * labels, copy and imagery can all change without touching the component.
 *
 * `image` takes the same values as a sample's `poster`: a file under
 * site/public/, or any direct URL. Leave it '' and the panel falls back to its
 * own colour treatment rather than a broken image.
 */
export const panels = [
    {
        id: 'content',
        // Exposure for the red duotone, measured from this image.
        exposure: 2.18,
        number: '01',
        title: 'Content',
        description: 'Complex source material read, structured and rewritten into something a learner can actually follow.',
        image: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/infographics-creating-an-effective-imc-plan.jpg',
        href: '#infographics',
    },
    {
        id: 'learning-design',
        // Exposure for the red duotone, measured from this image.
        exposure: 3.27,
        number: '02',
        title: 'Learning Design',
        description: 'Interactions, assessment and pacing designed so the course holds attention to the end.',
        image: 'posters/articulate-creating-dynamic-dashboards.jpg',
        href: '#articulate',
    },
    {
        id: 'production',
        // Exposure for the red duotone, measured from this image.
        exposure: 1.51,
        number: '03',
        title: 'Production',
        description: 'Studio and screen capture, edited, graded and captioned to platform specification.',
        image: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/smart-board-pricing-fundamentals-methods-strategies.jpg',
        href: '#marketing-videos',
    },
    {
        id: 'animation',
        // Exposure for the red duotone, measured from this image.
        exposure: 2.3,
        number: '04',
        title: 'Animation',
        description: 'Drawn by hand and modelled in depth, for the ideas that only land once you can see them move.',
        image: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/animation-blood-vessel.jpg',
        href: '#3d-animation',
    },
    {
        id: 'technology',
        // Exposure for the red duotone, measured from this image.
        exposure: 2.0,
        number: '05',
        title: 'Technology',
        description: 'SCORM packaging, LMS deployment and the plumbing that gets the work in front of learners.',
        image: 'https://pub-fbba415a5af44e0dbcd4c54f49b8d921.r2.dev/films/posters/ai-videos-emversity-ews.jpg',
        href: '#ai-generated-videos',
    },
]

/**
 * The seven lines of work. Order here is the order on the page. A service with
 * `kind: 'links'` shows courses opened by link rather than films. Each carries
 * its own two colour stops, used for the section accent and the card washes.
 */
export const services = [
    {
        slug: 'articulate',
        kind: 'links',
        name: 'Articulate',
        tagline: 'Storyline and Rise builds that people finish',
        description: 'Interactive courses authored in Articulate Storyline and Rise, from scripting and screen design through to SCORM packaging and LMS handover.',
        accent: ['#1C1C1C', '#050505'],
    },
    {
        slug: '2d-animation',
        name: '2D Animation',
        tagline: 'Drawn by hand, frame by frame',
        description: 'Character and vector animation for explainers, campaign films and course openers, drawn and rigged in two dimensions.',
        accent: ['#C70102', '#050505'],
    },
    {
        slug: '3d-animation',
        name: '3D Animation',
        tagline: 'Modelled in depth, lit with intent',
        description: 'Product and process animation in three dimensions, for the ideas that only make sense when you can turn them around and look inside.',
        accent: ['#242424', '#050505'],
    },
    {
        slug: 'ai-generated-videos',
        name: 'AI Generated Videos',
        tagline: 'Synthetic presenters, produced properly',
        description: 'AI-assisted presenters and voice for content that needs to ship at volume, scripted and directed with the same care as a live shoot.',
        accent: ['#1C1C1C', '#050505'],
    },
    {
        slug: 'infographics',
        name: 'Infographics',
        tagline: 'Complex ideas, made legible at a glance',
        description: 'Static and animated infographics that turn data, processes and policy into visuals people actually read, designed for slides, print, social and course pages alike.',
        accent: ['#242424', '#050505'],
    },
    {
        slug: 'marketing-videos',
        name: 'Marketing Videos',
        tagline: 'Films that carry the pitch',
        description: 'Brand films, product launches and campaign cuts, scripted and edited to hold attention in the feed, in the room and on the stage.',
        accent: ['#C70102', '#050505'],
    },
    {
        slug: 'motion-graphics',
        name: 'Motion Graphics',
        tagline: 'Type and shape, set in motion',
        description: 'Kinetic typography, animated identities and graphic systems that move, built for titles, transitions and social cutdowns.',
        accent: ['#1C1C1C', '#050505'],
    },
]

/**
 * Company details for the footer.
 */
export const company = {
    name: 'Maieutic Edutech Pvt Ltd',
    site: 'https://maieuticedutech.com',
    blurb: 'Empowering education through innovation and technology — from content to campus, online.',
    email: 'careers@maieuticedutech.com',
    phone: '+91 96637 27955',
    phoneHref: 'tel:+919663727955',
    address: ['248/1, 3rd floor, Above 154 Breakfast Restaurant', 'Kenchena Halli Road, 2nd Main Rd,', 'Halagevadera Halli, Rajarajeshwari Nagar,', 'Bengaluru, Karnataka 560098'],
    socials: [
        ['LinkedIn', 'https://www.linkedin.com/company/maieuticedutech', 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.22h4.56V23H.22V8.22Zm7.34 0h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.55v-7.2c0-1.72-.03-3.93-2.39-3.93-2.4 0-2.76 1.87-2.76 3.8V23H7.56V8.22Z'],
        ['YouTube', 'https://www.youtube.com/@maieuticedutech', 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z'],
        ['Instagram', 'https://www.instagram.com/maieutic2018', 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1ZM12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 .1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.1.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.6.5 2.9.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.8.6 19 .3 18.2.1 16.9.1 15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z'],
        ['Facebook', 'https://www.facebook.com/maieuticedutech', 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z'],
    ],
    columns: {
        'Solutions': [
            ['All Solutions', '/solutions'],
            ['Content Design & Development', '/solutions/content-design-development'],
            ['Marketing, Digital Products & Network', '/solutions/marketing-digital-products'],
            ['Academic Delivery', '/solutions/academic-delivery-student-success'],
            ['LMS Deployment & Management', '/solutions/lms-deployment-management'],
            ['Interactive Models & Articulate', '/solutions/interactive-models-articulate'],
            ['Video Based Learning', '/solutions/video-based-learning'],
            ['2D / 3D / Motion Graphics', '/solutions/2d-3d-motion-graphics'],
        ],
        'Company': [
            ['Who We Are', '/about-us'],
            ['Our Vision', '/about-us'],
            ['Our Mission', '/about-us'],
            ['Our Impact', '/about-us'],
            ['Our Clients', '/clients'],
            ['Careers', '/careers'],
            ['Gallery', '/gallery'],
        ],
        'Resources': [
            ['Blogs & Insights', '/resources/blogs-insights'],
            ['Case Studies', '/resources/case-studies'],
            ['FAQs', '/faqs'],
        ],
        'Contact Us': [
            ['Send Us a Message', '/contact'],
            ['Email Us', 'mailto:careers@maieuticedutech.com'],
            ['Call Us', 'tel:+919663727955'],
            ['Our Location', '/contact'],
        ],
    },
}
