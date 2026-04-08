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

export interface PayloadTaskImages{
    images: {
        nameImage: string,
        urlImage: string,
        uploadedDate: Date        
    }[]
    uploadedBy: string | undefined
}

// output
export interface ITask {
    id: string,
    name: string,
    taskNumber: number,
    displayName: string,
    time: string,
    hour: string,
    frequency: string,
    otherFrequency: string | null,
    requiredNote: string,
    dueDate: string,
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
    }[],
    finishedDate: string,
    images: {
        id: string,
        nameImage: string,
        urlImage: string,
        uploadedDate: string,
        createdAt: string,
        updatedAt: string,
        uploadedBy: string
    }[]
}