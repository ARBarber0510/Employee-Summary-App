const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// All employee questions
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter employee's name:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email address:"
    },
    {
        type: "input",
        name: "id",
        message: "Enter employee's company Id:"
    },
    {
        type: "list",
        name: "role",
        message: "Select employee's role in the company:",
        choices: ['Engineer', 'Manager', 'Intern']
    }
]
// Manager specific question
const managerQuestion = [
    {
        type: "input",
        name: "officeNumber",
        message: "Enter manager's office number:"
        }
]

// Intern specific question
const internQuestion = [
    {
        type: "input",
        name: "schoolName",
        message: "Enter the name of intern's school:"
        }
]

// Engingeer specific question
const engineerQuestion = [
    {
        type: "input",
        name: "githubName",
        message: "Enter engineer's GitHub username:"
        }
]

// Additional employees question
const addEmployee = [
    {
        type: "confirm",
        name: "addEmployees",
        message: "Would you like to add more employees?"
        }
]

// Async function to prompt user to answer questions on the command line.
async function promptUser() {
    try { 

        // Empty array to hold employee data objects
            const employees = [];

            // Setting variable for additional employees to true.
            let addEmployees = true;

                while (addEmployees) {

                    // Awaiting the results of the inquirer prompt and storing in the answer constant
                    const answer = await inquirer.prompt(employeeQuestions)
                    
                    // Run switch case based on the answers provided for each employee
                    switch(answer.role){
                        
                        case "Manager": {
                            const managerAnswer = await inquirer.prompt(managerQuestion);
                            const newManager = new Manager(answer.name, answer.id, answer.email, managerAnswer.officeNumber)
                            employees.push(newManager);
                            break;
                        };
                         
                        case "Intern": {
                            const internAnswer = await inquirer.prompt(internQuestion);
                            const newIntern = new Intern(answer.name, answer.id, answer.email, internAnswer.schoolName)
                            employees.push(newIntern);
                            break;    
                        };
                    
                        case "Engineer": {
                            const engineerAnswer = await inquirer.prompt(engineerQuestion);
                            const newEngineer = new Engineer(answer.name, answer.id, answer.email, engineerAnswer.githubName)
                            employees.push(newEngineer);
                            break;
                        }
                    }
                    const addEmployeeObject = await inquirer.prompt(addEmployee);

                    addEmployees = addEmployeeObject.more;
                };     
                    
                return employees;
        }

        catch(err) {
            console.log(err);
        }
    }


    async function buildHTML() {


        const employees = await promptUser();
    
        const outputHTML = await render(employees)
    
        fs.writeFile("./templates/team.html", outputHTML, function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log("HTML Generated");
            }
        });
    }
    
    buildHTML();


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
