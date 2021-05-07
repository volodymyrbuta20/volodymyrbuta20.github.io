const getTemplate = (data = [], placeholder) => {
    const text = placeholder ?? 'Элемент по умолчанию';

    const items = data.map(item => {
        return `
        <li class="select__item" data-type = "item" data-id = "${item.id}">${item.value}</li>
        `;
    });

    return `
    <div class = "select__backdrop" data-type = "backdrop"></div>
    <div class="select__input" data-type = "input">
        <span data-type = "value">${text}</span>
        <svg data-type = "arrow" class="svg-icon down" viewBox="0 0 20 20">
            <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
        </svg>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}
        </ul>
    </div>
    `;
};

class Select {
    constructor (selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = null;

        this.render();
        this.setup();
    }

    render () {
        const {placeholder, data} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate (data, placeholder);
    }

    setup () {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type = "arrow"]');
        this.$value = this.$el.querySelector('[data-type = "value"]');
    }

    clickHandler (event) {
        const {type} = event.target.dataset;
        
        if (type === 'input' || type === 'value') {
            this.toggle();
        } else if (type === "item") {
            const id = event.target.dataset.id;
            this.select(id);
        } else if (type === "backdrop") {
            this.close();
        }
    }

    get isOpen () {
        return this.$el.classList.contains('open');
    }

    get current () {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;

        this.$el.querySelectorAll('[data-type = "item"]').forEach(el => {
            el.classList.remove('selected');
        });
        this.$el.querySelector(`[data-id = "${id}"]`).classList.add('selected');

        this.close();
    }

    toggle () {
        if (this.isOpen) {
            this.close();
        } else {
            this.open ();
        }
    }

    open () {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('down');
        this.$arrow.classList.add('up');
    }

    close () {
        this.$el.classList.remove('open');
        this.$arrow.classList.add('down');
        this.$arrow.classList.remove('up');
    }

    destroy () {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}