import { site } from "@/lib/site";

export type MailLocale = "en" | "fr";

function wrap(title: string, body: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f5f1e8;color:#292824;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px 56px;">
      <p style="font-family:Georgia,serif;font-size:28px;letter-spacing:-0.03em;margin:0 0 28px;">Serenova</p>
      <h1 style="font-weight:400;font-size:28px;line-height:1.2;margin:0 0 20px;">${title}</h1>
      <div style="font-size:17px;line-height:1.7;">${body}</div>
      <p style="margin-top:36px;font-size:14px;color:#6a645a;">Jenny · ${site.email}</p>
    </div>
  </body>
</html>`;
}

export function requestReceivedMail(locale: MailLocale, name: string) {
  if (locale === "fr") {
    return {
      subject: "Nous avons bien reçu votre demande",
      text: `Bonjour ${name},\n\nVotre message est arrivé. Jenny le lit et vous répond personnellement.\n\nSerenova\n${site.email}`,
      html: wrap(
        "Votre demande est arrivée",
        `<p>Bonjour ${name},</p><p>Votre message est bien arrivé. Jenny le lit et vous répond personnellement.</p>`,
      ),
    };
  }
  return {
    subject: "We received your travel request",
    text: `Hello ${name},\n\nYour message has arrived. Jenny will read it and reply in person.\n\nSerenova\n${site.email}`,
    html: wrap(
      "Your request has arrived",
      `<p>Hello ${name},</p><p>Your message has arrived. Jenny will read it and reply in person.</p>`,
    ),
  };
}

export function newRequestAdminMail(input: {
  name: string;
  email: string;
  kind: string;
  preview: string;
  adminUrl: string;
}) {
  return {
    subject: `Nouvelle demande — ${input.name}`,
    text: `${input.name} <${input.email}>\n${input.kind}\n\n${input.preview}\n\n${input.adminUrl}`,
    html: wrap(
      "Nouvelle demande",
      `<p>${input.name} · ${input.email}</p><p>${input.kind}</p><p>${input.preview}</p><p><a href="${input.adminUrl}">Ouvrir la fiche</a></p>`,
    ),
  };
}

export function quoteSentMail(locale: MailLocale, name: string, url: string) {
  if (locale === "fr") {
    return {
      subject: "Votre proposition Serenova",
      text: `Bonjour ${name},\n\nVotre proposition est prête :\n${url}\n\nVous pouvez l’ouvrir, l’imprimer, puis l’accepter si elle vous convient. L’acompte ne se règle pas sur cette page.\n\nJenny\n${site.email}`,
      html: wrap(
        "Votre proposition",
        `<p>Bonjour ${name},</p><p>Votre proposition est prête.</p><p><a href="${url}">Ouvrir la proposition</a></p><p>Vous pouvez l’imprimer, puis l’accepter si elle vous convient. L’acompte ne se règle pas sur cette page.</p>`,
      ),
    };
  }
  return {
    subject: "Your Serenova proposal",
    text: `Hello ${name},\n\nYour proposal is ready:\n${url}\n\nYou can open it, print it, then accept it if it feels right. The deposit is not collected on that page.\n\nJenny\n${site.email}`,
    html: wrap(
      "Your proposal",
      `<p>Hello ${name},</p><p>Your proposal is ready.</p><p><a href="${url}">Open the proposal</a></p><p>You can print it, then accept it if it feels right. The deposit is not collected on that page.</p>`,
    ),
  };
}

export function quoteAcceptedClientMail(locale: MailLocale, name: string) {
  if (locale === "fr") {
    return {
      subject: "Merci — votre proposition est acceptée",
      text: `Bonjour ${name},\n\nVotre acceptation est enregistrée. Jenny prépare l’acompte et vous enverra le lien de paiement après relecture.\n\nJenny\n${site.email}`,
      html: wrap(
        "Merci",
        `<p>Bonjour ${name},</p><p>Votre acceptation est enregistrée. Jenny prépare l’acompte et vous enverra le lien de paiement après relecture.</p>`,
      ),
    };
  }
  return {
    subject: "Thank you — your proposal is accepted",
    text: `Hello ${name},\n\nYour acceptance is recorded. Jenny is preparing the deposit and will send the payment link after review.\n\nJenny\n${site.email}`,
    html: wrap(
      "Thank you",
      `<p>Hello ${name},</p><p>Your acceptance is recorded. Jenny is preparing the deposit and will send the payment link after review.</p>`,
    ),
  };
}

export function quoteAcceptedAdminMail(name: string, email: string, adminUrl: string) {
  return {
    subject: `Proposition acceptée — ${name}`,
    text: `${name} <${email}> a accepté.\nAcompte à relire : ${adminUrl}`,
    html: wrap(
      "Proposition acceptée",
      `<p>${name} · ${email}</p><p>Acompte à relire.</p><p><a href="${adminUrl}">Ouvrir les factures</a></p>`,
    ),
  };
}

export function depositInvoiceSentMail(
  locale: MailLocale,
  name: string,
  reference: string,
  amount: string,
  url: string,
) {
  if (locale === "fr") {
    return {
      subject: `Votre acompte Serenova — ${reference}`,
      text: `Bonjour ${name},\n\nJenny a relu la proposition acceptée. L’acompte de ${amount} se règle ici :\n${url}\n\nLa réservation n’est confirmée qu’après le paiement.\n\nJenny\n${site.email}`,
      html: wrap(
        "Votre acompte",
        `<p>Bonjour ${name},</p><p>Jenny a relu la proposition acceptée. L’acompte de ${amount} se règle sur Stripe.</p><p><a href="${url}">Régler l’acompte</a></p><p>La réservation n’est confirmée qu’après le paiement.</p>`,
      ),
    };
  }
  return {
    subject: `Your Serenova deposit — ${reference}`,
    text: `Hello ${name},\n\nJenny has reviewed the accepted proposal. The ${amount} deposit is paid here:\n${url}\n\nThe booking is confirmed only after payment.\n\nJenny\n${site.email}`,
    html: wrap(
      "Your deposit",
      `<p>Hello ${name},</p><p>Jenny has reviewed the accepted proposal. The ${amount} deposit is paid on Stripe.</p><p><a href="${url}">Pay the deposit</a></p><p>The booking is confirmed only after payment.</p>`,
    ),
  };
}

export function paymentConfirmedMail(locale: MailLocale, name: string, reference: string, amount: string) {
  if (locale === "fr") {
    return {
      subject: `Acompte reçu — voyage confirmé (${reference})`,
      text: `Bonjour ${name},\n\nNous avons bien reçu l’acompte de ${amount}. Votre réservation Serenova est confirmée.\n\nJenny\n${site.email}`,
      html: wrap(
        "Voyage confirmé",
        `<p>Bonjour ${name},</p><p>Nous avons bien reçu l’acompte de ${amount}. Votre réservation Serenova est confirmée.</p>`,
      ),
    };
  }
  return {
    subject: `Deposit received — journey confirmed (${reference})`,
    text: `Hello ${name},\n\nWe received the ${amount} deposit. Your Serenova booking is confirmed.\n\nJenny\n${site.email}`,
    html: wrap(
      "Journey confirmed",
      `<p>Hello ${name},</p><p>We received the ${amount} deposit. Your Serenova booking is confirmed.</p>`,
    ),
  };
}

export function depositPaidAdminMail(name: string, email: string, reference: string, amount: string, adminUrl: string) {
  return {
    subject: `Acompte reçu — ${reference}`,
    text: `${name} <${email}>\n${reference} · ${amount}\nRéservation confirmée.\n${adminUrl}`,
    html: wrap(
      "Acompte reçu",
      `<p>${name} · ${email}</p><p>${reference} · ${amount}</p><p>Réservation confirmée.</p><p><a href="${adminUrl}">Ouvrir les factures</a></p>`,
    ),
  };
}

export function studioTestMail() {
  return {
    subject: "Serenova — essai Resend",
    text: `Si vous lisez ceci, Resend envoie bien depuis ${site.email}.`,
    html: wrap("Essai Resend", `<p>Si vous lisez ceci, Resend envoie bien depuis ${site.email}.</p>`),
  };
}
