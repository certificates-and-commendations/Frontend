import React from 'react';
import SidebarEditor from "./SidebarEditor/SidebarEditor";
import CertificateEditor from "./CertificateEditor/CertificateEditor";

function PageEditor(props) {
    return (
        <main className="main-content-editor">
            <SidebarEditor />
            <CertificateEditor />
        </main>
    );
}

export default PageEditor;
