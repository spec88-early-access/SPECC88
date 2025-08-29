// Build a lead-capture page with dynamic fields and Formspree auto-reply hints.
export function renderLead(spec) {
  const color = spec.brand?.primaryColor || "#2EF7D0";
  const brand = spec.brand?.name || "SPEC88";
  const headline = spec.content?.headline || "Get a quick quote";
  const subline = spec.content?.subline || "Tell us what you need. We reply within 24h.";
  const cta = spec.content?.ctaText || "Send request";
  const endpoint = spec.capture?.endpoint || "#";

  // fields: array of {label, name, type}
  const fields = Array.isArray(spec.fields) && spec.fields.length
    ? spec.fields
    : [
        { label: "Name",   name: "name",   type: "text" },
        { label: "Email",  name: "email",  type: "email" },
        { label: "Message",name: "message",type: "textarea" }
      ];

  const fieldsHtml = fields.map(f=>{
    const base = `name="${f.name}" placeholder="${f.label}"`;
    if (f.type === "textarea") {
      return `<label>${f.label}</label><textarea ${base} required></textarea>`;
    }
    return `<label>${f.label}</label><input type="${f.type||'text'}" ${base} required/>`;
  }).join("\n");

  const css = `
:root{--c:${color}}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,Arial;background:#090e16;color:#f9fafb}
.nav{display:flex;gap:10px;align-items:center;padding:14px 18px;background:#0a2540;border-bottom:1px solid #ffffff1a}
.logo{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#081524;font-weight:800;background:linear-gradient(135deg,var(--c),#86ffe8)}
.brand{font-weight:800}
.hero{max-width:880px;margin:50px auto 18px;padding:0 20px;text-align:center}
.hero h1{font-size:clamp(28px,5vw,48px);line-height:1.05;margin:8px 0}
.sub{color:#cfd5dd;font-size:18px;margin-bottom:20px}
.form{max-width:640px;margin:18px auto;background:#ffffff10;border:1px solid #ffffff22;border-radius:14px;padding:16px}
label{display:block;font-size:12px;color:#d7dbe2;margin:10px 0 6px}
input,textarea{width:100%;padding:12px;border-radius:10px;border:1px solid #ffffff26;background:#00000040;color:#fff;outline:none}
textarea{min-height:110px}
.btn{margin-top:12px;padding:12px 16px;border-radius:999px;background:linear-gradient(135deg,var(--c),#86ffe8);color:#081524;font-weight:700;border:none;cursor:pointer}
.note{color:#9aa3ad;font-size:12px;margin-top:8px;text-align:center}
.foot{margin:40px 0 20px;text-align:center;color:#9aa3ad;font-size:14px}
  `.trim();

  const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${brand} – ${headline}</title>
  <link rel="stylesheet" href="./lead.css"/>
</head>
<body>
  <header class="nav">
    <div class="logo">S</div>
    <div class="brand">${brand}</div>
  </header>

  <main class="hero">
    <h1>${headline}</h1>
    <p class="sub">${subline}</p>

    <form class="form" action="${endpoint}" method="POST">
      ${fieldsHtml}
      <!-- Formspree helpers -->
      <input type="hidden" name="_subject" value="${brand} – New Lead">
      <!-- Set reply-to so Formspree can auto-reply to the submitter -->
      <input type="hidden" name="_replyto" value="{email}">
      <!-- Optional thank-you redirect -->
      <!-- <input type="hidden" name="_redirect" value="https://yourdomain.com/thanks.html"> -->

      <button class="btn" type="submit">${cta}</button>
      <div class="note">Protected by Formspree. You can enable auto-reply in your Formspree dashboard.</div>
    </form>
  </main>

  <footer class="foot">© ${new Date().getFullYear()} ${brand}</footer>
</body>
</html>
  `.trim();

  return { html, css };
}
