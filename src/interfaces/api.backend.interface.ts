export type ApiBackendMetadata__pagination = {
    pageIndex: number
    pageSize: number
}

export type ApiBackendResponseMetadata<Data, Metadata> = {
    data: Data
    metadata: Metadata
}

export type ApiBackendParams<T> = {
    params: T
}