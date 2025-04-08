document.addEventListener("DOMContentLoaded", ()=>{
    buildEvents();
})
async function buildEvents(){
    const completeEventsDiv = document.getElementById("eventsDiv");
    const events = await loadJson("events.json");
    Array.from(events.events).forEach(events =>{
        const dateString = events.date.split(" ")[1];
        const parts = dateString.split("-");
        const eventDate = new Date(parts[2], parts[1] - 1, parts[0]);
        console.log(eventDate);
        if(eventDate > Date.now()){
            const eventsDiv = document.createElement("div");
            eventsDiv.className = "singularEvent";

            const iframe = document.createElement("iframe");
            iframe.src = events.iframe.split(" ")[0];
            eventsDiv.appendChild(iframe);

            const eventsTitle = document.createElement("h2");
            eventsTitle.textContent = events.name;
            eventsDiv.appendChild(eventsTitle);
    
            const eventsDate = document.createElement("p");
            eventsDate.textContent = events.date;
            eventsDiv.appendChild(eventsDate);

            if(events.time != ""){
                const eventsTime = document.createElement("p");
                if(!String(events.time).includes("-")){
                    eventsTime.textContent = "ab"
                }
                eventsTime.textContent +=  " " + events.time;
                
                eventsDiv.appendChild(eventsTime);
            }
    
            const eventsAddress = document.createElement("strong");
            eventsAddress.textContent = events.address;
            eventsDiv.appendChild(eventsAddress);
    
            const eventsDistanceFromSchaerding = document.createElement("p");
            eventsDistanceFromSchaerding.textContent = events.distanceFromSchaerding + " von SD";
            eventsDiv.appendChild(eventsDistanceFromSchaerding);
    
           
            const eventsLink = document.createElement("p");
            const eventsLinkText = document.createElement("a");
            eventsLinkText.href = events.link;
            eventsLinkText.textContent = "Mehr Infos";
            eventsLink.appendChild(eventsLinkText);
            eventsDiv.appendChild(eventsLink);
    
            completeEventsDiv.appendChild(eventsDiv);
        }

       
    })
}
async function loadJson(path){
    console.log(path)
    const response = await fetch(path);
    const json = await response.json();
    return json;
}

