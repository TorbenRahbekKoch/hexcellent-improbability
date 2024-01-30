import { Signal } from "@preact/signals";
import { Descriptor, GameDefinition, HexcellentImprobabilityGame, Locator } from "../../game-engine/GameDefinition";
import { GameState, GlobalVariables, createInitialState } from "../../game-engine/GameState";

export interface GameVariables extends GlobalVariables {
    myVariable: number
}

export enum LocationIds {
    Kitchen,
    Hallway
}

export const game: GameDefinition = {
    title: "Destroyer of Mail Boxes",
    description: "You are tasked with blowing up your neighbor's mail box. For no specific reason, other than - well, you'll see",
    startLocation: LocationIds.Kitchen,
    locations: [{
        id: LocationIds.Kitchen,
        title: "Kitchen",
        description: ((_: GameVariables) => `You are in a kitchen. It's quite an ordinary kitchen with all
the normal stuff, usuallly found in a kitchen. Even though there is nothing as such wrong with the craftmanship of the
kitchen it feels as if the kitchen is missing something. It's not
beautiful. It's more like ugly. It's probably the ugliest kitchen you've ever 
seen. Not like your neighbor's kitchen, which is - besides being exceptionally
well arranged - also an exceptionally beautiful kitchen.`) as Descriptor,
        directions: {
            east: ((_ : GameVariables) =>  LocationIds.Hallway) as Locator
        }
    }, {
        id: LocationIds.Hallway,
        title: "Hallway",
        description: ((_: GameVariables) => `This is the hallway. Neat hallway. Wooden panels and all sorts of fancy stuff!
        Well, jokes aisde. Your hallway is absolutely not anything to brag about. It reminds you of the kitchen 
        due to it's incredible uglyness. You should have made it look like the neighbor's hallway, which words simply cannot
        describe. It's absolutely beautiful!`) as Descriptor,
        directions: {
            east: ((_ : GameVariables) =>  LocationIds.Kitchen) as Locator
        }
    }
    ]
}

class DestroyerOfMailboxes extends HexcellentImprobabilityGame {
    constructor() {
        const state = createInitialState(
            LocationIds.Kitchen, {
            myVariable: 42
        } as GameVariables)

        super(game, state)
    }

    public override get state(): Signal<GameState> {
        return super.state as Signal<GameState>
    }

    public override get variables(): GameVariables {
        return super.variables as GameVariables
    }
}

export function createGame(): DestroyerOfMailboxes {
    return new DestroyerOfMailboxes()
}