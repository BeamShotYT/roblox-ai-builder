export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Use POST" }), { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: corsHeaders });
    }

    const prompt = body.prompt || "default prompt";

    let geminiData;
    try {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${env.GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Generate Roblox building JSON ONLY for: ${prompt}. Output must be a JSON array of parts like {Name, Size:[x,y,z], Position:[x,y,z], Color:[r,g,b], Material}`
              }]
            }]
          })
        }
      );
      geminiData = await geminiResponse.json();
    } catch {
      return new Response(JSON.stringify({ error: "Gemini request failed" }), { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify(geminiData), { status: 200, headers: corsHeaders });
  }
};
