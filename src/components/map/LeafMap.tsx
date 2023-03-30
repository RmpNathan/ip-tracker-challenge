import React from "react";
import {IpInformation} from "../../models/IpInformation";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
type Props = {
    ipAddressInformation: IpInformation | undefined
}
export default function LeafMap ({ipAddressInformation}:Props) {
    type Coord = {
        lat: number,
        lng: number
    }
    React.useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    function SetViewOnClick({lat, lng}: Coord) {
        const map = useMap();
        map.setView([lat, lng], map.getZoom());

        return null;
    }

    return (
        <div className={'box map-content'}>
            {
                ipAddressInformation &&
              <MapContainer
                className={'map'}
                center={[ipAddressInformation.location.lat, ipAddressInformation.location.lng]}
                zoom={13}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetViewOnClick lat={ipAddressInformation.location.lat} lng={ipAddressInformation.location.lng} />
                <Marker position={[ipAddressInformation.location.lat, ipAddressInformation.location.lng]}/>
              </MapContainer>
            }
        </div>
    );
}
