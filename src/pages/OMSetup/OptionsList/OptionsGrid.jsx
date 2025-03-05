
import React, { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../../components/Button/Button";
import useHeaderStore from '../../../store/useHeaderStore';
import useOMSetupstore from '../../../store/useOMSetupStore';
import AUIGrid from '../../../static/AUIGrid-React/AUIGridReact';
import styles from "./options_list.module.scss"


const OptionsGrid = ({optionNumber}) => {
  const option=useOMSetupstore((state)=>(state.option));
  const addOption=useOMSetupstore((state)=>(state.addOption));
  const deleteOption=useOMSetupstore((state)=>(state.deleteOption));

  // const rowsData=useOMSetupstore((state)=>(state.rowsData));
  // const addRows=useOMSetupstore((state)=>(state.addRows));
  // const deleteRow=useOMSetupstore((state)=>(state.deleteRow));
  
  ///local
  const[rowsData,setRowsData]=useState( [
    { "ShipTypes": "Measures1" },
    { "ShipTypes": "Measures2" }
   ])
  const addRows=()=>{
    setRowsData((rowsData)=>([...rowsData,{ "ShipTypes": "Measures3" }]))
    console.log("rows:"+JSON.stringify(rowsData))
  }

  const { setHeaderShow } = useHeaderStore();
  const $ag = window.AUIGrid;
  window.$agOptionsRenderer = {

    rowDelete: (rowIndex, event) => {
      alert('rowIndex : ' + rowIndex + ' deleted');
      //deleteRow(rowIndex);
      rowsData.splice(rowIndex,1)

    },

    // 셀렉트 변경 핸들러
  optionsSelectChangeHandler: (rowIndex, selectedValue, event) => {
      const myGridID = '#aui-grid-wrap-RendererTemplate';
      // 그리드에 실제 업데이트 적용 시킴
      $ag.updateRow(
        myGridID,
        {
          code: selectedValue
        },
        rowIndex
      );
      alert(selectedValue +" selected");
    },

    // 체크박스 그룹 클릭 핸들러
    myCheckClick: (rowIndex, event) => {

    }
  };
 

  const mySelectList = [
    { value: '001', text: 'Not Fuel' },
    { value: '002', text: 'Input Measure name' },

  ];
  


  const myGrid = useRef();

  const uid = useId();
  const columnLayout = [
    {
      dataField: 'ShipTypes',
      headerText: 'Ship types',
      renderer: {
        type: 'TemplateRenderer'
      },
      labelFunction: (rowIndex, columnIndex, value, headerText, item) => {
        if (rowIndex < 3) {
          let template = `<div class=${styles.my_div}>`;
          template += `<span class="${styles.my_div_text_box}">` + value + '</span>';
          template += `<span class="${styles.my_div_delete_row}" onclick="javascript:$agOptionsRenderer.rowDelete(' + ${rowIndex} + ', event);">X</span>`;
          template += '</div>';
          return template;
        } else {
          let template = `<div class=${styles.my_div}>`; 
          // template += '<span class="my_div_code_span">' + value + '</span>';
          template += `<select class="${styles.my_div_select_box}" onchange="javascript:$agOptionsRenderer.optionsSelectChangeHandler(' +${rowIndex }+ ', this.value, event);">`;

          mySelectList.forEach((element) => {
            const code = element['value'];
            const text = element['text'];
            if (code === value) {
              template += '<option value="' + code + '" selected="selected">' + text + '</option>';
            } else {
              template += '<option value="' + code + '">' + text + '</option>';
            }
          });
          template += '</select>';
          template += '</div>';
          return template;
        }

      }

    }
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: 200,
    height: 200,
    editable: true,
    showRowNumColumn: false,
    showRowCheckColumn: false,

    // 행 높이 설정
    rowHeight: 32,
    headerHeight: 60,
    noDataMessage: 'No data',


  };

  useEffect(() => {
    console.log('SampleDefault 마운트됨');
    setupGridEvents();
    requestGridData();
    setHeaderShow(false);
   console.log("rows:"+ JSON.stringify(rowsData))
    return () => {
      console.log('SampleDefault 언마운트됨');
    };
  }, [setHeaderShow, option,rowsData]);

  const setupGridEvents = () => {
    const grid = myGrid.current;
    grid.bind(['cellClick', 'selectionChange', 'headerClick'], (event) => {
      console.log(event.type);
    });
  };


  const requestGridData = () => {
    const grid = myGrid.current;
    grid.showAjaxLoader();
    grid.setGridData(rowsData);
    grid.removeAjaxLoader();
  };




  return (
    <section style={{ marginTop: 40, marginRight: 20 }}>
      <div className={styles.optionsHeader} >
        <button className={styles.optionsDeleteBtn} onClick={()=>deleteOption(0)}>x</button>
        <h3>Options {optionNumber}</h3>

      </div>
      <div className='grid__blue'>
        <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
      </div>
      <div className={styles.addRowBtn}>
        <Button onClick={addRows} children="+" variant="blue" size="medium" />
      </div>

    </section>
  );
};

export default OptionsGrid;
