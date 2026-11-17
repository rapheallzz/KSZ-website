document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",()=>{const s=document.querySelector("#tform [name=service]");if(s)s.value=a.dataset.service}));
document.querySelectorAll("form[data-ajax]").forEach(f=>{
 const msg=f.querySelector(".msg"),ts=f.querySelector("[name=_t]");ts.value=Date.now();
 f.addEventListener("submit",async e=>{e.preventDefault();msg.className="msg";msg.textContent="";
  if(!f.checkValidity()){f.reportValidity();return}
  const btn=f.querySelector("button[type=submit]");btn.disabled=true;btn.textContent="Sending...";
  try{const r=await fetch(f.action,{method:"POST",body:new FormData(f)});const j=await r.json();
   if(r.ok&&j.ok){msg.className="msg ok";msg.textContent=j.message;f.reset();ts.value=Date.now()}
   else{msg.className="msg err";msg.textContent=(j.errors?Object.values(j.errors).join(" "):j.message)||"Something went wrong."}}
  catch(_){msg.className="msg err";msg.textContent="Could not reach the server. Run the site with PHP (see README) or contact us on WhatsApp."}
  btn.disabled=false;btn.textContent=f.dataset.label});});
