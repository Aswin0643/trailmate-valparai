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
const photos=[
{title:"Thalanar Viewpoint",desc:"Tea estates and Western Ghats scenery",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Morning%20view%20Thalanar%20Road%2C%20Valparai%20-%20panoramio.jpg?width=1400"},
{title:"Koozhangal River",desc:"River scenery in Valparai",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Koolangal%20river%2Cvalparai%2Ccoimbatore.jpg?width=1400"},
{title:"Sholayar Reservoir",desc:"Upper Sholayar landscape",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Upper%20Sholayar%20Reservoir%20View.jpg?width=1400"},
{title:"Sholayar Forest Road",desc:"Forest corridor through the Western Ghats",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Aathirappally%20Valparai%20Sholayar%20road%20views%201627.JPG?width=1400"},
{title:"Vazhachal Falls",desc:"Water flow at Vazhachal",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Vazhachal%20water%20flow.jpg?width=1400"},
{title:"Athirappilly Falls",desc:"Athirappilly waterfall, Kerala",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Athirappilly%20Waterfall.jpg?width=1400"},
{title:"Valparai Hills",desc:"Misty hills around Valparai",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Cloud%20vaalparai.jpg?width=1400"},
{title:"Sholayar Reserve Forest",desc:"Evergreen forest landscape",src:"https://commons.wikimedia.org/wiki/Special:FilePath/Deep%20Green%20Forest%20Sholayar%20-%20panoramio.jpg?width=1400"}
];
let slideIndex=0,slideTimer;
const slideImage=document.querySelector("#slideImage");
function showSlide(i){
 slideIndex=(i+photos.length)%photos.length;
 const photo=photos[slideIndex];
 document.querySelector("#slideTitle").textContent=photo.title;
 document.querySelector("#slideDescription").textContent=photo.desc;
 document.querySelector("#slideCount").textContent=`${String(slideIndex+1).padStart(2,"0")} / ${String(photos.length).padStart(2,"0")}`;
 slideImage.alt=photo.title;slideImage.dataset.index=slideIndex;slideImage.classList.add("changing");
 const next=new Image();next.onload=()=>{slideImage.src=photo.src;slideImage.classList.remove("changing")};
 next.onerror=()=>{slideImage.src=photos[(slideIndex+1)%photos.length].src;slideImage.classList.remove("changing");};
 next.src=photo.src;
 document.querySelectorAll(".slide-dot").forEach((d,n)=>d.classList.toggle("active",n===slideIndex));
}
const dots=document.querySelector("#slideDots");
photos.forEach((p,i)=>{const b=document.createElement("button");b.className="slide-dot";b.type="button";b.setAttribute("aria-label",`Show ${p.title}`);b.addEventListener("click",()=>{showSlide(i);restartSlides()});dots.append(b)});
function restartSlides(){clearInterval(slideTimer);slideTimer=setInterval(()=>showSlide(slideIndex+1),4500)}
document.querySelector("#slidePrev").addEventListener("click",()=>{showSlide(slideIndex-1);restartSlides()});
document.querySelector("#slideNext").addEventListener("click",()=>{showSlide(slideIndex+1);restartSlides()});
showSlide(0);restartSlides();
const KEY="trailmate-valparai-v3";
let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{}
let state=saved.visits||{},group=saved.group||{vehicle:"",passengers:[]};
const host=document.querySelector("#stops");
stops.forEach((s,i)=>{const row=document.createElement("div");row.className="stop";row.dataset.i=i;row.innerHTML=`<button class="tick" aria-label="Mark ${s[0]} visited" aria-pressed="false">✓</button><div class="stopcopy"><div class="name"></div><div class="detail"></div></div><div class="stop-time"></div><span class="number">${String(i+1).padStart(2,"0")}</span><span>${s[3]}</span>`;row.querySelector(".name").textContent=s[0];row.querySelector(".detail").textContent=s[1];row.querySelector(".stop-time").textContent=s[2];row.querySelector("button").addEventListener("click",()=>{state[i]=!state[i];persist();render()});host.append(row)});
function persist(){try{localStorage.setItem(KEY,JSON.stringify({visits:state,group}))}catch{alert("Browser storage is unavailable. Your latest changes may not be saved.")}}
function render(){let n=0;document.querySelectorAll(".stop").forEach(r=>{const done=!!state[r.dataset.i];if(done)n++;r.classList.toggle("done",done);r.querySelector("button").setAttribute("aria-pressed",String(done))});let p=Math.round(n/stops.length*100);document.querySelector("#visited").textContent=`${n} / ${stops.length}`;document.querySelector("#percent").textContent=p+"%";document.querySelector("#barfill").style.width=p+"%"}
document.querySelector("#reset").addEventListener("click",()=>{if(confirm("Warning: reset all visited-place ticks? Vehicle and passenger details will be kept.")){state={};persist();render()}});
const vehicle=document.querySelector("#vehicle");
vehicle.value=group.vehicle||"";
function showVehicle(){document.querySelector("#vehicleSaved").textContent=group.vehicle?`Saved vehicle number: ${group.vehicle}`:"No vehicle number saved yet."}
document.querySelector("#saveVehicle").addEventListener("click",()=>{const v=vehicle.value.trim().toUpperCase();if(!v){alert("Please enter the vehicle registration number.");vehicle.focus();return}if(group.vehicle&&group.vehicle!==v&&!confirm(`Update vehicle number from ${group.vehicle} to ${v}?`))return;group.vehicle=v;vehicle.value=v;persist();showVehicle();alert("Vehicle number saved on this device.")});
showVehicle();
const nameInput=document.querySelector("#passengerName"),ageInput=document.querySelector("#passengerAge");
function renderPassengers(){
 const list=document.querySelector("#passengerList");list.replaceChildren();document.querySelector("#passengerCount").textContent=`${group.passengers.length} added`;
 if(!group.passengers.length){const p=document.createElement("p");p.className="empty";p.textContent="No passengers added yet.";list.append(p);return}
 group.passengers.forEach((person,i)=>{
  const row=document.createElement("div");row.className="passenger-row";
  const info=document.createElement("span");info.textContent=`${i+1}. ${person.name} · ${person.age} years`;
  const actions=document.createElement("div");actions.className="passenger-actions";
  const edit=document.createElement("button");edit.className="edit-person";edit.type="button";edit.textContent="Edit";
  edit.addEventListener("click",()=>{const newName=prompt("Edit passenger name:",person.name);if(newName===null)return;const clean=newName.trim();if(!clean){alert("Passenger name cannot be empty.");return}const ageText=prompt("Edit passenger age:",String(person.age));if(ageText===null)return;const age=Number(ageText);if(!Number.isInteger(age)||age<1||age>110){alert("Enter a valid age between 1 and 110.");return}if(!confirm(`Save changes for ${person.name}?`))return;group.passengers[i]={name:clean,age};persist();renderPassengers()});
  const remove=document.createElement("button");remove.className="remove-person";remove.type="button";remove.textContent="Remove";
  remove.addEventListener("click",()=>{if(!confirm(`WARNING: Remove ${person.name} from the passenger list? This cannot be undone.`))return;group.passengers.splice(i,1);persist();renderPassengers()});
  actions.append(edit,remove);row.append(info,actions);list.append(row)
 })
}
document.querySelector("#addPassenger").addEventListener("click",()=>{const name=nameInput.value.trim(),age=Number(ageInput.value);if(!name){alert("Enter the passenger name.");nameInput.focus();return}if(!Number.isInteger(age)||age<1||age>110){alert("Enter a valid passenger age.");ageInput.focus();return}group.passengers.push({name,age});persist();nameInput.value="";ageInput.value="";renderPassengers()});
function net(){const el=document.querySelector("#network");el.textContent=navigator.onLine?"● Online":"● Offline mode";el.style.color=navigator.onLine?"#28765a":"#a66a20"}addEventListener("online",net);addEventListener("offline",net);net();render();renderPassengers();
/* Full continuous round-trip map. Route is requested from OSRM in one sequence. */
const routePoints=[
 {name:"Pollachi · Start",lat:10.6583,lon:77.0080},
 {name:"Attakatti / Hornbill viewpoint",lat:10.3230,lon:76.9650},
 {name:"Kavarkal Mist Point",lat:10.3370,lon:76.9680},
 {name:"Thalanar Viewpoint",lat:10.3090,lon:76.9900},
 {name:"Koozhangal River",lat:10.3220,lon:76.9700},
 {name:"Sholayar Dam",lat:10.2735,lon:76.9845},
 {name:"Malakkappara",lat:10.3020,lon:76.8610},
 {name:"Vazhachal Falls",lat:10.3040,lon:76.5700},
 {name:"Athirappilly Falls · turnaround",lat:10.2850,lon:76.5700},
 {name:"Chalakudy",lat:10.3000,lon:76.3370},
 {name:"Thrissur",lat:10.5276,lon:76.2144},
 {name:"Palakkad",lat:10.7867,lon:76.6548},
 {name:"Pollachi · Finish",lat:10.6583,lon:77.0080}
];
function initTripMap(){
 const el=document.querySelector("#tripMap");if(!el||!window.L)return;
 const map=L.map(el,{scrollWheelZoom:false}).setView([10.48,76.70],9);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
 const latlngs=routePoints.map(p=>[p.lat,p.lon]);
 routePoints.forEach((p,i)=>L.marker([p.lat,p.lon]).addTo(map).bindPopup(`<b>${i+1}. ${p.name}</b>`));
 const line=L.polyline(latlngs,{color:"#17634b",weight:4,dashArray:"8 7",opacity:.85}).addTo(map);
 map.fitBounds(line.getBounds(),{padding:[22,22]});
 const coords=routePoints.map(p=>`${p.lon},${p.lat}`).join(";");
 fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`)
  .then(r=>{if(!r.ok)throw Error("route unavailable");return r.json()})
  .then(data=>{if(data.routes&&data.routes[0]){map.removeLayer(line);L.geoJSON(data.routes[0].geometry,{style:{color:"#17634b",weight:5,opacity:.9}}).addTo(map);map.fitBounds(L.geoJSON(data.routes[0].geometry).getBounds(),{padding:[22,22]})}})
  .catch(()=>{const note=document.createElement("div");note.className="map-fallback";note.textContent="Road route preview is temporarily unavailable. Numbered pins show the complete journey order.";el.append(note)});
 setTimeout(()=>map.invalidateSize(),300);
}
if(window.L)initTripMap();
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
