import paper from "paper";

class TextInput {
    constructor(position, text) {
        this.position = position;
        this.text = text;
        this.fontSize = 16;
        this.isEditing = false;

        this.textItem = new paper.PointText(this.position);
        this.textItem.fontSize = this.fontSize;
        this.textItem.content =this.text;
        this.textItem.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onDoubleClick(event) {
        this.isEditing = true;

        this.textItem.content = "|";
        this.textItem.selected = true;
        this.textItem.bringToFront();

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("mousedown", this.onMouseDown.bind(this));
    }

    onKeyDown(event) {
        if (this.isEditing) {
            console.log("is editing: ",this.isEditing);
            console.log('event key: ',event.key);

            if (event.key.toLowerCase() === "backspace") {
                console.log("dfsdfds: ",this.textItem.content);
                this.textItem.content = this.textItem.content.slice(0, -1) + "|";

            }
            else if (event.key.toLowerCase() === "enter") {
                console.log("this text item: ",this.textItem.content);
                console.log("this text: ",this.text);
                this.isEditing = false;
                this.text = this.textItem.content.slice(0, -1);
                this.textItem.selected = false;
                this.textItem.content = this.text;

                // remove the "|" character if it's present
                if (this.textItem.content.slice(-1) === "|") {
                    this.textItem.content = this.textItem.content.slice(0, -1);
                }
                document.removeEventListener("keydown", this.onKeyDown);
                document.removeEventListener("mousedown", this.onMouseDown);
            } else {
                this.textItem.content = this.textItem.content.slice(0, -1) + event.key + "|";
            }
        }
    }

    onMouseDown(event) {
        if (this.isEditing && !this.textItem.hitTest(event.point)) {
            this.isEditing = false;
            this.text = this.textItem.content.slice(0, -1);
            this.textItem.selected = false;
            this.textItem.content = this.text;
            document.removeEventListener("keydown", this.onKeyDown);
            document.removeEventListener("mousedown", this.onMouseDown);
        }
    }

    remove() {
        this.textItem.remove();
    }
}

/*const textInput = new TextInput(new Point(100, 100), "Enter text here...");

project.activeLayer.addChild(textInput.textItem);*/
export default  TextInput;
