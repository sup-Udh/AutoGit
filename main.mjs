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
    const log = console.log.bind(console);
  
    watcher
    .on('add', path => log(`File ${path} has been added`))
    .on('change', path => log(`File ${path} has been changed`))
    .on('unlink', path => log(`File ${path} has been removed`));
  }
  // if(!msg){
  //   console.log()
  //   console.log("No commit msg Provided in the Config file try agin")
  // }else{
  //   console.log()
  //   console.log("Recivied the Commit Message from Config file")
  // }

  // Setting up the watcher



 
})();