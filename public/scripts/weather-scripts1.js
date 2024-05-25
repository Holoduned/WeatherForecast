function Weather(){
    //сделать функцию по загрузке страницы и в контроллере прописать проверку на локацию для отрисовки
    let location = this.value;
    $.ajax({
        type: "GET",
        url: "getWeather?location=" + location,
        dataType:'JSON',
        success: function(response){
            // let tabs = document.getElementById("tabs");
            // tabs.classList.remove("hidden-tab-content");

            let locations = document.getElementById("locations_container");
            locations.innerHTML= "";
            let tabs = document.getElementById("tabsContainer");
            tabs.classList.remove("hidden-tab-content");
            tabs.classList.add("tabs");

            let count = 0;
            let today = document.getElementById("todayParent");
            let three = document.getElementById("threeContainer");
            let week = document.getElementById("weekContainer");
            response.forecasts.forEach(el => {
                if(count === 0){

                    let date = document.createElement("label");
                    const timestamp = response.now;
                    const nowDate = new Date(timestamp * 1000);
                    let dat = nowDate.toString().split(' ');

                    date.textContent = `${days[dat[0]]}, ${months[dat[1]]} ${dat[2]}`;
                    date.classList.add("today-title");
                    today.appendChild(date);

                    let curr_temp = document.createElement("div");
                    curr_temp.textContent = response.fact.temp + "°";
                    curr_temp.classList.add("today-text");
                    let feel_temp = document.createElement("div");
                    feel_temp.textContent = "Ощущается как " + response.fact.feels_like + "°";
                    feel_temp.classList.add("today-text");
                    today.appendChild(curr_temp);
                    today.appendChild(feel_temp);

                    let wind = document.createElement("div");
                    wind.textContent = "Ветер " + response.fact.wind_speed + "м/с, " + wind_directions[response.fact.wind_dir];
                    wind.classList.add("today-text");
                    today.appendChild(wind);

                    let humidity = document.createElement("div");
                    humidity.textContent = "Влажность " + response.fact.humidity + "%";
                    humidity.classList.add("today-text");
                    today.appendChild(humidity);

                    let pressure = document.createElement("div");
                    pressure.textContent = "Давление " + response.fact.pressure_mm + " мм.рт.ст.";
                    pressure.classList.add("today-text");
                    today.appendChild(pressure);

                    let icon = document.createElement("img");
                    icon.src = `https://yastatic.net/weather/i/icons/funky/dark/${response.fact.icon}.svg`;
                    icon.classList.add("today-icon");
                    document.getElementById("imgParent").appendChild(icon);

                    createHoursForecast(el);

                }
                if(count < 3){
                    createThreeForecast(el, three);
                }
                createWeekForecast(el, week);
                count += 1;
            })
        },
        error:function(response){
            console.log(response);
        }
    })
}

function createHoursForecast(object){
    let parent = document.getElementById("hoursParent");
    object.hours.forEach(el =>{
        let container = document.createElement("div");
        container.classList.add("hour-container");

        let temp = document.createElement("label");
        temp.textContent = el.temp + "°";
        container.appendChild(temp);
        let icon = document.createElement("img");
        icon.src = `https://yastatic.net/weather/i/icons/funky/dark/${el.icon}.svg`;
        container.appendChild(icon);
        let hour = document.createElement("label");
        hour.textContent = el.hour + ":00";
        container.appendChild(hour);

        parent.appendChild(container);
    })
}
function createWeekForecast(object, parent){

    let part_container= document.createElement("div");
    part_container.classList.add("w_container");

    let day = document.createElement("label");
    let num = document.createElement("label");
    const timestamp = object.date_ts;
    const nowDate = new Date(timestamp * 1000);
    let dat = nowDate.toString().split(' ');
    day.textContent = `${days[dat[0]]}`;
    num.textContent = `${dat[2]}`;
    day.classList.add("today-text");
    day.classList.add("space");
    num.classList.add("today-text");
    num.classList.add("space");
    part_container.appendChild(day);
    part_container.appendChild(num);

    let icon = document.createElement("img");
    icon.src = `https://yastatic.net/weather/i/icons/funky/dark/${object.parts.day.icon}.svg`;
    icon.classList.add("three_icon");
    icon.classList.add("space");
    part_container.appendChild(icon);

    let temp = document.createElement("p");
    temp.textContent = Math.round(getAverage([Number(object.parts.night.temp_avg), Number(object.parts.morning.temp_avg), Number(object.parts.day.temp_avg), Number(object.parts.evening.temp_avg)])) + "°";
    temp.classList.add("today-text");
    temp.classList.add("space");
    part_container.appendChild(temp);


    parent.appendChild(part_container);
}
function createThreeForecast(object, parent){

    let part_container = document.createElement("div");
    part_container.classList.add("part_container");

    let b_container = document.createElement("div");
    b_container.classList.add("b-container");

    let date = document.createElement("label");
    const timestamp = object.date_ts;
    const nowDate = new Date(timestamp * 1000);
    let dat = nowDate.toString().split(' ');
    date.textContent = `${days[dat[0]]}, ${months[dat[1]]} ${dat[2]}`;
    date.classList.add("today-title");
    part_container.appendChild(date);

    let parts = [object.parts.night.temp_avg, object.parts.morning.temp_avg, object.parts.day.temp_avg, "", object.parts.evening.temp_avg]
    let icons = [object.parts.night.icon, object.parts.morning.icon, object.parts.day.icon, "", object.parts.evening.icon]
    for (let i = 0; i < 5; i++) {
        if(i !== 3){
            let p_container = document.createElement("div");
            p_container.classList.add("p-container");

            let part = document.createElement("label");
            part.textContent = day_parts[i];
            part.classList.add("today-text");
            part.classList.add("today-title");
            p_container.appendChild(part);
            let icon = document.createElement("img");
            icon.src = `https://yastatic.net/weather/i/icons/funky/dark/${icons[i]}.svg`;
            icon.classList.add("three_icon");
            icon.classList.add("today-title");
            p_container.appendChild(icon);
            let temp = document.createElement("label");
            temp.classList.add("today-text");
            temp.textContent = parts[i] + "°";
            temp.classList.add("today-title");
            p_container.appendChild(temp);
            b_container.appendChild(p_container)
            part_container.appendChild(b_container)

        }
    }
    parent.appendChild(part_container)
}
const getAverage = (numbers) => numbers.reduce((acc, number) => acc + number, 0) / numbers.length
const wind_directions = {
    nw: 'северо-западное',
    n: 'северное',
    ne: 'северо-восточное',
    e:'восточное',
    se:'юго-восточное',
    s:'южное',
    sw:'юго-западное',
    w:'западное',
    c:'штиль'
};
const months = {
    Jan: 'Январь',
    Nov: 'Ноябрь',
    Feb: 'Февраль',
    Mar: 'Март',
    Apr: 'Апрель',
    May: 'Май',
    June: 'Июнь',
    Jule: 'Июль',
    Aug: 'Август',
    Sept: 'Сентябрь',
    Oct: 'Октябрь',
    Dec: 'Декабрь',

};
const days = {
    Sun: 'Воскресенье',
    Mon: 'Понедельник',
    Tue: 'Вторник',
    Wed: 'Среда',
    Thu: 'Четверг',
    Fri: 'Пятница',
    Sat: 'Суббота',

};
const day_parts = ["Ночь", "Утро", "День", "", "Вечер"];