function test2() {
    // Initialize global variables
    global.counter = 1;
    global.doc = this;
    global.doc.newPage();
    global.spacing = 40; // Define the space between sections
    global.pageHeight = global.doc.getPageBox("Crop", 0).height; // Height of the page

    // Define initial positions for the sections
    global.firstSection = { a: 100, b: 700, c: 200, d: 720 };
    global.secondSection = { a: 100, b: 600, c: 200, d: 620 };

    // Ensure global.doc is initialized
    if (typeof global.doc === "object") {
        console.println("The document is well initialized");
    }
    if (typeof global.doc === "undefined") {
        console.println("The document is undefined");
        return;
    }

    try {
        // Add the first section's title field
        var titleField = global.doc.addField("SectionTitle", "text", 0, [global.firstSection.a, global.firstSection.b, global.firstSection.c, global.firstSection.d]);
        if (titleField == null) {
            console.println("Failed to create title field");
            return;
        }
        titleField.value = "This is the value of my field";
        console.println("Title field created successfully.");

        // Add the first section's entry field
        var entryField = global.doc.addField("EntryField", "text", 0, [global.firstSection.a, global.firstSection.b - 20, global.firstSection.c, global.firstSection.d - 20]);
        if (entryField == null) {
            console.println("Failed to create entry field");
            return;
        }
        entryField.value = "";
        console.println("Entry field created successfully.");

        // Add the second section's title field
        var secondTitleField = global.doc.addField("SecondSectionTitle", "text", 0, [global.secondSection.a, global.secondSection.b, global.secondSection.c, global.secondSection.d]);
        if (secondTitleField == null) {
            console.println("Failed to create second title field");
            return;
        }
        secondTitleField.value = "This is the second section title";
        console.println("Second title field created successfully.");

        // Add the second section's entry field
        var secondEntryField = global.doc.addField("SecondEntryField", "text", 0, [global.secondSection.a, global.secondSection.b - 20, global.secondSection.c, global.secondSection.d - 20]);
        if (secondEntryField == null) {
            console.println("Failed to create second entry field");
            return;
        }
        secondEntryField.value = "";
        console.println("Second entry field created successfully.");

        // Add a button to duplicate the template section
        var duplicateButton = global.doc.addField("DuplicateButton", "button", 0, [100, 100, 200, 150]);
        if (duplicateButton == null) {
            console.println("Failed to create button");
            return;
        }
        duplicateButton.buttonSetCaption("Duplicate Section");
        duplicateButton.setAction("MouseUp", "duplicateSection();");
        console.println("Duplicate button created successfully.");

        // Add a button to delete the last section
        var deleteButton = global.doc.addField("DeleteButton", "button", 0, [220, 100, 320, 150]);
        if (deleteButton == null) {
            console.println("Failed to create button");
            return;
        }
        deleteButton.buttonSetCaption("Delete Last Section");
        deleteButton.setAction("MouseUp", "deleteLastSection();");
        console.println("Delete button created successfully.");

        // Define the duplicateSection function
        global.doc.addScript("duplicateSection",
            function duplicateSection() {
                try {
                    var currentPage = global.doc.numPages - 1; // get current page index
                    var currentY = global.firstSection.b - (global.counter * global.spacing);
                     
                    // Calculate the bottom boundary of the new section's title field
                    var newSectionBottom = currentY - 20;
                    console.println(newSectionBottom);

                    if (newSectionBottom < 0) { // If the new section's title field's bottom boundary is below the page height
                        global.doc.newPage();
                        currentPage += 1; // move to the new page index
                        global.counter = 1; // Reset counter for the new page
                        currentY = global.pageHeight - 40; // Reset position to the top of the new page
                    }

                    var newTitlePos = [global.firstSection.a, currentY, global.firstSection.c, currentY + 20];
                    var newEntryPos = [global.firstSection.a, currentY - 20, global.firstSection.c, currentY];

                    var newTitleField = global.doc.addField("SectionTitle" + global.counter, "text", currentPage, newTitlePos);
                    if (newTitleField == null) {
                        console.println("Failed to create new title field");
                        return;
                    }
                    newTitleField.value = "This is the value of my field";

                    var newEntryField = global.doc.addField("EntryField" + global.counter, "text", currentPage, newEntryPos);
                    if (newEntryField == null) {
                        console.println("Failed to create new entry field");
                        return;
                    }
                    newEntryField.value = "";

                    console.println("New section created successfully.");

                
                    global.counter += 1;

                    // Adjust the position of the second section
                    adjustSecondSection(currentPage);
                } catch (e) {
                    console.println("Error duplicating section: " + e);
                }
            }
        );

        // Define the deleteLastSection function
        global.doc.addScript("deleteLastSection",
            function deleteLastSection() {
                try {
                    if (global.counter > 1) {
                        global.counter -= 1;
                        var titleField = global.doc.getField("SectionTitle" + global.counter);
                        if (titleField != null) {
                            global.doc.removeField(titleField.name);
                        } else {
                            console.println("Title field not found");
                        }

                        var entryField = global.doc.getField("EntryField" + global.counter);
                        if (entryField != null) {
                            global.doc.removeField(entryField.name);
                        } else {
                            console.println("Entry field not found");
                        }

                        console.println("Last section deleted successfully.");

                        // Adjust the position of the second section
                        adjustSecondSection(global.doc.numPages - 1);
                    } else {
                        console.println("No sections to delete.");
                    }
                } catch (e) {
                    console.println("Error deleting section: " + e);
                }
            }
        );

        // Define the adjustSecondSection function
        global.doc.addScript("adjustSecondSection",
            function adjustSecondSection(currentPage) {
                try {
                    var newSecondTitlePos = [global.secondSection.a, global.secondSection.b - (global.counter * global.spacing), global.secondSection.c, global.secondSection.d - (global.counter * global.spacing)];
                    var newSecondEntryPos = [global.secondSection.a, global.secondSection.b - 20 - (global.counter * global.spacing), global.secondSection.c, global.secondSection.d - 20 - (global.counter * global.spacing)];

                    // Calculate the bottom boundary of the second section's entry field
                    var newSecondSectionBottom = newSecondEntryPos[1];

                    if (newSecondSectionBottom < 0) { // If the second section's entry field's bottom boundary is below the page height
                        global.doc.newPage();
                        currentPage += 1; // move to the new page index
                        newSecondTitlePos = [global.secondSection.a, global.pageHeight - 40, global.secondSection.c, global.pageHeight - 20];
                        newSecondEntryPos = [global.secondSection.a, global.pageHeight - 60, global.secondSection.c, global.pageHeight - 40];
                    }

                    var secondTitleField = global.doc.getField("SecondSectionTitle");
                    if (secondTitleField != null) {
                        secondTitleField.rect = newSecondTitlePos;
                        secondTitleField.page = currentPage;
                    } else {
                        console.println("Second title field not found");
                    }

                    var secondEntryField = global.doc.getField("SecondEntryField");
                    if (secondEntryField != null) {
                        secondEntryField.rect = newSecondEntryPos;
                        secondEntryField.page = currentPage;
                    } else {
                        console.println("Second entry field not found");
                    }

                    console.println("Second section adjusted successfully.");
                } catch (e) {
                    console.println("Error adjusting second section: " + e);
                }
            }
        );

        console.println("duplicateSection, deleteLastSection, and adjustSecondSection functions added successfully.");
    } catch (e) {
        console.println("Error: " + e);
    }
}
test2();
