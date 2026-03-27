import { Dayjs } from "dayjs"

// input
export interface FormDataInfoPet{
    avartar: File | null,
    name: string,
    sex: string,
    dob: Dayjs | null,
    species: string,
    type: string,
    breedingStatus: string 
}

export interface FormDataInfoHealthPet{
    clinicName: string,
    address: string,
    phone: string,
    attendingVet: string
}

export interface FormDataVaccination{
    medicationName: string,
    firstDoseDate: Dayjs | null,
    boosterDate: Dayjs | null,
    adverseReaction: string
}

export interface FormDataDeworming{
    medicationName: string,
    dosage: string,
    dewormingDate: Dayjs | null,
    nextDewormingDate: Dayjs | null
}

export interface FormDataRegularVetCheckup{
    examinationDate: Dayjs | null,
    recheckDate: Dayjs | null,
    healthCondition: string,
    conclusion: string
}

export interface FormDataSpecialNutritionalPlan{
    food: string,
    amount: string,
    frequency: string,
    nutritionalSupplements: string
}

// body

export interface PayloadPet{
    pet: {
        name: string,
        sex: string,
        dob: Dayjs | null,
        species: string,
        type: string,
        breedingStatus: string,
        nameAvatar: string,
        urlAvatar: string 
    },
    health: {
        clinicName: string,
        address: string,
        phone: string,
        attendingVet: string
    },
    vaccination: {
        medicationNameVac: string,
        firstDoseDate: Dayjs | null,
        boosterDate: Dayjs | null,
        adverseReaction: string
    },
    deworming: {
        medicationName: string,
        dosage: string,
        dewormingDate: Dayjs | null,
        nextDewormingDate: Dayjs | null
    },
    checkup: {
        examinationDate: Dayjs | null,
        recheckDate: Dayjs | null,
        healthCondition: string,
        conclusion: string
    } | {},
    nutrition: {
        food: string,
        amount: string,
        frequency: string,
        nutritionalSupplements: string
    } | {},
    images: {
        nameImage: string,
        urlImage: string
    }[]
}

// output

export interface IPet{
    id: string,
    name: string,
    sex: string,
    dob: string,
    species: string,
    type: string,
    breedingStatus: string,
    createdAt: string,
    updatedAt: string,
    nameAvatar: string,
    urlAvatar: string,
    petHealth: {
        id: string,
        clinicName: string,
        address: string,
        phone: string,
        attendingVet: string,
        createdAt: string,
        updatedAt: string
    },
    petVaccination: {
        id: string,
        medicationName: string,
        firstDoseDate: string,
        boosterDate: string,
        adverseReaction: string,
        createdAt: string,
        updatedAt: string
    },
    petDeworming: {
        id: string,
        medicationName: string,
        dosage: string,
        dewormingDate: string,
        nextDewormingDate: string,
        createdAt: string,
        updatedAt: string
    },
    petRegularVetCheckup: {
        id: string,
        examinationDate: string,
        recheckDate: string,
        healthCondition: string,
        conclusion: string,
        createdAt: string,
        updatedAt: string
    },
    petSpecialNutritionalPlan: {
        id: string,
        food: string,
        amount: string,
        frequency: string,
        nutritionalSupplements: string,
        createdAt: string,
        updatedAt: string
    },
    petImages:{
        id: string,
        nameImage: string,
        urlImage: string,
        createdAt: string,
        updatedAt: string
    }[]
}