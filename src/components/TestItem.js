/**
 * Created by dmpr0116 on 05.05.2017.
 */

class TestItem {
    constructor(type) {
        this.type = type;
        this.variants = [];
        this.question = {text:''};
        this.props = {};
    }

    toTest() {
        let publicData = this;
        switch (this.type){
            case "Regular Test":
                this.variants.map(function (v) {
                    v.isCorrect = null;
                });
                publicData.answer = new Set();
                break;
            case "Reorder":
                this.variants.map(function (v) {
                    v.position = null;
                });
                publicData.answer = new Set();
                break;
            case "Input Field":
                this.variants = null;
        }
        return publicData;
    }
}

export default TestItem;
