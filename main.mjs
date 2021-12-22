import prompts  from "prompts";
import fs from 'fs'
import {exec , spawn} from "child_process";



fs.watch("example_file.txt", (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});

const questions = [
  {
    type: 'text',
    name: 'ProjectDir',
    message: 'Your Project Directory?(Full path)'
  },
  {
    type: 'text',
    name: 'GithubRepo',
    message: 'Your Github Clone url?(Set url origin)'
  },
  {
    type: 'text',
    name: 'Commit',
    message: 'Your Commit Msg?',
  }
];

(async () => {
  const response = await prompts(questions);

  // => response => { username, age, about }
  // Getting the stuff from the user input
  var projectDir = response.ProjectDir
  var Githuburl = response.GithubRepo
  var CommitMsg = response.Commit

  exec(`cd ${projectDir} `, (err, stdout, stderr) => {
    if (err) {
      console.error('No Directory provided Exiting ');
      return;
    }
    console.log(stdout);
  });
  
  exec(`DIR ${projectDir} `, (err, stdout, stderr) => {
    if (err) {
      console.error('No directory specified Exiting');
      return;
    }
    console.log(stdout);
  });
  
  



})();

