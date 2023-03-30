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

    const getIpInformation = async () => {
        try {
            if (ipAddressSearch) {
                setIsLoading(true)
                const responseInformation = await axios.get(`${baseUrl}${ipAddressSearch}`)
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
            void getIpInformation()
        }
        // need to disable this warning because getIpInformation is call only one time when ipAddress is set, after getIpInformation is call when user press enter on search input or click on search button
        // eslint-disable-next-line
    }, [ipAddress]);



    return (
      <div className={'container'}>
          <IpAddress isLoading={isLoading} ipAddressSearch={ipAddressSearch} setIpAddressSearch={setIpAddressSearch} ipAddressInformation={ipAddressInformation} getIpInformation={getIpInformation}/>
          <LeafMap ipAddressInformation={ipAddressInformation}/>
      </div>
  );
}

export default App;
