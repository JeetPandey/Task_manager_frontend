import api from "../api/axios";

function ExportButtons() {

    const exportPDF = async () => {

        try {

            const response =
                await api.get(
                    "export/pdf/",
                    {
                        responseType:
                            "blob"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob(
                        [response.data]
                    )
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =
                "tasks.pdf";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert(
                "PDF export failed"
            );
        }
    };

    const exportExcel = async () => {

        try {

            const response =
                await api.get(
                    "export/excel/",
                    {
                        responseType:   
                            "blob"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob(
                        [response.data]
                    )
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =
                "tasks.xlsx";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert(
                "Excel export failed"
            );
        }
    };

    return (

        <div className="d-flex gap-2">

            <button
                className="btn btn-danger"
                onClick={exportPDF}
            >
                Export PDF
            </button>

            <button
                className="btn btn-success"
                onClick={exportExcel}
            >
                Export Excel
            </button>

        </div>
    );
}

export default ExportButtons;   