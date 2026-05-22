const criticalCss = `
:root{--paper:246 234 208;--newsprint:255 248 232;--ink:17 17 17;--coal:36 32 26;--stamp:185 28 28;--ochre:199 139 43}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;min-height:100vh;background:linear-gradient(90deg,rgb(17 17 17/.035) 1px,transparent 1px) 0 0/42px 42px,linear-gradient(rgb(17 17 17/.03) 1px,transparent 1px) 0 0/42px 42px,rgb(var(--paper));color:rgb(var(--ink));font-family:Inter,Arial,sans-serif;text-rendering:optimizeLegibility}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
header{position:sticky;top:0;z-index:40;border-bottom:2px solid rgb(var(--ink));background:rgb(var(--paper)/.95);backdrop-filter:blur(8px)}
.section-shell{width:100%;max-width:80rem;margin-inline:auto;padding-inline:.875rem}
.section-title{font-family:"Arial Narrow",Impact,sans-serif;font-size:clamp(3.05rem,12vw,4.5rem);font-weight:900;line-height:.88;text-transform:uppercase}
.section-kicker{font-size:.75rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:rgb(var(--stamp))}
.button-primary,.button-secondary,.button-ghost{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border:2px solid rgb(var(--ink));padding:.625rem .875rem;font-size:.75rem;font-weight:900;text-transform:uppercase;box-shadow:4px 4px 0 rgb(var(--ink))}
.button-primary{background:rgb(var(--stamp));color:#fff}
.button-secondary{background:rgb(var(--newsprint));color:rgb(var(--ink))}
.button-ghost{background:transparent;color:rgb(var(--ink));box-shadow:none}
.poster-card{position:relative;overflow:hidden;border:2px solid rgb(var(--ink));background:rgb(var(--newsprint));box-shadow:4px 4px 0 rgb(var(--ink));padding:1rem}
.stamp-border{border:2px solid rgb(var(--stamp));outline:1px dashed rgb(var(--stamp)/.65);outline-offset:-8px}
.input-field{width:100%;border:2px solid rgb(var(--ink));background:rgb(var(--newsprint));padding:.625rem .75rem;font-size:.875rem;font-weight:700;color:rgb(var(--ink))}
.safe-text{min-width:0;overflow-wrap:anywhere;word-break:normal;hyphens:auto}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media (min-width:640px){.section-shell{padding-inline:1.5rem}.button-primary,.button-secondary{padding:.75rem 1.25rem;font-size:.875rem}.button-ghost{font-size:.875rem}.poster-card{box-shadow:7px 7px 0 rgb(var(--ink));padding:1.25rem}.section-kicker{font-size:.875rem;letter-spacing:.16em}.input-field{padding:.75rem 1rem}}
@media (min-width:1024px){.section-shell{padding-inline:2rem}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}
`;

export default function CriticalStyles() {
  return <style id="cjp-critical-css" dangerouslySetInnerHTML={{ __html: criticalCss }} />;
}
