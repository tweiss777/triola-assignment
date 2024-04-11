import { createContext, useContext, useState } from "react";

interface ILoadingContext {
    loading: boolean;
    setLoading: Function
}

interface IProps {
    children: JSX.Element[] | JSX.Element;
}


const LoadingContext = createContext<ILoadingContext>({
    loading: false,
    setLoading: () => {},
});



export const useLoadingContext = () => useContext(LoadingContext);

export default function LoadingProvider(props: IProps){
    const [loading, setLoading] = useState<boolean>(false);
    


    return (
            <LoadingContext.Provider value={{loading: loading, setLoading: setLoading}}>
                { props.children }
            </LoadingContext.Provider>
    )

}




