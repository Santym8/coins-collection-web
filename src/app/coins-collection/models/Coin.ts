export interface Coin {
    id: string;
    program: string;
    coinNumber: number;
    name: string;
    year: number;
    image: string;
    status?: boolean;
}