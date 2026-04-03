import { Dayjs } from "dayjs"

// Input
export interface FormDataAccount{
    name: string,
    account: string,
    password: string,
    role: string
}

export interface FormDataUser{
    avatar: File | null,
    name: string,
    gender: string | null,
    dob: Dayjs | null,
    cccd: string,
    position: string,
    title: string,
    professionalBiography: string,
    email: string,
    phone: string,
    address: string
}

// Body
export interface PayloadUser{
    avatarUrl: string,
    name: string,
    gender: string | null,
    dob: Dayjs | null,
    cccd: string | null,
    position: string | null,
    title: string | null,
    professionalBiography: string | null,
    email: string | null,
    phone: string | null,
    address: string | null
}

//Output
export interface IUser{
    id: string,
    name: string,
    account: string
    password: string,
    gender: string,
    position: string,
    title: string,
    dob: string,
    cccd: string,
    email: string,
    phone: string,
    address: string,
    isActived: number,
    isDefaultType: number,
    isReset: boolean,
    isDeleted: number,
    avatarUrl: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    professionalBiography: string
}