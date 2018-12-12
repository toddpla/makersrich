import collectables from '../data/maps/level1/collectables'

export const collectItem = (item) => ({
  type: 'COLLECT_ITEM',
  collectables: collectables.filter((collectable) => collectable.gid !== item.gid)
})
