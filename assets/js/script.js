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
        if (b == 0) {
            b = 1;
        }
        a = a * b;
    }
    output = `${a} ${operation} ${b}`;
    return output;
}


/* The main part of script. */
$(document).ready(function () {
    const maxNumber = 20;
    const timeoutT = 30;
    let solution = 0;
    let countdownTimer;

    $("#problem-form").submit(function(e) {
        e.preventDefault();
        clearInterval(countdownTimer);
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
        $("#content").show();
        let timeLeft = timeoutT;
        let message = `Solve a problem<br>
            <em><small><span id="time-left">${timeLeft}</span> sec left</small></em>`;
        $("#message").html(message);
        countdownTimer = setInterval(function() {
            if (timeLeft == 0) {
                clearInterval(countdownTimer);
                $("#problem-form").children("input").prop("disabled", true);
                let message = `Time is out. Correct answer was ${solution}.`;
                $("#message").html(message);
            } else {
                timeLeft -= 1;
                $("#time-left").html(timeLeft);
            }
        }, 1000);
    });

    $("#stop").click(function() {
        $("#content").hide();
        $(".control-buttons").hide();
        $("#message").text("Game is OVER!").addClass("py-5 my-5 font-weight-bold text-danger");
    });
});