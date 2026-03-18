export const RoleUser = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    MOD: 'mod',
    SPECIALIST: 'specialist',
};

export type RoleUser = typeof RoleUser[keyof typeof RoleUser];

export const ROLE_LABELS: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'Quản lý cấp cao',
    [RoleUser.EMPLOYEE]: 'Nhân viên',
    [RoleUser.MOD]: 'Quản lý',
    [RoleUser.SPECIALIST]: 'Chuyên viên',

}

export const GenderUser = {
    FEMALE: 'female',
    MALE: 'male'
};

export type GenderUser = typeof GenderUser[keyof typeof GenderUser];

export const GENDER_LABELS: { [key in GenderUser]: string } = {
    [GenderUser.FEMALE]: 'Nữ giới',
    [GenderUser.MALE]: 'Nam giới',

}

// Pets
export const GenderPet = {
    FEMALE: 'female',
    MALE: 'male'
};

export type GenderPet = typeof GenderPet[keyof typeof GenderPet];

export const GENDER_PET_LABELS: { [key in GenderPet]: string } = {
    [GenderPet.FEMALE]: 'Cái',
    [GenderPet.MALE]: 'Đực',

}

export const TypePet = {
    DOG: 'dog',
    CAT: 'cat'
};

export type TypePet = typeof TypePet[keyof typeof TypePet];

export const TYPE_PET_LABELS: { [key in TypePet]: string } = {
    [TypePet.DOG]: 'Chó',
    [TypePet.CAT]: 'Mèo',

}

export const SpeciesPet = {
    POODLE: 'poodle',
};

export type SpeciesPet = typeof SpeciesPet[keyof typeof SpeciesPet];

export const SPECIES_PET_LABELS: { [key in SpeciesPet]: string } = {
    [SpeciesPet.POODLE]: 'Poodle',

}

// Task
export const StatusTask = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
};

export type StatusTask = typeof StatusTask[keyof typeof StatusTask];

export const STATUS_TASK_LABELS: { [key in StatusTask]: string } = {
    [StatusTask.PENDING]: 'Chưa hoạt động',
    [StatusTask.IN_PROGRESS]: 'Đang hoạt động',
    [StatusTask.COMPLETED]: 'Hoàn thành'
}