import React from "react";


class MovesCell extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state={
            moreClicked: this.props.more,
            movesArr: this.props.movesList
        }
    }

    render() {
        return (
            <>
                {this.state.moreClicked?
                    <td >
                        <thead>
                        <tr>
                            <th >Level</th>
                            <th> Method</th>
                            <th> Version</th>


                        </tr>
                        </thead>

                        {this.state.movesArr.map((move_item:any)=>

                        <tr >
                            <td>{move_item.level_learned_at}</td>
                            <td>{move_item.move_learn_method.name}</td>
                            <td>{move_item.version_group.name}</td>

                        </tr>
                        )}
                        <tr><button onClick={()=>this.setState({moreClicked: false})} >Less</button></tr>
                    </td>

                        :
                    <td>
                        <thead>
                        <tr>
                            <th >Level</th>
                            <th> Method</th>
                            <th> Version</th>


                        </tr>
                        </thead>
                        <tr>
                            <td>{this.state.movesArr[0].level_learned_at}</td>
                            <td>{this.state.movesArr[0].move_learn_method.name}</td>
                            <td>{this.state.movesArr[0].version_group.name}</td>

                        </tr>
                        <td><button onClick={()=>this.setState({moreClicked: true})} >More</button></td>
                    </td>
                    }

            </>

        );
    }
}

export default  MovesCell