import { signal } from "@preact/signals";
import { Description, GameDefinition, HexcellentImprobabilityGame } from "../../game-engine/GameDefinition";
import { GameStateWithVariables, GlobalVariables, Phase } from "../../game-engine/GameState";

export interface GameVariables  extends GlobalVariables{
    myVariable : number
}

export enum RoomIds {
    kitchen = "kitchen"
}


export const game : GameDefinition = {
    title: "Destroyer of Mail Boxes",
    description: "You are tasked with blowing up your neighbor's mail box. For no specific reason, other than - well, you'll see",
    startRoom: RoomIds.kitchen,
    rooms: [{
        id: RoomIds.kitchen,
        title: "Kitchen",
        description: ((_: GameVariables) => `You are in a kitchen. It's quite an ordinary kitchen with all
the normal stuff, usuallly found in a kitchen. Even though the craftmanship of the
kitchen is fine it feels as if the kitchen is missing something. It's not
beautiful. It's more like ugly. It's probably the ugliest kitchen you've ever 
seen. Not like your neighbor's kitchen, which is - besides being exceptionally
well arranged - also an exceptionally beautiful kitchen.`) as Description,                
    }]
}



class DestroyerOfMailboxes extends HexcellentImprobabilityGame {
    constructor() {
        const state : GameStateWithVariables<GameVariables> = {
            phase : signal<Phase>(Phase.Introduction),
            currentRoom: "kitchen",
            variables : {
                currentRoom: "kitchen",
                myVariable: 42
            }            
        }
        super(game, state)
    }

    public override get state() : GameStateWithVariables<GameVariables> {
        return super.state as GameStateWithVariables<GameVariables>
    }

    public override get variables(): GameVariables {
        return this.state.variables
    }
}

export function createGame() : DestroyerOfMailboxes {
    return new DestroyerOfMailboxes()
}