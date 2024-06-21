var annot = this.addAnnot({
    type: "Line",
    page: 0,
    doCaption: true,
    contents: "this is the left line",
    points: [[50,792],[50,0]],
});

var annot = this.addAnnot({
    type: "Line",
    page: 0,
    doCaption: true,
    contents: "this is the right line",
    points: [[562,792],[562,0]],
});

var annot = this.addAnnot({
    type: "Line",
    page: 0,
    doCaption: true,
    contents: "This is the bottom line",
    points: [[0,90],[612,90]],
});

var annot = this.addAnnot({
    type: "Line",
    page: 0,
    width: 2,
    strokeColor: [ "RGB", .282,.706,.706 ],  
    points: [[50,682],[100,682]],
     
});

var annot = this.addAnnot({
    type: "Line",
    page: 0,
    doCaption: true,
    contents: "This is the top line",
    points: [[0,692],[612,692]],
});

var annot = this.addAnnot({
    type: "Line",
    page: 0,
    doCaption: true,
    contents: "Above this line, the text is fixed",
    points: [[0,592],[612,592]],
});


var annot = this.addAnnot({
  type: "Text",
  page: 0,
  contents: "test",
  rect: [50,672,100,672],
});
