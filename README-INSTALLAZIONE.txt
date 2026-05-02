SDAC App - aggiornamento PWA

Contenuto aggiunto:
- manifest.webmanifest
- sw.js
- icone provvisorie in assets/
- supporto UI per installazione app

Note importanti:
1. Pubblica il sito in HTTPS per rendere disponibile l'installazione PWA.
2. Mantieni questa struttura:
   - index.html
   - style.css
   - manifest.webmanifest
   - sw.js
   - js/
   - assets/
3. Alcune funzioni offline potrebbero restare parziali finche le librerie CDN non vengono ospitate localmente.
