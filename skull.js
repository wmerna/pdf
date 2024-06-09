function form() {
  global.everything = [];

  global.workingPage = 0;
  global.workingPageY = 0;
  global.fields = 0;

  global.fieldSize = 5;
  global.btnSize = 5;

  global.allStart = 5;
  global.allSpace = 5;
  global.allWidth = 90;

  function getCoordinates(x, y, width, height) {
    //vNormalize values to a range of 0 to 1
    var xNorm = x / 100;
    var yNorm = y / 100;
    var widthNorm = width / 100;
    var heightNorm = height / 100;

    var pageBox = this.getPageBox({ nPage: global.workingPage });

    // Calculate coordinates based on normalized values and page box
    var upperLeftX = pageBox[0] + xNorm * (pageBox[2] - pageBox[0]);
    var upperLeftY = pageBox[1] - yNorm * (pageBox[1] - pageBox[3]);
    var lowerRightX = upperLeftX + widthNorm * (pageBox[2] - pageBox[0]);
    var lowerRightY = upperLeftY - heightNorm * (pageBox[1] - pageBox[3]);

    // Return the coordinates as an array
    return [upperLeftX, upperLeftY, lowerRightX, lowerRightY];
  }

  function addButton(caption, action, x, y, width, height) {
    var button = this.addField(
      caption,
      "button",
      global.workingPage,
      getCoordinates(x, y + global.workingPageY, width, height)
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

  function addField(x, y, width, height) {
    console.println("Fields: " + global.fields);

    var field = this.addField(
      "TextField" + global.fields,
      "text",
      global.workingPage,
      getCoordinates(x, y + global.workingPageY, width, height)
    );

    field.borderStyle = border.s;
  }

  function addVertical(num) {
    const last = global.everything[global.everything.length - 1];

    if (last) {
      const total = last.reduce((acc, curr) => acc + curr, 0);

      if (total + num <= 100) {
        last.push(num);
        global.workingPageY += num;
      } else {
        global.everything.push([num]);
        global.workingPage++;
        global.workingPageY = num;
      }
    } else {
      global.everything.push([num]);
      global.workingPageY = num;
    }
  }

  function removeVertical() {
    const last = global.everything[global.everything.length - 1];

    if (last.length === 1) {
      global.everything.pop();
      global.workingPage--;
      global.workingPageY = 0;
    } else {
      last.pop();
      const sum = last.reduce((acc, curr) => acc + curr, 0);
      global.workingPageY = sum;
    }
  }

  global.addVertical = addVertical;
  global.removeVertical = removeVertical;
  global.addField = addField;
  global.addButton = addButton;
  global.getCoordinates = getCoordinates;

  addButton(
    "Add Section",
    "AddSection();",
    global.allStart,
    global.btnSize,
    global.allWidth,
    global.btnSize
  );

  addVertical(5);

  addVertical(5);

  addButton(
    "Delete Section",
    "DeleteSection();",
    global.allStart,
    global.btnSize,
    global.allWidth,
    global.btnSize
  );

  addVertical(global.btnSize);

  // a script to automatically add a new text field when the button is clicked
  // if the number of fields if more
  this.addScript("AddSection", function AddSection() {
    console.println("Fields: " + global.fields);
    console.println("Everything: " + JSON.stringify(global.everything));
    console.println("PageY: " + global.workingPageY);
    console.println("Page: " + global.workingPage);

    global.addField(
      global.allStart,
      global.fieldSize,
      global.allWidth,
      global.fieldSize
    );
    global.addVertical(global.fieldSize);
    global.fields++;
  });

  this.addScript("DeleteSection", function DeleteSection() {
    if (global.fields > 1) {
      var field = this.getField("TextField" + global.fields);

      if (field) {
        this.removeField(field.name);
      }

      global.removeVertical();
      global.fields--;
    } else {
      console.println("Cannot delete the last field");
    }
  });

  console.println("Heyy Boi!");
}

form();
