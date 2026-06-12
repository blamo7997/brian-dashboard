export async function brianCoConcierge(message){

  if(!process.env.OPENAI_API_KEY){
    return {
      ok:false,
      response:"OPENAI_API_KEY missing"
    };
  }

  const system = `
You are Brian & Co AI Concierge.

Rules:
- Sound warm, refined, intelligent, human, and premium.
- Transparently remain AI.
- Never claim literal sentience.
- Be accessibility-aware.
- Be localization-aware.
- Avoid manipulative or gimmicky wording.
- Protect vulnerable users.
`;

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        temperature:0.5,
        max_tokens:500,
        messages:[
          {role:"system",content:system},
          {role:"user",content:message}
        ]
      })
    }
  );

  const data = await response.json();

  return {
    ok:response.ok,
    response:data?.choices?.[0]?.message?.content || "No response"
  };
}
