SDAC App - Fase 1 Supabase Auth
================================

Cosa è stato aggiunto
---------------------
- Collegamento frontend pronto per Supabase Auth.
- Registrazione reale utente da pannello Impostazioni.
- Login reale utente da pannello Impostazioni.
- Logout e sincronizzazione profilo.
- Lettura del piano reale dal profilo Supabase (free / premium / admin).
- Badge del piano aggiornato dal profilo quando l'utente è autenticato.
- Pannello Abbonati collegato all'account reale se l'utente ha già fatto login.

File toccati
------------
- index.html
- js/app.js
- style.css

Cosa devi compilare tu in js/app.js
-----------------------------------
Cerca l'oggetto:

const SUPABASE_CONFIG = Object.freeze({ ... })

e inserisci:
- url: URL del tuo progetto Supabase
- anonKey: chiave anon pubblica del progetto

Esempio:
url: "https://xxxx.supabase.co"
anonKey: "eyJ..."

Importante
----------
- Prima esegui il file supabase_phase1_setup.sql nel SQL Editor di Supabase.
- Questo crea tabelle, trigger, RLS e vista admin.
- Dopo la compilazione di SUPABASE_CONFIG, login e registrazione diventano reali.

Cosa NON è ancora attivo in questa fase
---------------------------------------
- Stripe reale
- Webhook Stripe
- Attivazione Premium automatica dopo pagamento
- PayPal reale

Come funziona adesso il piano
-----------------------------
- Se non c'è login: l'app usa lo stato locale / Free / Admin locale.
- Se l'utente è autenticato con Supabase: il piano viene letto dal profilo in database.
- La Modalità Proprietario / Admin locale resta disponibile per test privati.
