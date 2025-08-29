// simple placeholder renderer – replaces {{placeholders}} using a spec object
export function renderLanding(spec, templateHtml, templateCss) {
  const map = {
    "{{brand.name}}": spec.brand.name,
    "{{brand.primaryColor}}": spec.brand.primaryColor || "#2EF7D0",
    "{{content.headline}}": spec.content.headline,
    "{{content.subline}}": spec.content.subline,
    "{{content.ctaText}}": spec.content.ctaText,
    "{{capture.endpoint}}": spec.capture?.endpoint || "#",
    "{{year}}": String(new Date().getFullYear())
  };
  let html = templateHtml;
  let css = templateCss;
  for (const [k, v] of Object.entries(map)) {
    html = html.split(k).join(v);
    css = css.split(k).join(v);
  }
  return { html, css };
}
