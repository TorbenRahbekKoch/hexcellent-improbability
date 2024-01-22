import { describe, expect, test  } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import { Introduction } from './Introduction'

describe('Introduction', () => {
    test('Enter should call onContinue()', async () => {

        let onStartGameCalled : boolean = false
        const onStartGame = () => { onStartGameCalled = true }
        await render(
            <Introduction 
                title='Title'
                description='Description'
                onStartGame={onStartGame}/>
            )

        const body = screen.getByRole("button").ownerDocument.body
        await fireEvent.keyDown(body, {code: 'Enter'})

        await waitFor(() => {
            expect(onStartGameCalled).toBe(true)
        }, { interval: 10})

        cleanup()
    })

})