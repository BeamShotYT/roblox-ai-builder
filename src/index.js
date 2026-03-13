export default {
  async fetch(request) {

    if (request.method !== "POST") {
      return new Response("Use POST", { status: 405 });
    }

    const body = await request.json();
    const prompt = body.prompt;

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCcMUQxBrjnD3iYATIcA3iNhM5pUq0l4MM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate Roblox building JSON for: ${prompt}.
                  Only return JSON like this:
                  {
                    "parts":[
                      {
                        "type":"Part",
                        "size":[10,5,10],
                        "position":[0,5,0]
                      }
                    ]
                  }`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
