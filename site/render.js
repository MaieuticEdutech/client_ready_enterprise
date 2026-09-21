/**
 * Everything that turns content into markup, and nothing that touches the
 * page. Pure string builders, so they can be exercised in Node without a
 * browser — which is how the cards are tested.
 */

export const escapeHtml = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export const gradient = (service) => `linear-gradient(135deg, ${service.accent[0]}, ${service.accent[1]})`

export const pad = (n) => String(n).padStart(2, '0')

/**
 * Work out what a `src` string points at. A YouTube or Vimeo link needs an
 * iframe; anything else is treated as a file the <video> tag can play.
 */
export function parseSource(src) {
    const value = (src ?? '').trim()
    if (!value) return { kind: 'pending' }

    const youtube = value.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i)
    if (youtube) {
        return {
            kind: 'youtube',
            embed: `https://www.youtube.com/embed/${youtube[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
            poster: `https://i.ytimg.com/vi/${youtube[1]}/maxresdefault.jpg`,
            posterFallback: `https://i.ytimg.com/vi/${youtube[1]}/hqdefault.jpg`,
        }
    }

    const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i)
    if (vimeo) {
        const hash = vimeo[2] ? `&h=${vimeo[2]}` : ''
        return {
            kind: 'vimeo',
            embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1${hash}`,
            oembed: `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(value)}&width=960`,
        }
    }

    const url = /^(https?:)?\/\//i.test(value) || value.startsWith('/') ? value : `/${value}`
    return { kind: 'file', url }
}

export const resolveAsset = (path) => (!path ? '' : /^(https?:)?\/\//i.test(path) || path.startsWith('/') ? path : `/${path}`)

/** Whether an entry is a course opened by link rather than a film. */
export const isLinkEntry = (video, service) => service?.kind === 'links' || Object.hasOwn(video, 'link')

/** The bare host of a link, for the caption: rise.articulate.com, not the whole URL. */
export function linkHost(href) {
    try {
        return new URL(href).hostname.replace(/^www\./, '')
    } catch {
        return ''
    }
}

/* ------------------------------------------------------------------
   Motifs: one figure per discipline, drawn from the discipline itself.
   ------------------------------------------------------------------ */

const motifs = {
    'articulate': () => `
        <circle cx="100" cy="100" r="74" class="motif-ring" stroke-dasharray="6 10" />
        <path class="motif-branch" d="M40 100h34m0 0 26-30h60m-86 30 26 30h60" />
        <circle class="motif-node motif-node-1" cx="40" cy="100" r="7" fill="currentColor" stroke="none" />
        <circle class="motif-node motif-node-2" cx="160" cy="70" r="7" fill="currentColor" stroke="none" />
        <circle class="motif-node motif-node-3" cx="160" cy="130" r="7" fill="currentColor" stroke="none" />`,

    'infographics': () => `
        <g class="motif-arcs" style="transform-origin: 100px 100px">
            <circle class="motif-arc motif-arc-1" cx="100" cy="100" r="62" stroke-width="9" stroke-dasharray="140 390" transform="rotate(-90 100 100)" />
            <circle class="motif-arc motif-arc-2" cx="100" cy="100" r="62" stroke-width="9" stroke-dasharray="100 390" transform="rotate(50 100 100)" opacity="0.7" />
            <circle class="motif-arc motif-arc-3" cx="100" cy="100" r="62" stroke-width="9" stroke-dasharray="70 390" transform="rotate(150 100 100)" opacity="0.45" />
        </g>
        <path class="motif-plot" d="M70 118l16-16 14 9 18-24 12 7" stroke-width="2.5" />
        <circle class="motif-dot motif-dot-1" cx="86" cy="102" r="4.5" fill="currentColor" stroke="none" />
        <circle class="motif-dot motif-dot-2" cx="118" cy="87" r="4.5" fill="currentColor" stroke="none" />
        <circle class="motif-dot motif-dot-3" cx="130" cy="94" r="4.5" fill="currentColor" stroke="none" />`,

    // Stacked cels, the way a 2D scene is built up frame over frame.
    '2d-animation': () => `
        <rect class="motif-frame motif-frame-3" x="34" y="46" width="108" height="108" rx="8" />
        <rect class="motif-frame motif-frame-2" x="48" y="46" width="108" height="108" rx="8" />
        <rect class="motif-frame motif-frame-1" x="62" y="46" width="108" height="108" rx="8" />
        <path class="motif-stroke" d="M74 128c14-46 42-58 70-24" stroke-width="2.5" />`,

    // An isometric cube: the same object, turned so you can see its depth.
    '3d-animation': () => `
        <path class="motif-solid" d="M100 38 172 79v82l-72 41-72-41V79z" />
        <path class="motif-edge" d="M100 38v41m0 0 72-41m-72 41-72-41m72 41v123" stroke-width="2" opacity="0.75" />
        <circle class="motif-vertex motif-vertex-1" cx="100" cy="79" r="5.5" fill="currentColor" stroke="none" />
        <circle class="motif-vertex motif-vertex-2" cx="172" cy="79" r="5.5" fill="currentColor" stroke="none" />
        <circle class="motif-vertex motif-vertex-3" cx="28" cy="79" r="5.5" fill="currentColor" stroke="none" />`,

    'ai-generated-videos': () => {
        let cells = ''
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 6; c++) {
                cells += `<rect x="${40 + c * 21}" y="${40 + r * 21}" width="13" height="13" rx="3" fill="currentColor" stroke="none" style="--i: ${r * 6 + c}" class="motif-cell" />`
            }
        }
        return `<g class="motif-grid">${cells}</g><path class="motif-scan" d="M32 40h136" stroke-width="2.5" />`
    },

    // Broadcast arcs over a rising line: the pitch, carried outward.
    'marketing-videos': () => `
        <g class="motif-waves" style="transform-origin: 62px 138px">
            <path class="motif-wave motif-wave-1" d="M86 114a34 34 0 0 1 0 48" stroke-width="3" />
            <path class="motif-wave motif-wave-2" d="M104 98a58 58 0 0 1 0 80" stroke-width="3" opacity="0.66" />
            <path class="motif-wave motif-wave-3" d="M122 82a82 82 0 0 1 0 112" stroke-width="3" opacity="0.4" />
        </g>
        <path class="motif-climb" d="M34 150l30-26 26 16 38-42" stroke-width="2.5" />
        <path class="motif-climb-head" d="M116 98h22v22" stroke-width="2.5" />
        <circle class="motif-vertex" cx="62" cy="138" r="6" fill="currentColor" stroke="none" />`,

    'motion-graphics': () => {
        const bars = [46, 72, 98, 124, 150]
            .map((x, i) => `<rect class="motif-bar" x="${x}" y="70" width="14" height="60" rx="7" fill="currentColor" stroke="none" style="--i: ${i}" />`)
            .join('')
        return `<g class="motif-bars">${bars}</g><circle class="motif-orbit" cx="100" cy="100" r="82" stroke-dasharray="3 12" />`
    },
}

export const motif = (service) => `
    <div class="motif pointer-events-none absolute inset-0 -z-10 overflow-hidden" style="--from: ${service.accent[0]}; --to: ${service.accent[1]}" aria-hidden="true">
        <span class="motif-splash absolute -right-24 -top-24 size-[34rem] rounded-full blur-3xl"></span>
        <svg class="motif-art absolute right-4 top-1/2 h-56 w-56 -translate-y-1/2 opacity-[0.22] sm:right-10 sm:h-72 sm:w-72"
             viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
            ${(motifs[service.slug] ?? motifs['motion-graphics'])()}
        </svg>
    </div>`

/* ------------------------------------------------------------------
   Cards
   ------------------------------------------------------------------ */

const playIcon = `<svg viewBox="0 0 24 24" class="size-6 translate-x-0.5" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>`

const openIcon = `<svg viewBox="0 0 24 24" class="size-6 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`

const cardShell = (service, index, interactive) => `
    class="sample-card card-glass reveal group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 transition duration-500 ease-out hover:-translate-y-1.5 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-peach sm:w-[20rem] lg:w-[23rem] ${interactive ? 'cursor-pointer' : ''}"
    style="--from: ${service.accent[0]}; --to: ${service.accent[1]}; --reveal-delay: ${(index % 3) * 90}ms"`

const cardWash = (service) => `
    <span aria-hidden="true" class="absolute inset-0 opacity-90" style="background: ${gradient(service)}"></span>
    <span aria-hidden="true" class="sample-splash absolute inset-0 mix-blend-screen"></span>`

const cardFinish = `
    <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></span>
    <span aria-hidden="true" class="sample-gloss pointer-events-none absolute inset-0"></span>
    <span aria-hidden="true" class="sample-shine pointer-events-none absolute inset-0"></span>`

const pendingLabel = (text) => `
    <span class="absolute inset-x-0 bottom-0 p-5">
        <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            <svg class="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="6" cy="6" r="5"/></svg>
            ${text}
        </span>
    </span>`

/**
 * A course opened by link. There is no film to preview, so the panel carries
 * a faint course frame and an open-in-new-tab mark where the play button
 * would sit; the caption names the host so a visitor knows where they are
 * going before they click.
 */
export function linkCard(video, service, index) {
    // Only a web URL is ever placed in an href; anything else stays pending.
    const raw = (video.link ?? '').trim()
    const href = /^https?:\/\//i.test(raw) ? raw : ''
    const pending = !href
    const host = pending ? '' : linkHost(href)
    const title = escapeHtml(video.title)
    const client = escapeHtml(video.client)
    const poster = resolveAsset(video.poster)

    // A real screenshot of the course when one is supplied; otherwise a faint
    // Storyline-style slide stands in, so the card is never a flat blank.
    const frame = poster
        ? `<img src="${escapeHtml(poster)}" alt="" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]">`
        : `
        <svg aria-hidden="true" viewBox="0 0 320 180" class="absolute inset-0 size-full text-white/20 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:text-white/30" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="56" y="30" width="208" height="120" rx="8" />
            <path d="M56 50h208" />
            <rect x="72" y="64" width="84" height="56" rx="4" opacity="0.7" />
            <path d="M172 72h76M172 88h60M172 104h70" opacity="0.7" />
            <path d="M72 134h176" stroke-width="3" opacity="0.35" />
            <path d="M72 134h64" stroke-width="3" class="link-progress" />
        </svg>`

    const overlay = pending
        ? pendingLabel('Link coming soon')
        : `<span class="absolute inset-0 grid place-items-center">
               <span class="link-button flex size-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition duration-500 ease-out group-hover:scale-110 group-hover:bg-white/25">
                   ${openIcon}
               </span>
           </span>
           <span class="absolute inset-x-0 bottom-0 p-5">
               <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                   <svg class="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5 8.5 3.5M5 3.5h3.5V7"/></svg>
                   Open course
               </span>
           </span>`

    const tag = pending ? 'figure' : 'a'
    const attrs = pending
        ? ''
        : `href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title} in a new tab"`

    return `
        <${tag} data-card data-link-card ${attrs} ${cardShell(service, index, !pending)}>
            <div class="relative aspect-[3/4] w-full overflow-hidden bg-ink-900">
                ${cardWash(service)}
                ${frame}
                ${cardFinish}
                ${overlay}
            </div>

            <div class="card-glass flex flex-1 items-start justify-between gap-4 p-5">
                <div class="min-w-0">
                    <p class="truncate font-semibold text-white transition-colors duration-300 group-hover:text-brand-peach">${title}</p>
                    ${host ? `<p class="mt-0.5 truncate text-sm text-white/55">${escapeHtml(host)}</p>` : client ? `<p class="mt-0.5 truncate text-sm text-white/55">${client}</p>` : ''}
                </div>
                ${pending ? '' : `<span aria-hidden="true" class="shrink-0 text-white/40 transition duration-300 group-hover:text-brand-peach">${openIcon.replace('size-6', 'size-4')}</span>`}
            </div>
        </${tag}>`
}

export function card(video, service, index) {
    if (isLinkEntry(video, service)) return linkCard(video, service, index)

    const source = parseSource(video.src)
    const pending = source.kind === 'pending'
    const poster = resolveAsset(video.poster) || source.poster || ''
    const title = escapeHtml(video.title)
    const client = escapeHtml(video.client)
    const duration = escapeHtml(video.duration)

    const posterImage = poster
        ? `<img src="${escapeHtml(poster)}" ${source.posterFallback ? `data-fallback="${escapeHtml(source.posterFallback)}"` : ''} alt="" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]">`
        : source.kind === 'vimeo'
            ? `<img data-vimeo-poster="${escapeHtml(source.oembed)}" alt="" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.04]">`
            : ''

    const preview = source.kind === 'file'
        ? `<video data-preview muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" ${poster ? `poster="${escapeHtml(poster)}"` : ''}
                  class="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100">
               <source src="${escapeHtml(source.url)}">
           </video>`
        : ''

    const overlay = pending
        ? pendingLabel('Footage coming soon')
        : `<span class="absolute inset-0 grid place-items-center">
               <span class="play-button flex size-14 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition duration-500 ease-out group-hover:scale-110 group-hover:bg-white/25">
                   ${playIcon}
               </span>
           </span>
           <span class="absolute inset-x-0 bottom-0 p-5">
               <span class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                   <svg class="size-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5L3 1.5Z"/></svg>
                   Play
               </span>
           </span>`

    const interactive = pending
        ? ''
        : `data-play="${index}" role="button" tabindex="0" aria-label="Play ${title}"`

    return `
        <figure data-card ${interactive} ${cardShell(service, index, !pending)}>
            <div class="relative aspect-[3/4] w-full overflow-hidden bg-ink-900">
                ${cardWash(service)}
                ${posterImage}
                ${preview}
                ${cardFinish}
                ${overlay}
            </div>

            <figcaption class="card-glass flex flex-1 items-start justify-between gap-4 p-5">
                <div class="min-w-0">
                    <p class="truncate font-semibold text-white transition-colors duration-300 group-hover:text-brand-peach">${title}</p>
                    ${client ? `<p class="mt-0.5 truncate text-sm text-white/55">${client}</p>` : ''}
                </div>
                ${duration ? `<span class="shrink-0 text-xs tabular-nums text-white/45">${duration}</span>` : ''}
            </figcaption>
        </figure>`
}

/* ------------------------------------------------------------------
   The exhibition wall: five vertical panels inside one frame. Hovering
   a panel widens it and compresses the rest; none of them ever leave,
   so the narrow ones keep working as navigation.

   Split into three builders - visual, content, panel - so any one of
   them can change without disturbing the others.
   ------------------------------------------------------------------ */

/**
 * The figure inside a panel. Not a photograph: the five discipline motifs are
 * vector, so they stay crisp at any size, they carry no stray slide text, and
 * they do not depend on how a particular film happened to be lit. Drawn in
 * black on the red plate, which is the one pairing on this page that reads
 * cleanly at any scale.
 */
function panelVisual(entry) {
    const slug = String(entry.href || '').replace('#', '')
    const art = motifs[slug] ?? motifs['motion-graphics']

    return `
        <svg class="panel-motif" viewBox="0 0 200 200" fill="none" stroke="currentColor"
             stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            ${art()}
        </svg>`
}

/** Index and title always; the description and link only once there is room. */
function panelContent(entry) {
    return `
        <span class="panel-content">
            <span class="panel-index">${escapeHtml(entry.number)}</span>

            <span class="panel-title">${escapeHtml(entry.title)}</span>

            <span class="panel-reveal">
                <span class="panel-description">${escapeHtml(entry.description)}</span>
                <span class="panel-cta">
                    Explore
                    <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
            </span>
        </span>`
}

function panel(entry, index) {
    // An anchor, so the panel is reachable by keyboard and lands somewhere
    // real when used. Focus activates it exactly as hover does.
    return `
        <a class="panel" href="${escapeHtml(entry.href || '#')}" data-panel="${index}"
           style="--exposure: ${Number(entry.exposure) || 2}"
           aria-label="${escapeHtml(entry.title)} — ${escapeHtml(entry.description)}">
            ${panelVisual(entry)}
            <span class="panel-wash" aria-hidden="true"></span>
            ${panelContent(entry)}
        </a>`
}

export function panelWall(entries) {
    if (!entries.length) return ''

    return `
        <section class="panel-section" aria-labelledby="wall-title">
            <!-- The heading and the wall share one black plate, so the whole
                 thing reads as a single object standing in the room rather
                 than a title with some panels underneath it. -->
            <div class="plate reveal">
                <div class="plate-head">
                    <h2 id="wall-title" class="panel-heading">
                        Five disciplines,<br>one production line.
                    </h2>
                    <p class="panel-tag">[ What we do ]</p>
                </div>

                <div class="panel-frame" data-panel-wall>
                    ${entries.map(panel).join('')}
                </div>
            </div>
        </section>`
}

/* ------------------------------------------------------------------
   Sections
   ------------------------------------------------------------------ */

/**
 * A teal accent for a section: a thin ring over a soft glow, drifting slowly
 * and leaning toward the cursor. Purely decorative, so it never takes pointer
 * events or a place in the accessibility tree.
 */
const ACCENT_SPOTS = [
    { size: 15, top: '14%', left: '78%', delay: '0s'  },
    { size: 11, top: '62%', left: '8%',  delay: '-4s' },
    { size: 18, top: '20%', left: '86%', delay: '-8s' },
    { size: 12, top: '68%', left: '12%', delay: '-12s' },
    { size: 14, top: '26%', left: '82%', delay: '-16s' },
    { size: 16, top: '58%', left: '6%',  delay: '-20s' },
]

/* The field hands over from red to teal around the middle of the page, so the
   accents hand over the other way: teal rings over the red half, coral over
   the teal half. Either way the accent carries the family the field is not,
   and stays visible instead of dissolving into its own background. */
const ACCENT_TONES = {
    teal: {
        ring: 'rgba(245, 245, 242, 0.34)',
        ringNear: 'rgba(245, 245, 242, 0.7)',
        ringInner: 'rgba(199, 1, 2, 0.34)',
        glow: 'rgba(199, 1, 2, 0.26)',
        dot: 'rgb(245, 245, 242)',
    },
    coral: {
        ring: 'rgba(199, 1, 2, 0.5)',
        ringNear: 'rgba(230, 40, 40, 0.85)',
        ringInner: 'rgba(107, 0, 0, 0.4)',
        glow: 'rgba(107, 0, 0, 0.38)',
        dot: 'rgb(199, 1, 2)',
    },
}

export function accent(position) {
    const spot = ACCENT_SPOTS[position % ACCENT_SPOTS.length]
    // The field splits left-to-right, so an accent carries whichever family
    // its own side does not: teal rings over the red left, coral over the
    // teal right.
    const tone = parseFloat(spot.left) < 50 ? ACCENT_TONES.teal : ACCENT_TONES.coral

    return `
        <div class="accent hidden lg:grid" data-accent aria-hidden="true"
             style="width: ${spot.size}rem; height: ${spot.size}rem; top: ${spot.top}; left: ${spot.left}; --accent-delay: ${spot.delay};
                    --accent-ring: ${tone.ring}; --accent-ring-near: ${tone.ringNear}; --accent-ring-inner: ${tone.ringInner};
                    --accent-glow: ${tone.glow}; --accent-dot: ${tone.dot}">
            <span class="accent-body">
                <span class="accent-glow"></span>
                <span class="accent-ring"></span>
                <span class="accent-ring-inner"></span>
                <span class="accent-dot"></span>
            </span>
        </div>`
}

export function section(service, position, videos) {
    const own = videos
        .map((video, index) => ({ video, index }))
        .filter(({ video }) => video.service === service.slug)

    const hasCategories = own.some(({ video }) => (video.category ?? '').trim() !== '')

    // Group under sub-headings in the order they first appear.
    const groups = new Map()
    own.forEach((entry) => {
        const key = (entry.video.category ?? '').trim()
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key).push(entry)
    })

    const grids = [...groups.entries()].map(([category, entries]) => `
        ${hasCategories ? `
            <h3 class="reveal mt-14 flex items-center gap-4 text-2xl font-bold tracking-tight text-[#F5F5F2] sm:text-3xl">
                <span class="h-px w-6 shrink-0" style="background: ${gradient(service)}"></span>
                ${escapeHtml(category || 'More')}
            </h3>` : ''}
        <div class="rail-wrap relative ${hasCategories ? 'mt-6' : 'mt-12'}">
            <div class="rail flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:gap-8" data-rail>
                ${entries.map(({ video, index }) => card(video, service, index)).join('')}
            </div>

            <!-- Edge fades, so the rail reads as continuing past the frame -->
            <span class="rail-fade rail-fade-left" aria-hidden="true"></span>
            <span class="rail-fade rail-fade-right" aria-hidden="true"></span>

            <button type="button" class="rail-nav rail-nav-prev" data-rail-prev aria-label="Previous">
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button type="button" class="rail-nav rail-nav-next" data-rail-next aria-label="Next">
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            ${entries.length > 1 ? `
            <!-- One dot per film and a running count, so a visitor can see the
                 rail continues past the edge. A dot jumps straight to its film. -->
            <div class="rail-dots" data-rail-dots role="group" aria-label="Films in this section">
                ${entries.map((_, n) => `<button type="button" class="rail-dot" data-rail-dot="${n}" aria-label="Film ${n + 1} of ${entries.length}"></button>`).join('')}
                <span class="rail-count" data-rail-count aria-live="polite">1 / ${entries.length}</span>
            </div>` : ''}
        </div>`).join('')

    return `
        <section
            id="${service.slug}"
            class="work-section relative scroll-mt-8 px-5 py-6 sm:px-8 sm:py-8"
            aria-labelledby="${service.slug}-title"
        >
            <!-- Every section is a black plate standing in the red room, the
                 same object the wall above it stands on. -->
            <div class="plate reveal relative isolate overflow-hidden">
                ${motif(service)}

                <div class="relative">
                <div class="reveal grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-16">
                    <div>
                        <span class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                            <span class="tabular-nums">${pad(position + 1)}</span>
                            <span class="h-px w-8" style="background: ${gradient(service)}"></span>
                        </span>

                        <h2 id="${service.slug}-title" class="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[#F5F5F2] sm:text-5xl">
                            ${escapeHtml(service.name)}
                        </h2>

                        ${service.tagline ? `
                            <p class="mt-3 text-lg font-semibold text-[#F5F5F2]/85">
                                ${escapeHtml(service.tagline)}
                            </p>` : ''}
                    </div>

                    ${service.description ? `
                        <p class="max-w-xl text-base leading-relaxed text-[#F5F5F2]/65 sm:text-lg">
                            ${escapeHtml(service.description)}
                        </p>` : ''}
                </div>

                    ${grids}
                </div>
            </div>
        </section>`
}
