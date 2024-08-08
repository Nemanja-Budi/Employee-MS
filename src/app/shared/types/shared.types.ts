export type CheckBoxFilter = {
    showName: string;
    name: string;
    chacked: boolean;
}

export function getDefaultCheckBoxFilter(): CheckBoxFilter {
    return {
        showName: '',
        name: '',
        chacked: false
    };
}