import React, { useEffect } from "react";

export function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            console.log(document.cookie);
            window.close();
        }, 1000);
    }, []);

    return <div>Thanks for loggin in</div>;
}

