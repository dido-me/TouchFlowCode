import { input } from '@inquirer/prompts'
import { readExcelFile, validateExcelFileType } from '../services/excel.service'
import { type ExcelFile } from '../model/excelFile'
import { cloneGitRepositories } from '../services/git.service'
import colors from 'colors'

async function mergeDirFLow (): Promise<void> {
  console.log(colors.bold.blue('Bienvenido al programa de clonación de repositorios'))
  console.log(colors.bold.blue('de Touch Consulting.'))
  const excelFilePath = await input({ message: 'Ingrese la ruta del excel: ' })

  validateExcelFileType({ filePath: excelFilePath })
  const jsonData: ExcelFile[] = readExcelFile({ filePath: excelFilePath })

  await cloneGitRepositories(jsonData)
}

export { mergeDirFLow }
