////////////////////////////////////////////////////////////////////////////////////////////////////
//  Model    //

//  Объект store отвечает за взаимодействие с сервером. Скорее всего в нем должны быть только методы (запросы),
//  хотя возможно стоит сделать один глобальный запрос и результат сохранить в каком-нибудь поле этого объкта
//  и затем брать информацию не с сервера, а уже из этого поля. Также можно рассмотреть вопрос кэширования данных
//  это то, что касается поисковой строки и ее работы на лету

const store = {
    belarus: {
        cases: 5,
        deaths: 0,
        recoveries: 2
    },

    russia: {
        cases: 10,
        deaths: 0,
        recoveries: 7
    },

    getData(country) {
        return this[country]
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
//  Controller    //

//  Хранит актуальное состояние приложения, за информацией обращается в store и снабжает view нужными данными.
//  Также отсюда вызывается rerender при изменении state
//  В любом случае, какую бы модель разработки мы не выбрали, подобный объект, на мой взгляд, должен быть

const state = {
    _currentCountry: '',
    _statistics: {
        cases: '',
        deaths: '',
        recoveries: ''
    },

    getCurrentCountry() {
        return this._currentCountry
    },

    getStatistics() {
        return this._statistics
    },

    updateStatistics() {
        this._statistics = store.getData(this._currentCountry)
    },

    changeCurrentCountry(country) {
        this._currentCountry = country
        this.updateStatistics()
        this._rerender()
    },

    _rerender() {

    },

    subscriber(observer) {
        this._rerender = observer
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
//  View    //

//  Отрисовка контента, можно все приложение разделить на блоки, те части, которые не будут меняться прописать
//  в index.html, остальное генерится отсюда функциями типа renderTable / renderList и.т.д
//  Обработчики событий вызывают методы у state, которые и меняют state, затем state вызывает rerender
//  (функция которая находится в блоке view) и происходит отрисовка актуальных данных

function renderTable() {
    table.innerHTML = `
        <div class="table-content">
            <div class="table__current-state cell">${state.getCurrentCountry()}</div>
            <div class="table__cases cell">Cases:<br> ${state.getStatistics().cases}</div>
            <div class="table__deaths cell">Deaths:<br> ${state.getStatistics().deaths}</div>
            <div class="table__recoveries cell">Recoveries:<br> ${state.getStatistics().recoveries}</div>
        </div>
    `
}

renderTable()
state.subscriber(renderTable)

const buttonRussia = document.querySelector('.btn-russia')
const buttonBelarus = document.querySelector('.btn-belarus')

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        state.changeCurrentCountry(btn.textContent.toLowerCase())
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////


