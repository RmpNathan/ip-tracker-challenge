import React from 'react';
import './App.scss';
import IpAddress from "./components/ipAddress/IpAddress";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import {IpInformation} from "./models/IpInformation";
import LeafMap from "./components/map/LeafMap";

function App() {
    const baseUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_Z0NYbMaj5Pgf6Wmrj94wA6HmhvR41&ipAddress='
    const [ipAddress, setIpAddress] = React.useState("")
    const [ipAddressSearch, setIpAddressSearch] = React.useState("")
    const [ipAddressInformation, setIpAddressInformation] = React.useState<IpInformation>()
    const [isLoading, setIsLoading] = React.useState(false)
    const getIp = async () => {
        try {
            const response = await axios.get('https://api.ipify.org')
            setIpAddress(response.data)
            setIpAddressSearch(response.data)
        } catch (e) {
            console.log('Error : ', e)
        }
    }

    const getIpInformation = async (ip: String) => {
        try {
            if (ip) {
                setIsLoading(true)
                const responseInformation = await axios.get(`${baseUrl}${ip}`)
                setIpAddressInformation({
                    ip: responseInformation.data.ip,
                    isp: responseInformation.data.isp,
                    location: responseInformation.data.location
                })
            }
        } catch (e) {
            console.log('Error : ', e)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        if (!ipAddress) {
            void getIp()
        }
        if (ipAddress) {
            void getIpInformation(ipAddress)
        }
    }, [ipAddress]);



    return (
      <div className={'container'}>
          <IpAddress isLoading={isLoading} ipAddressSearch={ipAddressSearch} setIpAddressSearch={setIpAddressSearch} ipAddressInformation={ipAddressInformation} getIpInformation={getIpInformation}/>
          <LeafMap ipAddressInformation={ipAddressInformation}/>
      </div>
  );
}

export default App;
