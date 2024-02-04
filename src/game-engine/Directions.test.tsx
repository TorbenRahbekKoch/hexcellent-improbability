import { describe, expect, test  } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/preact'
import { Directions } from './Directions'

describe('Directions', () => {
    test('Click should call OnLocationSelected', async () => {

        let locationIdSelected : number = -1
        const onDirectionSelected = (locationId: number) =>  { locationIdSelected = locationId}
        await render(
            <Directions
                variables={{ currentLocation: 42 }} 
                directions={{ east: () => 42}}
                onDirectionSelected={onDirectionSelected}
                />
            )

        const button = screen.getByRole("button")
        await fireEvent.click(button)

        await waitFor(() => {
            expect(locationIdSelected).toBe(42)
        }, { interval: 10})
        
        cleanup()
    })

    test('Numeric 6 should call OnLocationSelected', async () => {

        let locationIdSelected : number = -1
        const onDirectionSelected = (locationId: number) =>  { locationIdSelected = locationId}
        await render(
            <Directions
                variables={{ currentLocation: 42 }} 
                directions={{ east: () => 42}}
                onDirectionSelected={onDirectionSelected}
                />
            )

        const body = screen.getByRole("button").ownerDocument.body
        await fireEvent.keyDown(body, {code: 'Digit6'})

        await waitFor(() => {
            expect(locationIdSelected).toBe(42)
        }, { interval: 10})
        
        cleanup()
    })

})