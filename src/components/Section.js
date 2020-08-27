export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderer(items) {
        items.forEach(elem => {
            this._renderer(elem);
        });
    }
    addItem(elem) {
        this._container.prepend(elem);
    }
}