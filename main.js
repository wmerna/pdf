function test2() {
    global.counter = [1,1];
    global.doc = this;
    global.spacing = 40;
    global.pageHeight = global.doc.getPageBox("Crop", 0).height;
    // console.println(global.pageHeight);
    global.firstSection = { a: 100, b: 700, c: 200, d: 720 };
    global.secondSection = { a: 100, b: 600, c: 200, d: 620 };
    global.currentPage = [0,0]

    var titleField = global.doc.addField("SectionTitle", "text", 0, [global.firstSection.a, global.firstSection.b, global.firstSection.c, global.firstSection.d]);
    titleField.value = "Head Title";

    var entryField = global.doc.addField("EntryField", "text", 0, [global.firstSection.a, global.firstSection.b - 20, global.firstSection.c, global.firstSection.d - 20]);
    entryField.value = "";

    var secondTitleField = global.doc.addField("SecondSectionTitle" + global.currentPage[1], "text", 0, [global.secondSection.a, global.secondSection.b, global.secondSection.c, global.secondSection.d]);
    secondTitleField.value = "Adjusted Section";

    var secondEntryField = global.doc.addField("SecondEntryField" + global.currentPage[1], "text", 0, [global.secondSection.a, global.secondSection.b - 20, global.secondSection.c, global.secondSection.d - 20]);
    secondEntryField.value = "";

    var duplicateButton = global.doc.addField("DuplicateButton", "button", 0, [100, 100, 200, 150]);
    duplicateButton.buttonSetCaption("Duplicate Section");
    duplicateButton.setAction("MouseUp", "duplicateSection();");

    var deleteButton = global.doc.addField("DeleteButton", "button", 0, [220, 100, 320, 150]);
    deleteButton.buttonSetCaption("Delete Last Section");
    deleteButton.setAction("MouseUp", "deleteLastSection();");

    global.doc.addScript("duplicateSection", function duplicateSection() {
        var currentY = global.firstSection.b - (global.counter[0] * global.spacing);
        var newSectionBottom = currentY - 20;
        if (newSectionBottom < 0) {
            global.currentPage[0] += 1;
            global.counter[0] = 1;
            currentY = global.firstSection.b - global.spacing;
        }
        var newTitlePos = [global.firstSection.a, currentY, global.firstSection.c, currentY + 20];
        var newEntryPos = [global.firstSection.a, currentY - 20, global.firstSection.c, currentY];
        var newTitleField = global.doc.addField("SectionTitle" + global.counter[0], "text", global.currentPage[0], newTitlePos);
        newTitleField.value = "This is a duplicated Field";
        var newEntryField = global.doc.addField("EntryField" + global.counter[0], "text", global.currentPage[0], newEntryPos);
        newEntryField.value = "";
        global.counter[0] += 1;
        global.counter[1] += 1;
        adjustSecondSection();
    });

    global.doc.addScript("deleteLastSection", function deleteLastSection() {
        if (global.counter[0] > 1) {
            global.counter[0] -= 1;
            global.counter[1] -= 1;
            var titleField = global.doc.getField("SectionTitle" + global.counter[0]);
            if (titleField != null) {
                global.doc.removeField(titleField.name);
            }
            var entryField = global.doc.getField("EntryField" + global.counter[0]);
            if (entryField != null) {
                global.doc.removeField(entryField.name);
            }
            adjustSecondSection(global.doc.numPages - 1);
        }
    });

    global.doc.addScript("adjustSecondSection", function adjustSecondSection() {
        var newSecondTitlePos = [global.secondSection.a, global.secondSection.b - (global.counter[1] * global.spacing), global.secondSection.c, global.secondSection.d - (global.counter[1] * global.spacing)];
        var newSecondEntryPos = [global.secondSection.a, global.secondSection.b - 20 - (global.counter[1] * global.spacing), global.secondSection.c, global.secondSection.d - 20 - (global.counter[1] * global.spacing)];
        console.println(newSecondEntryPos[1] + "New secondEntry position when adjusting");

        
        if(newSecondEntryPos[1] < 0) {

            global.currentPage[1] += 1;
            global.counter[1] = 1;
            newSecondTitlePos = [global.secondSection.a, global.secondSection.b, global.secondSection.c, global.secondSection.d];
            newSecondEntryPos = [global.secondSection.a, global.secondSection.b - 20, global.secondSection.c, global.secondSection.d - 20];

            var index = global.currentPage[1] - 1
            var secondTitleField = global.doc.getField("SecondSectionTitle" + index);
            var secondEntryField = global.doc.getField("SecondEntryField" + index);

            if (secondTitleField != null) {

                var newSecondEntryTitle = global.doc.addField("SecondSectionTitle" + global.currentPage[1],"text",global.currentPage[1],newSecondTitlePos);
                newSecondEntryTitle.value = secondTitleField.value;
                global.doc.removeField(secondTitleField.name);
                console.println("this is the value of my field " + getField("SecondSectionField" + index));
    
                var newSecondEntryField = global.doc.addField("SecondEntryField" + global.currentPage[1],"text",global.currentPage[1],newSecondEntryPos);
                newSecondEntryField.value = secondEntryField.value;
                global.doc.removeField(secondEntryField.name);
                console.println(secondEntryField);
            }

        } else {
            var secondTitleField = global.doc.getField("SecondSectionTitle" + global.currentPage[1]);
            if (secondTitleField != null) {
                secondTitleField.page = global.currentPage[1];
                secondTitleField.rect = newSecondTitlePos;
                console.println(global.currentPage + " Global Current Page when adjusting second section")
            }
            var secondEntryField = global.doc.getField("SecondEntryField" + global.currentPage[1]);
            if (secondEntryField != null) {
                secondEntryField.rect = newSecondEntryPos;
                secondEntryField.page = global.currentPage[1];
            }
        }
    });

    console.println("Functions added successfully.");
}

test2();
