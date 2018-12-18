import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import { GamePage, AppWrapper } from '../GamePage'
import { Player } from '../Player'

let startUpdatePlayer = jest.fn()
let impassablePos = jest.fn()
let handlePopupMessage = jest.fn()
let openModal = jest.fn()
let setState = jest.fn()

let props = {
  player: 'player',
  opponents: [],
  map: {
    impassable: [{x: 15, y: 30}],
    portals: [{x: 15, y: 30, name: 'Shop'}],
    signs: [{x: 15, y: 14, properties: [{value: 'This is a sign'}] }]
  }
}

let updates = {left: 0, top: 0}

test('gamepage renders correctly', () => {
  const gamePage = shallow(<GamePage {...props}/>)
  expect(gamePage).toMatchSnapshot();
});


test('AppWrapper renders correctly', () => {
  const appWrapper = renderer.create(<AppWrapper/>).toJSON();
  expect(appWrapper).toMatchSnapshot();
});

test('#handleMovement calls action to update player state', () => {
  let wrapper = shallow( <GamePage {...props} startUpdatePlayer={startUpdatePlayer}/> )
  const instance = wrapper.instance()
  instance.handleMovement(updates)
  expect(startUpdatePlayer).toHaveBeenLastCalledWith(updates)
})

// test('#handleMovement calls action to update player state', () => {
//   let wrapper = shallow( <GamePage {...props} startUpdatePlayer={startUpdatePlayer}/> )
//   const instance = wrapper.instance()
//   instance.handleMovement(updates)
//   expect(startUpdatePlayer).toHaveBeenLastCalledWith(updates)
// })

test('#checkBoundaries returns undefined with no updates', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkBoundaries(undefined)).toEqual()
})

test('#checkPortal returns false with no portal', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkPortal(0,0)).toEqual(false)
})

test('#checkPortal returns true with portal', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkPortal(15,30)).toEqual('Shop')
})

test('#checkSign returns false when no sign', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkSign(0, 0)).toEqual(false)
})

// test('#checkSign call a function when there is a sign', () => {
//   let wrapper = shallow( <GamePage {...props}/> )
//   const instance = wrapper.instance()
//   instance.checkSign(15, 30)
//   expect(handlePopupMessage).toHaveBeenLastCalledWith('This is a sign')
// })

test('#checkImpassable returns true when not impassable', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkImpassable({left: 0, top: 0})).toEqual(true)
})

test('#checkImpassable returns false when impassable', () => {
  let wrapper = shallow( <GamePage {...props}/> )
  const instance = wrapper.instance()
  expect(instance.checkImpassable({left: 15, top: 30})).toEqual(false)
})
