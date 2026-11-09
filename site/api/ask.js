/**
 * Optional ALI.OS AI upgrade for a Vercel deployment whose Root Directory is "site".
 * Disabled unless OPENAI_API_KEY is configured. Public project facts only.
 * Before making this endpoint public, configure platform-wide rate limiting / WAF
 * and spending limits — serverless in-memory limits do not protect across instances.
 */
const knowledge = [
  ["Pockit","A personal finance app for budgeting, spending, bills, savings and debt planning.","TypeScript","https://github.com/alinikan/pockit","https://pockit-budget.vercel.app"],
  ["LexiLoop","Vocabulary learning with spaced review and optional AI-assisted lesson generation.","TypeScript; Supabase; OpenAI","https://github.com/alinikan/LexiLoop","https://lexiloop-ali.vercel.app"],
  ["Autopilot","Guided car-learning lessons, recognition quizzes and Canadian car data.","React; TypeScript; Supabase","https://github.com/alinikan/autopilot-car-school","https://autopilot-car-school.vercel.app"],
  ["Recomp","Mobile-first workout, nutrition and progress tracking app.","TypeScript; Supabase","https://github.com/alinikan/workout-tracker","https://ali-workout.vercel.app"],
  ["Steam Game Recommender","Game recommendations with NLP and machine-learning popularity predictions.","Python; scikit-learn; NLP","https://github.com/alinikan/GameRecommender",""],
  ["Cat Identifier","Cat-versus-non-cat classifier using a deep neural network.","Python; neural networks","https://github.com/alinikan/Cat-Identifier",""],
  ["After the Last Bell","Original browser-based choice game with pixel art and music.","HTML; CSS; JavaScript","https://github.com/alinikan/after-the-last-bell-game","https://after-the-last-bell-game.vercel.app"],
  ["Maze Runner","2D maze game with enemies, levels and an MVC architecture.","Java","https://github.com/alinikan/MazeRunner",""]
];

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control","no-store");
  res.setHeader("X-Content-Type-Options","nosniff");
  if (req.method !== "POST") {res.setHeader("Allow","POST");return res.status(405).json({error:"Method not allowed"});}
  const origin=req.headers.origin||"";
  if(origin){try{const host=new URL(origin).host;if(host!==req.headers.host) return res.status(403).json({error:"Cross-origin requests are not allowed"});}catch{return res.status(403).json({error:"Invalid origin"});}}
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:"AI project concierge is not connected"});
  const size=Number(req.headers["content-length"]||0);
  if(size>2500) return res.status(413).json({error:"Request too large"});
  const question=typeof req.body?.question==="string" ? req.body.question.trim():"";
  if(question.length<2||question.length>450) return res.status(400).json({error:"Question must be between 2 and 450 characters"});
  const system = [
    "You are ALI.OS Project Concierge, a concise and friendly guide to Ali Nikan's PUBLIC software projects.",
    "Use ONLY the reference data supplied below. Do not claim to have browsed repository contents, checked live deployments, or accessed private information.",
    "If reference information is missing, say so. Do not invent features, statistics or credentials.",
    "When useful, include an exact repository URL from the list as plain text. No arbitrary URLs.",
    "Keep answers under 140 words. Avoid asking for personal or sensitive information.",
    "Curated project reference (name | summary | technologies | repo | demo):",
    ...knowledge.map(row=>row.join(" | "))
  ].join("\n");
  try {
    const abort=AbortSignal.timeout(12000);
    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      signal:abort,
      headers:{"Authorization":"Bearer "+process.env.OPENAI_API_KEY,"Content-Type":"application/json"},
      body:JSON.stringify({model:process.env.ALIOS_OPENAI_MODEL||"gpt-4.1-mini",store:false,max_output_tokens:330,input:[{role:"system",content:system},{role:"user",content:question}]})
    });
    if(!response.ok) return res.status(502).json({error:"Concierge model request failed"});
    const data=await response.json();
    const answer=(data.output||[]).flatMap(o=>Array.isArray(o.content)?o.content:[]).filter(c=>c.type==="output_text").map(c=>c.text).join("\n").slice(0,2500);
    if(!answer) return res.status(502).json({error:"Concierge had no answer"});
    return res.status(200).json({answer,source:"curated-public-repositories"});
  } catch (_) {
    return res.status(504).json({error:"Concierge timed out"});
  }
};