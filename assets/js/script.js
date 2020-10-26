

function increaseFunc(a, b) {
    return [a + 1, b + 1];
}

function generateRandomZ(minN, maxN) {
    return minN + Math.floor(Math.random() * (maxN - minN + 1));
}

function chooseOperation() {
    let operations = ['+', '-', '*', '/'];
    return operations[generateRandomZ(0, 3)];
}

function generateProblemOneOperation(maxValue1, maxValue2, operation) {
    let a = generateRandomZ(0, maxValue1);
    let b = generateRandomZ(0, maxValue2);
    if (operation == '/') {
        a = a * b;
    }
    output = `${a} ${operation} ${b}`;
    return output;
}

/* Initialise the game. */
function initializeGame() {
    $("#content").hide();

}

/* The main part of script. */
$(document).ready(function () {
    const maxNumber = 20;
    let solution = 0;

    initializeGame();

    $("#btn-answer").click(function() {
        $("#message").text(`You answered: ${$("#answer").val()}. Correct answer: ${solution}.`);
        $("#answer").prop("disabled", true);
    });

    $("#new").click(function() {
        let operation = chooseOperation();
        let problem = generateProblemOneOperation(maxNumber, maxNumber, operation);
        solution = eval(problem);
        $("#problem").html(problem + " = ");
        $("#answer").val("").prop("disabled", false);
        // $("#answer").prop("disabled", false);
        $("#message").text("Solve a problem:");
        $("#content").show();
    });

    $("#stop").click(function() {
        $("#content").hide();
        $("#new").hide();
        $("#stop").hide();
        $("#message").text("Game is OVER!");
        console.log("FINISH!");
    });
});