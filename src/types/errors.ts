import { FormDataDeworming, FormDataInfoHealthPet, FormDataInfoPet, FormDataRegularVetCheckup, FormDataSpecialNutritionalPlan, FormDataVaccination } from "./pet";
import { FormDataTask } from "./task";
import { FormDataUser } from "./user";

// pets
export type FormErrorsInfoPet = {
    [K in keyof FormDataInfoPet]?: string
}

export type FormErrorsHealthPet = {
    [K in keyof FormDataInfoHealthPet]?: string
}

export type FormErrorsVaccination = {
    [K in keyof FormDataVaccination]?: string
}

export type FormErrorsDeworming = {
    [K in keyof FormDataDeworming]?: string
}

export type FormErrorsRegularVetCheckup = {
    [K in keyof FormDataRegularVetCheckup]?: string
}

export type FormErrorsSpecialNutritionalPlan = {
    [K in keyof FormDataSpecialNutritionalPlan]?: string
}

// tasks
export type FormErrorsTask = {
    [K in keyof FormDataTask]?: string
}

// users
export type FormErrorsUser = {
    [K in keyof FormDataUser]?: string
}