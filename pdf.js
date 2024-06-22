const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 700]);

  function spanBlack(stringText, stringFont, integerSize) {
    return {
      text: stringText,
      size: integerSize,
      color: rgb(0, 0, 0),
      font: stringFont,
    };
  }

  function addText(page, stringText, stringFont, integerSize, position) {
    page.drawText(stringText, {
      x: position.a,
      y: position.b,
      size: integerSize,
      font: pdfDoc.embedStandardFont(stringFont),
      color: rgb(0, 0, 0),
    });
  }

  function addLineAndField(page, stringText, stringFont, integerSize, position) {
    addText(page, stringText, stringFont, integerSize, position);
    // Add a rectangle for the field
    page.drawRectangle({
      x: position.a + 170,
      y: position.b - 5,
      width: 200,
      height: integerSize + 5,
      borderColor: rgb(1, 0, 0),
      borderWidth: 1,
    });
  }

  

  addLineAndField(page, "First name(s), last name(s)/entity", 'Helvetica', 9, { a: 50, b: 562 });

  // More calls to addLineAndField or other functions

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
}

createPDF();