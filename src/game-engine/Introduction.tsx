import { Just, Nothing } from "pratica"
import { useEffect } from "preact/hooks";

export function Introduction({ title, description, onStartGame }: Props) {

    function onKeyDown(event: KeyboardEvent) {
        Just(event)
            .chain(event =>
                event.code == 'Enter'
                    ? Just(true)
                    : Nothing)
            .cata({
                Just: _ => { onStartGame() },
                Nothing: () => { }
            })
    }

    useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.removeEventListener("keydown", onKeyDown)
        }
    })
    return (
        <div class="hxi-introduction">
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={onStartGame}>Start game!</button>
        </div>
    )
}

export interface Props {
    title: string
    description: string
    onStartGame: () => void
}