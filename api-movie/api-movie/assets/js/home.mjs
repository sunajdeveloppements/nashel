const key = "381cc2db27bb9cdcd712453cd2b2669b";
const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w1280";
const colorThief=new ColorThief();


const movieDAO = {
    getPopulars : async (page=1) => {
        const suffix = `/movie/popular?api_key=${key}&language=fr&page=${page}`
        const res  = await fetch(baseURL+suffix)
        const data = await res.json()
        return data
    },
    getById : async (id) =>{
        const suffix = `/movie/${id}?api_key=${key}&language=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    find : async (term, page=1) =>{
        const suffix = `/search/movie?api_key=${key}&language=fr&query=${term}&page=${page}&include_adult=false`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    getPopularActors : async (page=1) =>{
        const suffix = `/person/popular?api_key=${key}&language=fr&page=${page}`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    getUpcoming : async (page=1) =>{
        const suffix = `/movie/upcoming?api_key=${key}&language=fr&page=${page}&region=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    getCasting : async (movieId, page=1) =>{
        const suffix = `/movie/${movieId}/credits?api_key=${key}&language=fr&page=${page}&region=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    }
}

class Button extends React.Component{
    constructor(e){
        super(e)
    }
    render(){
        return(
            <button  className={this.props.color}>{this.props.value}</button>
            
        )
    }
}

class Actor extends React.Component {
    render(){
        return(
            <article key={this.props.actor.id}>
                <img src={imgURL+this.props.actor.profile_path}></img>
            </article>
        )
    }
}

class ActorMin extends React.Component {
    render(){
        return(
            <div key={this.props.actor.id} className="name" onClick={()=>{document.location.href="https://www.google.com"}}>{this.props.actor.name}</div>
        )
    }
}

class Movie extends React.Component {
    constructor(e){
        super(e)
        this.color={
            a:{
                r:0,
                g:0,
                b:0
            },
            b:{
                r:0,
                g:0,
                b:0
            }
            
        }
        this.state={
            selected:false,
            casting:[],
            
        }
    }

    componentDidMount() {
        movieDAO.getCasting(this.props.movie.id).then((data) => {
            this.setState({casting:data.cast});
        });
        const img = document.getElementById(this.props.movie.id)
        img.src=imgURL+'/'+this.props.movie.poster_path
        img.setAttribute('crossOrigin', '');
        img.addEventListener('load', ()=> {
            this.color={
                a:{
                    r:colorThief.getPalette(img, 2, 50)[0][0],
                    g:colorThief.getPalette(img, 2, 50)[0][1],
                    b:colorThief.getPalette(img, 2, 50)[0][2]
                },
                b:{
                    r:colorThief.getPalette(img, 2, 50)[1][0],
                    g:colorThief.getPalette(img, 2, 50)[1][1],
                    b:colorThief.getPalette(img, 2, 50)[1][2]
                }
            }
            console.log(colorThief.getPalette(img, 2, 25))
        });
    //     const img = document.getElementById(this.props.movie.id)
    //     img.src=imgURL+'/'+this.props.movie.poster_path
    //     img.setAttribute('crossOrigin', '');
    //     console.log()
    //     console.log(colorThief.getColor(img))
    }

    handleMouseDown = (event) => {
        console.log("Mouse down on movie with id:", this.props.movie.id);
        // Ajouter ici votre code pour traiter l'événement
    }

    isSelected(){
        if (this.state.selected==true) {
            return "details"
        } else {
            return "details hidden"
        }
    }

    render() {
        return (
            <article key={this.props.movie.id}>
                <img id={this.props.movie.id} src={imgURL+this.props.movie.poster_path} onClick={()=> {
                    if (this.state.selected) {
                        this.setState({selected:false})
                    } else {
                        this.setState({selected:true})
                    }
                    
                    }}></img>
                
                <div className={this.isSelected()}>
                        <div>
                            <div>{this.props.movie.original_title}</div>
                            <div className="date">{this.props.movie.release_date}</div>
                            <div className="overview">{this.props.movie.overview}</div>
                            <div className="cast">
                                <div className="cast_text">Casting :</div>
                                <div>
                                    {this.state.casting.map(actor => (
                                        <ActorMin actor={actor}></ActorMin>
                                    ))}
                                </div>
                            </div>    
                        </div> 
                        <div className="bottom">                        
                            <div className={this.props.coming?"rating displayNone":"rating"}>{this.props.movie.vote_average+" / 10"}</div> 
                            <Button value="Aller au film" buttonColor={this.color}></Button>
                        </div> 
                    </div>
            </article>
      
        );
    }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      movies:[],
      actors:[],
      coming :[]
    };
    this.doUpdate = this.doUpdate.bind(this);
  }

  componentDidMount() {
    this.doUpdate();
  }

  doUpdate(query) {
    this.setState({ 
        query: query 
    });
    if (this.state.query == "" || this.state.query==undefined){
        movieDAO.getPopulars().then((data) => {
            this.setState({ movies: data.results });
        });
        movieDAO.getPopularActors().then((data) => {
            this.setState({ actors: data.results });
        });
        movieDAO.getUpcoming().then((data) => {
            this.setState({ coming: data.results });
        });
    }
    else
        movieDAO.find(this.state.query).then((data) => {
            this.setState({ movies: data.results });
        });
    }
    render(){
        return(
            <div className="container">
                <header>
                    <img src="./assets/img/logo.png" onClick={()=> {document.location.href="home.html"}}></img>
                    <input id="search" placeholder="Rechercher..." onChange={(e)=> this.doUpdate(e.target.value)}/>
                </header>
                <p>Films populaires :</p>
                <section className="populars">
                    {this.state.movies.map(elem=>(
                        <Movie movie={elem}/>
                    ))}
                </section>
                <p>Acteurs populaires :</p>
                <section className="popularsActors">
                    {this.state.actors.map(elem=>(
                        <Actor actor={elem}/>
                    ))}
                </section>
                <p>A venir :</p>
                <section className="populars">
                    {this.state.coming.map(elem=>(
                        <Movie movie={elem} coming={true}/>
                    ))}
                </section>
                
            </div>
            
        )
    }
}


const root = ReactDOM.createRoot(document.querySelector("#app_container"));
root.render(<App />);


