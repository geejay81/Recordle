export interface IAlbum {
    id: string,
    artist: string,
    albumTitle: string,
    embedKey: string,
    coverArt: string
};

export interface IApiResponse {
    result: IAlbum[]
};