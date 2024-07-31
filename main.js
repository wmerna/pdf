// 3006 Add variable field name depending on the index of the function called.
// 0107 add rm function, delete button function, adjust below function, name in pd
// 0107 added button Dictionnary
// 0307 Created the button adjust functions, add the buttons and test
// 08/07 posiiton des boutons au déplacement, compilation des fonctions, ne pas modifier les titres quand les sections sont dupliquées
// 15/07 adjusted duplication size selection
// 15/07 all functions work

var bordersLeft = 50;
var bordersRight = 562;
var top = 780;
var bottom = 100;
var textColor = ["RGB", 0.098, 0.161, 0.318]; // Dark Blue


var positionDictionnary = [
    [
      {
        title:{ a: bordersLeft, b: 602, c: bordersRight, d: 1, f:"title0"}, 
        name:{a: bordersLeft, b: 562, c: bordersRight, d: 1,f:"name0"},
        domicile:{a: bordersLeft, b: 547, c: bordersRight, d: 1,f:"domicile0"},
        dob:{a: bordersLeft, b: 522, c: bordersRight, d: 1,f:"dob0"},
        nationality:{a: bordersLeft, b: 507, c: bordersRight, d: 1,f:"nationality0"},
        dod: {a: bordersLeft, b: 492, c: bordersRight, d: 1,f:"dod0"},
        revoc:{a: bordersLeft, b: 467, c: bordersRight, d: 1,f:"revoc0"},
        checkboxes:{a:bordersLeft,b:452,c:bordersRight,d:1,f:"checkboxes0"}
      }
  ],
  [
    {
      title:{ a: bordersLeft, b: 409, c: bordersRight, d: 1,f:"title1"}, // 30
      name:{a: bordersLeft, b: 369, c: bordersRight, d: 1,f:"name1"}, // 10 // 10
      domicile:{a: bordersLeft, b: 354, c: bordersRight, d: 1,f:"domicile1"},// 20 // 5
      dob:{a: bordersLeft, b: 329, c: bordersRight, d: 1,f:"dob1"}, // 10 // 5
      nationality:{a: bordersLeft, b: 314, c: bordersRight, d: 1,f:"nationality1"}, // 10 // 5
      dod: {a: bordersLeft, b: 299, c: bordersRight, d: 1,f:"dod1"} // 20 // 5
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
var distanceDictionary = {
  0:153,
  1:115
}
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
  this.addScript("addField2",
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
})
this.addScript("addField1",
function addField1(title,page,position,text){
    var field = this.addField(title,"text",page,position);
    field.value = text;
    field.textFont = "Gotham-Book";
    field.textSize = sd.font;
    field.textColor = textColor;
    field.readonly = true;
    field.author = "0";
    return field;

})
  this.addScript("addTitles",
    
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

  
  } )
  this.addScript("addLineAndField",
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
  })
  this.addScript("AddDoubleLineAndField",
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
  } )
  this.addScript("addSingleTextLine",
  function addSingleTextLine(stringText, position,title) {

    var textRect = [position.a, position.b, position.c, position.b - sd.singleSize];
  
    addField1(
      title,
      position.d,
      textRect,
      stringText
    )

  } )
  this.addScript("doubleTextSingleField",
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
  })
  this.addScript("addTripleTextLine",
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
  })
  this.addScript("addDoubleTextLine",
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
  })
  this.addScript("addMyButtons",
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
  })
  this.addScript("checkboxesLine",
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
  })
  this.addScript("addTextAndDoubleCheckbox",
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

  })
  this.addScript("addCheckBoxAndText",
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
  }) 

  this.addScript("createSections",
  function createSections(section, index){
    if(section === 0){createFirstSection(index)}
    else if(section === 1){console.println(index);createSecondSection(index)}
    else{console.println("luckyme")}
  })
  this.addScript("createFirstSection",
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

  })
  this.addScript("createSecondSection",
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
  })

  this.addScript("createMybuttons", 
  function createMybuttons(){
    addMyButtons(buttonDictionary[0].button.f,buttonDictionary[0].button); // first section
    this.getField(buttonDictionary[0].button.f).setAction("MouseUp", "duplicateSectionButton(0);");
    this.getField(buttonDictionary[0].button.f+"-2").setAction("MouseUp", "deleteButtonfunction(0);");

    addMyButtons(buttonDictionary[1].button.f,buttonDictionary[1].button); 
    this.getField(buttonDictionary[1].button.f).setAction("MouseUp", "duplicateSectionButton(1);");
    this.getField(buttonDictionary[1].button.f+"-2").setAction("MouseUp", "deleteButtonfunction(1);");
  })
  this.addScript("duplicateSectionButton",
  function duplicateSectionButton(stringIndexSection){
    stringIndexField = positionDictionnary[stringIndexSection].length-1;
    newDict = {};
            for(g in positionDictionnary[stringIndexSection][stringIndexField]){
              if (g != "title"){ 
                newDict[g] = {
              a: positionDictionnary[stringIndexSection][stringIndexField][g].a,
              b: positionDictionnary[stringIndexSection][stringIndexField][g].b - distanceDictionary[stringIndexSection],
              c: positionDictionnary[stringIndexSection][stringIndexField][g].c,
              d: positionDictionnary[stringIndexSection][stringIndexField][g].d,
              f: positionDictionnary[stringIndexSection][stringIndexField][g].f
            };
          }else{
            newDict[g] = {
              a: positionDictionnary[stringIndexSection][stringIndexField][g].a,
              b: positionDictionnary[stringIndexSection][stringIndexField][g].b,
              c: positionDictionnary[stringIndexSection][stringIndexField][g].c,
              d: positionDictionnary[stringIndexSection][stringIndexField][g].d,
              f: positionDictionnary[stringIndexSection][stringIndexField][g].f
          }
        }
            checkPage(newDict[g])
            };      
            
            positionDictionnary[stringIndexSection].push(newDict)

      createSections(stringIndexSection,stringIndexField+1)

      adjustBelowSections( stringIndexSection,true)  
  })

  this.addScript("checkPage",
  function checkPage(position){
    if(position.b < bottom){position.d += 1; var dist = bottom - position.b; position.b = top - dist}; // depending on single, double or triple size, problem 
    if(position.b > top){position.d -= 1; var dist = top - position.b; position.b = bottom - dist}; 
  })

  this.addScript("rmfield",
function rmfield(position,index){
  this.removeField(position+"-"+index+"-3");
  this.removeField(position+"-"+index+"-field");
  this.removeField(position+"-"+index+"-main");
  this.removeField(position+"-"+index+"-2-field");
  this.removeField(position+"-"+index+"-2");
  this.removeField(position+"-"+index);
  })

  this.addScript("adjustBelowSections",
function adjustBelowSections(stringIndexSection,call) {
      for ( i = stringIndexSection + 1; i < positionDictionnary.length; i++) {
        size = stringIndexSection;
        if (call === true){var adjustment = distanceDictionary[size]}else{var adjustment = -1*distanceDictionary[size]};
          for ( h in positionDictionnary[i]) {
              for ( g in positionDictionnary[i][h]) {
                rmfield(positionDictionnary[i][h][g].f,h);
                  positionDictionnary[i][h][g] = {
                      a: positionDictionnary[i][h][g].a,
                      b: positionDictionnary[i][h][g].b - adjustment,
                      c: positionDictionnary[i][h][g].c,
                      d: positionDictionnary[i][h][g].d,
                      f: positionDictionnary[i][h][g].f
                  };  
                  
                  checkPage(positionDictionnary[i][h][g]);
              }
           
          if(i===1){createSecondSection(h)};
          if(i===0){createFirstSection(h)};
          // adjustMyButtons(adjustment,i)
          }
          
      }
  })

  this.addScript("deleteButtonfunction",
function deleteButtonfunction(section){
    var lastSection = positionDictionnary[section].length-1;
    console.println("this is the value of my lastSection  :"+lastSection)
    if (lastSection != 0){
    for (i in positionDictionnary[section][lastSection]){
      console.println("this runs : "+ positionDictionnary[section][lastSection][i].f+"  "+lastSection)
      rmfield(positionDictionnary[section][lastSection][i].f,lastSection); 
    }
    console.println("here the adjust below function runs")
    adjustBelowSections(section,false) 
    positionDictionnary[section].splice(lastSection, 1);

  }
  })


createFirstSection(0)
createSecondSection(0)
createMybuttons()



// Quand ré-ouverture - positionDictionnary is not defined

// Créer une page de garde pour 1. stocker les variables, 2. ajuster le nombre de section 
// mettre un pop-up qui demande si le document est fini (enregister et supprimer les pages) ou si le document n'est pas fini ( garder les pages et les variables )

// Page de garde = présentation du document & du créateur avec +/- pour ajuster chacune des sections 
// Pop-up pour demander si le document est terminé ou si le document n'est pas terminé
// Design des pages templates


// test persistant dictionnary


