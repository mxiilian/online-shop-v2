export interface Reviews {
    id: number,
    productId: number,
    userId: number,
    userName: string,
    rating: number,
    title: string,
    comment: string,
    date: string,
    helpful: number,
    verified: boolean,
}
