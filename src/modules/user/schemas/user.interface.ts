
export interface User {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    age: number,
    roles: Array<string>,
    passwordHash: string,
    password?: string
}