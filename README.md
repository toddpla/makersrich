# Proof-of-Work

[Setup](#setup) | [Testing](#testing)

[![Waffle.io - Issues in progress](https://badge.waffle.io/toddpla/Proof-of-Work.png?label=in%20progress&title=In%20Progress)](http://waffle.io/toddpla/Proof-of-Work)

# Setup
1. `git clone https://github.com/toddpla/proof-of-work.git`
2. `cd proof-of-work`
3. `yarn install`
4. `yarn start`
5. Visit `http://localhost:3000/` in your browser
6. Login with a Google account and play!

## Controls
- Use the arrows keys to move your character
- Use `e` to dig and discover items
- Use `i` to open and close your inventory. Click the items to view their message


# Testing
### Unit
```
yarn test
```
### Integration
```
yarn run cypress:open
```
You will need to sign in to your Google account within the Cypress window for the tests to run

# Deployment
```
yarn build
firebase use production
firebase deploy
```
