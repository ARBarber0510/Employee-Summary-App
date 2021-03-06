const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Empty array to hold employee data objects
let employees = [];

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
const moreEmpQuestion = [
    {
        type: "confirm",
        name: "addEmployees",
        message: "Would you like to add more employees?",
        }
]

// Async function to prompt user to answer questions on the command line.
    async function promptUser() {
        try { 

                    // Awaiting the results of the inquirer prompt and storing in the answer constant
                    const answer = await inquirer.prompt(employeeQuestions)
                    
                    // Run switch case based on the answers provided for each employee
                    // Pushing answers object into into addEmployeeObject
                    switch(answer.role){
                        
                        case "Manager": 
                            const managerAnswer = await inquirer.prompt(managerQuestion);
                            const newManager = new Manager(
                                answer.name, 
                                answer.id, 
                                answer.email, 
                                managerAnswer.officeNumber)
                            employees.push(newManager);
                            break;
                        
                         
                        case "Intern": 
                            const internAnswer = await inquirer.prompt(internQuestion);
                            const newIntern = new Intern(
                                answer.name, 
                                answer.id, 
                                answer.email, 
                                internAnswer.schoolName)
                            employees.push(newIntern);
                            break;    
                        
                    
                        case "Engineer": 
                            const engineerAnswer = await inquirer.prompt(engineerQuestion);
                            const newEngineer = new Engineer(
                                answer.name, 
                                answer.id, 
                                answer.email, 
                                engineerAnswer.githubName)
                            employees.push(newEngineer);
                            break;
                        
                    }


                    const moreEmployeeObject = await inquirer.prompt(moreEmpQuestion);
                        if (moreEmployeeObject.addEmployees) {
                            promptUser();
                        }
                        else {
                            generateHTML();
                        }

            }

            catch(err) {
                console.log(err);
            };
    };


    // Build team.html based off the information provided.
    async function generateHTML() {
    
        const outputHTML = await render(employees)
    
        fs.writeFile("./templates/team.html", outputHTML, function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log("Successfully generated team.html");
            }
        });
    }


    promptUser();

