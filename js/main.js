(function(){
const K=window.KSZ, page=document.body.dataset.page||"home", $=(s,r=document)=>r.querySelector(s);
const wa=t=>`https://wa.me/${K.whatsapp}?text=${encodeURIComponent(t||"Hello KSZ Ventures, I'd like to make an enquiry.")}`;
function paintImages(){document.querySelectorAll("[data-img]").forEach(el=>{const u=K.IMAGES[el.dataset.img];
 if(el.tagName==="IMG"){el.loading="lazy";el.onerror=()=>{el.removeAttribute("src");el.classList.add("img-fallback")};if(u)el.src=u;else el.classList.add("img-fallback")}
 else if(u)el.style.backgroundImage=`url("${u}")`});}
const nav=`<header class="nav"><div class="wrap nav-in">
<a class="logo" href="index.html" aria-label="KSZ Ventures Limited home"><span class="logo-mark">KSZ</span><span class="logo-txt">VENTURES LIMITED</span></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
<nav class="links" id="links">
<a href="transport.html" class="${page==="transport"?"on":""}">Home / Transport</a>
<a href="printing.html" class="${page==="printing"?"on":""}">Printing &amp; Branding</a>
<a href="index.html#about" class="${page==="home"?"on":""}">About Us</a>
<a href="#contact">Contact Us</a>
<a class="btn red" href="${page==="printing"?"printing.html#quote":"transport.html#book"}">${page==="printing"?"Get a Quote":"Book a Bus"}</a>
</nav></div></header>`;
const foot=`<footer class="foot" id="contact"><div class="wrap foot-grid">
<div><a class="logo light" href="index.html"><span class="logo-mark">KSZ</span><span class="logo-txt">VENTURES LIMITED</span></a>
<p>Printing, branding and corporate visibility solutions, plus safe and reliable transport and logistics, from Abuja, Nigeria.</p><p class="rc">${K.rc}</p>
<div class="soc"><a href="${K.facebook}" aria-label="Facebook">f</a><a href="${K.instagram}" aria-label="Instagram">ig</a><a href="${K.x}" aria-label="X">x</a></div></div>
<div><h4>Quick links</h4><a href="index.html">Home</a><a href="transport.html">Transport</a><a href="printing.html">Printing &amp; Branding</a><a href="index.html#about">About Us</a></div>
<div><h4>Transport &amp; Logistics</h4><a href="transport.html#services">Bus hire</a><a href="transport.html#fleet">Our fleet</a><a href="transport.html#logistics">Goods delivery</a><a href="transport.html#book">Book a bus</a></div>
<div><h4>Printing &amp; Branding</h4><a href="printing.html#catalogue">Services</a><a href="printing.html#work">Our work</a><a href="printing.html#quote">Get a quote</a></div>
<div><h4>Contact</h4><p>${K.address}</p>${K.phones.map(p=>`<a href="tel:${p}">${p}</a>`).join("")}
<a href="${wa()}" target="_blank" rel="noopener">WhatsApp us</a><a href="mailto:${K.email}">${K.email}</a>
<button class="btn ghost sm" data-chat>Chat with our assistant</button></div></div>
<div class="copy wrap">© ${new Date().getFullYear()} ${K.company} (${K.rc}). All rights reserved.</div></footer>`;
document.body.insertAdjacentHTML("afterbegin",nav);document.body.insertAdjacentHTML("beforeend",foot);
const b=$(".burger"),l=$("#links");b.onclick=()=>{const o=l.classList.toggle("open");b.setAttribute("aria-expanded",o)};
l.addEventListener("click",e=>{if(e.target.tagName==="A"){l.classList.remove("open");b.setAttribute("aria-expanded",false)}});
/* ---- chatbot: keyword FAQ, no external API ---- */
const FAQ=[
 {k:["bus hire","hire","coaster","rent"],a:"We hire out well-maintained Coaster buses with professional drivers for schools, churches, corporate groups, ceremonies, events and excursions. Use the booking form on the Transport page or message us on WhatsApp.",u:"transport.html#book"},
 {k:["school","church"],a:"We provide bus hire for schools and churches, for trips, excursions and other special engagements.",u:"transport.html#book"},
 {k:["corporate","staff"],a:"Corporate transportation is available for organisations, with punctual and professional service.",u:"transport.html#book"},
 {k:["event","wedding","ceremony","excursion"],a:"We transport guests for ceremonies, events and excursions. Send us your date, pickup and destination.",u:"transport.html#book"},
 {k:["goods","logistics","delivery","package","cargo"],a:"We offer goods transportation and logistics, delivering packages, goods and other items to destinations across Nigeria.",u:"transport.html#logistics"},
 {k:["intercity","intracity","abuja","travel"],a:"We run intracity transport within Abuja and intercity trips using our Coaster buses.",u:"transport.html#services"},
 {k:["print","press","paper","flyer","offset"],a:"Our press service covers design and printing of all kinds of paper work, including offset printing.",u:"printing.html#catalogue"},
 {k:["embroidery","monogram","badge"],a:"We do monogram and embroidery work, including customised badges.",u:"printing.html#catalogue"},
 {k:["large","banner","sticker","roll"],a:"Large-format printing includes banners, stickers and roll-up banners.",u:"printing.html#catalogue"},
 {k:["souvenir","gift","promotional","brand"],a:"We produce souvenirs, corporate branding and customised promotional products for events and businesses.",u:"printing.html#catalogue"},
 {k:["quote","quotation","price","cost"],a:"To get a quotation, fill in the Get a Quote form on the Printing page (you can attach artwork). We'll reply with a quote for your project.",u:"printing.html#quote"},
 {k:["address","where","location","office"],a:`You can find us at ${K.address}.`},
 {k:["phone","call","number","contact"],a:`Call us on ${K.phones.slice(0,2).join(" or ")}, or email ${K.email}.`}
];
const quick=["Bus hire","Goods delivery","Printing services","Embroidery","Get a quote","Souvenirs"];
document.body.insertAdjacentHTML("beforeend",`<button class="chat-fab" aria-label="Open chat" data-chat>Chat</button>
<section class="chat" id="chat" hidden aria-label="Customer support chat"><div class="chat-h"><b>KSZ Support</b><button aria-label="Close chat" id="cx">&times;</button></div>
<div class="chat-b" id="cb" aria-live="polite"></div><div class="chat-q" id="cq"></div>
<div class="chat-c"><a target="_blank" rel="noopener" id="cwa">WhatsApp</a><a id="cem">Email</a></div>
<form class="chat-f" id="cf"><input id="ci" placeholder="Type your question" autocomplete="off" aria-label="Your question"><button>Send</button></form></section>`);
const cb=$("#cb"),chat=$("#chat");
const say=(t,me,u)=>{const d=document.createElement("div");d.className="m "+(me?"me":"bot");d.textContent=t;if(u){const a=document.createElement("a");a.href=u;a.textContent="Open section";d.append(" ",a)}cb.append(d);cb.scrollTop=cb.scrollHeight};
function reply(q){const s=q.toLowerCase(),hit=FAQ.find(f=>f.k.some(w=>s.includes(w)));
 say(hit?hit.a:"I can help with bus hire, logistics, printing, embroidery, large format, souvenirs and quotes. For anything else, tap WhatsApp or Email below.",0,hit&&hit.u);
 $("#cwa").href=wa("Hello KSZ Ventures. "+q);$("#cem").href=`mailto:${K.email}?subject=${encodeURIComponent("Enquiry")}&body=${encodeURIComponent(q)}`}
$("#cq").innerHTML=quick.map(q=>`<button type="button">${q}</button>`).join("");
$("#cq").onclick=e=>{if(e.target.tagName==="BUTTON"){say(e.target.textContent,1);reply(e.target.textContent)}};
$("#cf").onsubmit=e=>{e.preventDefault();const v=$("#ci").value.trim();if(!v)return;say(v,1);$("#ci").value="";reply(v)};
$("#cwa").href=wa();$("#cem").href="mailto:"+K.email;
say("Hello! Ask about bus hire, logistics, printing or quotes.");
const open=o=>{chat.hidden=!o;if(o)$("#ci").focus()};
document.addEventListener("click",e=>{if(e.target.closest("[data-chat]"))open(chat.hidden)});$("#cx").onclick=()=>open(false);
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=wa(a.dataset.wa);a.target="_blank";a.rel="noopener"});
document.querySelectorAll("[data-phones]").forEach(a=>{a.textContent=K.phones.join(" / ")});
document.querySelectorAll("[data-address]").forEach(a=>{a.textContent=K.address});
paintImages();
const t=$("#testi");if(t)t.innerHTML=K.testimonials.length?K.testimonials.map(x=>`<blockquote><p>${x.text}</p><cite>${x.name}, ${x.place}</cite></blockquote>`).join(""):`<blockquote class="empty"><p>Travelled or shipped with KSZ? We would love to feature your feedback here.</p><cite><a href="${wa("Hello KSZ, I'd like to share feedback.")}" target="_blank" rel="noopener">Share your experience on WhatsApp</a></cite></blockquote>`;
})();
