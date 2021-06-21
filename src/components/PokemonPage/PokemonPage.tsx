import React from "react";
import { Link } from "react-router-dom";
import "./style.css"
import MovesCell from "./MovesComponent/MovesCell";

class PokemonPage extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state={
            loading: true,
            url: "https://pokeapi.co/api/v2/pokemon/",
            shiny:false,
            front: true,
            pokemonInfo: null,
            prevTabel: 0,
            tablePage: 0,
            nextTabel: 10
        }
    }
    async componentDidMount(){
        let f:any= localStorage.getItem("state_url")
        const link = this.state.url + this.linkToIdHandler(f)
        console.log(this.props.id)
        await this.requestHandler(link)


    }
    linkToIdHandler(link:string) {
        let new_id = link.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", '')
        return new_id
    }
    async requestHandler(url:string){
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)
        this.setState({pokemonInfo: data, loading: false})
    }

    render() {
        return (
            <div>
                {this.state.loading? <div>Loading...</div>: <div >

                    <div className={"back-link-info"} >
                        <Link to = "/pokemon/">
                             Back
                        </Link>
                        <p> | {this.state.pokemonInfo.name}</p>
                    </div>
                    <div className={"info-block-body"}>
                        <div className={"basic-info"}>
                            <div className={"info-items"}>
                                <div className={"info-item"}>
                                    <div className={"caption-box"}><p>NAME</p></div>
                                    <div className={"content-box"}>
                                        <p>{this.state.pokemonInfo.name}</p>
                                    </div>
                                </div>
                                <div className={"info-item"}>
                                    <div className={"caption-box"}><p>ID</p></div>
                                    <div className={"content-box"}>
                                        <p>{this.state.pokemonInfo.id}</p>
                                    </div>

                                </div>
                                <div className={"info-item"}>
                                    <div className={"caption-box"}><p>HEIGHT</p></div>
                                    <div className={"content-box"}>
                                        <p>{this.state.pokemonInfo.height/10} m</p>
                                    </div>


                                </div>
                                <div className={'info-item'}>
                                    <div className={"caption-box"}><p>WEIGHT</p></div>
                                    <div className={"content-box"}>
                                        <p>{this.state.pokemonInfo.weight/10} kg</p>
                                    </div>

                                </div>
                                <div className={"info-item"}>
                                    <div className={"caption-box"}><p>TYPES</p></div>
                                    <div className={"info-types"}>
                                        {this.state.pokemonInfo.types.map((item:any)=> <img alt={item.type.name} title={item.type.name} src={`../pokemon_types/${item.type.name}.svg`} />)}

                                    </div>
                                </div>
                            </div>
                            <div className={"photo-block"}>

                                {   this.state.shiny
                                    ? this.state.front
                                        ? <img alt={this.state.pokemonInfo.name} src={this.state.pokemonInfo.sprites.front_shiny} />
                                        : <img alt={this.state.pokemonInfo.name} src={this.state.pokemonInfo.sprites.back_shiny} />
                                    : this.state.front
                                        ? <img alt={this.state.pokemonInfo.name} src={this.state.pokemonInfo.sprites.front_default} />
                                        : <img alt={this.state.pokemonInfo.name} src={this.state.pokemonInfo.sprites.back_default} />
                                }

                                <div className={"photo-switch"}>
                                    <table>
                                        <tr>
                                            <td>Front</td>
                                            <td> <label className="switch">
                                                <input
                                                    onClick={()=>{this.state.front
                                                    ? this.setState({front: false})
                                                    : this.setState({front: true}) }}
                                                       id={"view-checkbox"}
                                                       type="checkbox"/>
                                                <span className="slider round"></span>
                                            </label>
                                            </td>
                                            <td>Back</td>
                                        </tr>
                                        <tr>
                                            <td>Default</td>
                                            <td> <label className="switch">
                                                <input
                                                    onClick={()=>{this.state.shiny
                                                        ? this.setState({shiny: false})
                                                        : this.setState({shiny: true}) }}
                                                    id={"shiny-checkbox"}
                                                    type="checkbox"/>
                                                <span className="slider round"></span>
                                            </label>
                                            </td>
                                            <td>Shiny</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={"stats-info"}>

                            <table>
                                <thead>
                                <tr>
                                    <th colSpan={2}>STATS</th>
                                </tr>
                                <tr>
                                    <th >Name</th>
                                    <th >Score</th>
                                </tr>
                                </thead>
                                {this.state.pokemonInfo.stats.map((item:any)=>  <tr>
                                    <td>{item.stat.name}</td>
                                    <td>{item.base_stat}</td>
                                </tr>)}

                            </table>
                        </div>
                        <div className={"abilities-info"}>
                            <table>
                                <thead>
                                <tr>
                                    <th colSpan={2}>Abilities</th>
                                </tr>
                                <tr>
                                    <th >Name</th>
                                    <th >Hidden</th>
                                </tr>
                                </thead>
                                {this.state.pokemonInfo.abilities.map((item:any)=>  <tr>
                                    <td>{item.ability.name}</td>
                                    <td>{item.is_hidden? "true": "false"}</td>
                                </tr>)}

                            </table>
                        </div>
                        <div className={"moves-info"}>
                            <button onClick={()=>{

                                this.state.tablePage> 0
                                    ?this.setState({
                                        prevTabel: this.state.prevTabel-10,
                                        nextTabel: this.state.nextTabel-10,
                                        tablePage: this.state.tablePage-1
                                    }
                                    )
                                    : console.log("first page")

                            }} >Prev</button>
                            <div>Page: {this.state.tablePage+1}</div>
                            <button onClick={()=>{

                                Math.ceil(this.state.pokemonInfo.moves.length/10)>this.state.tablePage+1
                                    ?this.setState({
                                        prevTabel: this.state.prevTabel+10,
                                        nextTabel: this.state.nextTabel+10,
                                        tablePage: this.state.tablePage+1
                                    }
                                    )
                                    : console.log("last page")

                            }} >Next</button>
                            <table>

                                <thead>
                                <tr>
                                    <th colSpan={2}>Moves</th>
                                </tr>
                                <tr>
                                    <th >Name</th>
                                    <th> Learn</th>

                                </tr>
                                </thead>

                                {this.state.pokemonInfo.moves.slice(this.state.prevTabel, this.state.nextTabel).map((item:any)=>  <tr>
                                    <td>{item.move.name}</td>
                                    <td colSpan={1}>
                                        <table>

                                        <MovesCell movesList={item.version_group_details}/>
                                        {/*{item.version_group_details.map((move_item:any)=>*/}

                                        {/*        <tr>*/}
                                        {/*            <td>{move_item.level_learned_at}</td>*/}
                                        {/*            <td>{move_item.move_learn_method.name}</td>*/}
                                        {/*            <td>{move_item.version_group.name}</td>*/}
                                        {/*        </tr>*/}



                                        {/*)}*/}
                                        </table>
                                    </td>


                                </tr>)}

                            </table>

                        </div>

                    </div>
                </div>}
            </div>
        );
    }


}

export default PokemonPage