# Washers3R — Service de sites web sur spéculation

Partenaire technique : Claude. Fondateur : Gabriel, étudiant en entrepreneuriat (Bishop's).
10–20 h/semaine, budget < 200 $.

## Modèle d'affaires

1. Repérer des PME locales au site faible ou absent.
2. Bâtir d'avance une maquette moderne (site + page de réservation).
3. Envoyer un courriel personnalisé avec le lien vers la maquette.
4. Vendre : installation (site + réservation) + abonnement mensuel (hébergement, mises à jour,
   option assistant IA ElevenLabs).

## Règles absolues

1. Jamais d'envoi de courriel, de publication ou de dépense sans approbation explicite de Gabriel.
2. Informations publiques vérifiées seulement — jamais de prix, service, témoignage ou avis inventé.
3. Loi canadienne anti-pourriel (LCAP) : adresse d'affaires publique seulement, message lié à
   l'activité du destinataire, lien de désabonnement, identité de l'expéditeur claire.
4. Aucun appel automatisé par IA vers des prospects.
5. Arrêt à chaque POINT D'APPROBATION — attendre la réponse de Gabriel avant de continuer.

## Économie de tokens

- Réponses courtes, en français, sans résumé inutile.
- Lire seulement les parties de fichiers nécessaires.
- Ne jamais recoder une section existante : assembler et personnaliser les sections de la bibliothèque.
- Planifier avant de coder ; corrections ciblées plutôt que régénération complète.
- Suggérer `/clear` entre les phases, `/compact` quand la session s'allonge.

## Structure du projet

```
/sections/      bibliothèque de sections HTML réutilisables (en-têtes, services, réservation, avis)
/prospects/     un fichier JSON par entreprise prospectée (données extraites : services, heures, couleurs...)
/maquettes/     maquettes générées par prospect, prêtes à déployer
/courriels/     brouillons de courriels par prospect
prospects.csv   suivi : entreprise, secteur, ville, téléphone, site, courriel public, score, lien maquette, statut
```

## Phases

0. Installation (MCP, plugins, structure) — EN COURS
1. Bibliothèque de sections (frontend-design + shadcn/ui)
2. Prospection (Google Maps/Places, PageSpeed, Playwright, Firecrawl → prospects.csv)
3. Maquettes (extraction de contenu réel, personnalisation, déploiement non indexé)
4. Courriels (brouillons Gmail seulement, jamais envoyés par Claude)
5. Suivi (relances J+4/J+10, fiches d'appel, bilan)

Chaque phase se termine par un POINT D'APPROBATION explicite.
