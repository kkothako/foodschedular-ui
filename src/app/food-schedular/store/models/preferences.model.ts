export interface PreferencesModel {
    cuisines: KeyValueModel[],
    protiens: KeyValueModel[],
    allergies: KeyValueModel[]
}

export interface KeyValueModel {
    name: string;
    code: string;
}
