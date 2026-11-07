const stops=[
["Hornbill Viewpoint","Attakatti · Scenic viewpoint","🌄"],
["Kavarkal Mist Point","Misty mountain scenery","☁️"],
["Thalanar Viewpoint","Valley and mountain views","🏞️"],
["Koozhangal River / Vellamalai","River-side scenic stop · Verify exact location","💧"],
["Sholayar Dam","Reservoir and mountain scenery","🌊"],
["Malakkappara","Forest checkpoint · Confirm bike access","🌳"],
["Vazhachal Waterfalls","Optional short stop · Time permitting","💦"],
["Athirappilly Waterfalls","Grand finale · Kerala","🏔️"]
];
const KEY="trailmate-valparai-checks-v1";
let state={};try{state=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{}
const host=document.querySelector("#stops");
stops.forEach((s,i)=>{const row=document.createElement("div");row.className="stop";row.dataset.i=i;row.innerHTML=`<button class="tick" aria-label="Mark ${s[0]} visited" aria-pressed="false">✓</button><div class="stopcopy"><div class="name"></div><div class="detail"></div></div><span class="number">${String(i+1).padStart(2,"0")}</span><span>${s[2]}</span>`;row.querySelector(".name").textContent=s[0];row.querySelector(".detail").textContent=s[1];row.querySelector("button").addEventListener("click",()=>{state[i]=!state[i];persist();render()});host.append(row)});
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function render(){let n=0;document.querySelectorAll(".stop").forEach(r=>{const done=!!state[r.dataset.i];if(done)n++;r.classList.toggle("done",done);r.querySelector("button").setAttribute("aria-pressed",String(done))});let p=Math.round(n/stops.length*100);document.querySelector("#visited").textContent=`${n} / ${stops.length}`;document.querySelector("#percent").textContent=p+"%";document.querySelector("#barfill").style.width=p+"%"}
document.querySelector("#reset").addEventListener("click",()=>{if(confirm("Reset all visited places?")){state={};persist();render()}});
document.querySelector("#export").addEventListener("click",()=>{const payload={trip:"Pollachi–Valparai–Athirappilly",stops:stops.map((s,i)=>({name:s[0],visited:!!state[i]}))};const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="trailmate-checklist.json";a.click();URL.revokeObjectURL(url)});
function net(){const el=document.querySelector("#network");el.textContent=navigator.onLine?"● Online":"● Offline mode";el.style.color=navigator.onLine?"#28765a":"#a66a20"}addEventListener("online",net);addEventListener("offline",net);net();render();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("/service-worker.js").catch(()=>{});
