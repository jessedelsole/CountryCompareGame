
export default function getAvatar(id) {

    switch (id) {

        case 1: return avatars.avatar1;
        case 2: return avatars.avatar2;
        case 3: return avatars.avatar3;
        case 4: return avatars.avatar4;
        case 5: return avatars.avatar5;
        case 6: return avatars.avatar6;
    }

}


const avatars ={
  
    
    avatar1: require('./../../../assets/avatars/avatar1.png'),
    avatar2: require('./../../../assets/avatars/avatar2.png'),
    avatar3: require('./../../../assets/avatars/avatar3.png'),
    avatar4: require('./../../../assets/avatars/avatar4.png'),
    avatar5: require('./../../../assets/avatars/avatar5.png'),
    avatar6: require('./../../../assets/avatars/avatar6.png'),    

}