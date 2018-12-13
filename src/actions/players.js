export const addPlayer = (player) => ({
  type: "ADD_PLAYER",
  player: {
    ...player,
    top: 0,
    left: 0,
    inventory: {
      ruby: [],
      javaBeans: []
    }
  }
})

export const updatePlayer = (player, updates) => ({
  type: "UPDATE_PLAYER",
  player,
  updates
})
