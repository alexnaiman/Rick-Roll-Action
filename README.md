# RickRoll Action

Action that turns any `package.json's start` into a RickRoll using (this amazing bash script)[https://github.com/keroserene/rickrollrc]

RickRoll Action is an Github action created for the [dev.to](dev.to)'s ActionsHackathon

## Inputs

### `github-token`

*Required* Github token to have access to the repo

## Outputs

Transform all npm start scripts into RickRoll's

## Example Usage

```yaml
on: [push]
  jobs:
    rick_roll_job:
      runs-on: ubuntu-latest
      name: Never Gonna Give You Up
      steps:
        - name: Never Gonna Let You down
          id: rick
          uses: alexnaiman/Rick-Roll-Action@v1
          with:
            github-token: ${{ secrets.GITHUB_TOKEN }}
```
