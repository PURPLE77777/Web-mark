class ProductFilter {
    constructor() {
        this.form = document.getElementsByClassName("search-params")[0];

        let params = [];
        for (let i = 0; i < this.form.children.length - 1; i++) {
            let ParamDiv = new Params(this.form.children[i]);
            params.push(ParamDiv);
        }
        this.params = params;
    }
    get getForm() {
        return this.form;
    }
}

let filter = new ProductFilter();
