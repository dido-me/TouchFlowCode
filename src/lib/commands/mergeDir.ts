import { input } from '@inquirer/prompts'
import { readExcelFile, validateExcelFileType } from '../services/excel.service'
import { type ExcelFile } from '../model/excelFile'
import { cloneGitRepositories } from '../services/git.service'

async function mergeDirFLow (): Promise<void> {
  const excelFilePath = await input({ message: 'Ingrese la ruta del excel: ' })

  validateExcelFileType({ filePath: excelFilePath })
  const jsonData: ExcelFile[] = readExcelFile({ filePath: excelFilePath })

  await cloneGitRepositories(jsonData)

  console.log(jsonData)
}

export { mergeDirFLow }
