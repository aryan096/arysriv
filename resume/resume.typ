// Resume layout. Content lives in resume.yaml — edit that, not this file,
// unless you want to change the design.
//
// Build: npm run resume   (outputs static/documents/resume.pdf)

#let data = yaml("resume.yaml")

// ---- Design tokens ----------------------------------------------------------

#let accent = rgb("#5b4596")
#let ink = rgb("#1f1f24")
#let muted = rgb("#6b6b75")
#let rule-color = rgb("#d9d6e0")

#let body-size = 9.5pt
#let small-size = 8.5pt

// ---- Page + text defaults ---------------------------------------------------

#set document(title: data.name.first + " " + data.name.last + " — Resume", author: data.name.first + " " + data.name.last)
#set page(paper: "us-letter", margin: (x: 0.6in, top: 0.5in, bottom: 0.5in))
#set text(font: "Open Sans", size: body-size, fill: ink, lang: "en")
#set par(leading: 0.65em, spacing: 0.65em)
#set list(marker: text(fill: accent, sym.bullet), indent: 0.1em, body-indent: 0.55em, spacing: 0.55em)

#let md(s) = eval(s, mode: "markup")

// ---- Header -----------------------------------------------------------------

#let icon(name) = {
  let svg = read("icons/" + name + ".svg").replace("<path", "<path fill=\"" + muted.to-hex() + "\"")
  box(height: 0.85em, baseline: 0.12em, image(bytes(svg)))
}

#align(center)[
  #text(size: 26pt, weight: "light", tracking: 0.02em)[#data.name.first #text(weight: "bold", fill: accent)[#data.name.last]]
  #v(-0.6em)
  #text(size: small-size, fill: muted)[
    #data.contact.map(c => box[#icon(c.icon)#h(0.35em)#link(c.url, c.text)]).join(h(1.1em))
  ]
]

#v(0.4em)

// Body links (after the header, so contact links stay plain).
#show link: it => underline(offset: 0.18em, stroke: 0.5pt + accent, text(fill: accent, it))

// ---- Building blocks --------------------------------------------------------

#let section(title, body) = {
  v(1em)
  block(below: 0.85em, grid(
    columns: (auto, 1fr),
    column-gutter: 0.6em,
    align: horizon,
    text(size: 10pt, weight: "bold", fill: accent, tracking: 0.12em, upper(title)),
    line(length: 100%, stroke: 0.6pt + rule-color),
  ))
  body
}

// Two-column row: left content, right-aligned meta in muted text.
#let row(main, meta) = grid(
  columns: (1fr, auto),
  column-gutter: 1em,
  main, align(right, text(fill: muted, meta)),
)

#let entry(e) = block(below: 1.05em, breakable: false)[
  #row(text(weight: "bold")[#e.title], e.at("date", default: "").replace(" - ", " – "))
  #v(-0.15em)
  #row(
    text(style: "italic")[#e.at("role", default: "")],
    e.at("location", default: ""),
  )
  #for d in e.at("details", default: ()) [
    #v(0.25em)
    #md(d)
  ]
  #let bullets = e.at("bullets", default: ())
  #if bullets.len() > 0 {
    v(0.2em)
    list(..bullets.map(md))
  }
]

#let skills(items) = grid(
  columns: (auto, 1fr),
  column-gutter: 1.2em,
  row-gutter: 0.65em,
  ..items.map(s => (text(weight: "bold")[#s.label], md(s.value))).flatten(),
)

#let publication(p) = block(below: 0.95em, breakable: false)[
  #text(weight: "bold")[#md(p.title)]
  #v(-0.05em)
  #text(fill: muted)[#p.authors]
  #for n in p.at("notes", default: ()) [
    #v(-0.1em)
    #text(size: small-size, style: "italic")[#md(n)]
  ]
]

// ---- Render sections in YAML order -----------------------------------------

#for s in data.sections {
  section(s.title, {
    if s.kind == "entries" { for e in s.items { entry(e) } }
    else if s.kind == "skills" { skills(s.items) }
    else if s.kind == "publications" { for p in s.items { publication(p) } }
    else { panic("unknown section kind: " + s.kind) }
  })
}
