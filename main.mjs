import prompts  from "prompts";
import fs from 'fs'
import {exec , spawn} from "child_process";
import chokidar from "chokidar";
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
    name: 'OrginSetup',
    message: 'Do you Have your Origin setup? (Y/N)'
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
var projectDir;
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
  exec(`DIR ${projectDir} `, (err, stdout, stderr) => {
    if (err) {
      console.error('No Directory provided Exiting ');
      return;
    }
    console.log(stdout);
  });
// Initialize watcher.
const watcher = chokidar.watch(`${projectDir}`, {
  ignored: [`${projectDir}/node_modules/**/*`, `${projectDir}/.git/**/*`] , // ignore dotfiles
  persistent: true
});

// Something to use when events are received.
const log = console.log.bind(console);

// Add event listeners.
watcher
  .on('add', path => log(
    // On add new file.
    // child process
    exec(`git add .`, (err, stdout, stderr)=> {
      if(err){
        console.error("Waiting for files.")
        return;
      }
      console.log('successfully Added the files.')
    }),
    // Commit files
    exec(`git commit -m ${CommitMsg}`, (err, stdout, stderr)=> {
      if(err){
        console.error("Waiting for files")
        return;
      }
      console.log('successfully Commit the files Ready to push!')
    }),
    
    exec(`git commit -m ${CommitMsg}`, (err, stdout, stderr)=> {
      if(err){
        console.error("Waiting for files changes")
        return;
      }
      console.log('successfully Commit the files Ready to push!')
    }),
    exec(`git push`, (err, stdout, stderr)=> {
      if(err){
        console.error("waiting for files to push.")
        return;
      }
      console.log(`Pushed to You repo`)
    })
  ))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));
//   var watcher = chokidar.watch(`${projectDir}`, { ignored: /^\./, persistent: true });
// watcher
//     .on('add', function (path) { console.log('File', path, 'has been added'); ignored: [`${projectDir}/node_modules`] })
//     console.log(`start doing something now when a file has been added`);
})();