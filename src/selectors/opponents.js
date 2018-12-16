export default (opponents, filterState, filterLevel) => {
  return opponents.filter(({state, level}) => state === filterState && level === filterLevel)
}
