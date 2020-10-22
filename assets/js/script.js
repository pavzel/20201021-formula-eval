/* The main part of script. */
$(document).ready(function () {
    let maxNumber = 100;
    let a = Math.floor(Math.random() * (maxNumber + 1));
    let b = Math.floor(Math.random() * (maxNumber + 1));
    problem = `${a} + ${b}`;
    solution = eval(problem);
    $("#content").html(problem + " = " + solution);
});