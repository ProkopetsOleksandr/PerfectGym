export function generateTemporaryId() : number {
    return new Date().getUTCMilliseconds();
}