import React, { useEffect } from 'react';

function ChangelogRedirect() {
    useEffect(() => {
        window.location.href = "https://temporal.io/change-log";
    }, []);

    return null;  // Return null since we don't need any actual rendering here.
}

export default ChangelogRedirect;