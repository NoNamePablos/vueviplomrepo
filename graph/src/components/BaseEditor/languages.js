const importers = import.meta.glob('./lang-code/*/index.ts')
const languages = {};
const languagesSelect=[];
Object.keys(importers).forEach((fileName) => {
    const language = fileName.replace('./lang-code/', '').replace('/index.ts', '')
    languages[language] = importers[fileName];
    languagesSelect.push({name:language});
})
export default {languages,languagesSelect};







