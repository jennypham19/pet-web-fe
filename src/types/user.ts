// Input
export interface FormDataAccount{
    name: string,
    account: string,
    password: string,
    role: string
}

// Body

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
}