# Use OpenAI GPT model to review Pull Requests for Azure Devops
A task for Azure DevOps build pipelines to add GPT as PR reviewer

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=mustaphalarhrouch.GPTPullRequestReview).

## Usage

Add the tasks to your build definition.

## Setup

### Give permission to the build service agent

before use this task, make sure that the build service has permissions to contribute to pull requests in your repository :

![contribute_to_pr](https://github.com/mlarhrouch/azure-pipeline-gpt-pr-review/blob/main/images/contribute_to_pr.png?raw=true)

### Allow Task to access the system token

#### Yaml pipelines 

Add a checkout section with persistCredentials set to true.

```yaml
steps:
- checkout: self
  persistCredentials: true
```

#### Classic editors 

Enable the option "Allow scripts to access the OAuth token" in the "Agent job" properties :

![allow_access_token](https://github.com/mlarhrouch/azure-pipeline-gpt-pr-review/blob/main/images/allow_access_token.png?raw=true)


### OpenAI Models

You can choose which model to use.

## Contributions

Original author [GitHub](https://github.com/mlarhrouch/azure-pipeline-gpt-pr-review/issues).

## License

[MIT](https://raw.githubusercontent.com/mlarhrouch/azure-pipeline-gpt-pr-review/main/LICENSE)
