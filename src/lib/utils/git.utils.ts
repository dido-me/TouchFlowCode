import simpleGit from 'simple-git'

export async function cloneGitRepository (url: string, destinationPath: string): Promise<string> {
  const git = simpleGit()
  return await git.clone(url, destinationPath)
}
