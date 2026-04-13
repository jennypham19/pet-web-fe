import { GENDER_LABELS, GENDER_PET_LABELS, GenderPet, GenderUser, ROLE_LABELS, RoleUser, SPECIES_PET_LABELS, SpeciesPet, TYPE_PET_LABELS, TypePet, StatusTask, STATUS_TASK_LABELS, TimeTaks, TIME_TASK_LABELS, FrequencyTask, FREQUENCY_TASK_LABELS, ActiveUser, ACTIVE_LABELS, FrequencyPet, FREQUENCY_PET_LABELS } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getRenderLabel = (gender: GenderUser | null | undefined) : string => {
    if(!gender) return "";
    return GENDER_LABELS[gender] || gender;
}

export const getActiveLabel = (active: ActiveUser | null | undefined | number) : string => {
    if(!active) return '';
    return ACTIVE_LABELS[active] ;
}

export const getActiveAccountColor = (active: number) => {
  switch (active) {
    case -1:
      return { color: 'error' as const };
    case 1:
    default:
      return { color: 'success' as const };
  }
};

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

export const getFrequencyPetLabel = (frequency: FrequencyPet | null | undefined) : string => {
    if(!frequency) return "Chưa xác định";
    return FREQUENCY_PET_LABELS[frequency] || frequency;
}

// Task
export const getStatusTaskLabel = (status: StatusTask | null | undefined) : string => {
    if(!status) return "Chưa xác định";
    return STATUS_TASK_LABELS[status] || status;
}

export const getStatusTaskColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return { color: 'success' as const };
    case 'in_progress':
      return { color: 'warning' as const };
    case 'pending':
    default:
      return { color: 'error' as const };
  }
};

export const getTimeTaskLabel = (time: TimeTaks | null | undefined) : string => {
    if(!time) return "Chưa xác định";
    return TIME_TASK_LABELS[time] || time;
}

export const getFrequencyTaskLabel = (frequency: FrequencyTask | null | undefined) : string => {
    if(!frequency) return "Chưa xác định";
    return FREQUENCY_TASK_LABELS[frequency] || frequency;
}