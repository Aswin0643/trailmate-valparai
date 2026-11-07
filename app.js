const stops=[
["Hornbill Viewpoint","Attakatti · Valparai forest scenery","06:30 AM","🌄"],
["Kavarkal Mist Point","Misty mountain scenery","07:15 AM","☁️"],
["Thalanar Viewpoint","Tea estates and valley views","07:45 AM","🏞️"],
["Koozhangal River / Vellamalai","River-side stop · verify safe access","08:30 AM","💧"],
["Sholayar Dam","Reservoir and mountain scenery","09:30 AM","🌊"],
["Malakkappara","Forest checkpoint · bike entry must be confirmed","10:15 AM","🌳"],
["Vazhachal Waterfalls","Short stop if time and access permit","12:30 PM","💦"],
["Athirappilly Waterfalls","Main destination · Kerala","01:30 PM","🏔️"]
];
const gallery=document.querySelector(".gallery-track");if(gallery){[...gallery.children].forEach(item=>{const clone=item.cloneNode(true);clone.setAttribute("aria-hidden","true");gallery.append(clone)})}
const KEY="trailmate-valparai-v2";
let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{}
let state=saved.visits||{};let group=saved.group||{vehicle:"",passengers:[]};
const host=document.querySelector("#stops");
stops.forEach((s,i)=>{const row=document.createElement("div");row.className="stop";row.dataset.i=i;row.innerHTML=`<button class="tick" aria-label="Mark ${s[0]} visited" aria-pressed="false">✓</button><div class="stopcopy"><div class="name"></div><div class="detail"></div></div><div class="stop-time"></div><span class="number">${String(i+1).padStart(2,"0")}</span><span>${s[3]}</span>`;row.querySelector(".name").textContent=s[0];row.querySelector(".detail").textContent=s[1];row.querySelector(".stop-time").textContent=s[2];row.querySelector("button").addEventListener("click",()=>{state[i]=!state[i];persist();render()});host.append(row)});
function persist(){try{localStorage.setItem(KEY,JSON.stringify({visits:state,group}))}catch{alert("Browser storage is unavailable. Your latest changes may not be saved.")}}
function render(){let n=0;document.querySelectorAll(".stop").forEach(r=>{const done=!!state[r.dataset.i];if(done)n++;r.classList.toggle("done",done);r.querySelector("button").setAttribute("aria-pressed",String(done))});let p=Math.round(n/stops.length*100);document.querySelector("#visited").textContent=`${n} / ${stops.length}`;document.querySelector("#percent").textContent=p+"%";document.querySelector("#barfill").style.width=p+"%"}
document.querySelector("#reset").addEventListener("click",()=>{if(confirm("Reset only the visited-place checklist? Vehicle and passenger details will be kept.")){state={};persist();render()}});
const vehicle=document.querySelector("#vehicle"),nameInput=document.querySelector("#passengerName"),ageInput=document.querySelector("#passengerAge");vehicle.value=group.vehicle||"";vehicle.addEventListener("input",()=>{group.vehicle=vehicle.value.toUpperCase();vehicle.value=group.vehicle;persist()});
function renderPassengers(){const list=document.querySelector("#passengerList");list.replaceChildren();document.querySelector("#passengerCount").textContent=`${group.passengers.length} added`;if(!group.passengers.length){const p=document.createElement("p");p.className="empty";p.textContent="No passengers added yet.";list.append(p);return}group.passengers.forEach((person,i)=>{const row=document.createElement("div");row.className="passenger-row";const info=document.createElement("span");info.textContent=`${i+1}. ${person.name} · ${person.age} years`;const remove=document.createElement("button");remove.className="remove-person";remove.type="button";remove.textContent="Remove";remove.addEventListener("click",()=>{group.passengers.splice(i,1);persist();renderPassengers()});row.append(info,remove);list.append(row)})}
document.querySelector("#addPassenger").addEventListener("click",()=>{const name=nameInput.value.trim(),age=Number(ageInput.value);if(!name){alert("Enter the passenger name.");nameInput.focus();return}if(!Number.isInteger(age)||age<1||age>110){alert("Enter a valid passenger age.");ageInput.focus();return}group.passengers.push({name,age});persist();nameInput.value="";ageInput.value="";renderPassengers()});
function net(){const el=document.querySelector("#network");el.textContent=navigator.onLine?"● Online":"● Offline mode";el.style.color=navigator.onLine?"#28765a":"#a66a20"}addEventListener("online",net);addEventListener("offline",net);net();render();renderPassengers();
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
