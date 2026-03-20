import { Dayjs } from "dayjs"
import { IPet } from "./pet"

// input
export interface FormDataTask{
    name: string,
    pets: IPet[],
    time: string,
    hour: Dayjs | null,
    frequency: string,
    requiredNote: string
}

// body
export interface PayloadTask{
    name: string,
    petIds: string[],
    time: string,
    hour: Dayjs | null,
    frequency: string,
    otherFrequency: string | null,
    requiredNote: string
}

// output