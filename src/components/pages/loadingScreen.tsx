import MoonLoader from "react-spinners/MoonLoader"

const LoadingScreen = () => {
    return (
        <> 
            <div className="flex justify-center h-screen flex-col items-center">
                <MoonLoader /> 
            </div>
        </>
    )
}

export default LoadingScreen