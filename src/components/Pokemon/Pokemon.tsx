import React from "react";
import { Link, Route, Switch} from "react-router-dom";
import "./style.css";
import PokemonPage from "../PokemonPage/PokemonPage";
interface PokeInfo {
    name: string,
    url: string
}
class Pokemon extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state ={
            loading: true,
            prev: null,
            next: null,
            pokemon_id: null,
            pokemon_number: null,
            pokemon: [],
            pokemon_sorted: [],
            search_key: "",
            search_result: [],
            id: 1
        }
    }

    async componentDidMount(){
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898`;
        await this.requestHandler(url)
        this.searchHandler()


    }

    async requestHandler(url:string){
        const response = await fetch(url);
        const data = await response.json()
        console.log(data.results)
        this.setState({pokemon: data.results, next:data.next, prev: data.previous, loading: false})
    }
    searchHandler(){
        let result =[]
        let searchKey = this.state.search_key
        searchKey = searchKey.toLowerCase().trim()
        let f = this.state.pokemon
        if(searchKey==="" || searchKey === null){

            this.setState({search_result: f})
        }else {
            for( let i = 0; i< f.length; i++){
                console.log(f[i])
                if(f[i].name.includes(searchKey)){

                    result.push(f[i])
                }
            }
            this.setState({search_result: result})
        }

    }

    linkToIdHandler(link:string){
        let id = ``
        let new_id = link.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/",'')
        switch (new_id.length){
            case 1:
                id = `00${new_id}`
                break
            case 2:
                id = `0${new_id}`
                break
            case 3:
                id = new_id
        }
        return id
    }



    render() {

        return (
            <Switch>
                <Route exact path={'/pokemon'}>
                    <div>
                        <button onClick={()=>this.requestHandler(this.state.prev)}>Previous</button>
                        <button onClick={()=>this.requestHandler(this.state.next)}>Next</button>
                        <input onChange={event=>{this.setState({search_key: event.target.value})}
                        } type={"text"} />
                        <button onClick={()=>this.searchHandler()} >Search</button>
                        <p>Search Results: {" "} {this.state.search_result.length}</p>
                        {this.state.loading
                            ? <div>loading...</div>
                            : <div className={"poke-grid"}>{this.state.search_result.slice(0,20).map((item:PokeInfo)=>
                                <li className={"poke-item"} key={this.linkToIdHandler(item.url)}>
                                    <img alt={item.name} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.linkToIdHandler(item.url)}.png`}/>
                                    <div className={"poke-item-info"}>
                                        <p className={"poke-item-name"}>{item.name}</p>
                                        <Link className={"poke-item-link"}
                                              onClick = {()=>{
                                                  localStorage.setItem("state_url", item.url )
                                                  this.setState({
                                                  pokemon_id: item.url,
                                                  pokemon_number: this.linkToIdHandler(item.url)
                                              })}}
                                              to={`/pokemon/${this.linkToIdHandler(item.url)}`}>
                                            More Info
                                        </Link>

                                    </div>

                                </li>)
                            }</div>
                        }
                    </div>
                </Route>
                <Route path={`/pokemon/:number`}>
                    <PokemonPage id={this.state.pokemon_id}/>
                </Route>
            </Switch>

        );
    }

}
export default Pokemon

