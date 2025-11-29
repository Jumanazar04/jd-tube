import { useParams } from "react-router"


function Channal() {
    const params = useParams()
    console.log(params);
    

    return (
        <div>Chanal</div>
    )
}

export default Channal