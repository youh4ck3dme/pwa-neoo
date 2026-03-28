import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Legacy Asset Regression Scan', () => {
  const forbiddenAssets = [
    '/main-app.js',
    '/page.js',
    '/layout.css',
    '/app-pages-internals.js'
  ]

  const scanDirectory = (dir: string, fileList: string[] = []) => {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        if (file !== 'node_modules' && file !== '.next' && file !== '_old') {
          scanDirectory(filePath, fileList)
        }
      } else {
        if (['.tsx', '.ts', '.js', '.jsx', '.css'].includes(path.extname(file))) {
          fileList.push(filePath)
        }
      }
    })
    return fileList
  }

  it('should not contain hardcoded references to legacy internal Next.js assets at root', () => {
    const projectRoot = process.cwd()
    const appDir = path.join(projectRoot, 'app')
    const componentsDir = path.join(projectRoot, 'components')
    
    const filesToScan = [
      ...scanDirectory(appDir),
      ...scanDirectory(componentsDir)
    ]

    filesToScan.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8')
      forbiddenAssets.forEach(asset => {
        // We look for quotes around the asset name to ensure it's a string reference
        const regex = new RegExp(`['"]${asset}['"]`, 'g')
        const matches = content.match(regex)
        
        if (matches) {
          throw new Error(`Forbidden legacy asset reference found: "${asset}" in file ${file}`)
        }
      })
    })
  })
})
