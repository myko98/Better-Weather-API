

function createForm() {

    const numPlaces = document.querySelector("#places").value;

    //creates div container asking for method to find weather
    for (i = 0; i < numPlaces; i++) {
        let city = document.createElement("div");
        city.setAttribute("id", `class${i + 1}`);
        city.setAttribute("class","select");

        let select = sectionCreator(city);
        city.appendChild(select);


        document.body.appendChild(city);
        

    }


    //Functions

    //creates inputs once user selects option from select element (city, zip, coordinates)
    function inputInfo() {
        selects = document.querySelectorAll(".select");
        // console.log(selects);
        //console.log(this);

        let parent = this.parentElement;
        let parentId = parent.attributes[0].nodeValue //This access the div containing the select element's id value (class1, class2, etc)
        //console.log(parentId);
        //console.log(parent.childNodes);
        

        let ifInputExists = document.getElementById(parentId).childNodes[1]; //we see if the div already contains an input box, will return null if doesnt contain anything OR the input itself
        console.log(ifInputExists);
        if (ifInputExists == null) {
            if (this.value === "city name") {

                console.log(document.getElementById("input"));
                let input = document.createElement("input");
                input.setAttribute("id","input");
                input.setAttribute("type","text");
                this.parentElement.appendChild(input);
    
    
            }
            
            if (this.value === "coordinates") {
                let coor = document.createElement("div");
                coor.setAttribute("id","input");
                coor.setAttribute("class","coor");

                let lat = document.createElement("input");
                lat.setAttribute("type","number");

                let lon = document.createElement("input");
                lon.setAttribute("type","number");

                coor.appendChild(lat);
                coor.appendChild(lon);

                this.parentElement.appendChild(coor);
            }
    
            if (this.value === "zipcode") {
                let input = document.createElement("input");
                input.setAttribute("id","input");
                input.setAttribute("type","text");
                this.parentElement.appendChild(input);
            }
        } else {
            document.getElementById(parentId).removeChild(parent.childNodes[1]);
            if (this.value === "city name") {

                console.log(document.getElementById("input"));
                let input = document.createElement("input");
                input.setAttribute("id","input");
                input.setAttribute("type","text");
                this.parentElement.appendChild(input);
    
    
            }
            
            if (this.value === "coordinates") {
                let coor = document.createElement("div");
                coor.setAttribute("id","input");
                coor.setAttribute("class","coor");

                let lat = document.createElement("input");
                lat.setAttribute("type","number");

                let lon = document.createElement("input");
                lon.setAttribute("type","number");

                coor.appendChild(lat);
                coor.appendChild(lon);

                this.parentElement.appendChild(coor);
            }
    
            if (this.value === "zipcode") {
                let input = document.createElement("input");
                input.setAttribute("id","input");
                input.setAttribute("type","text");
                this.parentElement.appendChild(input);
            }
        }
        
        // test = document.createElement("button");
        // test.setAttribute("type","button");
        // test.textContent = "HIII";

        // this.parentElement.appendChild(test);
    }

    //create select drop down
    function sectionCreator(city) {

        let methods = document.createElement("select");

        methods.addEventListener("change",inputInfo);

        let meth = ["select an option","city name", "coordinates", "zipcode"];

        for (let i = 0; i < meth.length; i++) {
            let option = document.createElement("option");
            option.value = meth[i];
            option.text = meth[i];
            methods.appendChild(option);

        }
        return methods;
    }


    //dynamic input boxes based on section value
    //e.g if city name is selected -> creates textbox for city
    //if coor is selected -> creates 2 text boxes for lat and long

    
}

//function that runs after submit button is pressed
function displayWeather() {

    //gets data from input and stores in an object called 'divs'
    let divs = {};
    
    let objects = document.querySelectorAll(".select");
    let numDivs = document.querySelectorAll(".select").length;
    console.log(objects);
    
    for (i = 0; i < numDivs; i ++) {
        if (document.querySelector(`#class${i+1}`).childNodes[1].className) {
            divs[i] = `${document.querySelector(`#class${i+1}`).children.input.firstChild.value}, ${document.querySelector(`#class${i+1}`).children.input.lastChild.value}`
        } else {
            divs[i] = document.querySelector(`#class${i+1}`).lastChild.value;
        }
    }
    console.log(divs);

    //one flex box div that contains n number of divs
    //within each div do the api call corresponding to the given input

    let flex = document.createElement("div");
    flex.setAttribute("id","flex");

    for (i = 0; i < numDivs; i++) {
        let weather = document.createElement("div");
        let type = document.querySelector(`#class${i+1}`).childNodes[0].value
        let value = divs[i];
        
        if (type == "coordinates") {
            let coor = value.split(",");
            let lat = parseInt(coor[0]);
            let lon = parseInt(coor[1]);

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2f16fda48f4492d5907280b0b72cb154`
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                let cel = Math.floor(temp - 273.15);
                let value = document.createElement("p");

                value.textContent = cel;
                weather.appendChild(value);
            })


        } else if (type == "city name") {
            const api = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=2f16fda48f4492d5907280b0b72cb154`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                let cel = Math.floor(temp - 273.15);
                let value = document.createElement("p");

                value.textContent = cel;
                weather.appendChild(value);
            })
        } else {
            //note zip code only works with first 3 characters!!!
            console.log("zip code");

            const api = `http://api.openweathermap.org/data/2.5/weather?zip=${value},ca&appid=2f16fda48f4492d5907280b0b72cb154`
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                let cel = Math.floor(temp - 273.15);
                let value = document.createElement("p");

                value.textContent = cel;
                weather.appendChild(value);
            })
        }

        
        flex.appendChild(weather);

        
    }
    
    document.body.appendChild(flex);


}

//useful links
//1. how to add select element https://stackoverflow.com/questions/17001961/how-to-add-drop-down-list-select-programmatically
