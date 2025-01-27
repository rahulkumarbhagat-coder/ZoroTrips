import axios from "axios"

export const getPlaceDetails = async(address) =>{
    const result = await axios.get(`https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${address}&key=${import.meta.env.VITE_GO_MAP_PRO_API}`, {headers:{
        'content-type' : 'application/json' 
    }})
    return result
}

export const PhotoRefUrl = 'https://maps.gomaps.pro/maps/api/place/photo?photo_reference={referenceId}&maxwidth=1000&key='+ import.meta.env.VITE_GO_MAP_PRO_API
