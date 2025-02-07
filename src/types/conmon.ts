export type MetaProps ={
    page:number,
    limit:number,
    total:number
}

export type ResponseSuccessProps={
    data?:any;
    meta?:MetaProps
}

export type ResponseErrorProps={
    statusCode:number,
    message:string,
    errorMessages:ResponseErrorProps[]
}