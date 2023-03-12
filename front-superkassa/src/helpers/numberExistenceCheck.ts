interface IMessages {
    code: string;
    phone: string;
}

export function numberExistenceCheck(messages: IMessages[], code: string, phone: string): boolean {
    return messages.find(item => item['phone'] === phone && item['code'] === code)
        ? true
        : false
} 