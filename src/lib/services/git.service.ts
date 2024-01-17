import { cloneGitRepository } from '../utils/git.utils'
import { type ExcelFile } from '../model/excelFile'
import * as fs from 'fs-extra'
import colors from 'colors'

export async function cloneGitRepositories (jsonData: ExcelFile[]): Promise<void> {
  await Promise.all(
    jsonData.map(async (obj) => {
      const destinationPath = `./${obj.Proyecto}`

      const isPathExists: boolean = await fs.pathExists(destinationPath)

      if (isPathExists) {
        await fs.remove(destinationPath)
      }

      await cloneGitRepository(obj.Touch, destinationPath)

      await fs.copy(`${destinationPath}${obj.PathRepoTouch}`, obj.Cliente, { overwrite: true })

      console.log(colors.bold.green(`Contenidos de ${destinationPath} copiados a ${obj.Cliente}`))

      await fs.remove(destinationPath)
    })
  )
}
