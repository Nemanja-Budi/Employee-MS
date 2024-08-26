//PREGLEDANO OKE

export type CheckBoxFilter = {
    showName: string;
    name: string;
    chacked: boolean;
}

export type CommonFilter = {
    [key: string]: any;
    sortBy: string;
    isAscending: boolean;
    pageNumber: number;
    pageSize: number;
}

export type PdfType = {
    name: string, 
    url: string; 
}

export type Links = {
    linkName: string;
    linkRoute: string;
    imgName: string;
}  

export function getDefaultCheckBoxFilter(): CheckBoxFilter {
    return {
        showName: '',
        name: '',
        chacked: false
    };
}

export function getDefaultCommonFilter(sortBy: string, pageSize: number): CommonFilter {
    return {
        sortBy: sortBy,
        isAscending: true,
        pageNumber: 1,
        pageSize: pageSize
    };
}