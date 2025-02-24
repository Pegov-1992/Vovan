import { Component } from 'react';
import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component  {

    constructor(props) {
        super(props);
        console.log("constructor RandomChar");
    }

    state = {
        char: {},
        loading: true,
        error: false,
   

    }

    componentDidMount(){
        this.updateChar();
        console.log("Mount RandomChar");
    }
    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
        })
    }

    onCharLoading =()=>{
        this.setState({
            loading: true,
        })
    }

    onError = () =>{
        this.setState({
         loading: false,
          error: true,
    })
    }   

    updateChar=()=>{
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
        .getCharacter(id)
        .then((char) =>{this.onCharLoaded(char)})
        .catch(()=>{this.onError()})
        //.then(this.onCharLoaded)
    }

    componentDidUpdate(){
        console.log("Update RandomChar ")
    }
   
   render()
   {
    console.log("render RandomChar")
    const {char,  loading, error} = this.state;
    const errorMeessage =  error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content =  !(error || loading) ? <View char={char}></View> : null;
   // console.log(description);
    return (
    
    <div className="randomchar">

    {errorMeessage}
    {spinner}
    {content}
    
    
        <div className="randomchar__static">
            <p className="randomchar__title">
                Random character for today!<br/>
                Do you want to get to know him better?
            </p>
            <p className="randomchar__title">
                Or choose another one
            </p>
            <button onClick={this.updateChar} className="button button__main">
                <div className="inner">try it</div>
            </button>
            <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
        </div>
    </div>)
}
}

const View = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
    <div className="randomchar__block">
        
    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
    <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
            {(typeof description == "undefined") ? "Empty" : description} 
        </p>
        <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
            </a>
        </div>
    </div>
</div>)
}

export default RandomChar;