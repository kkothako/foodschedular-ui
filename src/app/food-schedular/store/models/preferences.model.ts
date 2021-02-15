export interface PreferencesModel{
cusinses:KeyValueModel[],
protien: KeyValueModel[],
allergy: KeyValueModel[]
}

export interface KeyValueModel{
    name: string;
    code:string;
}
