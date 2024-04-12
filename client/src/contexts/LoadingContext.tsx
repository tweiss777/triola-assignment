import { createContext,  useState } from "react";

interface ILoadingContext {
    loading: boolean;
    setLoading: Function
}

interface IProps {
    children: JSX.Element[] | JSX.Element;
}


export const LoadingContext = createContext<ILoadingContext>({
    loading: false,
    setLoading: () => {},
});




export default function LoadingProvider(props: IProps){
    const [loading, setLoading] = useState<boolean>(false);
    


    return (
            <LoadingContext.Provider value={{loading: loading, setLoading: setLoading}}>
                { props.children }
            </LoadingContext.Provider>
    )

}




