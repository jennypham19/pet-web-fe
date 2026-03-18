import { GENDER_LABELS, GENDER_PET_LABELS, GenderPet, GenderUser, ROLE_LABELS, RoleUser, SPECIES_PET_LABELS, SpeciesPet, TYPE_PET_LABELS, TypePet, StatusTask, STATUS_TASK_LABELS } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getRenderLabel = (gender: GenderUser | null | undefined) : string => {
    if(!gender) return "Chưa xác định";
    return GENDER_LABELS[gender] || gender;
}

// Pets
export const getGenderPetLabel = (gender: GenderPet | null | undefined) : string => {
    if(!gender) return "Chưa xác định";
    return GENDER_PET_LABELS[gender] || gender;
}

export const getTypePetLabel = (type: TypePet | null | undefined) : string => {
    if(!type) return "Chưa xác định";
    return TYPE_PET_LABELS[type] || type;
}

export const getSpeciesPetLabel = (species: SpeciesPet | null | undefined) : string => {
    if(!species) return "Chưa xác định";
    return SPECIES_PET_LABELS[species] || species;
}

// Task
export const getStatusTaskLabel = (status: StatusTask | null | undefined) : string => {
    if(!status) return "Chưa xác định";
    return STATUS_TASK_LABELS[status] || status;
}