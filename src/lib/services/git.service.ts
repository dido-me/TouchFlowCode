import { cloneGitRepository } from '../utils/git.utils'
import { type ExcelFile } from '../model/excelFile'

export async function cloneGitRepositories (jsonData: ExcelFile[]): Promise<void> {
  await Promise.all(
    jsonData.map(async (obj) => {
      const destinationPath = `./${obj.Proyecto}`
      await cloneGitRepository(obj.Touch, destinationPath)
    })
  )
}
