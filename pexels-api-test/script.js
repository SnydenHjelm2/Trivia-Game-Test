async function getImages() {
    const req = new Request("https://api.pexels.com/v1/search?query=Frogs&per_page=30", {
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
        let num = Math.floor(Math.random() * reso.photos.length);
        let photo = reso.photos[num].src.small;
        let img = document.createElement("img");
        img.src = photo;
        document.querySelector("main").appendChild(img);
    } else {
        console.log(resp.status);
    }
}

document.querySelector("button").addEventListener("click", getImages);