const getIconName = (icon: string) => {
    switch(icon){
        case '01d': 
            return 'sun'
        case '01n':
            return 'moon'
        case '02d': 
            return 'cloudy_d'
        case '02n': 
            return 'cloudy_n'
        case '03d':
        case '03n':  
            return 'cloud'
        case '04d':
        case '04n': 
            return 'broken_clouds'
        case '09d':
        case '09n':
        case '10d':
        case '10n': 
            return 'rain'
        case '11d':
        case '11n': 
            return 'storm'
        case '13d':
        case '13n': 
            return 'snow'
        case '50d':
        case '50n': 
            return 'mist'
        default:    
            return ''
    }
}

export default getIconName
