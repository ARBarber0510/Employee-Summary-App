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
    console.log("Welcome!");

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
    
    for(i = 1; i < teamNumber; i++ ) {
        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([
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
                choices: ['Engineer', 'Manager', 'Intern']
            }
        ])
        .then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        switch(role){
            
            case "Manager":
            await inquirer.prompt([
                {
                type: "input",
                name: "officeNumber",
                message: "Enter your office number:"
                }
            ])
            .then ((data) => {
                const manager = new Manager(name, id, email, data.officeNumber);
                teamMember = fs.readFileSync("templates/manager.html");
                teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
            });
            break;
            
            case "Intern":
                await inquirer.prompt([
                    {
                    type: "input",
                    name: "schoolName",
                    message: "Enter the name of your school:"
                    }
                ])
                .then ((data) => {
                    const intern = new Intern(name, id, email, data.schoolName);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                });
            break;
            
            case "Engineer":
                await inquirer.prompt([
                    {
                    type: "input",
                    name: "githubName",
                    message: "Enter your GitHub username:"
                    }
                ])
                .then ((data) => {
                    const engineer = new Engineer(name, id, email, data.githubName);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                });
            break;
        };
    }

    const mainHTML = fs.readFileSync("templates/main.html")

    teamHTML = eval('`' + mainHTML +'`');

    fs.writeFile("output/team.html", teamHTML, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("Successfully wrote team.html file");
    });
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
