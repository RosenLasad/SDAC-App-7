SDAC App - Predisposizione Abbonamento
======================================

Cosa è stato predisposto
------------------------
- Pannello "Abbonati" completo nel bottone in alto a destra.
- Sezioni: Free / Abbonamento / Lezioni ONLINE.
- Form utente con:
  - Nome e cognome
  - Email
  - Nome utente
  - Codice promozionale
  - Password e conferma password
- Scelta piano: Annuale / Mensile
- Scelta pagamento: Carta (Stripe) / PayPal
- Salvataggio locale dei dati compilati per riprendere il checkout.
- Badge piano aggiornato automaticamente: Free / In attivazione / Premium.
- API globale pronta per futuri blocchi Premium nei vari strumenti:
  window.SDACMembership

Dove modificare i link reali di pagamento
----------------------------------------
File: js/app.js

Cerca l'oggetto:
const SUBSCRIPTION_CONFIG = Object.freeze({ ... })

Dentro providers trovi:
- stripe.monthlyUrl
- stripe.annualUrl
- paypal.monthlyUrl
- paypal.annualUrl

Inserisci qui i link reali del checkout.

Consiglio pratico
-----------------
Per partire in modo semplice:
- Stripe: usa Payment Link o Checkout ospitato
- PayPal: usa il link / bottone / checkout del tuo account business

Nota importante sulla sicurezza
-------------------------------
Questa versione predispone bene la parte grafica e il flusso utente,
ma NON deve essere considerata sufficiente per attivare Premium in modo sicuro.

Per attivare davvero gli abbonamenti serve almeno una di queste due soluzioni:
1) Backend tuo con verifica pagamento e attivazione account
2) Provider esterno / automazione che conferma il pagamento e poi aggiorna lo stato utente

Perché serve una verifica esterna?
---------------------------------
Perché la sola interfaccia frontend non può verificare in modo affidabile se un utente ha pagato davvero.

Uso futuro nei vari strumenti
-----------------------------
Puoi bloccare funzioni Premium così:

if (!window.SDACMembership.requirePremium("Salvare e condividere il Piano di Produzione")) return;

Oppure controllare direttamente:

if (!window.SDACMembership.isPremium()) {
  // blocca la funzione
}

Stato attuale consigliato per SDAC App
-------------------------------------
FREE
- Dizionario completo
- Shopping completo
- Taccuino base
- Piano di Produzione con 1 progetto
- Storyboard con 1 progetto

ABBONAMENTO
- Salvataggi illimitati
- Archivio
- Export
- Condivisione
- Vantaggi extra

LEZIONI ONLINE
- Separato, con eventuali sconti per gli abbonati


Modalita Proprietario / Admin (solo test locale)
- Aperta da Impostazioni.
- Email proprietario preimpostata: luxandro010@gmail.com
- Chiave proprietario preimpostata: SDAC-OWNER-2026
- Attiva il piano locale "Admin" e sblocca le funzioni Premium su questo dispositivo.
- ATTENZIONE: questa chiave e presente nel codice client. Non e sicura per una build pubblica. Prima della pubblicazione va rimossa o spostata su backend.


Fase 1 - Supabase Auth
----------------------
- Registrazione reale e login reale dal pannello Impostazioni.
- Il badge del piano può leggere free / premium / admin dal profilo Supabase.
- Il pannello Abbonati usa l'account reale se l'utente è autenticato.
- Per attivarlo devi compilare SUPABASE_CONFIG in js/app.js e includere URL + Anon Key del progetto Supabase.
