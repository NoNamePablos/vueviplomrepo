const importers = import.meta.glob('./lang-code/*/index.ts')
const languages = {}
Object.keys(importers).forEach((fileName) => {
    const language = fileName.replace('./lang-code/', '').replace('/index.ts', '')
    languages[language] = importers[fileName]
})
export default languages