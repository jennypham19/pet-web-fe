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
    requiredNote: string,
    createdBy: string | null
}

// output
export interface ITask {
    id: string,
    name: string,
    time: string,
    hour: string,
    frequency: string,
    otherFrequency: string | null,
    requiredNote: string,
    manager: {
        name: string,
        role: string,
        phone: string | null
    },
    status: string,
    isUpdatedImage: boolean,
    pets: {
        name: string,
        sex: string,
        urlAvatar: string
    }[]
}