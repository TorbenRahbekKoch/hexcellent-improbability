export interface Room {
    id: string,
    title: string,
    description: string
}

export interface IntroductionData {
    title
}

export interface GameData {
    title: string
    description: string
    rooms: Room[]
}