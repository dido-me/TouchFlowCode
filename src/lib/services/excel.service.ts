import * as XLSX from 'xlsx'
import * as path from 'path'
import * as t from 'io-ts'
import { isLeft } from 'fp-ts/Either'
import { type ExcelFile } from '../model/excelFile'

const ExcelFileModel = t.type({
  Proyecto: t.string,
  Touch: t.string,
  Cliente: t.string
})

function readExcelFile ({ filePath }: { filePath: string }): ExcelFile[] {
  try {
    const workbook = XLSX.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const jsonData: ExcelFile[] = XLSX.utils.sheet_to_json(sheet)

    jsonData.forEach((obj, index) => {
      const decoded = ExcelFileModel.decode(obj)

      if (isLeft(decoded)) {
        const decodingError = decoded.left[0]
        const fieldWithError = decodingError.context
          .map(contextEntry => contextEntry.key)
          .join('.')

        throw new Error(`Validation error at row ${index + 2}, field: ${fieldWithError}`)
      }
    })

    return jsonData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error('Error: El archivo no existe en la ruta proporcionada.')
    } else {
      throw new Error(`Error al procesar el archivo Excel: ${error.message}`)
    }
  }
}

function validateExcelFileType ({ filePath }: { filePath: string }): void {
  const extname = path.extname(filePath).toLowerCase()
  if (extname !== '.xlsx' && extname !== '.xls') {
    console.error('Por favor, ingrese un archivo con extensión .xlsx o .xls.')
    process.exit(1)
  }
}

export { readExcelFile, validateExcelFileType }
