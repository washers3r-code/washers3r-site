# Plan — Pro-Transmission / Pneu de Sherbrooke

## Kind
service (trade: garage mécanique — pneus, freins, transmission, échappement/suspension).
Rationale: SKILL.md section 1 table lists "trade" explicitly under the **service** row
("People are hired: clinic, law firm, agency, creative studio, trade"), separate from
"place" (cafe, bike shop, gym — people browse/visit casually). A garage is booked for a
repair job, not browsed; it fits service, not place.

## Fact sheet (from pro-transmission.json — nothing else invented)
- What it is: garage mécanique (pneus, freins, transmission, différentiels, échappement, suspension)
- Where: 1997 Rue Galt E, Sherbrooke, QC (street + district only on page per house rule 9: "Rue Galt Est, Sherbrooke")
- Phone: 819-569-8363 (brief gives it → tel: link allowed)
- Hours: Lun–Ven 8h–17h, Sam–Dim fermé
- Services: Pneus / Freins / Transmission / Silencieux et suspension (descriptions from JSON)
- No prices given → "Prix sur demande"
- 4 real Google reviews (verbatim, in `avis` array) — Anthony (1500$ moins cher qu'un autre garage
  pour un échappement), nasa444444 (différentiel + support de transmission, 6 mois sans problème),
  Jean-Sébastien Paré (rendez-vous rapide malgré achalandage élevé), Donald Chamberland (auto de
  courtoisie, bon prix, 5 étoiles)
- No name given beyond the two trade names → logo/mark designed (dots), nav shows "Pro-Transmission"

## Voice card
Voice: facts-only (copy-registers.md 1), one move borrowed from refusal/narrowness (10): the
honest limit of being closed on weekends.
Pairs: plain, not cold; direct, not boastful.
Person: "nous" for the shop/work, "vous" for the visitor's car/need.
Sentences: short, 8–16 words, declaratives with names and counts.
Humour: none.
House words: pneus, freins, transmission, différentiel, échappement, suspension (brief's own nouns).
Never: virtue words (honnête, fiable, qualité, passion), puns, invented figures.

## Deal (never by taste)
- Hero: `split` (deal.mjs --type service --has photo)
- Palette: `stone-blueprint` (warm stone ground + blue accent — "made for workshop, hardware,
  agency, studio" fits a mechanical workshop) — plan line 2
- Type: `hanken` (Hanken Grotesk, first pairing printed)
- Moment: `picture-develops` (on the work section's photograph)
- Nav: `nav-centre`
- Footer: `footer-dark` (one footer__col carries the address/hours so the LCAP-required
  public address still shows, even though this recipe is normally written for software/product)
- Close: `close-type`
- Rhythm: `dark-band` (placed on the "work" photo-pair section, not adjacent to the dark footer)
- Buttons: `solid`
- Mark: `dots`
- Radius: soft (default)

## Sections (screens)
1. hero — split, h1 names category+place, one hard fact (the place), photo of garage interior (stand-in)
2. services-list — 4 services with "Prix sur demande", photo of a mechanic at work beside it — 1 screen
3. work (dark-band, ground-inverse) — photo-pair, two stand-in work photographs, picture-develops moment on one — 1 screen
4. avis (reviews) — the 4 real Google reviews verbatim, FAQ-like open list (adapted recipe:
   no stock/invented faces, so no quote-stat portrait; a plain attributed list instead) — 1–2 screens
5. visite/contact (booking-form adapted) — address, hours, tel: link, a request form ("Demander un
   rendez-vous"), mailto .example stand-in since no form endpoint given — 1 screen
6. footer.closing — close-type (h2 + big button) + footer-dark (address/hours column, legal row)

Main action: "Demander un rendez-vous" (request verb+object) — same words in nav, hero, close,
phone bar. No literal online booking system exists per the brief, so this reads as a request, not
a confirmed reservation.

## Photographs (stand-ins — Wikimedia Commons, live search, none are the client's own)
- Hero: Car tire stack 20170516 (Santeri Viinamäki, CC BY-SA 4.0) — garage interior, tire stack on a lift
- Services-list: Auto mechanic 03 (Azorbli, CC BY-SA 4.0) — suspension/brake work
- Work pair: Mechanic working on a car battery (Kwamitsey, CC BY 4.0); Two mechanic working on
  a car engine (Kwamitsey, CC BY 4.0)
All listed in the report as stand-ins the client must replace with real photographs of the shop.
