import { useParams } from "react-router"

 function Video(){
    const params = useParams()

    console.log(params);
    
    return (
        <div>Video</div>
    )
 }

 export default Video