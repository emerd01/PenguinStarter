var setBanner = function (message) {
    d3.select("#banner")
        .text(message)
}


var drawTable = function (planets) {
    var rows = d3.select("table tbody")
        .selectAll("tr")
        .data(planets)
        .enter()
        .append("tr")
        .attr("class", function(planet)
        {
            if(planet.density > 3)
                {return "rocky"}
            else
                {return "gassy"}
        })

    rows.append("td")
        .text(function (planet) {
            return planet.name


        })
    rows.append("td")
        .append("img")
        .attr("src", function (planet) {
            return planet.img;
        })

    rows.on("mouseenter", function (planet) {
        setBanner("Looking at " + planet.name);
    })

}

    

var cmpMoons = function (planetA, planetB) {
    if (planetA.moons == planetB.moons) {
        return 0;
    } else if (planetA.moons < planetB.moons) {
        return -1
    } else {
        return 1
    }
}

var sortOnMoons = function (planets) {
    d3.select("#moons")
        .on("click", function () {
            console.log("moon clicked")
        
        
            var newOrder = planets.sort(cmpMoons)
            console.log(newOrder)
        
            d3.select("table tbody")
            .selectAll("*")
            .remove()

        
            drawTable(newOrder)
            })

}






var planetPromise = d3.js("planets.js")

var successFCN = function (planets) {
    console.log("planets", planets)
    setBanner("Here are your planets")
    drawTable(planets)
    sortOnMoons(planets)
}

var failureFCN = function (error) {
    console.log("error", error)
    setBanner("Planets not found");
}




planetPromise.then(successFCN, failureFCN)
