var classPromise = d3.json("classData.json")

var successFCN = function (penguins) {
    console.log("penguins", penguins)
    setBanner("Here are your penguins")
    drawTable(penguins)
}

var failureFCN = function (error) {
    console.log("error", error)
    setBanner("Penguins not found")
}

classPromise.then(successFCN, failureFCN)

var setBanner = function (message) {
    d3.select("#banner")
        .text(message)
}


var quizMean = function (penguin) {
    var getQuizGrade = function (quiz) {
        return quiz.grade
    }
    var quizGrade = penguin.quizes.map(getQuizGrade)
    return d3.mean(quizGrade)
}

var homeworkMean = function (penguin) {
    var getHWGrade = function (homework) {
        return homework.grade
    }
    var homeworkGrade = penguin.homework.map(getHWGrade)
    return d3.mean(homeworkGrade)
}

var testMean = function (penguin) {
    var getTestGrade = function (test) {
        return test.grade
    }
    var testGrade = penguin.test.map(getTestGrade)
    return d3.mean(testGrade)
}

var finalMean = function (penguin) {
    var getFinalGrade = function (final) {
        return final.grade
    }
    var finalGrade = penguin.final.map(getFinalGrade)
    return d3.mean(finalGrade)
}

 

var drawTable = function (penguins) {
    var rows = d3.select("#penguinTable tbody")
        .selectAll("tr")
        .data(penguins)
        .enter()
        .append("tr")

    var getPhoto = function (penguin) {
        return "imgs/" + penguin.picture
    }

    rows.append("td")
        .append("img")
        .attr("src", getPhoto)

    rows.append("td")
        .text(quizMean)

    rows.append("td")
        .text(homeworkMean)

    rows.append("td")
        .text(testMean)

    rows.append("td")
        .text(finalMean)

}
