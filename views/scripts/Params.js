class Params {
    constructor(divParam) {
        this.change = this.change.bind(this);
        divParam.children[0].children[1].addEventListener("click", this.change);
        this.divParam = divParam;
        this.partParam = divParam.className.split("-")[0];
    }
    change() {
        document
            .getElementsByClassName(`${this.partParam}-params`)[0]
            .classList.toggle("open");
    }
}
