export function createResponseObject(): {
    error: any;
    result: any;
    isSuccess: boolean;
    statusCode: number;
} {
    return {
        error: null,
        result: null,
        isSuccess: true,
        statusCode: 200,
    };
}
