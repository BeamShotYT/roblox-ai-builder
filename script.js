async function generate(){

const prompt = document.getElementById("prompt").value

const res = await fetch("https://your-api-url/generate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({prompt})
})

const data = await res.json()

document.getElementById("output").textContent =
JSON.stringify(data,null,2)

}
