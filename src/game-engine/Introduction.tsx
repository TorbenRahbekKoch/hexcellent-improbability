import { GameState } from "./State";

export function Introduction({ gameState }: Props) {
    return (<div class="hxi-introduction">
        <h1>{gameState.game.title}</h1>
        <p>{gameState.game.description}</p>
    </div>
    )
}

export interface Props {
    gameState: GameState
}