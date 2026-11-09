"use strict";
(() => {
  const $ = (selector) => document.querySelector(selector);
  const projects = [
    {id:"pockit",name:"Pockit",category:"web",label:"PERSONAL FINANCE",symbol:"$",
     color:"#67e8f9",position:[13.9,22],tech:["TypeScript","Budgeting","Web App"],description:"A personal-finance planning app covering spending, budgets, bills, savings, debts and accounts.",repo:"https://github.com/alinikan/pockit",demo:"https://pockit-budget.vercel.app",image:"https://raw.githubusercontent.com/alinikan/pockit/main/docs/media/pockit-home-desktop.png"},
    {id:"lexiloop",name:"LexiLoop",category:"web",label:"AI / EDUCATION",symbol:"Aa",
     color:"#c4b5fd",position:[36.7,19],tech:["TypeScript","OpenAI","Supabase","Learning"],description:"A vocabulary learning app with spaced practice, personal wordbooks, and AI-assisted lesson generation.",repo:"https://github.com/alinikan/LexiLoop",demo:"https://lexiloop-ali.vercel.app",image:"https://raw.githubusercontent.com/alinikan/LexiLoop/main/public/icon-512.png"},
    {id:"autopilot",name:"Autopilot",category:"web",label:"CAR EDUCATION",symbol:"✦",
     color:"#38bdf8",position:[78.3,22.7],tech:["React","TypeScript","Supabase","Quizzes"],description:"A visual car-learning school with guided lessons, photo recognition, quizzes and gamified review.",repo:"https://github.com/alinikan/autopilot-car-school",demo:"https://autopilot-car-school.vercel.app",image:"https://raw.githubusercontent.com/alinikan/autopilot-car-school/main/docs/images/dashboard.png"},
    {id:"recomp",name:"Recomp",category:"web",label:"FITNESS TOOL",symbol:"+",
     color:"#5eead4",position:[84.4,71],tech:["React","TypeScript","Supabase","Fitness"],description:"A mobile-first training and nutrition companion with structured workouts and progress tracking.",repo:"https://github.com/alinikan/workout-tracker",demo:"https://ali-workout.vercel.app",image:"https://raw.githubusercontent.com/alinikan/workout-tracker/main/public/og.png"},
    {id:"steam",name:"Steam ML",category:"ai",label:"MACHINE LEARNING",symbol:"◎",
     color:"#fbbf24",position:[60.3,79.3],tech:["Python","Machine Learning","NLP","scikit-learn"],description:"A Steam game recommendation and popularity prediction system using content analysis and NLP.",repo:"https://github.com/alinikan/GameRecommender"},
    {id:"bell",name:"Last Bell",category:"game",label:"NARRATIVE GAME",symbol:"★",
     color:"#fb7185",position:[19.5,79.7],tech:["JavaScript","CSS","Pixel Art","Games"],description:"An original browser choice game with animated pixel art and branching scenes.",repo:"https://github.com/alinikan/after-the-last-bell-game",demo:"https://after-the-last-bell-game.vercel.app",image:"https://raw.githubusercontent.com/alinikan/after-the-last-bell-game/main/assets/classroom.png"},
    {id:"cat",name:"Cat AI",category:"ai",label:"DEEP LEARNING",symbol:"AI",
     color:"#a78bfa",position:[50,89],tech:["Python","Neural Networks","Machine Learning"],description:"An image classifier built with a deep neural network and backpropagation.",repo:"https://github.com/alinikan/Cat-Identifier"},
    {id:"maze",name:"Maze",category:"game",label:"JAVA GAME",symbol:"▧",
     color:"#f9a8d4",position:[65,45],tech:["Java","MVC","Unit Testing","Games"],description:"A 2D Java maze game with enemies, levels, an MVC design and tests.",repo:"https://github.com/alinikan/MazeRunner"}
  ];
  const games=["pacman","galaga","breakout","snake","tetris","bomberman","minesweeper","puzzle-bobble"];
  const path = "https://raw.githubusercontent.com/alinikan/alinikan/main/generated/arcade/";

  const addText=(tag,text,cls)=>{const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e;};
  const external=(href,label)=>{const a=document.createElement("a");a.href=href;a.textContent=label;a.target="_blank";a.rel="noopener noreferrer";return a;};

  const map=$("#planet-buttons"), grid=$("#project-grid"),search=$("#project-search"),cat=$("#project-category");
  for(const project of projects){
    const b=document.createElement("button");b.type="button";b.className="planet-button";b.style.left=project.position[0]+"%";b.style.top=project.position[1]+"%";b.style.setProperty("--planet-color",project.color);b.dataset.project=project.id;
    const symbol=addText("span",project.symbol,"planet-symbol");symbol.setAttribute("aria-hidden","true");
    b.append(symbol,addText("span",project.name));b.setAttribute("aria-label","View "+project.name+" project");
    b.addEventListener("click",()=>{search.value=project.name;cat.value="all";renderProjects();$("#projects").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});setTimeout(()=>$("#project-"+project.id)?.focus(),120);});
    map.append(b);
  }

  function renderProjects(){
    const q=search.value.trim().toLowerCase();const sector=cat.value;
    const filtered=projects.filter(p=>(sector==="all"||p.category===sector)&&[p.name,p.description,...p.tech,p.label].join(" ").toLowerCase().includes(q));
    grid.replaceChildren();
    for(const p of filtered){
      const card=document.createElement("article");card.className="project-card";card.id="project-"+p.id;card.tabIndex=-1;
      const visual=document.createElement("div");visual.className="project-visual";visual.style.setProperty("--project-color",p.color);
      visual.append(addText("span",p.symbol||"✦","project-visual-symbol"));
      if(p.image){const thumb=document.createElement("img");thumb.src=p.image;thumb.className="project-thumb";thumb.loading="lazy";thumb.alt="Screenshot or official artwork from the "+p.name+" repository";thumb.decoding="async";
        thumb.addEventListener("load",()=>{if(thumb.naturalWidth>0)visual.classList.add("is-loaded");});
        thumb.addEventListener("error",()=>thumb.remove());
        visual.append(thumb);}
      card.append(visual,addText("span",p.label,"category"),addText("h3",p.name),addText("p",p.description));
      const tags=document.createElement("div");tags.className="tags";for(const t of p.tech)tags.append(addText("span",t,"tag"));card.append(tags);
      const actions=document.createElement("div");actions.className="project-actions";actions.append(external(p.repo,"Source ↗"));if(p.demo)actions.append(external(p.demo,"Live demo ↗"));card.append(actions);grid.append(card);
    }
    if(!filtered.length)grid.append(addText("p","No systems match that search. Try another technology or select All sectors.","muted"));
    for(const button of map.querySelectorAll("button"))button.classList.toggle("is-hidden",!filtered.some(p=>p.id===button.dataset.project));
  }
  search.addEventListener("input",renderProjects);cat.addEventListener("change",renderProjects);
  $("#search-form").addEventListener("submit",(event)=>event.preventDefault());renderProjects();

  const menu=$("#main-nav"),menuBtn=$("#menu-toggle");
  menuBtn.addEventListener("click",()=>{const open=menu.classList.toggle("is-open");menuBtn.setAttribute("aria-expanded",String(open));});
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("is-open");menuBtn.setAttribute("aria-expanded","false");}));
  const clock=$("#utc-clock");function tick(){clock.textContent=new Date().toLocaleTimeString("en-GB",{timeZone:"UTC",hour:"2-digit",minute:"2-digit"})+" UTC";}tick();setInterval(tick,30000);

  const themes=["nebula","winter","arcade"];
  function setTheme(theme){if(!themes.includes(theme))return;document.body.dataset.theme=theme;for(const b of document.querySelectorAll("[data-select-theme]"))b.setAttribute("aria-pressed",String(b.dataset.selectTheme===theme));try{localStorage.setItem("alios-theme",theme);}catch(_){}}
  let saved;try{saved=localStorage.getItem("alios-theme")}catch(_){}
  const month=new Date().getMonth()+1;
  const seasonal=(month===12||month<=2)?"winter":month===10?"arcade":"nebula";
  setTheme(themes.includes(saved)?saved:seasonal);
  document.querySelectorAll("[data-select-theme]").forEach(b=>b.addEventListener("click",()=>setTheme(b.dataset.selectTheme)));

  const gameLinks=$("#game-links");
  for(const g of games){const label=g==="puzzle-bobble"?"Puzzle Bobble":g[0].toUpperCase()+g.slice(1);
    const a=external(path+g+"-contribution-graph-dark.svg",label+" ↗");
    a.title="Generated game asset — appears after the GitHub Action has run";
    gameLinks.append(a);
  }

  const log=$("#chat-log"),qInput=$("#chat-question"),form=$("#chat-form");
  function say(message,role,links=[]){
    const bubble=addText("div",message,"bubble "+role);
    for(const link of links){bubble.append(document.createTextNode("\n"));bubble.append(external(link.url,link.label));}
    log.append(bubble);log.scrollTop=log.scrollHeight;
  }
  function answer(question){
    const q=question.toLowerCase();
    if(/\b(hello|hi|hey|help)\b|what can you/.test(q))return {text:"Hi! Ask about projects, game development, machine learning, TypeScript, React, or which apps have demos. I'll link relevant public source repositories."};
    if(/(contact|email|linkedin|reach|hire)/.test(q))return {text:"You can connect with Ali on GitHub or LinkedIn, or send an email.",links:[{url:"https://www.linkedin.com/in/alinikan79/",label:"LinkedIn"},{url:"mailto:ali.nikan79@gmail.com",label:"Email"}]};
    const tokens=q.match(/[a-z0-9]+/g)||[];
    const stop=new Set(["what","which","does","the","are","have","has","can","show","made","your","about","with","code","project","projects","you","built","this","that","for","how","where","is","me","tell","uses","use","using","an","a","in","i","and","to"]);
    const filtered=tokens.filter(t=>!stop.has(t));
    let matches=projects.map(p=>{let score=0;const name=p.name.toLowerCase(),tech=p.tech.join(" ").toLowerCase(),desc=p.description.toLowerCase(),cat=p.category;
      for(const token of filtered){if(name.includes(token))score+=7;if(tech.includes(token))score+=4;if(desc.includes(token))score+=2;}
      if(/(play|game)/.test(q)&&cat==="game")score+=5;
      if(/(machine learning|data|ai |neural|model)/.test(q)&&cat==="ai")score+=5;
      if(/(web app|typescript|react|site)/.test(q)&&cat==="web")score+=3;
      return {p,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4);
    if(matches.length){const specific=matches[0].score>=8&&(matches.length===1||matches[0].score>matches[1].score*1.6);
      if(specific){const p=matches[0].p;const links=[{url:p.repo,label:"Explore "+p.name+" source"}];if(p.demo)links.push({url:p.demo,label:"Open demo"});return {text:p.name+": "+p.description+"\nTechnologies: "+p.tech.join(", ")+".",links};}
      return {text:"Here are the most relevant public projects: "+matches.map(x=>x.p.name+" — "+x.p.description).join("\n"),links:matches.map(x=>({url:x.p.repo,label:x.p.name+" repository"}))};
    }
    return {text:"I couldn't match that to my curated public project archive. Try a project name or technology, or browse the full repository list.",links:[{url:"https://github.com/alinikan?tab=repositories",label:"All public repositories"}]};
  }
  async function ask(question){
    say(question,"user");const endpoint=document.querySelector('meta[name="alios-ai-endpoint"]')?.content;
    if(endpoint){try{
      const resp=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question}),signal:AbortSignal.timeout(12000)});
      if(resp.ok){const data=await resp.json();if(typeof data.answer==="string"&&data.answer.length<4000){say(data.answer,"bot",Array.isArray(data.links)?data.links.filter(l=>typeof l?.url==="string"&&/^https:\/\/(github\.com|[a-z0-9-]+\.vercel\.app)\//i.test(l.url)).slice(0,3):[]);return;}}
    }catch(_){}}
    const result=answer(question);say(result.text,"bot",result.links||[]);
  }
  form.addEventListener("submit",event=>{event.preventDefault();const q=qInput.value.trim();if(!q)return;qInput.value="";void ask(q);});
  document.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>{qInput.value=b.dataset.question;form.requestSubmit();}));

  const bg=$("#stars"),bctx=bg.getContext("2d"),reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars=[];
  function resizeStars(){if(!bctx)return;const dpr=Math.min(2,window.devicePixelRatio||1);bg.width=Math.round(innerWidth*dpr);bg.height=Math.round(innerHeight*dpr);bctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(130,Math.floor(innerWidth/9))},(_,i)=>({x:(i*131.9)%innerWidth,y:(i*79.2)%innerHeight,r:i%11===0?1.7:.7,speed:.12+(i%5)*.045}));}
  function animateStars(){if(!bctx)return;bctx.clearRect(0,0,innerWidth,innerHeight);bctx.fillStyle="#bcbcf9";for(const s of stars){bctx.globalAlpha=.19+(s.r/1.7)*.33;bctx.beginPath();bctx.arc(s.x,s.y,s.r,0,Math.PI*2);bctx.fill();if(!reduce&&!document.hidden)s.y=(s.y+s.speed)%innerHeight;}bctx.globalAlpha=1;if(!reduce)requestAnimationFrame(animateStars);}
  if(bctx){resizeStars();addEventListener("resize",resizeStars);animateStars();}

  const canvas=$("#game"),ctx=canvas.getContext("2d");
  const W=canvas.width,H=canvas.height;let state="idle",score=0,best=0,remaining=30,shipX=W/2,items=[],last=0,spawn=0,hazard=0,animation=0,keys=new Set();
  try{best=Number(localStorage.getItem("alios-best")||0)||0}catch(_){}
  $("#best").textContent=String(best);
  const putStatus=(message)=>{$("#game-status").textContent=message;};
  function resetGame(){score=0;remaining=30;items=[];spawn=0;hazard=0;shipX=W/2;$("#score").textContent="0";$("#time-left").textContent="30s";drawGame();}
  const startBtn=$("#start-game"),pauseBtn=$("#pause-game");
  function startGame(){cancelAnimationFrame(animation);resetGame();state="running";startBtn.textContent="Restart mission";pauseBtn.disabled=false;pauseBtn.textContent="Pause";last=performance.now();putStatus("Mission active. Collect cyan stars and dodge red hazards.");animation=requestAnimationFrame(frame);}
  function togglePause(){if(state==="running"){state="paused";cancelAnimationFrame(animation);pauseBtn.textContent="Resume";putStatus("Mission paused.");}else if(state==="paused"){state="running";pauseBtn.textContent="Pause";last=performance.now();putStatus("Mission resumed.");animation=requestAnimationFrame(frame);}}
  function endGame(){state="over";pauseBtn.disabled=true;pauseBtn.textContent="Pause";putStatus("Mission complete — "+score+" points! Start again to beat your record.");}
  function shape(x,y,r,color,points=4){ctx.fillStyle=color;ctx.beginPath();for(let i=0;i<points*2;i++){const rad=Math.PI*i/points-Math.PI/2;const radius=i%2===0?r:r*.42;const px=x+Math.cos(rad)*radius,py=y+Math.sin(rad)*radius;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fill();}
  function drawGame(){if(!ctx)return;ctx.fillStyle="#081126";ctx.fillRect(0,0,W,H);for(let i=0;i<55;i++){const x=(i*139+41)%W,y=(i*67+11)%H;ctx.globalAlpha=.15+(i%5)*.10;ctx.fillStyle="#aacdf8";ctx.fillRect(x,y,i%7===0?2:1,i%7===0?2:1);}ctx.globalAlpha=1;ctx.strokeStyle="#28406a";for(let y=30;y<H;y+=43){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    for(const item of items)shape(item.x,item.y,item.r,item.danger?"#fb7185":"#67e8f9",item.danger?4:5);
    ctx.save();ctx.translate(shipX,H-33);ctx.shadowColor="#69e9fa";ctx.shadowBlur=18;ctx.fillStyle="#b7a4ff";ctx.beginPath();ctx.moveTo(0,-23);ctx.lineTo(22,18);ctx.lineTo(0,10);ctx.lineTo(-22,18);ctx.closePath();ctx.fill();ctx.restore();
    if(state==="idle"){ctx.fillStyle="#dae1ff";ctx.textAlign="center";ctx.font="17px monospace";ctx.fillText("STARFALL // PRESS START MISSION",W/2,70);}
    if(state==="paused"){ctx.fillStyle="#e9edff";ctx.textAlign="center";ctx.font="24px monospace";ctx.fillText("PAUSED",W/2,75);}
  }
  function frame(now){if(state!=="running")return;const dt=Math.min(.04,Math.max(0,(now-last)/1000));last=now;remaining=Math.max(0,remaining-dt);if(keys.has("ArrowLeft")||keys.has("a"))shipX-=dt*340;if(keys.has("ArrowRight")||keys.has("d"))shipX+=dt*340;shipX=Math.max(22,Math.min(W-22,shipX));
    spawn+=dt;hazard+=dt;if(spawn>.46){spawn=0;items.push({x:32+Math.random()*(W-64),y:-20,r:12,speed:115+Math.random()*80,danger:false});}
    if(hazard>1.6){hazard=0;items.push({x:32+Math.random()*(W-64),y:-20,r:16,speed:125+Math.random()*70,danger:true});}
    for(const item of items){item.y+=item.speed*dt;if(Math.abs(item.y-(H-33))<25&&Math.abs(item.x-shipX)<item.r+17){item.hit=true;if(item.danger){score=Math.max(0,score-3);}else{score+=2;}$("#score").textContent=String(score);if(score>best){best=score;$("#best").textContent=String(best);try{localStorage.setItem("alios-best",String(best));}catch(_){}}}}
    items=items.filter(item=>!item.hit&&item.y<H+30);$("#time-left").textContent=Math.ceil(remaining)+"s";drawGame();if(remaining<=0){endGame();return;}animation=requestAnimationFrame(frame);
  }
  startBtn.addEventListener("click",startGame);pauseBtn.addEventListener("click",togglePause);addEventListener("keydown",e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;if(["ArrowLeft","ArrowRight","a","d"].includes(e.key)){if(state==="running")e.preventDefault();keys.add(e.key);}});addEventListener("keyup",e=>keys.delete(e.key));
  canvas.addEventListener("pointermove",e=>{if(state!=="running")return;const rect=canvas.getBoundingClientRect();shipX=Math.max(22,Math.min(W-22,(e.clientX-rect.left)*W/rect.width));});
  canvas.addEventListener("pointerdown",e=>{if(state==="running"){const rect=canvas.getBoundingClientRect();shipX=Math.max(22,Math.min(W-22,(e.clientX-rect.left)*W/rect.width));}});
  canvas.addEventListener("pointercancel",()=>keys.clear());addEventListener("blur",()=>keys.clear());drawGame();

  async function loadGuestbook(){
    const box=$("#guestbook-entries");
    try{const response=await fetch("https://api.github.com/repos/alinikan/alinikan/issues?state=all&labels=guestbook-approved&per_page=12",{headers:{"Accept":"application/vnd.github+json"}});
      if(!response.ok)throw Error("GitHub temporarily unavailable");const issues=await response.json();const safe=Array.isArray(issues)?issues.filter(i=>!i.pull_request).slice(0,10):[];
      box.replaceChildren();if(!safe.length){box.append(addText("p","No approved transmissions yet. Be the first to submit one.","muted"));return;}
      for(const issue of safe){const div=document.createElement("article");div.className="guestbook-entry";const a=external(issue.html_url,issue.title||"Message");div.append(a,addText("p",String(issue.body||"").slice(0,280)));div.append(addText("small","From @"+String(issue.user?.login||"visitor").slice(0,40)));box.append(div);}
    }catch(_){box.replaceChildren(addText("p","Guestbook messages are unavailable right now. You can still use the GitHub form.","muted"));}
  }
  void loadGuestbook();

  async function loadMusic(){try{const res=await fetch("https://raw.githubusercontent.com/alinikan/alinikan/main/site/now-playing.json",{cache:"no-store"});if(!res.ok)return;const data=await res.json();if(!data.enabled||!data.track||!data.artist)return;
      $("#music-title").textContent=data.track;const meta=$("#music-meta");meta.replaceChildren();meta.append(document.createTextNode((data.nowPlaying&&data.updatedAt&&Date.now()-Date.parse(data.updatedAt)<10*60*1000?"Now playing":"Recently played")+" · "+data.artist));
      if(data.url&&/^https:\/\/www\.last\.fm\/music\//.test(data.url)){meta.append(document.createTextNode(" · "));meta.append(external(data.url,"Listen ↗"));}
    }catch(_){}}
  void loadMusic();
})();