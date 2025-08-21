export const linkData = [
    {
        value: "Mobil",
        contactType: "phone"
    },
    {
        value: "Whatsapp",
        contactType: "whatsapp"
    },
    {
        value: "Mail",
        contactType: "email"
    },
    {
        value: "Konum",
        contactType: "location"
    },
    {
        value: "Fax",
        contactType: "fax"
    }
];

export const generateMessage = (error,frontMessage) => {
    return error?.response?.data?.message || `[${frontMessage}] Beklenmeyen Bir Hata Oluştu`
}