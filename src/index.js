import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

let my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

class Article extends Component {
    constructor(props) {
      super(props);
      this.state = {
          visible: false,
          counter: 0
      };
    }

    readmoreClick = (e) => {
        e.preventDefault();
        this.setState({
            visible: true,
            counter: ++this.state.counter
        })
    };

    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a className={"news__readmore " + (visible?'none':'')} onClick={this.readmoreClick}>Подробнее</a>
                <p className={"news__big-text " + (visible?'':'none')}>{bigText}</p>
            </div>
        )
    };
}

Article.propTypes = {
  data: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      bigText: PropTypes.string.isRequired
  })
};

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }
    render() {
        let data = this.props.data;
        let newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }


        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0?'':'none')}>Всего новостей: {data.length}</strong>
            </div>
        )
    }
}

News.propTypes = {
  data: PropTypes.array.isRequired
};

class Comments extends Component {
    render() {
        return (
            <div className="comments">
                Нет новостей - комментировать нечего
            </div>
        )
    }
}

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnDisabled: true
        };
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus()
    }

    onChangeHandler = (e) => {
        this.setState({
            myValue: e.target.value
        })
    };

    onBtnClickHandler = (e) => {
        e.preventDefault();
        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(`
        ${author}
        ${text}
        `);
    };

    onCheckRuleClick = (e) => {
        this.setState({
            isBtnDisabled: !this.state.isBtnDisabled
        });
    };

    render() {
        return (
            <form className='add cf p-2 mb-2'>
                <input
                    type='text'
                    className='form-control mb-1 add__author'
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='form-control mb-1 add__text'
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'>
                </textarea>
                <div className="form-check">
                    <label className='form-check-label'>
                        <input type='checkbox' className="form-check-input" defaultChecked={false} onChange={this.onCheckRuleClick} ref='checkrule'/>
                        <small>Я согласен с правилами</small>
                    </label>
                </div>
                <button
                    className='btn btn-info col-sm-12 add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={this.state.isBtnDisabled}>
                    Показать alert
                </button>
            </form>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="app">
                <Add/>
                <h3>Новости</h3>
                <News data={my_news}/>
                <Comments/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);