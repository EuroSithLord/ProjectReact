import axios from 'axios';

export const getUserList = (onSucceedUsers) => {
    
    axios.get("api/users/getusers")
        .then((response) => {
            console.log(response.data);
            onSucceedUsers(response);
        })
}