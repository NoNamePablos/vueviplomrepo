/*
class TextInput {
    constructor(position, text) {
        this.position = position;
        this.text = text;
        this.fontSize = 16;
        this.isEditing = false;

        this.textItem = new PointText(this.position);
        this.textItem.fontSize = this.fontSize;
        this.textItem.content = this.text;

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
            if (event.key === "backspace") {
                this.textItem.content = this.textItem.content.slice(0, -1) + "|";
            } else if (event.key === "enter") {
                this.textItem.content = this.textItem.content.slice(0, -1);
                this.isEditing = false;
                this.text = this.textItem.content;
                this.textItem.selected = false;
                this.textItem.content = this.text;
                document.removeEventListener("keydown", this.onKeyDown);
                document.removeEventListener("mousedown", this.onMouseDown);
            } else if (event.key.length === 1) {
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

/!*const textInput = new TextInput(new Point(100, 100), "Enter text here...");

project.activeLayer.addChild(textInput.textItem);*!/

*/
