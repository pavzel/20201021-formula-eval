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


/* The main part of script. */
$(document).ready(function () {
    const maxNumber = 20;
    let solution = 0;

    $("#problem-form").submit(function(e) {
        e.preventDefault();
        $(this).children("input").prop("disabled", true);
        let message = "<br>You are right!";
        if ($("#answer").val() != solution) {
            message = `You are wrong. Correct answer is ${solution}.`;
        }
        $("#message").html(message);
    });

    $("#new").click(function() {
        let operation = chooseOperation();
        let problem = generateProblemOneOperation(maxNumber, maxNumber, operation);
        solution = eval(problem);
        $("#problem").html(problem + " = ");
        $("#answer").val("");
        $("#problem-form").children("input").prop("disabled", false);
        $("#message").text("Solve a problem:");
        $("#content").show();
    });

    $("#stop").click(function() {
        $("#content").hide();
        $(".control-buttons").hide();
        $("#message").text("Game is OVER!").addClass("py-5 my-5 font-weight-bold text-danger");
    });
});