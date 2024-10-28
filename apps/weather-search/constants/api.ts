export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const API_RESPONSES: { [key: number]: string } = {
    400: "Unfortunately we do not have information for that place.",
    404: "Unfortunately we do not have information for that place.",
    401: "You are not an authorized user for this request.",
    429: "The searching quota for your user was exceeded.",
    5: "Internal error. Please contact us, let us analyze it and find a solution for you promptly.",
    0: "An unknown error occurred.",
}