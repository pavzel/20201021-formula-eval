function generateRandomZ(minN, maxN) {
    return minN + Math.floor(Math.random() * (maxN - minN + 1));
}

function chooseOperation() {
    let operations = ['+', '-', '*', '/'];
    return operations[generateRandomZ(0, 3)];
}

function generateProblemOneOperation(maxValue1, maxValue2, operation) {
    let a = generateRandomZ(Math.floor(maxValue1 / 2), maxValue1);
    let b = generateRandomZ(Math.floor(maxValue2 / 2), maxValue2);
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
    const minMaxNumber = 2;
    const maxMaxNumber = 100;
    let maxNumber = 10;
    const minTimeoutT = 10;
    const maxTimeoutT = 60;
    let timeoutT = 20;
    let solution = 0;
    let countdownTimer;

    $("#problem-form").submit(function(e) {
        e.preventDefault();
        clearInterval(countdownTimer);
        $(this).children("input").prop("disabled", true);
        $("#new").prop("disabled", false);
        let message = "<br>You are right!";
        if ($("#answer").val() != solution) {
            message = `You are wrong. Correct answer is ${solution}.`;
            if (timeoutT < maxTimeoutT) { timeoutT += 1; }
            if (maxNumber > minMaxNumber) { maxNumber -= 1; }
        } else {
            if (timeoutT > minTimeoutT) { timeoutT -= 1; }
            if (maxNumber < maxMaxNumber) { maxNumber += 1; }
        }
        $("#new").text(`New problem\ntime=${timeoutT}s, max=${maxNumber}`);
        $("#message").html(message);
    });

    $("#new").click(function() {
        let operation = chooseOperation();
        let problem = generateProblemOneOperation(maxNumber, maxNumber, operation);
        solution = eval(problem);
        $("#problem").html(problem + " = ");
        $("#answer").val("");
        $("#problem-form").children("input").prop("disabled", false);
        $("#new").prop("disabled", true);
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
                if (timeoutT < maxTimeoutT) { timeoutT += 1; }
                if (maxNumber > minMaxNumber) { maxNumber -= 1; }
                $("#new").text(`New problem\ntime=${timeoutT}s, max=${maxNumber}`);
                $("#new").prop("disabled", false);
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