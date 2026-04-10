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

export const ActiveUser = {
    ACTIVE: 1,
    UNACTIVE: -1
};

export type ActiveUser = typeof ActiveUser[keyof typeof ActiveUser];

export const ACTIVE_LABELS: { [key in ActiveUser]: string } = {
    [ActiveUser.ACTIVE]: "Active",
    [ActiveUser.UNACTIVE]: "Inactive",

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

export const TimeTaks = {
    MORING: 'morining',
    MOONTIME: 'moontime',
    AFTERNOON: 'afternoon',
    EVENING: 'evening'
}

export type TimeTaks = typeof TimeTaks[keyof typeof TimeTaks];

export const TIME_TASK_LABELS: { [key in TimeTaks]: string } = {
    [TimeTaks.MORING]: 'Buổi sáng',
    [TimeTaks.MOONTIME]: 'Buổi trưa',
    [TimeTaks.AFTERNOON]: 'Buổi chiều',
    [TimeTaks.EVENING]: 'Buổi tối'
}

export const FrequencyTask = {
    EVERYDAY: 'everyday',
    ONE_TIME_DAY: 'one_time_day',
    TWO_TIMES_DAY: 'two_times_day',
    THREE_TIMES_DAY: 'three_times_day',
    EVERYWEEK: 'everyweek',
    ONE_TIME_WEEK: 'one_time_week',
    TWO_TIMES_WEEK: 'two_times_week',
    THREE_TIMES_WEEK: 'three_times_week',
    EVERYMONTH: 'everymonth',
    OTHERS: 'others',
}

export type FrequencyTask = typeof FrequencyTask[keyof typeof FrequencyTask];

export const FREQUENCY_TASK_LABELS: { [key in FrequencyTask]: string } = {
    [FrequencyTask.EVERYDAY]: 'Hằng ngày',
    [FrequencyTask.ONE_TIME_DAY]: '1 lần/ngày',
    [FrequencyTask.TWO_TIMES_DAY]: '2 lần/ngày',
    [FrequencyTask.THREE_TIMES_DAY]: '3 lần/ngày',
    [FrequencyTask.EVERYWEEK]: 'Hằng tuần',
    [FrequencyTask.ONE_TIME_WEEK]: '1 lần/tuần',
    [FrequencyTask.TWO_TIMES_WEEK]: '2 lần/tuần',
    [FrequencyTask.THREE_TIMES_WEEK]: '3 lần/tuần',
    [FrequencyTask.EVERYMONTH]: 'Hằng tháng',
    [FrequencyTask.OTHERS]: 'Khác',
}