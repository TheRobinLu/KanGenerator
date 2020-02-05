export interface IAlert{
    title: string,
    message: string,
    style: string, // Information; Question; Warning; Error.
    btnOK: boolean,
    btnYes: boolean,
    btnNo: boolean,
    btnCancel: boolean
}
