export type User = {
    id: string;
    nome: String;
    email: string;
    receberEmail: boolean;
};

export type userCreateResponse = {
    id: string;
};