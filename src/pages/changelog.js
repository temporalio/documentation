import React, { useEffect } from 'react';

function ChangelogRedirect() {
    if (typeof window !== 'undefined') {
        useEffect(() => {
            window.location.href = "https://temporal.io/change-log";
        }, []);
    }

    return null;
}

export default ChangelogRedirect;
