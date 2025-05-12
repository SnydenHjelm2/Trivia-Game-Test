async function getImages() {
    const req = new Request("https://api.pexels.com/v1/search?query=Frogs", {
        method: "GET",
        headers: {
            "Authorization": "sQLMQfpcJkVFD8dbejB6VqtaMkmnv7rIyaHrR45W2tOG5UWyaAeR4wfe"
        }
    });
    let resp = await fetch(req);
    console.log(resp);
    if (resp.ok) {
        let reso = await resp.json();
        console.log(reso);
        let firstPhoto = reso.photos[5].src.small;
        let img = document.createElement("img");
        img.src = firstPhoto;
        document.querySelector("main").appendChild(img);
    } else {
        console.log(resp.status);
    }
}

document.querySelector("button").addEventListener("click", getImages);