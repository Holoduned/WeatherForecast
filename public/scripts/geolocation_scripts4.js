$("#searchButton").click("click", function(event) {
    let value = document.getElementById("location").value;
    $.ajax({
        type: "GET",
        url: "searchGeolocation?name=" + value,
        dataType:'JSON',
        success: function(response){
            let value = document.getElementById("location");
            value.value = " ";
            let tabs = document.getElementById("tabsContainer");
            tabs.classList.remove("tabs");
            tabs.classList.add("hidden-tab-content");

            let tab2 = document.getElementById("threeContainer");
            tab2.innerHTML= "";
            let tab3 = document.getElementById("weekContainer");
            tab3.innerHTML= "";
            let hours = document.getElementById("hoursParent");
            hours.innerHTML= "";
            let today = document.getElementById("todayParent");
            today.innerHTML= "";
            let img = document.getElementById("imgParent");
            img.innerHTML= "";
            // let tabs = document.getElementById("tabs");
            // tabs.classList.add("hidden-tab-content");

            response.forEach(el => {
                let locationButton = document.createElement("button");
                //locationButton.classList.add("btn")
                locationButton.classList.add("location-button")
                locationButton.classList.add("form-control")
                locationButton.id = "locationButton";
                locationButton.textContent = el.GeoObject.name + " " + el.GeoObject.description;
                locationButton.value = el.GeoObject.Point.pos;
                locationButton.addEventListener("click", Weather);
                let container = document.getElementById("locations_container");
                container.appendChild(locationButton);
            })
        },
        error:function(response){
            console.log(response);
        }
    })
});