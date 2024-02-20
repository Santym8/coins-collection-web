export interface CoinFilters {
    search: string;
    found: ('found' | 'notFound')[];
    programs: string[];
}