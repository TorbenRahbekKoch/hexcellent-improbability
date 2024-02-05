import { Signal } from "@preact/signals";
import { Descriptor, GameDefinition, HexcellentImprobabilityGame, Locator } from "../../game-engine/GameDefinition";
import { GameState, GlobalVariables, createInitialState } from "../../game-engine/GameState";

export interface GameVariables extends GlobalVariables {
    toolShedSouth: number
}

export enum LocationIds {
    Kitchen,
    Hallway,
    LivingRoom,
    OutsideYourHouse,
    YourGarden,
    ToolShed,
    OnTopOfToolShed,
    OutsideNeighborsHouse,
    NeighborsGarden,
    EndOfStreet
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
            east: ((_: GameVariables) => LocationIds.Hallway) as Locator
        }
    }, {
        id: LocationIds.Hallway,
        title: "Hallway",
        description: ((_: GameVariables) => `This is the hallway. Neat hallway. Wooden panels and all sorts of fancy stuff!
        Well, jokes aisde. Your hallway is absolutely not anything to brag about. It reminds you of the kitchen 
        due to it's incredible uglyness. You should have made it look like the neighbor's hallway, which words simply cannot
        describe. It's absolutely beautiful!`) as Descriptor,
        directions: {
            east: ((_: GameVariables) => LocationIds.LivingRoom) as Locator,
            west: ((_: GameVariables) => LocationIds.Kitchen) as Locator,
            south: ((_: GameVariables) => LocationIds.OutsideYourHouse) as Locator
        }
    }, {
        id: LocationIds.LivingRoom,
        title: "Living room",
        description: ((_: GameVariables) => `The living room does not quite live up to the hallway, not that
        that would do you much good. Actually, no matter what you do your living room will always be more
        ugly than the neighbor's living room`) as Descriptor,
        directions: {
            west: ((_: GameVariables) => LocationIds.Hallway) as Locator
        }
    }, {
        id: LocationIds.OutsideYourHouse,
        title: "Outside your house",
        description: ((_: GameVariables) => `Outside your house. The sun is shining, the birds
        are tweeting. Incredibly cosy! It is, by the way, an enormously ugly house. Not at all like
        your neighbor's house! `) as Descriptor,
        directions: {
            west: ((_: GameVariables) => LocationIds.OutsideNeighborsHouse) as Locator,
            east: ((_: GameVariables) => LocationIds.YourGarden) as Locator,
            north: ((_: GameVariables) => LocationIds.Hallway) as Locator
        }
    }, {
        id: LocationIds.YourGarden,
        title: "In your garden",
        description: ((_: GameVariables) => `So this is your garden. You need to do something here.
        It's a mess!`) as Descriptor,
        directions: {
            west: ((_: GameVariables) => LocationIds.OutsideYourHouse) as Locator,
            north: ((_: GameVariables) => LocationIds.ToolShed) as Locator
        }
    }, {
        id: LocationIds.ToolShed,
        title: "In your tool shed",
        description: ((_: GameVariables) => `It's even more messy in here than
        in the garden. It is embarrasing!`) as Descriptor,
        directions: {
            south: ((vars: GameVariables) => vars.toolShedSouth) as Locator
        }
    }, {
        id: LocationIds.OnTopOfToolShed,
        title: "On the top of your tool shed",
        description: ((_: GameVariables) => `There is an excellent view over your
        own garden, although your eyes are more naturally drawn to the exquisiteness of your
        neighbor's garden!`) as Descriptor,
        directions: {
            down: ((_: GameVariables) => LocationIds.YourGarden) as Locator
        }
    }, {
        id: LocationIds.OutsideNeighborsHouse,
        title: "Outside your neighbor's house",
        description: ((_: GameVariables) => `This is an exquisitely beautiful and well-maintained house. 
        Especially compared to your own. Your neighbor has absolutely no problem making you aware of this.`) as Descriptor,
        directions: {
            west: ((_: GameVariables) => LocationIds.EndOfStreet) as Locator,
            north: ((_: GameVariables) => LocationIds.NeighborsGarden) as Locator,
            east: ((_: GameVariables) => LocationIds.OutsideYourHouse) as Locator
        }
    }, {
        id: LocationIds.NeighborsGarden,
        title: "In your neighbor's garden",
        description: ((_: GameVariables) => `What a lovely garden! Incredibly well-groomed with the most lovely
        flowers to have ever seen the light of day.`) as Descriptor,
        directions: {
            south: ((_: GameVariables) => LocationIds.OutsideNeighborsHouse) as Locator
        }
    }, {
        id: LocationIds.EndOfStreet,
        title: "End of the street",
        description: ((_: GameVariables) => `This is the end of the street on on which you live.
        It's a dead-end street.`) as Descriptor,
        directions: {
            east: ((_: GameVariables) => LocationIds.OutsideNeighborsHouse) as Locator
        }
    }

    ]
}

class DestroyerOfMailboxes extends HexcellentImprobabilityGame {
    constructor() {
        const state = createInitialState(
            LocationIds.Kitchen, {
                toolShedSouth: LocationIds.YourGarden
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