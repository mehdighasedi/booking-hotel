import { useEffect } from "react";

function useTitle(title) {
    return (
        useEffect(() => { document.title = title })
    )
}

export default useTitle;