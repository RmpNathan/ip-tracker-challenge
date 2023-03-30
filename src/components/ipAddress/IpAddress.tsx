import React from "react";
import {IpInformation} from "../../models/IpInformation";
type Props = {
    ipAddressSearch: string,
    setIpAddressSearch: React.Dispatch<React.SetStateAction<string>>,
    ipAddressInformation: IpInformation | undefined,
    getIpInformation: () => void,
    isLoading: boolean
}
export default function IpAddress ({ipAddressSearch, setIpAddressSearch, ipAddressInformation, getIpInformation, isLoading}:Props) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIpAddressSearch(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter'){
            getIpInformation()
            console.log('ipAddressInformation : ', ipAddressInformation)
        }
    }

    return (
        <div className={'box data-content'}>
            <h1>IP Adress Tracker</h1>
            <div className={'input-contenaire'}>
                <input className={'ip-address-input'} type="text" defaultValue={ipAddressSearch} onChange={handleInputChange} onKeyUp={handleKeyPress} />
                <button className='btn-search-ip' onClick={getIpInformation}>
                    <div className={`${isLoading ? 'loader' : ''}`}>{`${isLoading ? '' : '>'}`}</div>
                </button>
            </div>
            { ipAddressInformation &&
                <div className={'ip-address-data'}>
                    <div className={'component-info'}>
                        <h6>IP ADDRESS</h6>
                        <p>{ipAddressInformation.ip}</p>
                    </div>
                    <div className={'component-info'}>
                        <h6>LOCATION</h6>
                        <p>{ipAddressInformation.location.region}</p>
                    </div>
                    <div className={'component-info'}>
                        <h6>TIMEZONE</h6>
                        <p>{ipAddressInformation.location.timezone}</p>
                    </div>
                    <div className={'component-info'}>
                        <h6>ISP</h6>
                        <p>{ipAddressInformation.isp}</p>
                    </div>
                </div>
            }
        </div>
    );
}
