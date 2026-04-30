"use client";

import { useState, useEffect, useRef } from "react";

const LINKEDIN = "https://www.linkedin.com/in/vilani-rathnayaka-08a83b246";

/* ══════════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital@1&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
:root{
  --bg:#05050f;--deep:#080818;
  --border:rgba(255,255,255,0.07);
  --text:#eeeaf8;--muted:#6b6888;
  --v:#c4b5fd;--g:#6ee7b7;--p:#f9a8d4;--b:#93c5fd;--o:#fcd34d;
  --gv:rgba(196,181,253,0.2);
  --fd:'Bebas Neue',sans-serif;
  --fb:'Inter',sans-serif;
  --fi:'Playfair Display',serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--fb);cursor:none;overflow-x:hidden}
#c1{position:fixed;width:8px;height:8px;background:#fff;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference}
#c2{position:fixed;width:32px;height:32px;border:1px solid rgba(196,181,253,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .2s,height .2s}
::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--v)}
body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.022;pointer-events:none;z-index:9990}

/* aurora */
.ab{position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;animation:af linear infinite alternate}
.ab1{width:65vw;height:65vw;background:radial-gradient(circle,#7c3aed,transparent 70%);top:-15%;left:-15%;opacity:.11;animation-duration:30s}
.ab2{width:55vw;height:55vw;background:radial-gradient(circle,#0891b2,transparent 70%);top:35%;right:-10%;opacity:.09;animation-duration:38s;animation-delay:-12s}
.ab3{width:45vw;height:45vw;background:radial-gradient(circle,#059669,transparent 70%);bottom:-8%;left:35%;opacity:.08;animation-duration:24s;animation-delay:-6s}
@keyframes af{0%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-25px) scale(1.07)}100%{transform:translate(-20px,35px) scale(.94)}}

/* NAV */
.nav{position:fixed;top:0;inset-inline:0;z-index:600;padding:18px 52px;display:flex;align-items:center;justify-content:space-between;transition:all .3s}
.nav.s{background:rgba(5,5,15,.85);backdrop-filter:blur(22px);padding:13px 52px;border-bottom:1px solid var(--border)}
.logo{font-family:var(--fd);font-size:2rem;letter-spacing:.06em;background:linear-gradient(135deg,var(--v),var(--g));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;cursor:pointer}
.nl-wrap{display:flex;gap:4px;align-items:center}
.nl{background:none;border:none;color:var(--muted);font-family:var(--fb);font-size:.77rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;padding:8px 14px;border-radius:100px;transition:.2s}
.nl:hover{color:var(--text);background:rgba(255,255,255,.05)}
.li-nav{display:inline-flex;align-items:center;gap:6px;padding:8px 17px;border-radius:100px;border:1px solid rgba(37,99,235,.4);background:rgba(37,99,235,.12);color:#93c5fd;font-size:.77rem;font-weight:700;text-decoration:none;transition:.2s;font-family:var(--fb)}
.li-nav:hover{background:rgba(37,99,235,.25);border-color:rgba(37,99,235,.7);transform:translateY(-1px)}
.hire-btn{background:linear-gradient(135deg,var(--v),var(--g));color:#05050f;font-family:var(--fb);font-size:.77rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:9px 22px;border-radius:100px;border:none;transition:.2s}
.hire-btn:hover{opacity:.85;transform:translateY(-1px);box-shadow:0 8px 28px var(--gv)}
.burg{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
.burg span{display:block;width:20px;height:1.5px;background:var(--text)}

/* HERO — split layout */
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;position:relative;overflow:hidden;padding:100px 0 60px}
.hero-bg-cvs{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.h-left{padding:0 40px 0 clamp(28px,5.5vw,88px);display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
.h-right{display:flex;align-items:center;justify-content:center;position:relative;z-index:2;padding-right:clamp(20px,4vw,64px)}

/* name */
.h-name{font-family:var(--fd);font-size:clamp(3.6rem,8.5vw,8rem);line-height:.87;letter-spacing:.03em;margin-bottom:20px;perspective:600px}
.hn1{display:block;background:linear-gradient(155deg,#fff 0%,var(--v) 50%,var(--g) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hn2{display:block;background:linear-gradient(155deg,var(--g) 0%,var(--v) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.h-role{font-size:clamp(.88rem,1.7vw,1.12rem);font-weight:300;color:var(--muted);margin-bottom:22px;min-height:2em;letter-spacing:.01em}
.h-role em{color:var(--v);font-style:normal;font-weight:600}
.tc{display:inline-block;width:2px;height:1em;background:var(--v);margin-left:2px;animation:bk .9s step-end infinite;vertical-align:middle}
@keyframes bk{50%{opacity:0}}

.h-tag{font-family:var(--fi);font-style:italic;font-size:clamp(.9rem,1.5vw,1.15rem);color:rgba(238,234,248,.45);max-width:400px;line-height:1.72;margin-bottom:38px}
.h-ctas{display:flex;gap:11px;flex-wrap:wrap}

/* girl wrapper */
.girl-wrap{position:relative;width:100%;max-width:400px}
.girl-cvs{width:100%;display:block;border-radius:24px}
.girl-badge{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:rgba(5,5,15,.78);backdrop-filter:blur(12px);border:1px solid rgba(196,181,253,.22);border-radius:100px;padding:5px 18px;font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--v);white-space:nowrap}

/* scroll hint */
.sh{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;z-index:4}
.sh-t{width:1px;height:52px;background:rgba(255,255,255,.1);position:relative;overflow:hidden}
.sh-b{position:absolute;top:0;inset-inline:0;height:26px;background:linear-gradient(to bottom,transparent,var(--v),transparent);animation:sp 2s ease-in-out infinite}
@keyframes sp{0%{top:-26px;opacity:0}45%{opacity:1}100%{top:52px;opacity:0}}
.sh-l{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}

/* SECTIONS */
.sec{padding:112px clamp(20px,4vw,60px);position:relative;z-index:1}
.stag{display:inline-flex;align-items:center;gap:10px;font-size:.65rem;letter-spacing:.24em;text-transform:uppercase;color:var(--v);margin-bottom:14px;font-weight:700}
.stag::before{content:'';display:block;width:24px;height:1px;background:var(--v)}
.sh2{font-family:var(--fd);font-size:clamp(2.6rem,5.5vw,4.6rem);line-height:.93;letter-spacing:.03em;margin-bottom:52px}
.wrap{max-width:1120px;margin:0 auto}

/* ABOUT */
.about{background:linear-gradient(180deg,var(--bg),var(--deep))}
.about-g{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.ap{font-size:clamp(.88rem,1.55vw,1.05rem);font-weight:400;color:rgba(238,234,248,.48);line-height:1.92;margin-bottom:17px;border-left:2px solid transparent;padding-left:17px;transition:border-color .5s,color .5s}
.ap.lit{border-left-color:var(--v);color:var(--text)}
.sc{background:rgba(255,255,255,.035);border:1px solid var(--border);border-radius:20px;padding:30px;backdrop-filter:blur(14px)}
.sr{display:flex;flex-direction:column;border-bottom:1px solid var(--border);padding:11px 0}
.sr:last-child{border-bottom:none}
.sv{font-family:var(--fd);font-size:1.9rem;background:linear-gradient(135deg,var(--v),var(--g));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sl{font-size:.7rem;color:var(--muted);letter-spacing:.07em;text-transform:uppercase}
.chip{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:100px;padding:6px 14px;font-size:.76rem;color:var(--muted)}

/* SKILLS */
.skills{background:var(--deep)}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:15px}
.sk{background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:17px;padding:23px;transition:border-color .3s,transform .3s;position:relative;overflow:hidden}
.sk::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),var(--cg,rgba(196,181,253,.1)) 0%,transparent 60%);opacity:0;transition:opacity .3s}
.sk:hover::before{opacity:1}
.sk:hover{border-color:rgba(255,255,255,.14);transform:translateY(-3px)}
.sk-icon{font-size:1.45rem;margin-bottom:10px}
.sk-cat{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--ca,var(--v));margin-bottom:6px;font-weight:700}
.sk-name{font-family:var(--fd);font-size:1.3rem;letter-spacing:.04em;margin-bottom:12px}
.pills{display:flex;flex-wrap:wrap;gap:5px}
.pill{font-size:.64rem;font-weight:600;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--muted);padding:3px 9px;border-radius:100px;transition:.2s}
.sk:hover .pill{color:var(--text);border-color:rgba(255,255,255,.13)}

/* ANIM SHOWCASE */
.anim-sc{grid-column:1/-1;background:rgba(255,255,255,.018);border:1px solid rgba(196,181,253,.16);border-radius:22px;overflow:hidden;display:grid;grid-template-columns:340px 1fr;box-shadow:0 0 60px rgba(196,181,253,.05)}
.anim-cvs-side{background:linear-gradient(135deg,rgba(20,10,40,.9),rgba(8,8,24,.95));display:flex;align-items:center;justify-content:center;padding:26px;border-right:1px solid rgba(196,181,253,.1);position:relative;min-height:340px}
.anim-live{position:absolute;top:13px;left:13px;background:rgba(196,181,253,.14);border:1px solid rgba(196,181,253,.3);border-radius:100px;padding:4px 11px;font-size:.58rem;font-weight:700;letter-spacing:.12em;color:var(--v);text-transform:uppercase}
.anim-info{padding:34px 38px;display:flex;flex-direction:column;justify-content:center}
.anim-sub{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--b);font-weight:700;margin-bottom:11px}
.anim-h{font-family:var(--fd);font-size:clamp(1.7rem,2.8vw,2.6rem);line-height:.92;letter-spacing:.04em;margin-bottom:15px}
.anim-d{font-size:.88rem;color:rgba(238,234,248,.56);line-height:1.82;margin-bottom:22px}
.anim-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:22px}
.at{font-size:.64rem;font-weight:700;letter-spacing:.04em;background:rgba(147,197,253,.07);border:1px solid rgba(147,197,253,.18);color:var(--b);padding:3px 11px;border-radius:100px}
.anim-tools{display:flex;gap:8px;flex-wrap:wrap}
.atool{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:100px;padding:6px 13px;font-size:.74rem;color:var(--muted)}

/* EXPERIENCE */
.experience{background:var(--bg)}
.exp-list{display:flex;flex-direction:column;gap:11px;max-width:840px}
.ec{background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:17px;overflow:hidden;cursor:pointer;transition:border-color .3s,transform .25s;position:relative}
.ec::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),var(--eg,rgba(196,181,253,.06)) 0%,transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.ec:hover::before{opacity:1}
.ec:hover{border-color:rgba(255,255,255,.12);transform:translateY(-2px)}
.ec.open{border-color:var(--ea,var(--v))}
.ec-hd{display:flex;align-items:center;justify-content:space-between;padding:19px 22px;gap:13px}
.ec-l{display:flex;align-items:center;gap:13px;flex:1;min-width:0}
.ec-ico{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;background:rgba(255,255,255,.05);border:1px solid var(--border);flex-shrink:0;transition:.3s}
.ec:hover .ec-ico,.ec.open .ec-ico{border-color:var(--ea,var(--v));background:rgba(196,181,253,.07)}
.ec-role{font-family:var(--fd);font-size:1.18rem;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ec-co{font-size:.69rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ea,var(--v));margin-top:2px}
.ec-r{display:flex;align-items:center;gap:8px;flex-shrink:0}
.ec-per{font-size:.66rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:100px;padding:4px 11px;white-space:nowrap}
.ec-loc{font-size:.66rem;color:var(--muted);background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:100px;padding:4px 11px;max-width:0;overflow:hidden;white-space:nowrap;opacity:0;transition:max-width .4s,opacity .3s,padding .3s}
.ec:hover .ec-loc,.ec.open .ec-loc{max-width:180px;opacity:1}
.ec-chev{width:23px;height:23px;border-radius:50%;background:rgba(255,255,255,.05);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:.58rem;color:var(--muted);transition:transform .35s,background .2s,color .2s;flex-shrink:0}
.ec.open .ec-chev{transform:rotate(180deg);background:rgba(196,181,253,.12);border-color:var(--v);color:var(--v)}
.ec-body{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0}
.ec.open .ec-body{max-height:340px;opacity:1}
.ec-in{padding:0 22px 22px;border-top:1px solid var(--border);padding-top:15px}
.ec-desc{font-size:.86rem;color:rgba(238,234,248,.62);line-height:1.8;margin-bottom:13px}
.ec-tags{display:flex;flex-wrap:wrap;gap:5px}
.etag{font-size:.64rem;font-weight:600;background:rgba(255,255,255,.04);border:1px solid var(--border);color:var(--muted);padding:3px 9px;border-radius:6px}

/* PROJECTS */
.projects{background:var(--deep)}
.pg{display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:17px}
.pc{background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:19px;overflow:hidden;cursor:pointer;transition:border-color .3s,box-shadow .3s;transform-style:preserve-3d;perspective:700px}
.pc:hover{border-color:rgba(255,255,255,.12);box-shadow:0 20px 70px rgba(0,0,0,.44)}
.pc-hd{height:116px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.pc-em{font-size:2.7rem;position:relative;z-index:1;transition:transform .4s}
.pc:hover .pc-em{transform:scale(1.14) translateY(-3px)}
.pc-sh{position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.11) 0%,transparent 55%);opacity:0;transition:opacity .3s}
.pc:hover .pc-sh{opacity:1}
.pc-b{padding:19px 19px 23px}
.pc-title{font-family:var(--fd);font-size:1.4rem;letter-spacing:.04em;margin-bottom:3px}
.pc-sub{font-size:.68rem;color:var(--v);margin-bottom:9px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.pc-desc{font-size:.82rem;color:var(--muted);line-height:1.68;margin-bottom:13px}
.pc-tech{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:13px}
.tc{font-size:.62rem;font-weight:700;padding:3px 8px;border-radius:5px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:var(--muted)}
.pc-cta{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--v);background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;transition:gap .2s;padding:0}
.pc:hover .pc-cta{gap:9px}

/* MODAL */
.mbg{position:fixed;inset:0;background:rgba(2,2,10,.88);backdrop-filter:blur(20px);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px;animation:mf .2s ease}
@keyframes mf{from{opacity:0}to{opacity:1}}
.mo{background:rgba(9,9,20,.96);border:1px solid rgba(255,255,255,.1);border-radius:22px;padding:40px;max-width:540px;width:100%;max-height:90vh;overflow-y:auto;position:relative;animation:mu .28s cubic-bezier(.22,1,.36,1)}
@keyframes mu{from{transform:translateY(34px);opacity:0}to{transform:none;opacity:1}}
.mcls{position:absolute;top:15px;right:15px;width:31px;height:31px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--muted);font-size:.74rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s}
.mcls:hover{background:rgba(255,255,255,.11);color:var(--text)}

/* CONTACT */
.contact{background:var(--bg)}
.cg{display:grid;grid-template-columns:1fr 1fr;gap:68px;align-items:start;max-width:940px;margin:0 auto}
.ci-list{display:flex;flex-direction:column;gap:13px;margin-top:12px}
.ci{display:flex;align-items:center;gap:13px;background:rgba(255,255,255,.025);border:1px solid var(--border);border-radius:12px;padding:13px 16px;text-decoration:none;color:var(--text);transition:.2s}
.ci:hover{border-color:var(--v);transform:translateX(4px)}
.ci.li:hover{border-color:rgba(37,99,235,.6);background:rgba(37,99,235,.07)}
.ci-ic{width:33px;height:33px;border-radius:9px;background:rgba(196,181,253,.1);display:flex;align-items:center;justify-content:center;font-size:.88rem;flex-shrink:0}
.ci-lb{font-size:.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px}
.ci-vl{font-size:.83rem;font-weight:500}
.ff{position:relative;margin-bottom:15px}
.ff label{position:absolute;left:15px;top:13px;font-size:.76rem;color:var(--muted);pointer-events:none;transition:.2s}
.ff input:focus~label,.ff input:not(:placeholder-shown)~label,
.ff textarea:focus~label,.ff textarea:not(:placeholder-shown)~label{top:5px;font-size:.57rem;color:var(--v);letter-spacing:.1em;text-transform:uppercase}
.ff input,.ff textarea{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:11px;color:var(--text);font-family:var(--fb);font-size:.88rem;padding:20px 15px 8px;outline:none;transition:.2s;resize:none}
.ff input:focus,.ff textarea:focus{border-color:var(--v);box-shadow:0 0 0 3px rgba(196,181,253,.11)}
.ff input::placeholder,.ff textarea::placeholder{color:transparent}
.fsent{display:flex;flex-direction:column;align-items:center;gap:12px;padding:34px;text-align:center;border:1px solid rgba(110,231,183,.2);border-radius:17px;background:rgba(110,231,183,.04)}
.fsico{font-size:2.1rem;animation:pop .4s cubic-bezier(.22,1,.36,1)}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:12px 27px;border-radius:100px;font-family:var(--fb);font-size:.86rem;font-weight:700;letter-spacing:.03em;cursor:pointer;border:none;position:relative;overflow:hidden;transition:transform .22s,box-shadow .22s}
.btn::after{content:'';position:absolute;inset:0;border-radius:100px;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.17) 0%,transparent 60%);opacity:0;transition:opacity .2s}
.btn:hover::after{opacity:1}
.btn-p{background:linear-gradient(135deg,var(--v),var(--g));color:#05050f}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 44px var(--gv)}
.btn-g{background:transparent;color:var(--text);border:1px solid rgba(255,255,255,.14)}
.btn-g:hover{border-color:var(--v);color:var(--v);transform:translateY(-2px);box-shadow:0 0 28px var(--gv)}

/* FOOTER */
.footer{text-align:center;padding:26px 40px;border-top:1px solid var(--border);font-size:.7rem;color:var(--muted)}
.footer span{color:var(--v)}
.footer a{color:var(--b);text-decoration:none}

/* LETTER ANIM */
@keyframes lu{from{opacity:0;transform:translateY(58px) rotateX(-58deg)}to{opacity:1;transform:none}}

/* MOBILE */
@media(max-width:820px){
  .hero{grid-template-columns:1fr;padding-top:88px;text-align:center}
  .h-left{padding:0 22px;align-items:center}
  .h-right{padding:22px;justify-content:center}
  .girl-wrap{max-width:270px}
  .nav{padding:14px 22px}.nav.s{padding:10px 22px}
  .nl-wrap{display:none}.burg{display:flex}
  .about-g,.cg{grid-template-columns:1fr;gap:42px}
  .anim-sc{grid-template-columns:1fr}
  .sec{padding:78px 22px}
  .h-ctas{justify-content:center}
}
`;

/* ══════ CURSOR ══════ */
function Cursor() {
  const d = useRef(null), r = useRef(null);
  const p = useRef({ x: -100, y: -100 }), t = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const mv = e => { t.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    let id;
    const lp = () => {
      p.current.x += (t.current.x - p.current.x) * .1;
      p.current.y += (t.current.y - p.current.y) * .1;
      if (d.current) { d.current.style.left = t.current.x + "px"; d.current.style.top = t.current.y + "px"; }
      if (r.current) { r.current.style.left = p.current.x + "px"; r.current.style.top = p.current.y + "px"; }
      id = requestAnimationFrame(lp);
    };
    lp();
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(id); };
  }, []);
  return <><div id="c1" ref={d} /><div id="c2" ref={r} /></>;
}

/* ══════ AURORA ══════ */
function Aurora() {
  return <><div className="ab ab1" /><div className="ab ab2" /><div className="ab ab3" /></>;
}

/* ══════ LI ICON ══════ */
const Li = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ══════ TYPEWRITER ══════ */
const ROLES = ["UI/UX Designer","Interactive Media Student","MERN Stack Developer","3D Modelling Artist","2D Animator","Digital Experience Creator"];
function Typer() {
  const [i,si] = useState(0), [c,sc] = useState(0), [del,sd] = useState(false);
  useEffect(() => {
    const w = ROLES[i % ROLES.length];
    const id = setTimeout(() => {
      if (!del && c < w.length) sc(x=>x+1);
      else if (!del) setTimeout(()=>sd(true),1800);
      else if (del && c > 0) sc(x=>x-1);
      else { sd(false); si(x=>x+1); }
    }, del ? 44 : 88);
    return () => clearTimeout(id);
  }, [c,del,i]);
  return <><em>{ROLES[i%ROLES.length].slice(0,c)}</em><span className="tc"/></>;
}

/* ══════ USE IN VIEW ══════ */
function useInView(thr = .12) {
  const ref = useRef(null), [v,sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting){sv(true);o.disconnect();} },{threshold:thr});
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[thr]);
  return [ref,v];
}

/* ══════ MAG BUTTON ══════ */
function Mag({ children, cls, onClick, as: T = "button", href, target, rel, style }) {
  const ref = useRef(null);
  const mv = e => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX-r.left-r.width/2, y = e.clientY-r.top-r.height/2;
    ref.current.style.transform = `translate(${x*.2}px,${y*.2}px)`;
    ref.current.style.setProperty("--mx",((e.clientX-r.left)/r.width)*100+"%");
    ref.current.style.setProperty("--my",((e.clientY-r.top)/r.height)*100+"%");
  };
  const ml = () => { ref.current.style.transform=""; };
  const props = { ref, className:`btn ${cls}`, onMouseMove:mv, onMouseLeave:ml, style };
  if(T==="a"){ props.href=href; props.target=target; props.rel=rel; } else props.onClick=onClick;
  return <T {...props}>{children}</T>;
}

/* ══════ TILT CARD ══════ */
function Tilt({ children, cls, style, onClick }) {
  const ref = useRef(null);
  const mv = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5, y = (e.clientY-r.top)/r.height-.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*8}deg) scale(1.02)`;
    ref.current.style.setProperty("--mx",((e.clientX-r.left)/r.width)*100+"%");
    ref.current.style.setProperty("--my",((e.clientY-r.top)/r.height)*100+"%");
  };
  const ml = () => { ref.current.style.transform=""; };
  return <div ref={ref} className={cls} style={style} onMouseMove={mv} onMouseLeave={ml} onClick={onClick}>{children}</div>;
}

/* ══════ ANIMATED LETTER WORD ══════ */
function AnimWord({ text, cls, delay = 0 }) {
  const [show,setShow] = useState(false);
  useEffect(() => { const id = setTimeout(()=>setShow(true),delay); return ()=>clearTimeout(id); },[delay]);
  return (
    <span className={cls} style={{display:"block"}}>
      {text.split("").map((l,i) => (
        <span key={i} style={{
          display:"inline-block",
          opacity: show?1:0,
          transform: show?"none":"translateY(60px) rotateX(-60deg)",
          transition:`opacity .65s ${i*.042+delay/1000}s cubic-bezier(.22,1,.36,1),transform .65s ${i*.042+delay/1000}s cubic-bezier(.22,1,.36,1)`,
        }}>{l===" "?"\u00a0":l}</span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO BACKGROUND CANVAS — neural network + rotating globe
══════════════════════════════════════════════════════════════ */
function HeroBg() {
  const cvs = useRef(null), mouse = useRef({x:0,y:0,tx:0,ty:0}), raf = useRef(null);
  useEffect(() => {
    const c = cvs.current; if(!c) return;
    const ctx = c.getContext("2d");
    const resize = ()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const mv = e => { mouse.current.tx=(e.clientX/window.innerWidth-.5)*2; mouse.current.ty=(e.clientY/window.innerHeight-.5)*2; };
    window.addEventListener("mousemove",mv);

    // Globe
    const R=140,LATS=13,LONS=18, gv=[];
    for(let i=0;i<=LATS;i++) for(let j=0;j<LONS;j++){
      const phi=Math.PI*i/LATS,th=Math.PI*2*j/LONS;
      gv.push({ox:R*Math.sin(phi)*Math.cos(th),oy:R*Math.cos(phi),oz:R*Math.sin(phi)*Math.sin(th),ns:Math.random()*Math.PI*2});
    }
    const nodes = Array.from({length:16},()=>({
      x:(Math.random()-.5)*700,y:(Math.random()-.5)*550,z:(Math.random()-.5)*280,
      vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.2,vz:(Math.random()-.5)*.2,
      r:Math.random()*2+1.3,col:["#c4b5fd","#6ee7b7","#f9a8d4","#93c5fd"][Math.floor(Math.random()*4)],ph:Math.random()*Math.PI*2,
    }));

    let t=0;
    const proj=(x,y,z,cx,cy,f=380)=>{ const d=f+z; const s=Math.max(0.02, f/(d||1)); return {x:cx+x*s,y:cy+y*s,a:Math.max(0,Math.min(1,d/(f*1.6))),s}; };
    const rot=(x,y,z,ry,rx)=>{
      const cy=Math.cos(ry),sy=Math.sin(ry),crx=Math.cos(rx),srx=Math.sin(rx);
      const rx2=x*cy+z*sy,rz=-x*sy+z*cy;
      return {x:rx2,y:y*crx-rz*srx,z:y*srx+rz*crx};
    };

    const draw=()=>{
      t+=.013;
      mouse.current.x+=(mouse.current.tx-mouse.current.x)*.05;
      mouse.current.y+=(mouse.current.ty-mouse.current.y)*.05;
      const W=c.width,H=c.height;
      ctx.clearRect(0,0,W,H);
      // Globe sits on right side
      const gcx=W*.68+mouse.current.x*14, gcy=H*.5+mouse.current.y*9;
      const rY=t*.14+mouse.current.x*.28, rX=mouse.current.y*.18;

      for(let i=0;i<=LATS;i++){
        ctx.beginPath(); let f=true;
        for(let j=0;j<=LONS;j++){
          const idx=i*LONS+(j%LONS); if(idx>=gv.length) continue;
          const v=gv[idx], warp=Math.sin(t*.6+v.ns)*11;
          const sc=1+warp/R*.1;
          const r=rot(v.ox*sc,v.oy*sc,v.oz*sc,rY,rX);
          const p=proj(r.x,r.y,r.z,gcx,gcy);
          f?(ctx.moveTo(p.x,p.y),f=false):ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle=`rgba(196,181,253,${.14*(gv[i*LONS]?.a??0.5)})`; ctx.lineWidth=.5; ctx.stroke();
      }
      for(let j=0;j<LONS;j++){
        ctx.beginPath(); let f=true;
        for(let i=0;i<=LATS;i++){
          const idx=i*LONS+j; if(idx>=gv.length) continue;
          const v=gv[idx], r=rot(v.ox,v.oy,v.oz,rY,rX), p=proj(r.x,r.y,r.z,gcx,gcy);
          f?(ctx.moveTo(p.x,p.y),f=false):ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle="rgba(147,197,253,0.08)"; ctx.lineWidth=.4; ctx.stroke();
      }

      nodes.forEach(n=>{ n.x+=n.vx;n.y+=n.vy;n.z+=n.vz;n.ph+=.04;
        if(Math.abs(n.x)>400)n.vx*=-1;if(Math.abs(n.y)>320)n.vy*=-1;if(Math.abs(n.z)>200)n.vz*=-1;
      });
      nodes.forEach((a,i)=>nodes.forEach((b,j)=>{
        if(j<=i) return;
        const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z,dist=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist>180) return;
        const ra=rot(a.x,a.y,a.z,rY,rX),rb=rot(b.x,b.y,b.z,rY,rX);
        const pa=proj(ra.x,ra.y,ra.z,gcx,gcy),pb=proj(rb.x,rb.y,rb.z,gcx,gcy);
        const al=(1-dist/180)*.16*pa.a*pb.a;
        ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);
        ctx.strokeStyle=`rgba(196,181,253,${al})`;ctx.lineWidth=.55;ctx.stroke();
      }));
      nodes.forEach(n=>{
        const r=rot(n.x,n.y,n.z,rY,rX),p=proj(r.x,r.y,r.z,gcx,gcy);
        const pulse=.7+Math.sin(n.ph)*.3;
        ctx.beginPath();ctx.arc(p.x,p.y,n.r*p.s*pulse*1.5,0,Math.PI*2);
        ctx.fillStyle=n.col;ctx.shadowColor=n.col;ctx.shadowBlur=11;ctx.globalAlpha=p.a*.8;
        ctx.fill();ctx.globalAlpha=1;ctx.shadowBlur=0;
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf.current); ro.disconnect(); window.removeEventListener("mousemove",mv); };
  },[]);
  return <canvas ref={cvs} className="hero-bg-cvs"/>;
}

/* ══════════════════════════════════════════════════════════════
   ROBO GIRL CANVAS — simple robot face + waving robot hand
══════════════════════════════════════════════════════════════ */
function GirlCanvas({ width=380, height=480 }) {
  const cvs = useRef(null), raf = useRef(null);
  useEffect(() => {
    const c = cvs.current; if(!c) return;
    const ctx = c.getContext("2d");
    c.width = width; c.height = height;

    // helper: rounded rect
    const rr = (x,y,w,h,r) => {
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
      ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
      ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
    };

    let t = 0;
    const render = () => {
      t += .018;
      ctx.clearRect(0,0,width,height);
      ctx.lineCap = "round";

      const cx = width / 2;
      const bob = Math.sin(t * .8) * 5;   // gentle float up/down

      // ── soft bg glow ──
      const bg = ctx.createRadialGradient(cx, height*.5, 10, cx, height*.5, 180);
      bg.addColorStop(0,"rgba(124,58,237,0.09)"); bg.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=bg; ctx.fillRect(0,0,width,height);

      // ════ BODY (simple rounded trapezoid, crops at bottom) ════
      const bodyTopY = height*0.60 + bob;
      const bodyHW   = 95;   // half-width at top
      ctx.beginPath();
      ctx.moveTo(cx-bodyHW, bodyTopY);
      ctx.lineTo(cx+bodyHW, bodyTopY);
      ctx.lineTo(cx+bodyHW*1.25, height+10);
      ctx.lineTo(cx-bodyHW*1.25, height+10);
      ctx.closePath();
      const bodyG = ctx.createLinearGradient(cx, bodyTopY, cx, height);
      bodyG.addColorStop(0,"#1e1b3a"); bodyG.addColorStop(1,"#0d0b1f");
      ctx.fillStyle=bodyG; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.22)"; ctx.lineWidth=1.5; ctx.stroke();

      // chest panel decoration
      rr(cx-36, bodyTopY+22, 72, 28, 8);
      ctx.fillStyle="rgba(196,181,253,0.06)"; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.2)"; ctx.lineWidth=1; ctx.stroke();

      // chest LED dots
      [-18,0,18].forEach((dx,i)=>{
        const pulse = 0.4+Math.sin(t*2.2+i*1.3)*.6;
        ctx.beginPath(); ctx.arc(cx+dx, bodyTopY+36, 4, 0, Math.PI*2);
        ctx.fillStyle=["#c4b5fd","#6ee7b7","#f9a8d4"][i];
        ctx.globalAlpha=pulse; ctx.shadowColor=["#c4b5fd","#6ee7b7","#f9a8d4"][i]; ctx.shadowBlur=8;
        ctx.fill(); ctx.globalAlpha=1; ctx.shadowBlur=0;
      });

      // ════ NECK ════
      const neckY = height*0.555 + bob;
      rr(cx-12, neckY, 24, height*0.055, 5);
      const neckG = ctx.createLinearGradient(cx-12,neckY,cx+12,neckY);
      neckG.addColorStop(0,"#252245"); neckG.addColorStop(.5,"#38356a"); neckG.addColorStop(1,"#252245");
      ctx.fillStyle=neckG; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.28)"; ctx.lineWidth=1; ctx.stroke();

      // ════ ROBOT HEAD ════
      const hW=108, hH=92;
      const hx=cx, hy=height*0.41+bob;
      const hL=hx-hW/2, hT=hy-hH/2;

      // head shadow
      rr(hL+3,hT+4,hW,hH,22);
      ctx.fillStyle="rgba(0,0,0,0.3)"; ctx.fill();

      // head main body
      rr(hL,hT,hW,hH,22);
      const headG = ctx.createLinearGradient(hx,hT,hx,hT+hH);
      headG.addColorStop(0,"#2d2a52"); headG.addColorStop(1,"#1a1835");
      ctx.fillStyle=headG; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.45)"; ctx.lineWidth=2; ctx.stroke();

      // inner inset border
      rr(hL+6,hT+6,hW-12,hH-12,17);
      ctx.strokeStyle="rgba(196,181,253,0.1)"; ctx.lineWidth=1; ctx.stroke();

      // ── antenna ──
      ctx.beginPath(); ctx.moveTo(hx,hT); ctx.lineTo(hx,hT-24);
      ctx.strokeStyle="rgba(196,181,253,0.45)"; ctx.lineWidth=2; ctx.stroke();
      const antP = 0.55+Math.sin(t*3.2)*.45;
      ctx.beginPath(); ctx.arc(hx,hT-28,5,0,Math.PI*2);
      ctx.fillStyle="#c4b5fd"; ctx.globalAlpha=antP; ctx.shadowColor="#c4b5fd"; ctx.shadowBlur=14;
      ctx.fill(); ctx.globalAlpha=1; ctx.shadowBlur=0;

      // ── robot EYES (glowing visor bars) ──
      const eyeY = hy-8;
      [-26,26].forEach(ex=>{
        const blink = Math.sin(t*0.35)>0.9 ? 0.08 : 1;  // rare blink
        // socket
        rr(hx+ex-13, eyeY-7, 26, 14*blink, 5);
        ctx.fillStyle="#0d0b1e"; ctx.fill();
        ctx.strokeStyle="rgba(196,181,253,0.3)"; ctx.lineWidth=1; ctx.stroke();
        // glow fill
        rr(hx+ex-10, eyeY-4, 20, 8*blink, 3);
        const eyeG = ctx.createLinearGradient(hx+ex-10,0,hx+ex+10,0);
        eyeG.addColorStop(0,"#c4b5fd"); eyeG.addColorStop(1,"#6ee7b7");
        ctx.fillStyle=eyeG;
        ctx.globalAlpha=0.7+Math.sin(t*1.9+ex*.05)*.3;
        ctx.shadowColor="#c4b5fd"; ctx.shadowBlur=10; ctx.fill();
        ctx.globalAlpha=1; ctx.shadowBlur=0;
      });

      // ── mouth: segmented LED bar ──
      const mY = hy+26;
      for(let i=0;i<7;i++){
        const mx=hx-27+i*9;
        const on=Math.sin(t*3.5+i*.8)>0;
        rr(mx,mY,6,5,2);
        ctx.fillStyle=on?"#6ee7b7":"#1a1835";
        ctx.globalAlpha=on?0.9:0.25;
        if(on){ctx.shadowColor="#6ee7b7"; ctx.shadowBlur=5;}
        ctx.fill(); ctx.globalAlpha=1; ctx.shadowBlur=0;
      }

      // ════ WAVING ROBOT ARM (right side of robot = viewer's right) ════
      const sX = cx + bodyHW - 4;   // shoulder origin — top-right corner of body
      const sY = bodyTopY + 12;

      // upper arm — rotates gently
      const upperA = -Math.PI*0.6 + Math.sin(t*0.9)*0.08;
      const uLen   = 58;
      const eX     = sX + Math.cos(upperA)*uLen;
      const eY     = sY + Math.sin(upperA)*uLen;

      // forearm — waving pivot at elbow
      const waveSwing = Math.sin(t*2.4)*0.55;
      const foreA  = upperA + 0.35 + waveSwing;
      const fLen   = 50;
      const wX     = eX + Math.cos(foreA)*fLen;
      const wY     = eY + Math.sin(foreA)*fLen;

      // draw upper arm
      ctx.beginPath(); ctx.moveTo(sX,sY); ctx.lineTo(eX,eY);
      ctx.strokeStyle="#2d2a52"; ctx.lineWidth=18; ctx.stroke();
      ctx.strokeStyle="rgba(196,181,253,0.28)"; ctx.lineWidth=1.5; ctx.stroke();
      // shoulder joint
      ctx.beginPath(); ctx.arc(sX,sY,9,0,Math.PI*2);
      ctx.fillStyle="#3d3870"; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.35)"; ctx.lineWidth=1.5; ctx.stroke();
      // elbow joint
      ctx.beginPath(); ctx.arc(eX,eY,7,0,Math.PI*2);
      ctx.fillStyle="#3d3870"; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.35)"; ctx.lineWidth=1.5; ctx.stroke();

      // draw forearm
      ctx.beginPath(); ctx.moveTo(eX,eY); ctx.lineTo(wX,wY);
      ctx.strokeStyle="#2d2a52"; ctx.lineWidth=14; ctx.stroke();
      ctx.strokeStyle="rgba(196,181,253,0.22)"; ctx.lineWidth=1.5; ctx.stroke();

      // ── robot HAND ──
      const handA = foreA + 0.15;
      ctx.save();
      ctx.translate(wX, wY);
      ctx.rotate(handA);

      // palm block
      rr(-11,-9,22,18,7);
      const palmG = ctx.createLinearGradient(-11,-9,11,9);
      palmG.addColorStop(0,"#3d3870"); palmG.addColorStop(1,"#252245");
      ctx.fillStyle=palmG; ctx.fill();
      ctx.strokeStyle="rgba(196,181,253,0.4)"; ctx.lineWidth=1.5; ctx.stroke();
      // palm centre LED
      const ledP=0.4+Math.sin(t*2.8)*0.6;
      ctx.beginPath(); ctx.arc(0,0,3,0,Math.PI*2);
      ctx.fillStyle="#c4b5fd"; ctx.globalAlpha=ledP; ctx.shadowColor="#c4b5fd"; ctx.shadowBlur=7;
      ctx.fill(); ctx.globalAlpha=1; ctx.shadowBlur=0;

      // 3 finger stubs
      [-6,0,6].forEach(fy=>{
        rr(11,fy-3,13,7,3);
        ctx.fillStyle="#252245"; ctx.fill();
        ctx.strokeStyle="rgba(196,181,253,0.28)"; ctx.lineWidth=1; ctx.stroke();
      });

      ctx.restore();

      // ── sparkles near hand ──
      for(let i=0;i<6;i++){
        const sa=t*1.5+i*(Math.PI*2/6);
        const sr=16+i*3.5, sp=Math.abs(Math.sin(t*2.1+i));
        const sx=wX+Math.cos(sa)*sr, sy=wY+Math.sin(sa)*sr*0.6;
        const col=["#c4b5fd","#6ee7b7","#f9a8d4"][i%3];
        ctx.beginPath(); ctx.arc(sx,sy,1.5*sp,0,Math.PI*2);
        ctx.fillStyle=col; ctx.globalAlpha=sp*0.7; ctx.shadowColor=col; ctx.shadowBlur=6;
        ctx.fill(); ctx.globalAlpha=1; ctx.shadowBlur=0;
      }

      // ── speech bubble "Hi! 👋" ──
      const bX=wX+40, bY=wY-46;
      const bW=66, bH=34, bp=1+Math.sin(t*2.5)*0.045;
      ctx.save();
      ctx.translate(bX,bY); ctx.scale(bp,bp); ctx.translate(-bX,-bY);
      // bubble bg — use path instead of roundRect for compat
      rr(bX-bW/2,bY-bH/2,bW,bH,12);
      const bubG=ctx.createLinearGradient(bX,bY-bH/2,bX,bY+bH/2);
      bubG.addColorStop(0,"rgba(196,181,253,0.97)"); bubG.addColorStop(1,"rgba(147,197,253,0.93)");
      ctx.fillStyle=bubG; ctx.shadowColor="#c4b5fd"; ctx.shadowBlur=18; ctx.fill(); ctx.shadowBlur=0;
      // tail
      ctx.beginPath(); ctx.moveTo(bX-12,bY+bH/2-2); ctx.lineTo(bX-22,bY+bH/2+13); ctx.lineTo(bX,bY+bH/2-2);
      ctx.fillStyle="rgba(196,181,253,0.94)"; ctx.fill();
      // text
      ctx.font="bold 13px Inter,sans-serif"; ctx.fillStyle="#1a0a2e";
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("Hi! 👋",bX,bY);
      ctx.restore();

      raf.current = requestAnimationFrame(render);
    };
    render();
    return ()=>cancelAnimationFrame(raf.current);
  },[width,height]);
  return <canvas ref={cvs} className="girl-cvs" style={{width:"100%",display:"block"}}/>;
}


/* ══════ NAV ══════ */
function Nav() {
  const [sc,setSc]=useState(false),[mo,setMo]=useState(false);
  useEffect(()=>{ const h=()=>setSc(window.scrollY>50); window.addEventListener("scroll",h); return ()=>window.removeEventListener("scroll",h); },[]);
  const go=id=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMo(false); };
  const links=["about","skills","experience","projects","contact"];
  return (
    <nav className={`nav${sc?" s":""}`}>
      <div className="logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>VR.</div>
      <div className="nl-wrap">
        {links.map(l=><button key={l} className="nl" onClick={()=>go(l)}>{l}</button>)}
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="li-nav"><Li/>LinkedIn</a>
        <button className="hire-btn" onClick={()=>go("contact")}>Hire Me</button>
      </div>
      <button className="burg" onClick={()=>setMo(o=>!o)}><span/><span/><span/></button>
      {mo&&(
        <div style={{position:"fixed",inset:0,top:54,background:"rgba(5,5,15,.97)",backdropFilter:"blur(16px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:26,zIndex:590}}>
          {links.map(l=><button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",color:"var(--text)",fontFamily:"var(--fd)",fontSize:"3rem",letterSpacing:".08em",cursor:"pointer",textTransform:"uppercase"}}>{l}</button>)}
          <a href={LINKEDIN} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:10,color:"#93c5fd",textDecoration:"none",fontFamily:"var(--fb)",fontSize:"1rem",fontWeight:700}}><Li s={20}/>LinkedIn</a>
        </div>
      )}
    </nav>
  );
}

/* ══════ HERO ══════ */
function Hero() {
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <section className="hero">
      <HeroBg/>
      <Aurora/>
      {/* LEFT — NAME + TEXT */}
      <div className="h-left">
        <div className="h-name">
          <AnimWord text="VILANI" cls="hn1" delay={300}/>
          <AnimWord text="RATHNAYAKA" cls="hn2" delay={520}/>
        </div>
        <div className="h-role" style={{opacity:0,animation:"lu .7s 1.1s ease forwards"}}>
          <Typer/>
        </div>
        <p className="h-tag" style={{opacity:0,animation:"lu .8s 1.4s ease forwards"}}>
          "Where design thinking, code &amp; creative dimension converge"
        </p>
        <div className="h-ctas" style={{opacity:0,animation:"lu .7s 1.7s ease forwards"}}>
          <Mag cls="btn-p" onClick={()=>go("projects")}>View Projects →</Mag>
          <Mag cls="btn-g" as="a" href={LINKEDIN} target="_blank" rel="noreferrer"><Li s={16}/>LinkedIn</Mag>
          <Mag cls="btn-g" onClick={()=>go("contact")}>Let's Talk</Mag>
        </div>
      </div>
      {/* RIGHT — ANIMATED GIRL */}
      <div className="h-right" style={{opacity:0,animation:"lu .9s .5s ease forwards"}}>
        <div className="girl-wrap">
          <GirlCanvas width={380} height={480}/>
          <div className="girl-badge">✦ 2D Character Animation</div>
        </div>
      </div>
      <div className="sh">
        <div className="sh-t"><div className="sh-b"/></div>
        <span className="sh-l">scroll</span>
      </div>
    </section>
  );
}

/* ══════ ABOUT ══════ */
const PARAS=[
  "I'm an Interactive Media undergraduate at SLIIT, pursuing a BSc (Hons) in Information Technology with a specialisation in Interactive Media.",
  "My work lives at the intersection of design thinking and technical execution. I care deeply about crafting interfaces that are both beautiful and genuinely useful.",
  "My experience spans UI/UX design, full-stack web development with the MERN stack, mobile application development, 3D modelling, and 2D animation. I work with Figma to prototype and validate ideas before writing a single line of code.",
  "I'm at an exciting stage in my career.I have real shipped projects and a growing design vocabulary, and I'm actively looking for opportunities where I can contribute and keep learning.",
];
function About() {
  const [ref,vis]=useInView(.1), [li,sli]=useState(-1);
  useEffect(()=>{ if(!vis) return; PARAS.forEach((_,i)=>setTimeout(()=>sli(i),i*300+200)); },[vis]);
  return (
    <section id="about" className="sec about" ref={ref}>
      <div className="wrap">
        <div className="about-g">
          <div>
            <div className="stag">About Me</div>
            <h2 className="sh2" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:".7s"}}>
              Design meets<br/><span style={{color:"var(--v)"}}>dimension.</span>
            </h2>
            {PARAS.map((p,i)=>(
              <p key={i} className={`ap${i<=li?" lit":""}`}
                style={{opacity:vis?(i<=li?1:.24):0,transform:vis?"none":"translateX(-12px)",transition:`opacity .55s ${i*.12}s,transform .55s ${i*.12}s,border-color .5s,color .5s`}}>
                {p}
              </p>
            ))}
            <div style={{marginTop:30,display:"flex",gap:10,flexWrap:"wrap",opacity:vis?1:0,transition:"opacity .7s .6s"}}>
              {[["📍","Homagama, Sri Lanka"],["🎓","SLIIT 2021–Present"],["💼","Open to opportunities"]].map(([ic,t])=>(
                <span key={t} className="chip">{ic} {t}</span>
              ))}
            </div>
          </div>
          <div style={{position:"relative",minHeight:400,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle at 40% 40%,var(--v) 0%,var(--p) 40%,var(--g) 80%,transparent 100%)",filter:"blur(2px)",opacity:.18,animation:"ob 6s ease-in-out infinite alternate",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
            <style>{`@keyframes ob{0%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(-50%,-50%) scale(1.11)}}`}</style>
            <div className="sc" style={{position:"relative",zIndex:1,width:"100%",maxWidth:360}}>
              {[["4+","Projects Built"],["2+","Years Learning"],["MERN","Stack Dev"],["Blender","3D Modelling"],["2D","Animation"]].map(([v,l])=>(
                <div key={l} className="sr"><span className="sv">{v}</span><span className="sl">{l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ SKILLS ══════ */
const SKILLS=[
  {cat:"UI / UX",name:"Design",icon:"✦",items:["Figma","Canva","Wireframing","Prototyping"],ac:"#c4b5fd",cg:"rgba(196,181,253,.12)"},
  {cat:"Frontend",name:"Web Dev",icon:"⌨",items:["React","Node.js","Express","MongoDB","JavaScript"],ac:"#6ee7b7",cg:"rgba(110,231,183,.1)"},
  {cat:"Backend",name:"Server",icon:"◈",items:["PHP","MySQL","REST APIs","Database Design"],ac:"#fcd34d",cg:"rgba(252,211,77,.09)"},
  {cat:"Mobile",name:"Mobile",icon:"📱",items:["Kotlin","Java","Android Studio"],ac:"#f9a8d4",cg:"rgba(249,168,212,.1)"},
  {cat:"3D Modelling",name:"3D Art",icon:"◉",items:["Blender","Sculpting","Rendering","Lighting"],ac:"#93c5fd",cg:"rgba(147,197,253,.11)"},
  {cat:"2D Animation",name:"Animation",icon:"▶",items:["Frame Animation","Character Rigging","Motion Design","Storytelling"],ac:"#fcd34d",cg:"rgba(252,211,77,.09)"},
  {cat:"Creative",name:"Tools",icon:"⬡",items:["Git & GitHub","After Effects","Design Systems","Unity"],ac:"#f9a8d4",cg:"rgba(249,168,212,.1)"},
];

function AnimShowcase({ vis }) {
  return (
    <div className="anim-sc" style={{opacity:vis?1:0,transform:vis?"none":"translateY(30px)",transition:"opacity .8s .5s,transform .8s .5s"}}>
      <div className="anim-cvs-side">
        <div className="anim-live">● Live Animation</div>
        <div style={{width:"100%",maxWidth:280}}>
          <GirlCanvas width={280} height={360}/>
        </div>
      </div>
      <div className="anim-info">
        <div className="anim-sub">2D Animation & Character Design</div>
        <h3 className="anim-h">Bringing characters<br/><span style={{color:"var(--v)"}}>to life.</span></h3>
        <p className="anim-d">Currently exploring 2D character animation — keyframing fluid motion cycles, designing rigs, and telling stories through movement. This waving character demonstrates smooth wave cycles, hair physics, expressive facial performance, and sparkle effects built entirely with Canvas 2D.</p>
        <div className="anim-tags">
          {["Frame Animation","Character Rigging","Motion Curves","Hair Physics","Facial Expression","Storytelling"].map(t=><span key={t} className="at">{t}</span>)}
        </div>
        <div className="anim-tools">
          {[["🎨","Blender"],["🎬","After Effects"],["✏️","Hand-keyed"]].map(([ic,l])=>(
            <div key={l} className="atool">{ic} {l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const [ref,vis]=useInView();
  return (
    <section id="skills" className="sec skills" ref={ref}>
      <div className="wrap">
        <div className="stag">Capabilities</div>
        <h2 className="sh2" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:".7s"}}>
          Skills & <span style={{color:"var(--g)"}}>tools.</span>
        </h2>
        <div className="sk-grid">
          {SKILLS.map((s,i)=>(
            <Tilt key={s.cat} cls="sk" style={{"--ca":s.ac,"--cg":s.cg,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(26px)",transition:`opacity .6s ${i*.07}s,transform .6s ${i*.07}s`}}>
              <div className="sk-icon">{s.icon}</div>
              <div className="sk-cat">{s.cat}</div>
              <div className="sk-name">{s.name}</div>
              <div className="pills">{s.items.map(it=><span key={it} className="pill">{it}</span>)}</div>
            </Tilt>
          ))}
          <AnimShowcase vis={vis}/>
        </div>
      </div>
    </section>
  );
}

/* ══════ EXPERIENCE ══════ */
const EXP=[
  {icon:"🎓",role:"Interactive Media Undergraduate",company:"SLIIT",period:"2021–Present",loc:"Malabe, Sri Lanka",ac:"#c4b5fd",eg:"rgba(196,181,253,.07)",desc:"BSc (Hons) IT — Interactive Media specialisation. Building expertise across UI/UX, full-stack dev, mobile, 3D modelling, and 2D animation.",tags:["UI/UX","MERN Stack","Mobile Dev","3D Modelling","2D Animation"]},
  {icon:"🎨",role:"3D Modelling & 2D Animator",company:"Creative Practice — Ongoing",period:"2023–Present",loc:"Self-Directed",ac:"#93c5fd",eg:"rgba(147,197,253,.07)",desc:"Developing 3D modelling in Blender — sculpting, rigging, rendering and lighting. Also practising 2D animation: frame-by-frame character cycles, motion design and visual storytelling.",tags:["Blender","3D Modelling","2D Animation","Motion Design","Character Rigging"]},
  {icon:"🐾",role:"Full-Stack Developer",company:"PawPal — Academic Project",period:"2023",loc:"Team Project",ac:"#6ee7b7",eg:"rgba(110,231,183,.07)",desc:"Led frontend for a pet management system: health records, adoption workflow, medicine store, chatbot. Agile team collaboration.",tags:["React","Node.js","MongoDB","UX Design","Team Lead"]},
  {icon:"🌿",role:"MERN Stack Developer",company:"AyuMitra — Academic Project",period:"2023",loc:"Solo Project",ac:"#fcd34d",eg:"rgba(252,211,77,.07)",desc:"End-to-end Ayurvedic e-commerce — Figma wireframes → database schema → React frontend.",tags:["MongoDB","Express","React","Node.js","Figma"]},
  {icon:"🩸",role:"Backend Developer",company:"DonorLink — Academic Project",period:"2022",loc:"Team Project",ac:"#f9a8d4",eg:"rgba(249,168,212,.07)",desc:"Normalised relational database and backend logic for a blood donation system using PHP & MySQL.",tags:["PHP","MySQL","REST APIs","Database Design"]},
  {icon:"📱",role:"UI/UX Designer",company:"Mobile UI Collection — Figma",period:"2022–2023",loc:"Self-Initiated",ac:"#f9a8d4",eg:"rgba(249,168,212,.07)",desc:"Gym tracker, habit tracker, art gallery app — wireframes to high-fidelity interactive prototypes in Figma.",tags:["Figma","Android Studio","Prototyping","UX Research"]},
];

function EC({ exp, idx, vis }) {
  const [open,setOpen]=useState(false), ref=useRef(null);
  const mv=e=>{ const r=ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx",((e.clientX-r.left)/r.width)*100+"%"); ref.current.style.setProperty("--my",((e.clientY-r.top)/r.height)*100+"%"); };
  return (
    <div ref={ref} className={`ec${open?" open":""}`}
      style={{"--ea":exp.ac,"--eg":exp.eg,opacity:vis?1:0,transform:vis?"none":"translateX(-22px)",transition:`opacity .65s ${idx*.08}s,transform .65s ${idx*.08}s`}}
      onMouseMove={mv} onClick={()=>setOpen(o=>!o)}>
      <div className="ec-hd">
        <div className="ec-l">
          <div className="ec-ico">{exp.icon}</div>
          <div><div className="ec-role">{exp.role}</div><div className="ec-co">{exp.company}</div></div>
        </div>
        <div className="ec-r">
          <span className="ec-per">{exp.period}</span>
          <span className="ec-loc">📍 {exp.loc}</span>
          <div className="ec-chev">▾</div>
        </div>
      </div>
      <div className="ec-body">
        <div className="ec-in">
          <p className="ec-desc">{exp.desc}</p>
          <div className="ec-tags">{exp.tags.map(t=><span key={t} className="etag" style={{borderColor:exp.ac+"44",color:exp.ac}}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  const [ref,vis]=useInView(.1);
  return (
    <section id="experience" className="sec experience" ref={ref}>
      <div className="wrap">
        <div className="stag">Journey</div>
        <h2 className="sh2" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:".7s"}}>
          Experience & <span style={{color:"var(--o)"}}>growth.</span>
        </h2>
        <div className="exp-list">{EXP.map((e,i)=><EC key={e.company} exp={e} idx={i} vis={vis}/>)}</div>
      </div>
    </section>
  );
}

/* ══════ PROJECTS ══════ */
const PROJ=[
  {em:"🐾",title:"PawPal",sub:"Pet Management System",desc:"Full-stack web app: health records, adoption, medicine store + chatbot.",tech:["MERN Stack","Java","Chatbot"],col:"#6ee7b7",bg:"rgba(110,231,183,.08)",full:"PawPal is a comprehensive pet management system built with the MERN stack.\n\nFeatures health records, an adoption workflow connecting shelters with adopters, and an integrated medicine store. A chatbot provides instant answers about pet care.\n\nThis team project pushed me to think about complex user flows and building something genuinely useful in the real world."},
  {em:"🌿",title:"AyuMitra",sub:"Ayurvedic E-Commerce",desc:"Marketplace for Ayurvedic products with database-driven inventory and clean UX.",tech:["MongoDB","Express","React","Node.js"],col:"#fcd34d",bg:"rgba(252,211,77,.08)",full:"AyuMitra is a MERN stack e-commerce platform for authentic Ayurvedic products.\n\nStructured catalogue, dynamic inventory, category browsing, and smooth checkout — wrapped in a clean, trustworthy interface.\n\nDeepened my understanding of state management in React, RESTful API design, and how design decisions affect conversion."},
  {em:"🩸",title:"DonorLink",sub:"Blood Donation System",desc:"Donation records, event registration, and donor availability with PHP & MySQL.",tech:["PHP","MySQL","Full-Stack"],col:"#f9a8d4",bg:"rgba(249,168,212,.08)",full:"Blood donation management system built with PHP and MySQL.\n\nDonors track history; organisers manage blood drives and type availability.\n\nWell-normalised relational database schema for data integrity and efficient queries. Strong foundations in backend architecture."},
  {em:"📱",title:"Mobile UIs",sub:"Figma Prototypes & Android",desc:"Gym tracker, habit tracker, and art gallery app — wireframes to prototypes.",tech:["Figma","Android Studio","Prototyping"],col:"#c4b5fd",bg:"rgba(196,181,253,.08)",full:"Three mobile UI/UX case studies exploring different visual languages.\n\nGym Tracker — bold dark UI for quick in-workout interactions.\nHabit Tracker — calm minimal aesthetic around daily streaks.\nArt Gallery — editorial layout bringing a gallery to mobile.\n\nFull wireframing → component design → interactive prototyping in Figma."},
];

function ProjModal({ p, onClose }) {
  useEffect(()=>{ const h=e=>e.key==="Escape"&&onClose(); document.addEventListener("keydown",h); document.body.style.overflow="hidden"; return ()=>{ document.removeEventListener("keydown",h); document.body.style.overflow=""; }; },[onClose]);
  return (
    <div className="mbg" onClick={onClose}>
      <div className="mo" onClick={e=>e.stopPropagation()}>
        <button className="mcls" onClick={onClose}>✕</button>
        <span style={{display:"inline-block",fontSize:".6rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"4px 13px",borderRadius:100,marginBottom:16,background:p.bg,color:p.col,border:`1px solid ${p.col}44`}}>Project</span>
        <div style={{fontSize:"2.5rem",marginBottom:13}}>{p.em}</div>
        <div style={{fontFamily:"var(--fd)",fontSize:"2rem",letterSpacing:".04em",marginBottom:4}}>{p.title}</div>
        <div style={{fontSize:".76rem",color:p.col,marginBottom:18,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>{p.sub}</div>
        <p style={{fontSize:".88rem",color:"rgba(238,234,248,.66)",lineHeight:1.85,whiteSpace:"pre-line",marginBottom:22}}>{p.full}</p>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:".7rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--v)",marginBottom:11}}>Technologies Used</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{p.tech.map(t=><span key={t} style={{fontSize:".78rem",fontWeight:600,padding:"6px 12px",borderRadius:8,background:p.col+"15",border:`1.5px solid ${p.col}44`,color:p.col}}>{t}</span>)}</div>
        </div>
        <a href="https://github.com/vikisan2000" target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:100,background:p.col+"18",border:`1.5px solid ${p.col}44`,color:p.col,textDecoration:"none",fontWeight:600,fontSize:".82rem",letterSpacing:".05em",transition:".2s",cursor:"pointer"}} onMouseEnter={e=>{e.target.style.background=p.col+"28";e.target.style.borderColor=p.col+"88";}} onMouseLeave={e=>{e.target.style.background=p.col+"18";e.target.style.borderColor=p.col+"44";}}>
          🔗 View on GitHub
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const [ref,vis]=useInView(), [modal,setModal]=useState(null);
  return (
    <section id="projects" className="sec projects" ref={ref}>
      <div className="wrap">
        <div className="stag">Real Work</div>
        <h2 className="sh2" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:".7s"}}>
          Featured <span style={{color:"var(--o)"}}>projects.</span>
        </h2>
        <div className="pg">
          {PROJ.map((p,i)=>(
            <Tilt key={p.title} cls="pc" style={{opacity:vis?1:0,transform:vis?"none":"translateY(26px)",transition:`opacity .65s ${i*.11}s,transform .65s ${i*.11}s`}} onClick={()=>setModal(p)}>
              <div className="pc-hd" style={{background:p.bg}}><span className="pc-em">{p.em}</span><div className="pc-sh"/></div>
              <div className="pc-b">
                <div className="pc-title">{p.title}</div>
                <div className="pc-sub">{p.sub}</div>
                <p className="pc-desc">{p.desc}</p>
                <div className="pc-tech">{p.tech.map(t=><span key={t} className="tc">{t}</span>)}</div>
                <button className="pc-cta">View Details <span>→</span></button>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
      {modal&&<ProjModal p={modal} onClose={()=>setModal(null)}/>}
    </section>
  );
}

/* ══════ CONTACT ══════ */
function Contact() {
  const [ref,vis]=useInView(), [form,setF]=useState({name:"",email:"",msg:""}), [sent,setSent]=useState(false), [loading,setLoading]=useState(false), [error,setError]=useState("");
  const sub=async e=>{ 
    e.preventDefault(); 
    setLoading(true); 
    setError("");
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('message', form.msg);
      formData.append('_captcha', 'false');
      
      const res = await fetch('https://formsubmit.co/vilanirathnayaka00@gmail.com', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        setSent(true);
        setF({name:"",email:"",msg:""});
      } else {
        setError('Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Error sending email. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="sec contact" ref={ref}>
      <div className="wrap">
        <div className="stag">Say Hello</div>
        <h2 className="sh2" style={{opacity:vis?1:0,transform:vis?"none":"translateY(22px)",transition:".7s"}}>
          Let's <span style={{color:"var(--p)"}}>connect.</span>
        </h2>
        <div className="cg">
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(-22px)",transition:"opacity .7s .2s,transform .7s .2s"}}>
            {sent?(
              <div className="fsent">
                <div className="fsico">✓</div>
                <p style={{fontFamily:"var(--fd)",fontSize:"1.25rem"}}>Message sent!</p>
                <p style={{fontSize:".82rem",color:"var(--muted)"}}>Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={()=>{setSent(false);setError("");}} style={{marginTop:14,background:"rgba(196,181,253,.2)",border:"1px solid rgba(196,181,253,.4)",color:"#c4b5fd",padding:"8px 16px",borderRadius:8,fontSize:".76rem",fontWeight:600,cursor:"pointer",transition:".2s"}} onMouseEnter={e=>{e.target.style.background="rgba(196,181,253,.3)";}} onMouseLeave={e=>{e.target.style.background="rgba(196,181,253,.2)";}}>Send Another</button>
              </div>
            ):error?(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:20,textAlign:"center",border:"1px solid rgba(249,168,212,.3)",borderRadius:12,background:"rgba(249,168,212,.08)"}}>
                <div style={{fontSize:"1.8rem"}}>⚠</div>
                <p style={{fontSize:".88rem",color:"rgba(238,234,248,.8)"}}>{error}</p>
                <button onClick={()=>setError("")} style={{marginTop:8,background:"rgba(249,168,212,.2)",border:"1px solid rgba(249,168,212,.4)",color:"#f9a8d4",padding:"8px 16px",borderRadius:8,fontSize:".76rem",fontWeight:600,cursor:"pointer",transition:".2s"}} onMouseEnter={e=>{e.target.style.background="rgba(249,168,212,.3)";}} onMouseLeave={e=>{e.target.style.background="rgba(249,168,212,.2)";}}>Try Again</button>
              </div>
            ):(
              <form onSubmit={sub} style={{display:"flex",flexDirection:"column"}}>
                <div className="ff"><input type="text" required placeholder="x" value={form.name} onChange={e=>setF(f=>({...f,name:e.target.value}))} disabled={loading}/><label>Your Name</label></div>
                <div className="ff"><input type="email" required placeholder="x" value={form.email} onChange={e=>setF(f=>({...f,email:e.target.value}))} disabled={loading}/><label>Email Address</label></div>
                <div className="ff"><textarea rows={5} required placeholder="x" value={form.msg} onChange={e=>setF(f=>({...f,msg:e.target.value}))} disabled={loading}/><label>Your Message</label></div>
                <Mag cls="btn-p" style={{alignSelf:"flex-start",marginTop:8,opacity:loading?.6:1,pointerEvents:loading?"none":"auto"}}>{loading?"Sending...":"Send Message ✦"}</Mag>
              </form>
            )}
          </div>
          <div style={{opacity:vis?1:0,transform:vis?"none":"translateX(22px)",transition:"opacity .7s .35s,transform .7s .35s"}}>
            <p style={{fontSize:".93rem",color:"var(--muted)",lineHeight:1.86,marginBottom:26}}>
              Looking for internships, collaborations, and conversations about design, code, and creative work. Let's build something great together.
            </p>
            <div className="ci-list">
              {[
                {ic:"✉",lb:"Email",vl:"vilanirathnayaka00@gmail.com",href:"mailto:vilanirathnayaka00@gmail.com",cl:""},
                {ic:<Li s={16}/>,lb:"LinkedIn",vl:"Vilani Rathnayaka",href:LINKEDIN,cl:"li"},
                {ic:"📍",lb:"Location",vl:"Homagama, Sri Lanka",href:null,cl:""},
                {ic:"🎓",lb:"University",vl:"SLIIT — Interactive Media",href:null,cl:""},
              ].map(({ic,lb,vl,href,cl})=>{
                const T=href?"a":"div";
                return <T key={lb} className={`ci${cl?" "+cl:""}`} {...(href?{href,target:"_blank",rel:"noreferrer"}:{})}>
                  <div className="ci-ic">{ic}</div>
                  <div><div className="ci-lb">{lb}</div><div className="ci-vl">{vl}</div></div>
                </T>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════ FOOTER ══════ */
function Footer() {
  return (
    <footer className="footer">
      <p>Designed & built by <span>Vilani Rathnayaka</span> · {new Date().getFullYear()} · Interactive Media, SLIIT ·{" "}
        <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
      </p>
    </footer>
  );
}

/* ══════ APP ══════ */
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Cursor/>
      <Nav/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Experience/>
        <Projects/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}