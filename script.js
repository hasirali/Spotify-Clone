
async function main(){

    let a = await fetch('http://127.0.0.1:5500/songs/');
    let response =  await a.text();
    console.log(response);
    let eleme
    let div = document.createElement("div");
    div.innerHTML =response;
    let tds = div.getElementsByTagName("td")
}

main();
