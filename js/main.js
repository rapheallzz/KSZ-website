(function(){
const K=window.KSZ, page=document.body.dataset.page||"home", $=(s,r=document)=>r.querySelector(s);
const wa=t=>`https://wa.me/${K.whatsapp}?text=${encodeURIComponent(t||"Hello KSZ Ventures, I'd like to make an enquiry.")}`;
function paintImages(){document.querySelectorAll("[data-img]").forEach(el=>{const u=K.IMAGES[el.dataset.img];
 if(el.tagName==="IMG"){el.loading="lazy";el.onerror=()=>{el.removeAttribute("src");el.classList.add("img-fallback")};if(u)el.src=u;else el.classList.add("img-fallback")}
 else if(u)el.style.backgroundImage=`url("${u}")`});}
const S=(p,f)=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ${f?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'}>${p}</svg>`;
const ic={
 pin:S('<path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>'),
 phone:S('<path d="M6.6 3.5h2.7l1.5 4-1.9 1.3a10.5 10.5 0 0 0 4.8 4.8l1.3-1.9 4 1.5v2.7a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"/>'),
 mail:S('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7.5 8 6 8-6"/>'),
 chat:S('<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>'),
 wa:S('<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',1),
 fb:S('<path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.6 3 10.5 4.6 10.5 6.8v1.7H8v3h2.5V21H14v-9.5h2.6l.4-3H14Z"/>',1),
 ig:S('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".7" fill="currentColor"/>'),
 x:S('<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',1)
};
ic.send=S('<path d="M21 3 10 14"/><path d="m21 3-7 18-4-7-7-4 18-7Z"/>');
ic.close=S('<path d="M6 6l12 12M18 6 6 18"/>');
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
const li=(h,t)=>`<li><a href="${h}">${t}</a></li>`;
const foot=`<footer class="foot" id="contact"><div class="wrap"><div class="foot-grid">
<div class="foot-brand"><a class="logo light" href="index.html"><span class="logo-mark">KSZ</span><span class="logo-txt">VENTURES LIMITED</span></a>
<p class="foot-about">Printing, branding and corporate visibility solutions, plus safe and reliable transport and logistics, from Abuja, Nigeria.</p><span class="rc">${K.rc}</span>
<div class="soc"><a href="${K.facebook}" aria-label="Facebook">${ic.fb}</a><a href="${K.instagram}" aria-label="Instagram">${ic.ig}</a><a href="${K.x}" aria-label="X">${ic.x}</a></div></div>
<nav class="foot-col" aria-label="Quick links"><h4>Quick links</h4><ul>${li("index.html","Home")}${li("transport.html","Transport")}${li("printing.html","Printing &amp; Branding")}${li("index.html#about","About Us")}</ul></nav>
<nav class="foot-col" aria-label="Transport and logistics"><h4>Transport &amp; Logistics</h4><ul>${li("transport.html#services","Bus hire")}${li("transport.html#fleet","Our fleet")}${li("transport.html#logistics","Goods delivery")}${li("transport.html#book","Book a bus")}</ul></nav>
<nav class="foot-col" aria-label="Printing and branding"><h4>Printing &amp; Branding</h4><ul>${li("printing.html#catalogue","Services")}${li("printing.html#work","Our work")}${li("printing.html#quote","Get a quote")}</ul></nav>
<div class="foot-col foot-contact"><h4>Contact us</h4><ul class="ci">
<li><span class="ci-i">${ic.pin}</span><span>${K.address}</span></li>
<li><span class="ci-i">${ic.phone}</span><span class="ci-ph">${K.phones.map(p=>`<a href="tel:${p}">${p}</a>`).join("")}</span></li>
<li><span class="ci-i">${ic.wa}</span><a href="${wa()}" target="_blank" rel="noopener">Chat on WhatsApp</a></li>
<li><span class="ci-i">${ic.mail}</span><a href="mailto:${K.email}">${K.email}</a></li></ul>
<button class="btn red sm foot-chat" data-chat>${ic.chat}Chat with our assistant</button></div></div>
<div class="foot-bottom">© ${new Date().getFullYear()} ${K.company} (${K.rc}). All rights reserved.</div></div></footer>`;
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
document.body.insertAdjacentHTML("beforeend",`<div class="fab-dock">
<a class="fab round call" href="tel:${K.phones[0]}" aria-label="Call us" title="Call us">${ic.phone}</a>
<a class="fab round wa" href="${wa()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">${ic.wa}</a>
<button class="fab chat-fab" aria-label="Open chat" aria-expanded="false" aria-controls="chat" data-chat>${ic.chat}<span>Chat with us</span></button></div>
<section class="chat" id="chat" hidden role="dialog" aria-label="Customer support chat"><div class="chat-h"><span class="chat-av" aria-hidden="true">KSZ<i></i></span><div class="chat-id"><b>KSZ Support</b><small>Here to help</small></div><button type="button" aria-label="Close chat" id="cx">${ic.close}</button></div>
<div class="chat-b" id="cb" aria-live="polite"></div><div class="chat-q" id="cq"></div>
<div class="chat-c"><p class="chat-or"><span>Or reach us directly</span></p><div class="chat-acts"><a class="wa" target="_blank" rel="noopener" id="cwa">${ic.wa}WhatsApp</a><a id="ccall" href="tel:${K.phones[0]}">${ic.phone}Call</a><a class="em" id="cem">${ic.mail}Email</a></div></div>
<form class="chat-f" id="cf"><input id="ci" placeholder="Type your question" autocomplete="off" aria-label="Your question"><button aria-label="Send message">${ic.send}</button></form></section>`);
const cb=$("#cb"),chat=$("#chat");
const say=(t,me,u)=>{const d=document.createElement("div");d.className="m "+(me?"me":"bot");const p=document.createElement("span");p.textContent=t;d.append(p);if(u){const a=document.createElement("a");a.href=u;a.textContent="Open section";d.append(" ",a)}const tm=document.createElement("time");tm.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});d.append(tm);cb.append(d);cb.scrollTop=cb.scrollHeight};
const bot=(t,u)=>{const ty=document.createElement("div");ty.className="m bot typing";ty.setAttribute("aria-label","Typing");ty.innerHTML="<i></i><i></i><i></i>";cb.append(ty);cb.scrollTop=cb.scrollHeight;setTimeout(()=>{ty.remove();say(t,0,u)},650)};
function reply(q){const s=q.toLowerCase(),hit=FAQ.find(f=>f.k.some(w=>s.includes(w)));
 bot(hit?hit.a:"I can help with bus hire, logistics, printing, embroidery, large format, souvenirs and quotes. For anything else, tap WhatsApp or Email below.",hit&&hit.u);
 $("#cwa").href=wa("Hello KSZ Ventures. "+q);$("#cem").href=`mailto:${K.email}?subject=${encodeURIComponent("Enquiry")}&body=${encodeURIComponent(q)}`}
$("#cq").innerHTML=quick.map(q=>`<button type="button">${q}</button>`).join("");
$("#cq").onclick=e=>{if(e.target.tagName==="BUTTON"){say(e.target.textContent,1);reply(e.target.textContent)}};
$("#cf").onsubmit=e=>{e.preventDefault();const v=$("#ci").value.trim();if(!v)return;say(v,1);$("#ci").value="";reply(v)};
$("#cwa").href=wa();$("#cem").href="mailto:"+K.email;
say("Hello! Ask about bus hire, logistics, printing or quotes.");
const open=o=>{chat.hidden=!o;$(".chat-fab").setAttribute("aria-expanded",o);if(o)$("#ci").focus()};
document.addEventListener("click",e=>{if(e.target.closest("[data-chat]"))open(chat.hidden)});$("#cx").onclick=()=>{open(false);$(".chat-fab").focus()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!chat.hidden){open(false);$(".chat-fab").focus()}});
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=wa(a.dataset.wa);a.target="_blank";a.rel="noopener"});
document.querySelectorAll("[data-phones]").forEach(a=>{a.textContent=K.phones.join(" / ")});
document.querySelectorAll("[data-address]").forEach(a=>{a.textContent=K.address});
paintImages();
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
 document.querySelectorAll("[data-reveal]").forEach(el=>{el.classList.add("rv");io.observe(el)})}
const t=$("#testi");if(t)t.innerHTML=K.testimonials.length?K.testimonials.map(x=>`<blockquote><p>${x.text}</p><cite>${x.name}, ${x.place}</cite></blockquote>`).join(""):`<blockquote class="empty"><p>Travelled or shipped with KSZ? We would love to feature your feedback here.</p><cite><a href="${wa("Hello KSZ, I'd like to share feedback.")}" target="_blank" rel="noopener">Share your experience on WhatsApp</a></cite></blockquote>`;
})();
