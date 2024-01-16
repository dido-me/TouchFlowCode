import { mergeDirFLow } from './lib/commands/mergeDir'

mergeDirFLow().catch((error) => {
  console.error(error)
  process.exit(1)
})
