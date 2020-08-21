# Yarn 2 and Module Federation Reproduction Issue

The issue I am seeing is the following:
> Your application tried to access next1, but it isn't declared in your dependencies; this makes the require call ambiguous and unsound.

To see this issue yourself run the following commands

```bash
# Install / link dependencies
yarn
```

Then open 2 terminals and run the following commands in each respectively

```bash
# Start app 1
cd packages/next1 && yarn dev
```

```bash
# Start app 2
cd packages/next2 && yarn dev
```

## Consuming the Federated Code

This example is taken from official module federation examples repo. In app 2, we are consuming the federated code from app 1. I have commented out the code that establishes the remotes as part of the `next.config.js`. The idea is that I don't want to have to do this for each remote I consume. That would require double deploy scenarios, and that really isn't desirable.

I may be injecting remote entry scripts into my document at runtime and these remote entries could live on completely separate infrastructure where I may not be able to walk the file system.

I've added some comments / questions in the code that can be found by searching for the text `Look here:`.