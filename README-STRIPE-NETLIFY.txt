SDAC App — Stripe + Supabase + Netlify (fase successiva a Supabase Auth)

Questa versione collega SDAC App a:
- Supabase Auth (frontend)
- Stripe Checkout (Netlify Functions)
- Stripe Customer Portal (Netlify Functions)
- Stripe Webhook per aggiornare il piano reale

File aggiunti:
- package.json
- netlify.toml
- netlify/functions/create-checkout-session.mjs
- netlify/functions/create-portal-session.mjs
- netlify/functions/stripe-webhook.mjs
- netlify/functions/_lib/*.mjs

CONFIGURAZIONE DA FARE SU NETLIFY
1. Variabili ambiente:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY   (solo per riferimento / eventuale build, il frontend usa js/app.js)
   - SUPABASE_SERVICE_ROLE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - STRIPE_PRICE_MONTHLY
   - STRIPE_PRICE_ANNUAL
   - APP_URL

2. In js/app.js inserisci:
   - SUPABASE_CONFIG.url
   - SUPABASE_CONFIG.anonKey

3. In Stripe:
   - crea un prodotto "SDAC App Premium"
   - crea 2 prezzi ricorrenti:
     * mensile
     * annuale
   - copia gli ID dentro:
     * STRIPE_PRICE_MONTHLY
     * STRIPE_PRICE_ANNUAL

4. In Stripe Workbench / Webhooks:
   - crea un endpoint verso:
     https://TUO-SITO.netlify.app/api/stripe-webhook
   - ascolta almeno:
     * checkout.session.completed
     * invoice.paid
     * invoice.payment_failed
     * customer.subscription.updated
     * customer.subscription.deleted

5. In Supabase:
   - esegui il file supabase_phase1_setup.sql aggiornato

NOTE IMPORTANTI
- PayPal in questa build è solo predisposto come voce UI, ma il flusso reale è Stripe.
- La Modalità Admin locale resta disponibile per i tuoi test.
- Il badge Premium lato app dipende dal profilo Supabase + dalla RPC current_user_has_premium_access().

FLUSSO
- utente si registra / accede con Supabase
- clicca Abbonati
- il frontend chiama /api/create-checkout-session
- Stripe Checkout gestisce il pagamento
- Stripe invia il webhook a /api/stripe-webhook
- il webhook aggiorna subscriptions + profiles
- al ritorno in app, il badge e i blocchi Premium si aggiornano

GESTIONE past_due
- la tolleranza di 3 giorni resta demandata alla RPC lato database
- quindi il frontend non si fida solo di profiles.plan
