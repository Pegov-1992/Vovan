class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
    _apiKey = 'apikey=575c71f789bd01d05b105db9483710fc';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res =  await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);//https://gateway.marvel.com:443/v1/public/characters?apikey=575c71f789bd01d05b105db9483710fc
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
       const res =  await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
       return this._transformCharacter(res.data.results[0]);
    }
    

    _transformCharacter = (char) =>{
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
        
    }
}

export default MarvelService;