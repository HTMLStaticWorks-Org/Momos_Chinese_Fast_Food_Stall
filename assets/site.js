
(function(){
const root=document.documentElement;
const $=(s,ctx=document)=>ctx.querySelector(s);
const $$=(s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
function applyTheme(t){root.dataset.theme=t;try{localStorage.setItem('momos-theme',t)}catch(e){}const b=$('#themeToggle');if(b){b.innerHTML=t==='dark'?'☀':'◐';b.setAttribute('aria-label',t==='dark'?'Toggle light theme':'Toggle dark theme');b.setAttribute('aria-pressed',String(t==='dark'))}}
function applyDir(d){root.dir=d;try{localStorage.setItem('momos-dir',d)}catch(e){}const b=$('#rtlToggle');if(b){b.innerHTML=d==='rtl'?'LTR':'RTL';b.setAttribute('aria-label',d==='rtl'?'Toggle LTR layout':'Toggle RTL layout');b.setAttribute('aria-pressed',String(d==='rtl'))}}
let theme='light',dir='ltr';try{theme=localStorage.getItem('momos-theme')||'light';dir=localStorage.getItem('momos-dir')||'ltr'}catch(e){}
applyTheme(theme);applyDir(dir);
$('#themeToggle')?.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));
$('#rtlToggle')?.addEventListener('click',()=>applyDir(root.dir==='rtl'?'ltr':'rtl'));
const toggle=$('.menu-toggle'),nav=$('.main-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open)});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
document.addEventListener('click',e=>{if(nav?.classList.contains('open')&&!nav.contains(e.target)&&!toggle?.contains(e.target)){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
// Add subtle scroll reveals to major content blocks without changing page structure.
$$('main section:not(.hero):not(.page-hero)').forEach((el,i)=>{if(!el.hasAttribute('data-reveal'))el.setAttribute('data-reveal','')});
$$('.food-card,.service-card,.combo-card,.value-grid article,.steps-grid article,.occasion-grid article,.about-photo-grid figure').forEach(el=>{if(!el.hasAttribute('data-reveal'))el.setAttribute('data-reveal','')});
const reveal=()=>{$$('[data-reveal]').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i%5,4)*70)+'ms';observer.observe(el)})};
let observer;if('IntersectionObserver'in window){observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');observer.unobserve(x.target)}}),{threshold:.12});reveal()}else $$('[data-reveal]').forEach(x=>x.classList.add('visible'));
$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{const val=btn.dataset.filter;$$('.filter-btn').forEach(b=>b.classList.toggle('active',b===btn));$$('.menu-item').forEach(card=>{card.hidden=val!=='all'&&card.dataset.category!==val})}));
const form=$('#order-form');
if(form){
 const params=new URLSearchParams(location.search);const pre=params.get('item');if(pre&&$('#itemSelect')){$('#itemSelect').value=pre}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=Object.fromEntries(new FormData(form).entries());const msg=`MOMOS & CHINESE FAST FOOD — ORDER ENQUIRY\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email||'Not provided'}\nPreferred date: ${d.date||'Not specified'}\nDish / combo: ${d.item||'Not specified'}\nQuantity: ${d.quantity} plates\nEnquiry type: ${d.type}\nMessage: ${d.message||'—'}`;$('#enquiryOutput').value=msg;$('#formResult').hidden=false;$('#formResult').scrollIntoView({behavior:'smooth',block:'nearest'});});
 $('#copyEnquiry')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#enquiryOutput').value);$('#copyStatus').textContent='Copied. Share this enquiry with the stall.'}catch(e){$('#enquiryOutput').select();document.execCommand('copy');$('#copyStatus').textContent='Select and copy the enquiry text.'}});
}
})();
