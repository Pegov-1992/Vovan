import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    constructor(props){
        super(props);
        console.log("constructor Charlist");
    }

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
            console.log("Mount Charlist");
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    componentDidUpdate(){
        console.log("Update Charlist");
      console.log(this.state.charList);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    on_getmoreCharacters = async ()=>{
        const newcharakters = await this.marvelService.getAllCharacters((this.state.offset + 9));
          this.setState({
             // offset: offset + 9,
             // charList: [...charList, ...newcharakters],
              offset: this.state.offset + 9,
              charList: [...this.state.charList, ...newcharakters],
          })
      }
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => { 
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
          
         
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
  

    render() {
        console.log("render Charlist");
        const {charList, loading, error} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button  onClick={this.on_getmoreCharacters} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>

             
            </div>
        )
    }
}

export default CharList;