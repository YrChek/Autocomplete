class Autocomplete {
    constructor( container ) {
      this.container = container;
      this.input = container.querySelector( '.autocomplete__input' );
      this.searchInput = container.querySelector( '.autocomplete__search' );
      this.list = container.querySelector( '.autocomplete__list' );
      this.valueContainer = container.querySelector( '.autocomplete__value' );
      this.valueElement = container.querySelector( '.autocomplete__text-content' );
      
      // Добавленный код
      this.demo = container.querySelector('.demo');
      this.button1 = container.querySelector('.demo__text')
      this.button2 = container.querySelector('.demo__end')
      ///////////////
  
      this.registerEvents();
    }
  
    registerEvents() {
      this.valueContainer.addEventListener( 'click', e => {
        this.searchInput.classList.add( 'autocomplete__search_active' );
        this.list.classList.add( 'autocomplete__list_active' );
        this.searchInput.value = this.valueElement.textContent.trim();
        this.searchInput.focus();
  
        this.onSearch();
      });
  
  
      this.searchInput.addEventListener( 'input', e => this.onSearch());

      // добавленный код

      this.button1.addEventListener('click', () => {
        this.valueElement.textContent = this.button1.textContent;
        this.searchInput.value = this.button1.textContent;
        this.list.classList.remove('autocomplete__list_active')
        this.demo.classList.add('demo__none')
      })

      this.button2.addEventListener('click', () => {
        this.demo.style.display = 'none'
      });

      this.searchInput.addEventListener( 'blur', () => {
        // this.demo.classList.add('demo__none')
        let timer = this.demo.classList
        setTimeout(() => {
          timer.add('demo__none')
        }, 200)
      });

      /////////////////////////
  
      this.list.addEventListener( 'click', e => {
        const { target } = e;
        if ( !target.matches( '.autocomplete__item' )) {
          return;
        }
  
        const { textContent: text } = target,
          { id: value, index } = target.dataset;
  
        this.onSelect({
          index,
          text,
          value
        });

        this.demo.classList.add('demo__none') // добавленная строка
      });
    }
  
    onSelect( item ) {
      this.input.selectedIndex = item.index;
      this.valueElement.textContent = item.text;
  
      this.searchInput.classList.remove( 'autocomplete__search_active' );
      this.list.classList.remove( 'autocomplete__list_active' );
    }
  
    onSearch() {
      const matches = this.getMatches( this.searchInput.value );
  
      this.renderMatches( matches );
    }
  
    renderMatches( matches ) {
      const html = matches.map( item => `
          <li>
          <span class="autocomplete__item"
              data-index="${item.index}"
            data-id="${item.value}"
          >${item.text}</span>
        </li>
      `);
  
      this.list.innerHTML = html.join('');
    }
  
    getMatches( text ) {
      /*
        TODO: этот метод нужно дописать
        text - фраза, которую вводят в поле поиска
        Метод должен вернуть массив.
        Он формируется на основе списка опций select-элемента (this.input)
        Подходящие опции - те, чей текст содержит то, что есть в аргументе text
        Необходимо вернуть массив объектов со свойствами:
        {
          text: 'Содержимое <option>',
          value: 'Содержимое атрибута value'
        }
      */
        this.arrays = []
        for (let el of this.input) {
            if (el.text.toLowerCase().includes(text.toLowerCase())) {
                let array = {'text': el.text, 'value': el.value}
                this.arrays.push(array)
            }
        }

        if (text.length < 3 || this.arrays.length === 0) {
          this.demo.classList.add('demo__none')
        } else {
          this.demo.classList.remove('demo__none')
          this.button1.textContent = this.arrays[this.arrays.length -1].text
        }

        return this.arrays
    }
  }
  
  new Autocomplete( document.querySelector( '.autocomplete' ));