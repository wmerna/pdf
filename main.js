function test2() {
    global.counter = 1;
    global.doc = this;
    global.spacing = 40;
    global.pageHeight = global.doc.getPageBox("Crop", 0).height;
    global.firstSection = { a: 100, b: 700, c: 200, d: 720 };
    global.secondSection = { a: 100, b: 600, c: 200, d: 620 };
    global.currentPage = global.doc.numPages - 2;

    var titleField = global.doc.addField("SectionTitle", "text", 0, [global.firstSection.a, global.firstSection.b, global.firstSection.c, global.firstSection.d]);
    titleField.value = "This is the value of my field";

    var entryField = global.doc.addField("EntryField", "text", 0, [global.firstSection.a, global.firstSection.b - 20, global.firstSection.c, global.firstSection.d - 20]);
    entryField.value = "";

    var secondTitleField = global.doc.addField("SecondSectionTitle", "text", 0, [global.secondSection.a, global.secondSection.b, global.secondSection.c, global.secondSection.d]);
    secondTitleField.value = "This is the second section title";

    var secondEntryField = global.doc.addField("SecondEntryField", "text", 0, [global.secondSection.a, global.secondSection.b - 20, global.secondSection.c, global.secondSection.d - 20]);
    secondEntryField.value = "";

    var duplicateButton = global.doc.addField("DuplicateButton", "button", 0, [100, 100, 200, 150]);
    duplicateButton.buttonSetCaption("Duplicate Section");
    duplicateButton.setAction("MouseUp", "duplicateSection();");

    var deleteButton = global.doc.addField("DeleteButton", "button", 0, [220, 100, 320, 150]);
    deleteButton.buttonSetCaption("Delete Last Section");
    deleteButton.setAction("MouseUp", "deleteLastSection();");

    global.doc.addScript("duplicateSection", function duplicateSection() {
        console.println(global.currentPage)
        var currentY = global.firstSection.b - (global.counter * global.spacing);
        var newSectionBottom = currentY - 20;
        console.println(newSectionBottom)
        if (newSectionBottom < 0) {
            global.currentPage += 1;
            global.counter = 1;
            currentY = global.pageHeight - 40;
        }
        var newTitlePos = [global.firstSection.a, currentY, global.firstSection.c, currentY + 20];
        var newEntryPos = [global.firstSection.a, currentY - 20, global.firstSection.c, currentY];
        var newTitleField = global.doc.addField("SectionTitle" + global.counter, "text", global.currentPage, newTitlePos);
        newTitleField.value = "This is the value of my field";
        var newEntryField = global.doc.addField("EntryField" + global.counter, "text", global.currentPage, newEntryPos);
        newEntryField.value = "";
        global.counter += 1;
        adjustSecondSection(global.currentPage);
    });

    global.doc.addScript("deleteLastSection", function deleteLastSection() {
        if (global.counter > 1) {
            global.counter -= 1;
            var titleField = global.doc.getField("SectionTitle" + global.counter);
            if (titleField != null) {
                global.doc.removeField(titleField.name);
            }
            var entryField = global.doc.getField("EntryField" + global.counter);
            if (entryField != null) {
                global.doc.removeField(entryField.name);
            }
            adjustSecondSection(global.doc.numPages - 1);
        }
    });

    global.doc.addScript("adjustSecondSection", function adjustSecondSection(currentPage) {
        var newSecondTitlePos = [global.secondSection.a, global.secondSection.b - (global.counter * global.spacing), global.secondSection.c, global.secondSection.d - (global.counter * global.spacing)];
        var newSecondEntryPos = [global.secondSection.a, global.secondSection.b - 20 - (global.counter * global.spacing), global.secondSection.c, global.secondSection.d - 20 - (global.counter * global.spacing)];
        console.println(newSecondEntryPos[1]);
        if (newSecondEntryPos[1] < 0) {
            global.currentPage += 1;
            global.secondSection = { a: 100, b: 600, c: 200, d: 620 }
            newSecondTitlePos = [global.secondSection.a, global.pageHeight - 40, global.secondSection.c, global.pageHeight - 20];
            newSecondEntryPos = [global.secondSection.a, global.pageHeight - 60, global.secondSection.c, global.pageHeight - 40];
        }
        
        var secondTitleField = global.doc.getField("SecondSectionTitle");
        if (secondTitleField != null) {
            secondTitleField.rect = newSecondTitlePos;
            secondTitleField.page = global.currentPage;
        }
        var secondEntryField = global.doc.getField("SecondEntryField");
        if (secondEntryField != null) {
            secondEntryField.rect = newSecondEntryPos;
            secondEntryField.page = global.currentPage;
        }
    });

    console.println("Functions added successfully.");
}

test2();
