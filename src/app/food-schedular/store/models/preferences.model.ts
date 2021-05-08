export interface PreferencesModel {
  cuisines: KeyValueModel[];
  proteins: KeyValueModel[];
  allergys: KeyValueModel[];
  userId: string;
  profileId: string;
}

export interface KeyValueModel {
  name: string;
  code: string;
  _id: string;
}
