import prompts  from "prompts";
import fs from 'fs'
import {exec , spawn} from "child_process";
import chokidar from "chokidar";
import CONFIG  from './config.js'
// Importing the Config files. 



const questions = [
  // Custom Configuration


  {
    type: "text",
    name: "customConfig",
    message: "Do you want to Run the Custom Configuration file?(Y/N) ",

  }
];



(async () => {
  const response = await prompts(questions);
  const customConfig = response.customConfig
  const Dir = CONFIG.ProjectDirectory
  const msg  = CONFIG.CommitMessage
  
  if(customConfig === "N"){
    console.log("Quitting.")
  }

  if(customConfig === "Y"){
    
  if(!Dir ){
    console.log()
    console.log('The path provided in the Config file, is null PLease Fix it')
    console.log()

  }
  else{
    const watcher = chokidar.watch(`${Dir}`, {
      ignored: [`${Dir}/node_modules/**/*`, `${Dir}/.git/**/*`] , // ignore dotfiles
      persistent: true
    });


    const log = console.log.bind();
  
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
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
        if(err){
          console.error("Waiting for files")
          return;
        }
        console.log('successfully Commit the files Ready to push!')
      }),
      
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
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
    
    
    .on('change', path => log(
      exec(`git add .`, (err, stdout, stderr)=> {
        if(err){
          console.error("Waiting for files.")
          return;
        }
        console.log('successfully Added the files.')
      }),
      // Commit files
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
        if(err){
          console.error("Waiting for files")
          return;
        }
        console.log('successfully Commit the files Ready to push!')
      }),
      
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
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
    .on('unlink', path => log(
      exec(`git add .`, (err, stdout, stderr)=> {
        if(err){
          console.error("Waiting for files.")
          return;
        }
        console.log('successfully Added the files.')
      }),
      // Commit files
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
        if(err){
          console.error("Waiting for files")
          return;
        }
        console.log('successfully Commit the files Ready to push!')
      }),
      
      exec(`git commit -m ${msg}`, (err, stdout, stderr)=> {
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
    ));
  }
  
  if(!msg){
    console.log()
    console.log("No commit msg Provided in the Config file try agin")
  }else{
    console.log()
    console.log("Recivied the Commit Message from Config file")
  }

    
  }

})();

