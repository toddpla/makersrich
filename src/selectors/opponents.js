export default (opponents, filterState, filterLevel, authUid) => {
  return opponents.filter((opponent) => {
    return opponent.uid !== authUid && opponent.state === filterState
  })
}
