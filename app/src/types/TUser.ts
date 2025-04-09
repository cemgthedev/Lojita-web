export type TGenders = 
    | {name: "Masculino"; value: "male"}
    | {name: "Feminino"; value: "female"}
    | {name: "Outro"; value: "other"}

export const Genders = {
    male: {name: "Masculino", value: "male"} as TGenders,
    female: {name: "Feminino", value: "female"} as TGenders,
    other: {name: "Outro", value: "other"} as TGenders
}

export type TGroupPermission = "admin" | "client";

export type TUser = {
    id?: string;
    avatarUrl?: string;
    name: string;
    document: string;
    age: number;
    gender: TGenders;
    phone: string;
    address: string;
    email: string;
    password: string;
    role: TGroupPermission;

    createdAt?: Date;
    updatedAt?: Date;
}