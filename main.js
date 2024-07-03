// 3006 Add variable field name depending on the index of the function called.
// 0107 add rm function, delete button function, adjust below function, name in pd
// 0107 added button Dictionnary
// 0307 Created the button adjust functions, add the buttons and test

var bordersLeft = 50;
var bordersRight = 562;
var top = 780;
var bottom = 100;
var textColor = ["RGB", 0.098, 0.161, 0.318]; // Dark Blue

var positionDictionnary = [
    [
      {
        title:{ a: bordersLeft, b: 602, c: bordersRight, d: 0, f:"title"},
        name:{a: bordersLeft, b: 562, c: bordersRight, d: 0,f:"name"},
        domicile:{a: bordersLeft, b: 547, c: bordersRight, d: 0,f:"domicile"},
        dob:{a: bordersLeft, b: 522, c: bordersRight, d: 0,f:"dob"},
        nationality:{a: bordersLeft, b: 507, c: bordersRight, d: 0,f:"nationality"},
        dod: {a: bordersLeft, b: 492, c: bordersRight, d: 0,f:"dod"},
        revoc:{a: bordersLeft, b: 467, c: bordersRight, d: 0,f:"revoc"},
        checkboxes:{a:bordersLeft,b:452,c:bordersRight,d:0,f:"checkboxes"}
      }
  ],
  [
    {
      title:{ a: bordersLeft, b: 409, c: bordersRight, d: 0,f:"title2"}, // 30
      name:{a: bordersLeft, b: 369, c: bordersRight, d: 0,f:"name2"}, // 10 // 10
      domicile:{a: bordersLeft, b: 354, c: bordersRight, d: 0,f:"domicile2"},// 20 // 5
      dob:{a: bordersLeft, b: 329, c: bordersRight, d: 0,f:"dob2"}, // 10 // 5
      nationality:{a: bordersLeft, b: 314, c: bordersRight, d: 0,f:"nationality2"}, // 10 // 5
      dod: {a: bordersLeft, b: 299, c: bordersRight, d: 0,f:"dod2"} // 20 // 5
    }
  ]
]
var sd = {
    title:30,
    font:9,
    singleSize:10,
    maxText:150,
    startSection:170,
    checkboxes:19,
    smallsep:2,
    checkboxTextLenght:40
}
var buttonDictionary = [
  {button:{a:bordersLeft,b:434,c:bordersRight,d:0,f:"button1"}},
  {button:{a:bordersLeft,b:274,c:bordersRight,d:0,f:"button2"}}
]

/*
names: 
addField2 & 1 = none
AddTitles = title & title-field
AddLineAndField = title & title-field
AddDoubleLineAndField = title & title-2 & title-field
AddSingleTextLine = title
doubleTextSingleField = title & title-2 & title-field
addTripleTextLine = title & title-2 & title-3
addDoubleTextLine = title & title-2
addMyButtons = title & title-2
addcheckboxesLine = title & title-field & title-2 & title2-field
addTextAndDoubleCheckbox = title-main & title & title-field & title-2 & title2-field 
addCheckboxAndText = title & title-field


*/
/*
  "section1Title"+"-"+index
  "names"+"-"+index
  "domicile"+"-"+index
  "DOB"+"-"+index
  "nationality"+"-"+index
  "DOD"+"-"+index
  "revoke"+"-"+index
  "checkboxes"+"-"+index
  "button"+"-"+index
  */

function addField2(title,page,position){
        var field = this.addField(
          title, 
          "text", 
          page, 
          position
        );
        field.value = "";
        field.textFont = "Gotham-Book";
        field.textSize = sd.font;
        field.doNotScroll = true
        return field;
}
function addField1(title,page,position,text){
    var field = this.addField(title,"text",page,position);
    field.value = text;
    field.textFont = "Gotham-Book";
    field.textSize = sd.font;
    field.textColor = textColor;
    field.readonly = true;
    return field;

}
  // SaD 
  function addTitles(stringText, position,title) {

    var fieldRect = [position.a,position.b,position.c,position.b-sd.title];
    var textRect = [position.a,position.b-9.5,position.c,position.b-sd.title+11.5];
    
    var tempField = addField1(
        title,
        position.d,
        fieldRect,
        ""
      )
    tempField.fillColor = ["RGB", .098, .161, .318];
    
    var tempField1 = addField1(
      title+"-field",
      position.d,
      textRect,
      stringText
    )
    tempField1.textColor = color.white

  
  } 
  function addLineAndField(stringText, position,title) {
    var textRect = [position.a, position.b, position.a + sd.maxText, position.b-sd.singleSize];
    var fieldRect = [position.a + sd.startSection, position.b, position.c, position.b-sd.singleSize];
    addField1(
        title,
        position.d,
        textRect,
        stringText
    )
    addField2(
        title + "-field",
        position.d,
        fieldRect
    )
  }
  function AddDoubleLineAndField(stringText, stringText2, position, title) {

    var textRect = [position.a, position.b, position.a + sd.maxText, position.b - sd.singleSize];
    var textRect2 = [position.a, position.b-sd.singleSize, position.a + sd.maxText, position.b - sd.singleSize*2];
    var pos = [position.a + sd.startSection, position.b, position.c, position.b -sd.singleSize*2];

    addField1(
      title,
      position.d,
      textRect,
      stringText
    )
    addField1(
      title+"-2",
      position.d,
      textRect2,
      stringText2
    )
    addField2(
      title+"-field",
      position.d,
      pos
    )
  } 
  function addSingleTextLine(stringText, position,title) {

    var textRect = [position.a, position.b, position.c, position.b - sd.singleSize];
  
    addField1(
      title,
      position.d,
      textRect,
      stringText
    )

  } 
  function doubleTextSingleField(stringText, stringText2, position, title){
   
    var textRect = [position.a, position.b, position.a + sd.maxText, position.b - sd.singleSize];
    var textRect2 = [position.a, position.b - sd.singleSize, position.a + sd.maxText, position.b-sd.singleSize*2];
    var pos = [position.a + sd.startSection, position.b-5, position.c, position.b-15];

    addField1(
      title,
      position.d,
      textRect,
      stringText
    )
   
    addField1(
      title+"-2",
      position.d,
      textRect2,
      stringText2
    )

    addField2(
      title+"-field",
      position.d,
      pos
    );
  }
  function addTripleTextLine(stringText,stringText2,stringText3, position, title) {

    var textRect = [position.a, position.b, position.c, position.b-sd.singleSize]
    var textRect2 = [position.a, position.b-sd.singleSize, position.c, position.b-sd.singleSize*2]
    var textRect3 = [position.a, position.b-sd.singleSize*2, position.c, position.b-sd.singleSize*3]

    addField1(
      title,
      position.d,
      textRect,
      stringText
    )
   
    addField1(
      title+"-2",
      position.d,
      textRect2,
      stringText2
    )
   
    addField1(
      title+"-3",
      position.d,
      textRect3,
      stringText3
    )
  }
  function addDoubleTextLine(stringText,stringText2, position,title) {

    var textRect = [position.a, position.b, position.c, position.b-sd.singleSize]
    var textRect2 = [position.a, position.b-sd.singleSize, position.c, position.b-sd.singleSize*2]

    addField1(
      title,
      position.d,
      textRect,
      stringText
    )
   
    addField1(
      title+"-2",
      position.d,
      textRect2,
      stringText2
    )
  }
  function addMyButtons(title,position){
  
        var buttonA = this.addField(
          title, 
          "button", 
          position.d, 
          [position.c-110,position.b,position.c-60,position.b-sd.singleSize*2]
        );
          buttonA.buttonSetCaption("Duplicate Section");
          buttonA.fillColor = [ "RGB", .282,.706,.706 ];
          buttonA.textColor = color.white;
      
        var buttonD = this.addField(
          title+"-2", 
          "button", 
          position.d, 
          [position.c-50,position.b,position.c,position.b-sd.singleSize*2]
          );
          buttonD.buttonSetCaption("Delete Section");
          buttonD.fillColor = [ "RGB", .282,.706,.706 ];
          buttonD.textColor = color.white;
  }
  function checkboxesLine(position,title){
    
    var checkbox = [position.a+sd.startSection,position.b,position.a+sd.startSection+sd.checkboxes,position.b - sd.checkboxes];
    var checkbox2 = [position.a+sd.startSection+sd.checkboxes+sd.smallsep+sd.checkboxTextLenght,position.b,position.a+sd.startSection+sd.checkboxes*2+sd.smallsep+sd.checkboxTextLenght,position.b -sd.checkboxes];
    var textRect = [position.a+sd.startSection+sd.checkboxes+sd.smallsep,position.b-5,position.a+sd.startSection+sd.checkboxes+sd.smallsep+sd.checkboxTextLenght,position.b -14];
    var textRect2 = [position.a+sd.startSection+sd.checkboxes*2+sd.smallsep*2+sd.checkboxTextLenght,position.b-5,position.a+sd.startSection+sd.checkboxes*2+sd.smallsep+sd.checkboxTextLenght*2,position.b-14];



    fieldBox = this.addField(title+"-field","checkbox",position.d,checkbox);
    fieldBox.value = "Off";
    fieldBox.borderStyle = border.s;
    fieldBox.borderColor = color.black;
  

    addField1(
      title,
      position.d,
      textRect,
      "YES"
    )

    fieldBox2 = this.addField(title+"-2"+"-field","checkbox",position.d,checkbox2);
    fieldBox2.value = "Off";
    fieldBox2.borderStyle = border.s;
    fieldBox2.borderColor = color.black;
  
    addField1(
      title+"-2",
      position.d,
      textRect2,
      "NO"
    )
  }
  function addTextAndDoubleCheckbox(stringText,title,stringText2,stringText3, position){

    var textRect  = [position.a, position.b-5, position.c, position.b-14]
    var textRect2 = [position.a+191, position.b-5, position.a+368, position.b-14];
    var textRect3 = [position.a+391, position.b-5, position.a+512, position.b-14];
    
    addField1(
      title+"-main",
      position.d,
      textRect,
      stringText
    )
   
    addField1(
      title,
      position.d,
      textRect2,
      stringText2
    )
   
    addField1(
      title+"-2",
      position.d,
      textRect3,
      stringText3
    )

    field = this.addField(title+"-field","checkbox",position.d,[position.a+sd.startSection,position.b,position.a+189,position.b-sd.checkboxes]);
    field.value = "Off";
    field.borderStyle = border.s;
    field.borderColor = color.black;
  
    field2 = this.addField(title+"-2"+"-field","checkbox",position.d,[position.a+370,position.b,position.a+389,position.b-19]);
    field2.value = "Off";
    field2.borderStyle = border.s;
    field2.borderColor = color.black;

  }
  function addCheckBoxAndText(stringText,title,position){

    var textRect = [position.a+21, position.b-5, position.c, position.b-14];
    var checkbox = [position.a,position.b,position.a+sd.checkboxes,position.b-sd.checkboxes];

    field = this.addField(title+"-field","checkbox",position.d,checkbox);
    field.value = "Off";
    field.borderStyle = border.s;
    field.borderColor = color.black;

    addField1(
      title,
      position.d,
      textRect,
      stringText
    )
  }


  function createSections(section,index){
    console.println("create new section No-" + section);
    if(section = "0"){createFirstSection(index)}
    else if(section = "1"){createSecondSection(index)}
    else{console.println("luckyme")}
  }
  function createFirstSection(index){
// section1Title, names, domicile, DOB, 
  addTitles(
    "1. Information pertaining to the trust (for a) and b) please tick the applicable boxes):",
    positionDictionnary[0][index].title,
    positionDictionnary[0][index].title.f + "-"+index
  );
  addLineAndField(
    "First name(s), last name(s)/entity",
    positionDictionnary[0][index].name,
    positionDictionnary[0][index].name.f+"-"+index
  );
  AddDoubleLineAndField(
    "Actual address of domicile/",
    "registered office (incl. Country)*",
    positionDictionnary[0][index].domicile,
    positionDictionnary[0][index].domicile.f+"-"+index
  ); 
  addLineAndField(
    "Date of birth (DD/MM/YYYY)",
    positionDictionnary[0][index].dob,
    positionDictionnary[0][index].dob.f+"-"+index
  );
  addLineAndField(
    "Nationality",
    positionDictionnary[0][index].nationality,
    positionDictionnary[0][index].nationality.f+"-"+index
  );
  doubleTextSingleField(
    "Date of death (if deceased)",
    "(DD/MM/YYYY)",
    positionDictionnary[0][index].dod,
    positionDictionnary[0][index].dod.f+"-"+index
  );
  addSingleTextLine(
    "In case of a revocable trust: does the settlor have the right to revoke the trust?",
    positionDictionnary[0][index].revoc,
    positionDictionnary[0][index].revoc.f+"-"+index
  );

  checkboxesLine(positionDictionnary[0][index].checkboxes,positionDictionnary[0][index].checkboxes.f+"-"+index);

  }
  function createSecondSection(index){

      addTitles(
        "2. Information pertaining to the (ultimate economic, not fiduciary) settlor of the trust (individual(s) or entity/-ies):",
        positionDictionnary[1][index].title,
        positionDictionnary[1][index].title.f+"-"+index
        )
      
      addLineAndField(
        "First name(s), last name(s)/entity"+"-"+index,
        positionDictionnary[1][index].name,
        positionDictionnary[1][index].name.f+"-"+index
      );
      
      AddDoubleLineAndField(
        "Actual address of domicile/",
        "registered office (incl. Country)*",
        positionDictionnary[1][index].domicile,
        positionDictionnary[1][index].domicile.f+"-"+index
      );
      
      addLineAndField(
        "Date of birth (DD/MM/YYYY)",
        positionDictionnary[1][index].dob,
        positionDictionnary[1][index].dob.f+"-"+index
      );
      
      addLineAndField(
        "Nationality",
        positionDictionnary[1][index].nationality,
        positionDictionnary[1][index].nationality.f+"-"+index
      );
      
      doubleTextSingleField(
        "Date of death (if deceased)",
        "(DD/MM/YYYY)",
        positionDictionnary[1][index].dod,
        positionDictionnary[1][index].dod.f+"-"+index
      );
  }
  function createMybuttons(){
    addMyButtons(buttonDictionary[0].button.f+"-"+index,buttonDictionary[0].button); // first section
    addMyButtons(buttonDictionary[1].button.f+"-"+index,buttonDictionary[1].button); //second section
  }
  function duplicateSectionButton(stringIndexSection,sectionSize){
    stringIndexField = positionDictionnary[stringIndexSection].length-1;
    newDict = {};
            for(g in positionDictionnary[stringIndexSection][stringIndexField]){
              newDict[g] = {
              a: positionDictionnary[stringIndexSection][stringIndexField][g].a,
              b: positionDictionnary[stringIndexSection][stringIndexField][g].b - sectionSize,
              c: positionDictionnary[stringIndexSection][stringIndexField][g].c,
              d: positionDictionnary[stringIndexSection][stringIndexField][g].d,
              f: positionDictionnary[stringIndexSection][stringIndexField][g].f
            };
            console.println("this is my D-"+newDict[g].d)
            checkPage(newDict[g])
            }
      positionDictionnary[0].push(newDict)

      createSections(stringIndexSection,stringIndexField+1)
  }
  function checkPage(position){
    if(position.b < bottom){console.println("this runs");position.d += 1; var dist = bottom - position.b; position.b = top - dist;console.println(bottom + "new "+position.b + "the D position is -"+ position.d)}; // depending on single, double or triple size, problem 
    if(position.b > top){console("this runs top");position.d -= 1; var dist = top - position.b; position.b = bottom + dist;console.println("new "+position.b)}; 
  }
function rmfield(position,index){
  console. println("the remove field function runs");
  this.removeField(position+"-"+index+"-3");
  this.removeField(position+"-"+index+"-field");
  this.removeField(position+"-"+index+"-main");
  this.removeField(position+"-"+index+"-2-field");
  this.removeField(position+"-"+index+"-2");
  this.removeField(position+"-"+index);
  }
function adjustBelowSections(stringIndexSection, sectionSize) {
      for ( i = stringIndexSection + 1; i < positionDictionnary.length; i++) {
          for ( f in positionDictionnary[i]) {
              for ( g in positionDictionnary[i][f]) {
                rmfield(positionDictionnary[i][f][g].f,f);
                  positionDictionnary[i][f][g] = {
                      a: positionDictionnary[i][f][g].a,
                      b: positionDictionnary[i][f][g].b - sectionSize,
                      c: positionDictionnary[i][f][g].c,
                      d: positionDictionnary[i][f][g].d,
                      f: positionDictionnary[i][f][g].f
                  };  
                  checkPage(positionDictionnary[i][f][g]);
              }
          createSections(i,f);
          }
          
      }
  }
function deleteButtonfunction(section){
    var lastSection = positionDictionnary[section].length-1;
    if (lastSection != 0){
    for (i in positionDictionnary[section][lastSection]){
      rmfield(positionDictionnary[section][lastSection][i].f,lastSection);
    }
  }
  }
function adjustMyButtons(move,sectionIndex){

  buttonDictionary[sectionIndex].button.b += move

  if(buttonDictionary[sectionIndex].button.b < bottom){
    buttonDictionary[sectionIndex].button.d += 1; 
    var dist = bottom - buttonDictionary[sectionIndex].button.b; 
    buttonDictionary[sectionIndex].button.b = top - dist;
  }
  if(buttonDictionary[sectionIndex].button.b > top){
    buttonDictionary[sectionIndex].button.d -= 1; 
    var dist = top - buttonDictionary[sectionIndex].button.b; 
    buttonDictionary[sectionIndex].button.b = bottom + dist;
  }; 

  this.removeField(buttonDictionary[sectionIndex].button.f+"-"+sectionIndex);
  this.removeField(buttonDictionary[sectionIndex].button.f+"-"+sectionIndex+"-2");

  addMyButtons(buttonDictionary[sectionIndex].button.f+"-"+index,buttonDictionary[sectionIndex].button);

  // add script


}



createFirstSection(0)
createSecondSection(0)
updatePositionDict("0","0",300)
createFirstSection(1)
adjustBelowSections(1,300)
adjustMyButtons(300,0)
adjustMyButtons(300,1)




/*
updatePositionDict("0","0",300);
createFirstSection(1);
updatePositionDict("0","1",600); 
createFirstSection(2) */
 
