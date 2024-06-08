function form() {
  function getCoordinates(pageNumber, x, y, width, height) {
    //vNormalize values to a range of 0 to 1
    var xNorm = x / 100;
    var yNorm = y / 100;
    var widthNorm = width / 100;
    var heightNorm = height / 100;

    // Assuming this.getPageBox( {nPage: p} ) returns an array with coordinates
    var pageBox = this.getPageBox({ nPage: pageNumber });

    // Calculate coordinates based on normalized values and page box
    var upperLeftX = pageBox[0] + xNorm * (pageBox[2] - pageBox[0]);
    var upperLeftY = pageBox[1] - yNorm * (pageBox[1] - pageBox[3]);
    var lowerRightX = upperLeftX + widthNorm * (pageBox[2] - pageBox[0]);
    var lowerRightY = upperLeftY - heightNorm * (pageBox[1] - pageBox[3]);

    // Return the coordinates as an array
    return [upperLeftX, upperLeftY, lowerRightX, lowerRightY];
  }

  function addButton(caption, action, pageNumber, x, y, width, height) {
    var button = this.addField(
      caption,
      "button",
      pageNumber,
      getCoordinates(pageNumber, x, y, width, height)
    );

    button.borderStyle = border.s;
    button.highlight = "push";
    button.textSize = 0; // Auto-sized
    button.textColor = color.blue;
    button.fillColor = color.ltGray;
    button.textFont = font.ZapfD;
    button.buttonSetCaption(caption);
    button.setAction("MouseUp", action);
  }

  global.everything = [];

  global.workingPage = -1;
  global.fields = 1;

  global.fieldSize = 5;
  global.fieldMargin = 5;

  // if one array's total is 100, then create a new array
  function addVertical(num) {
    const last = global.everything[global.everything.length - 1];

    if (last) {
      const total = last.reduce((acc, curr) => acc + curr, 0);

      if (total + num <= 100) {
        last.push(num);
      } else {
        global.everything.push([num]);
        global.workingPage++;
      }
    } else {
      global.everything.push([num]);
      global.workingPage++;
    }
  }

  function removeVertical() {
    const last = global.everything[global.everything.length - 1];

    if (last.length === 1) {
      global.everything.pop();
      global.workingPage--;
    } else {
      last.pop();
    }
  }

  global.addVertical = addVertical;
  global.removeVertical = removeVertical;
  global.getCoordinates = getCoordinates;

  addVertical(5);

  addButton("Add Section", "AddSection();", global.workingPage, 5, 5, 90, 5);

  addVertical(15);

  addButton(
    "Delete Section",
    "DeleteSection();",
    global.workingPage,
    5,
    15,
    90,
    5
  );

  // a script to automatically add a new text field when the button is clicked
  // if the number of fields if more
  this.addScript("AddSection", function AddSection() {
    global.fields++;
    global.addVertical(global.fieldSize + global.fieldMargin);

    console.println("Fields: " + global.fields);
    console.println("Page: " + global.workingPage);
    console.println("Everything: " + JSON.stringify(global.everything));

    const field = this.addField(
      "Text Field" + global.fields,
      "text",
      global.workingPage,
      global.getCoordinates(
        global.workingPage,
        global.fieldMargin,
        global.fieldMargin +
          global.fields * (global.fieldSize + global.fieldMargin),
        100 - 2 * global.fieldMargin,
        global.fieldSize
      )
    );

    field.text = "Section " + global.fields;
  });

  this.addScript("DeleteSection", function DeleteSection() {
    if (global.fields > 1) {
      const field = this.getField("Text Field" + global.fields);

      if (field) {
        this.removeField(field.name);
      }

      global.fields--;
      global.removeVertical();
    }
  });

  console.println("Heyy Boi!");
}

form();
