import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract'
import fs from 'fs'

// eslint-disable-next-line prettier/prettier
const pdfExtract = new PDFExtract()

;(async function () {
  const data = await pdfExtract.extract('A ARTE DA GUERRA - ok.pdf')
  let final = ''
  console.log(data.pages[21].content.length)
  for (let i = 0; i < data.pages[21].content.length; i++) {
    console.log(i)
    //console.log(data.pages[20].content.length)
    console.log(data.pages[21].pageInfo)
    final += data.pages[21].content[i].str + ' '.replace(/\s+/g, ' ').trim()
  }
  console.log(final)
  fs.writeFile('test.txt', final, (err) => {
    if (err) {
      console.error(err)
    }
    // ficheiro escrito com sucesso
  })
})
