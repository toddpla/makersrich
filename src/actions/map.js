import collectables from '../data/maps/level1/collectables'
import minable from '../data/maps/level1/minable'

export const collectItem = (item) => ({
  type: 'COLLECT_ITEM',
  collectables: collectables.filter((collectable) => collectable.gid !== item.gid)
})

export const digTile = (tile) => ({
  type: 'DIG_TILE',
  minable: newMinable(tile)
  }
)

export const unDigTile = (tile) => ({
  type: 'UN_DIG_TILE',
  minable: revertMinable(tile)
  }
)

const newMinable = (tile) => {
  return minable.filter((h) => {
  if( h.id === tile.id){
    h.visible = true
    return h
  }
  return h
  })
}

const revertMinable = (tile) => {
  return minable.filter((h) => {
  if( h.id === tile.id){
    h.visible = false
    return h
  }
  return h
  })
}
