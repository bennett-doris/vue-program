import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
    // 先访问本地存储中是否有uuid_token
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 如果没有，则生成uuid_token
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token
}