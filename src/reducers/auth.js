export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.player
      }
    case 'LOGOUT':
      return {};
    case 'ADD_INVENTORY_ITEM':
      const items = state[action.itemRef]
      items.push(action.itemId)
      return {
        ...state,
        [action.itemRef]: items
      }
    case "UPDATE_PLAYER":
      return {
        ...state,
        ...action.updates
      }
    default:
      return state
  }
}
