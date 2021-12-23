import prompts  from "prompts";
import fs from 'fs'
import {exec , spawn} from "child_process";


// file watch changes
fs.watch("./dist", (eventType, filename) => {
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
    name: 'OrginSetup',
    message: 'Do you Have your Origin setup? (Y/N)'

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
  var originDeatils = response.OriginSetup
  
  if(originDeatils === 'Y'){
    console.log("skipping Adding Remotes origins")
  }

  if(originDeatils === 'N'){
    console.log("setting up your origin")
      // The Repo URL for
  exec(`git remote add origin  ${Githuburl} `, (err, stdout, stderr) => {
    if (err) {
      console.error('Oh no! The Origin Already Exists!');
      return;
    }
    console.log('successfully Connected to the Repo');
  });


    
  }


  exec(`cd ${projectDir} `, (err, stdout, stderr) => {
    if (err) {
      console.error('No Directory provided Exiting ');
      return;
    }
    console.log('Into the Directory!)')
  });

  
  



})();

