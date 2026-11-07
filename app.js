const stops=[
["Hornbill Viewpoint","Attakatti · first scenic stop","Spend around 30–40 minutes","🌄"],
["Kavarkal Mist Point","Misty mountain viewpoint","Spend around 20–30 minutes","☁️"],
["Thalanar Viewpoint","Tea estates and valley views","Spend around 20–30 minutes","🏞️"],
["Koozhangal River / Vellamalai","River-side stop · verify safe access","Spend around 30 minutes","💧"],
["Sholayar Dam","Reservoir and mountain scenery","Spend around 20–30 minutes","🌊"],
["Malakkappara","Forest checkpoint · bike entry must be confirmed","Short checkpoint / photo stop","🌳"],
["Vazhachal Waterfalls","Short stop if time and access permit","Spend around 20–30 minutes","💦"],
["Athirappilly Waterfalls","Main destination · Kerala","Spend around 60–75 minutes","🏔️"]
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
let state=saved.visits||{};
const host=document.querySelector("#stops");
stops.forEach((s,i)=>{const row=document.createElement("div");row.className="stop";row.dataset.i=i;row.innerHTML=`<button class="tick" aria-label="Mark ${s[0]} visited" aria-pressed="false">✓</button><div class="stopcopy"><div class="name"></div><div class="detail"></div><div class="stay-time"></div></div><span class="number">${String(i+1).padStart(2,"0")}</span><span>${s[3]}</span>`;row.querySelector(".name").textContent=s[0];row.querySelector(".detail").textContent=s[1];row.querySelector(".stay-time").textContent=s[2];row.querySelector("button").addEventListener("click",()=>{state[i]=!state[i];persist();render()});host.append(row)});
function persist(){try{localStorage.setItem(KEY,JSON.stringify({visits:state}))}catch{alert("Browser storage is unavailable. Your latest changes may not be saved.")}}
function render(){let n=0;document.querySelectorAll(".stop").forEach(r=>{const done=!!state[r.dataset.i];if(done)n++;r.classList.toggle("done",done);r.querySelector("button").setAttribute("aria-pressed",String(done))});let p=Math.round(n/stops.length*100);document.querySelector("#visited").textContent=`${n} / ${stops.length}`;document.querySelector("#percent").textContent=p+"%";document.querySelector("#barfill").style.width=p+"%"}
document.querySelector("#reset").addEventListener("click",()=>{if(confirm("Warning: reset all visited-place ticks?")){state={};persist();render()}});
function net(){const el=document.querySelector("#network");el.textContent=navigator.onLine?"● Online":"● Offline mode";el.style.color=navigator.onLine?"#28765a":"#a66a20"}addEventListener("online",net);addEventListener("offline",net);net();render();
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
