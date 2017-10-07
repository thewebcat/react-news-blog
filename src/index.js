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

class TestInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myValue: ''
        };
    }

    onChangeHandler = (e) => {
        this.setState({
            myValue: e.target.value
        })
    };

    onBtnClickHandler = (e) => {
        //alert(this.state.myValue)
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value)
    };

    render() {
        return (
            <div className="form-inline mb-sm-3">
                <div className="form-group mx-sm-3">
                    <label htmlFor="test-input">Значение</label>
                    <input className="form-control test-input ml-sm-3"
                           type="text"
                           id="test-input"
                           placeholder='введите значение'
                           defaultValue=""
                           ref="myTestInput"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={this.onBtnClickHandler}>Submit</button>
                </div>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="app">
                <h3>Новости</h3>
                <TestInput/>
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