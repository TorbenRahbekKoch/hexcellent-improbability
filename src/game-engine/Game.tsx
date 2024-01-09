import { Introduction } from './Introduction'
import {GameState, State } from './State'

export function Game(props: Props) {
    
    if (props.gameState.state.value == State.Introduction) {
        return (<Introduction gameState={props.gameState}></Introduction>)
    }
    return (
        <h1>Test</h1>
    )
}

export interface Props {
    gameState : GameState
}