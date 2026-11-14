# Statut refonte maquettes (tasteskill)

## Westley (restauration, Sherbrooke)
Arrêté en cours de route (consistency.mjs relancé). Pas de GATE.
À faire : relire /home/user/washers3r-site/maquettes-v2/westley/, relancer consistency.mjs → check.mjs → perf.mjs → gate.mjs (3 tours max).

## Pro-Transmission (mécanique, Sherbrooke)
**Terminé — GATE: OPEN** (7 points non bloquants, waivés/justifiés : section-gaps, empty-area/section-air/sparse sur #contact, text-only à 390px, phone-number waivé).
Dossier : maquettes-v2/pro-transmission/index.html
À faire : remplacer les 4 photos stand-in (pas de vraies photos du garage) par de vraies photos du commerce.

## Esthétique Chatelois (Sherbrooke)
Inachevé — gate jamais lancé, 2e passe consistency.mjs interrompue.
Dossier : maquettes-v2/esthetique-chatelois/
À faire : relire /tmp/consistency2.log (perdu si session fermée → relancer), puis check.mjs, perf.mjs, gate.mjs.

## Lewis Café TR (Trois-Rivières)
Arrêté en cours de route (rapport final en train d'être lu au moment de l'arrêt). Pas de GATE confirmé.
Dossier : maquettes-v2/lewis-cafe-tr/
À faire : vérifier l'état du fichier, relancer les checks si nécessaire.

## Coiffure Sensass (Trois-Rivières)
Arrêté en cours de route (rerun consistency.mjs). Pas de GATE.
Dossier : maquettes-v2/coiffure-sensass/
À faire : relancer consistency.mjs → check.mjs → perf.mjs → gate.mjs.

## Note générale
Chaque refonte coûte ~400-530k tokens et 3-4 min d'agent (plusieurs passes de vérification Chrome headless). Seul Pro-Transmission est présentable tel quel. Les autres sont dans un état intermédiaire (fichiers valides mais non vérifiés par le gate).
