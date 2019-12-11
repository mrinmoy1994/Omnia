interface UrlContent{
    url : string;
    method : string;
}

export interface UrlConfiguration{
    GetApi: UrlContent;
    PutApi: UrlContent;
}