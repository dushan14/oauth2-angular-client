export class ResponseWrapper<T> {
    status: Status;
    pageData: PageData;
    data: [T]

    static getFirstData(response:ResponseWrapper<any>) {
        if (response.data && response.data[0]) {
            return response.data[0]
        } else {
            return null;
        }
    }
}

export class Status {
    code: number
    message: string
}

export class PageData {
    count: number
    total: number
}

