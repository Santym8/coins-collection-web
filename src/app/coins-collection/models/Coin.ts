export interface Coin {
    _id: string;
    program: string;
    coinNumber: number;
    name: string;
    year: number;
    image: string;
    found?: boolean;
}