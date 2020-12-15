export interface IHelp extends String {
    comment: (str: string) => IHelp;
    engine: () => IHelp;
    default: (str: string) => IHelp;
    defaultNow: () => IHelp;
    notNull: () => IHelp;
    increment: () => IHelp;
    bigIncrement: () => IHelp;
    int: () => IHelp;
    tinyint: () => IHelp;
    smallint: () => IHelp;
    mediumint: () => IHelp;
    bigint: () => IHelp;
    varchar: (len: number) => IHelp;
    now: () => IHelp;
    timestamp: () => IHelp;
    notExists: () => IHelp;
    createAt: () => IHelp;
    updateAt: () => IHelp;
    createAndUpdate: () => IHelp;
    primary: (key: string) => IHelp;
    unique: (...args: string[]) => IHelp;
    key: (...args: string[]) => IHelp;
}
export declare const sqlHelpKey: string;
export declare const help: IHelp;
