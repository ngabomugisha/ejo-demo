import React, { useState } from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

function AG_TABLE(props) {
    const [rowData, setRowData] = useState(props.data);
    let table = null
    const loadTable = () => {
        return (<AgGridReact
        columnDefs={props.columns}
        rowData={rowData}
        rowSelection={'multiple'}
        onGridReady={onGridReady}
        defaultColDef={{flex: 1}}
    />)
    }
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

    const updateData = (data) => {
            setRowData(data);
        };
    }


const onExportClick=()=>{
    gridApi.exportDataAsExcel({allColumns: false});
  }

  const searchDivStyle={backgroundColor:"#dedede",padding:10, display: "flex"}
  const searchStyle={width:"100%",padding:"10px 20px",borderRadius:20,outline:0,
  border:"2px #1F72C6 solid",fontSize:"100%"}

  const onFilterTextChange=(e)=>{
    gridApi.setQuickFilter(e.target.value)
  }
  useEffect(() => {
    setRowData(props.data)
    console.log("NNNOOOOOWWWWWW:", rowData)
  }, [props.data])
  useEffect(() => {
       loadTable()
  },[])
    return (
        <div style={{ width: "100%", height: '100%' }}>
            <div style={{ height: '90%', boxSizing: 'border-box' }}>

      <div style={searchDivStyle}>
      <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="search ....."/>
      {/* <Button onClick={()=>onExportClick()}>export</Button> */}
      </div>
                <div
                    id="myGrid"
                    style={{
                        height: '100%',
                        width: "100%",
                    }}
                    className="ag-theme-alpine"
                >
                    {
                        loadTable()
                    }
                </div>
            </div>
        </div>
    )
}

export default AG_TABLE
