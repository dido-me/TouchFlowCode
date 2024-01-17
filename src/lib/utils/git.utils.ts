import simpleGit from 'simple-git'
import spinners from 'cli-spinners'

const spinner = spinners.dots

function startSpinner (): NodeJS.Timeout {
  let frameIndex = 0
  process.stdout.write(`${spinner.frames[frameIndex]} `)
  const interval = setInterval(() => {
    frameIndex = (frameIndex + 1) % spinner.frames.length
    process.stdout.write(`\r${spinner.frames[frameIndex]} `)
  }, spinner.interval)
  return interval
}

export async function cloneGitRepository (url: string, destinationPath: string): Promise<string> {
  const interval = startSpinner()

  try {
    console.log(`\rClonando ${url} en ${destinationPath}`)
    const git = simpleGit()
    await git.clone(url, destinationPath)
    clearInterval(interval)
    console.log('\rClonación completada')
    return destinationPath
  } catch (error) {
    clearInterval(interval)
    console.error('\rClonación fallida')
    throw error
  }
}
