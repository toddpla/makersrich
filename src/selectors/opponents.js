export default (opponents, filterState, filterLevel, authUid) => {
  return opponents.filter(({uid, state, level}) => uid !== authUid && state === filterState && level === filterLevel)
}
