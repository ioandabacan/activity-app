import * as migration_20250105_initial from './20250105_initial'

export const migrations = [
  {
    up: migration_20250105_initial.up,
    down: migration_20250105_initial.down,
    name: '20250105_initial',
  },
]
