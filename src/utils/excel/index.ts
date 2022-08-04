import * as XLSX from 'xlsx'

export interface IExcelParams {
    data: Array< Object >,
    fileName: string,
    keys: Array<string>,
    autoWidth?: boolean,
}

export const export_json_to_sheet = ( {
    data , 
    fileName,
    keys,
}: IExcelParams ) => {
    const wb = XLSX.utils.book_new();
    const option = {
        header: keys,
    }
    const ws = XLSX.utils.json_to_sheet( data , option );
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}
