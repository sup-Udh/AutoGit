import prompts  from "prompts";
const questions = [
  {
    type: 'text',
    name: 'ProjectDir',
    message: 'Your Project Directory?'
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
  console.log(response.ProjectDir)
  console.log(response.GithubRepo)
  console.log(response.Commit)
})();