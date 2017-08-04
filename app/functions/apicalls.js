const url = Constants.serviceUrl;
import Constants from '../constants'


export const getProjects = (result) => {
    fetch(url + 'projects', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            result=responseJson;
        })
        .catch((error) => {
            console.log(error + ' ' + 'getProjects Api Function');
        });
}