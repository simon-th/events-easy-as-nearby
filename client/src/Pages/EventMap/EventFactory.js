import axios from "axios";

export default async function makeEvents(url, targetArray){
    console.log('ACCESSED');
    console.log(url);
    await axios.get(url).then(
        function(response){
            console.log(response);
            response.data.results.forEach(element => {
                targetArray.push(
                    {
                        place: element,
                        addressName: null
                    }
                )
            });
            console.log(targetArray);
        }
    ).catch(error => {
        console.log(error);
        console.log('ERROR IN AXIOS');
    });
}