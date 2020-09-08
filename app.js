const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function promptUser() {

    let teamHTML = "";

    let teamNumber;

    await inquirer.prompt(
        {
        type: "number",
        name: "teamSize",
        message: "Enter the number of members in your team:"
        }
    )
    .then((data) => {
        teamNumber = data.teamSize + 1;
    });

    if(teamHTML === 0){
        console.log("Error: This team has no members...")
        return;
    }
    

    const questions = [
        {
            type: "input",
            name: "name",
            message: "Enter your name:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address:"
        },
        {
            type: "input",
            name: "role",
            message: "Select your role in the company:",
            choices: ['Employee', 'Engineer', 'Manager', 'Intern']
        }
    ]
    const managerQuestions = [
        {
            type: "input",
            name: "officeNumber",
            message: "Enter your office number:"
        }
    ]

    const internQuestions = [
        {
            type: "input",
            name: "school",
            message: "Enter your school name:"
        }
    ]

    const engineerQuestions = [
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username:"
        }
    ]



        const employeeData = []
        // Questions for all employees
        const employeeAnswers = await inquirer.prompt(questions);

        switch (employeeAnswers.employeeRole) {
            case "Manager": {
                const mgrAnswers = await inquirer.prompt(managerQuestions);
                employeeAnswers.additionalAnswers = mgrAnswers;
                break;
            }
            case "Intern": {
                const intAnswers = await inquirer.prompt(internQuestions);
                employeeAnswers.additionalAnswers = intAnswers;
                break;
            }
            case "Engineer": {
                const engAnswers = await inquirer.prompt(engineerQuestions);
                employeeAnswers.additionalAnswers = engAnswers;
                break;
            }

        }
    employeeData.push(employeeAnswers);

    const allEmployeeData = [];

    employeeData.forEach(element => {
        const
    })



}

promptUser();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
