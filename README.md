# MakersRich

[Playing the Game](#playing-the-game) | [Setup](#setup) | [Testing](#testing)

[![Build Status](https://travis-ci.com/toddpla/makersrich.svg?branch=master)](https://travis-ci.com/toddpla/makersrich)
[![Waffle.io - Issues in progress](https://badge.waffle.io/toddpla/Proof-of-Work.png?label=in%20progress&title=In%20Progress)](http://waffle.io/toddpla/Proof-of-Work)
[![star this repo](http://githubbadges.com/star.svg?user=toddpla&repo=makersrich&style=flat)](https://github.com/toddpla/makersrich)
[![fork this repo](http://githubbadges.com/fork.svg?user=toddpla&repo=makersrich&style=flat)](https://github.com/toddpla/makersrich/fork)
[![Pending Pull-Requests](http://githubbadges.herokuapp.com/toddpla/makersrich/pulls.svg?style=flat)](https://github.com/boennemann/badges/pulls)
[![Open Issues](http://githubbadges.herokuapp.com/boennemann/badges/issues.svg?style=flat)](https://github.com/boennemann/badges/issues)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

The game is deployed on firebase, here - [MakersRich](https://makerzrich.firebaseapp.com)

# Playing the Game
## Gameplay
The aim of the game is to become a Wizard.

Run around the map looking for Rubies and JavaBeans, and check out the knowledge they contain by studying them in your inventory.

Once you think you have what it takes, head to the Quiz House and test your knowledge against the Wise Old Wizard. It'll cost you money to attempt questions.

Find cash when you dig around the map, or get into a Battle with another player to win their cash! (Capital at risk).

Find the egg before your opponents do and win big bucks!

If you have more money than sense, pop over to Muxworthy's and take a look at his wares!

## Controls
- Use the arrows keys to move your character
- Use `e` to dig and discover items
- Use `i` to open and close your inventory. Click the items to view their message
- Use `t` to start writing a message
- Use `q` to interact with signs


# Setup
1. `git clone https://github.com/toddpla/makersrich.git`
2. `cd proof-of-work`
3. `yarn install`
4. `yarn start`
5. Visit `http://localhost:3000/` in your browser
6. Login with a Google/Github account and play!

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

# Contributing

Pull Requests are most welcome! Head over to the issues tab to see what could be done.

## Authors

[Todd](www.github.com/toddpla)
[Imtiyaz](www.github.com/imtiyazzaman1)
[Felix](www.github.com/felixjtdb)
[Robin](www.github.com/rbbri)
[Alfie](www.github.com/runticle)


[![forthebadge](https://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)
