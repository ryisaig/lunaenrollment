import getRandomString from "./RandomString";

export default function GenericRequest(){
    const data = {
        requestId: getRandomString(), //TO DO Get from UUID + Username
        sessionId: 'dshjr3y84y389dwjndssnasahshheb',
        sessionValue: 'dshjr3y84y389dwjndssnasahshheb',
        username: 'enrollment-portal', // TO DO Get from browser session
        clientIp: 'test', // TO DO Get from browser session
        application: 'ENROLLMENT_PORTAL'
    }
    return data;
}