export type LocationFromIp = {
    country: string,
    region: string,
    timezone: string,
    city: string,
    lat: number,
    lng: number,
    geonameId: number,
    postalCode: string,
}
export type IpInformation = {
    ip: string,
    isp: string,
    location: LocationFromIp
}
