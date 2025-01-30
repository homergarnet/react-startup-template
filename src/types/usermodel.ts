export interface UserModel {
    Id: string;
    UserEmailAdd: string;
    Profile: string;
    CreatedBy: string;
    LastLoginDateTime: string;
    LastModifiedDateTime: string;

}

export interface Login {
    UserEmailAdd: string;
    Password: string;
}