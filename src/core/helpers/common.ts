export function generateTemporaryId() : string {
    return 'temp-' + new Date().getUTCMilliseconds();
}