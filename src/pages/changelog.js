import React, { useEffect } from 'react';

function ChangelogRedirect() {

    useEffect(() => {
        window.location.href = "https://temporal.io/change-log";
    }, []);


    return null;
}

export default ChangelogRedirect;
