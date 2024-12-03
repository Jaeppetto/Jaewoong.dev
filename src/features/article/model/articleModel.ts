export const articleModel = {
  downloadMarkdown: (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = `${fileName}.mdx`
    a.click()
    URL.revokeObjectURL(url)
  }
}
