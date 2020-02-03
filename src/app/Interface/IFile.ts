export interface IFile{
    fileName: string,
    fileOrPath: string,
    destination: string,
    applyTo: string, //Server/Workstation/Both
    fileType: string,
    selected: boolean
}
