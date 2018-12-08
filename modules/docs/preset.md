#### PresetModule
This module contains preseted or defaulted settings and configurations.

``` typescript

/** Returns all the LGA's in Nigeria  **/
app.execute(PresetAction.Lga): Promise<string[]>;

/** Returns all the states in Nigeria **/
app.execute(PresetAction.State): Promise<string[]>;

/** Returns all the School Categories available **/
app.execute(PresetAction.SchoolCategories): Promise<string[]>;

/** cleans the school presets information to a nice JSON **/
app.execute(PresetAction.SchoolPreset): Promise<SchoolDict>;

```
