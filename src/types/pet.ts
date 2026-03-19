import { Dayjs } from "dayjs"

// input
export interface FormDataInfoPet{
    avartar: File | null,
    name: string,
    sex: string,
    dob: string,
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

// output