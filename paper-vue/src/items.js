import paper from "paper";

const loopItemGroup=()=>{
    // Create the outer shape of the loop item
    var loopItem = new paper.Path.Rectangle({
        point: [100, 100],
        size: [150, 100],
        strokeColor: 'black',
        strokeWidth: 2,
        fillColor: 'white'
    });

// Create the body of the loop item
    var loopBody = new paper.Path.Rectangle({
        point: [115, 115],
        size: [120, 70],
        strokeColor: 'black',
        strokeWidth: 2,
        fillColor: 'white'
    });

// Create the arrow shape for the loop item
    var arrow = new paper.Path([
        new paper.Point(235, 130),
        new paper.Point(270, 150),
        new paper.Point(235, 170)
    ]);
    arrow.strokeColor = 'black';
    arrow.strokeWidth = 2;
    arrow.fillColor = 'white';
    arrow.closed = true;
    arrow.rotate(180);

// Group the shapes together
    return new paper.Group([loopItem, loopBody, arrow]);
}


export default loopItemGroup;