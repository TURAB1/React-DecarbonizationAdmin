
import React, {useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../../../components/Select/Select';
import Button from "../../../../components/Button/Button";
import InputSearch from "../../../../components/InputSearch/InputSearch";

import useHeaderStore from '../../../../store/useHeaderStore';
import AUIGrid from '../../../../static/AUIGrid-React/AUIGridReact';
import styles from "../../KrpUserList/krp_user_list.module.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

const UserAddForm = () => {
    const handleClick = () => {
        alert("테스트")
    }
    
        const [selectedOption, setSelectedOption] = useState("");
    
        const handleSelctChange = (event) => {
            setSelectedOption(event.target.value);
        };
    
        const options = [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ];
    const { setHeaderShow } = useHeaderStore();
    const navigate=useNavigate()
    const goBack=()=>{
      navigate("/pilot/krpRegistrationEdit/krpRegistrationEdit");
    }

    // 그리드 객체
    const myGrid = useRef();

    // 그리드 name 에 정의할 고유값
    const uid = useId();

    // 그리드 칼럼 레이아웃 정의
    const columnLayout= [

   
      {
          dataField: 'ShipTypes',
          headerText: 'Ship types',
        
      }
  ];

    // 그리드 속성 정의
    const gridProps = {
      width: 200,
      height: 200,
      editable:true,
      showRowNumColumn: false,
      showRowCheckColumn:false,

      // 행 높이 설정
      rowHeight: 32,
      headerHeight: 60,
      noDataMessage: '출력할 데이터가 없습니다.',

  
    };

    useEffect(() => {
      console.log('SampleDefault 마운트됨');

      // 최초 마운팅 될 때 그리드 이벤트 세팅
      setupGridEvents();

      // 최초 마운팅 될 때 그리드 데이터 조회시키기
      requestGridData();

      setHeaderShow(false);

      return () => {
        console.log('SampleDefault 언마운트됨');
      };
    }, [setHeaderShow]);

    // 그리드 이벤트 세팅
    const setupGridEvents = () => {
      const grid = myGrid.current;
      // 그리드 이벤트 바인딩
      grid.bind(['cellClick', 'selectionChange', 'headerClick'], (event) => {
        console.log(event.type);
      });
    };

    // const totalItems = 50;
    // const itemsPerPage = 10;
  
    // const handlePageChange = (page) => {
    //   console.log(`현재 페이지: ${page}`);
    // };
  

    // 그리드 데이터 조회하여 삽입
    const requestGridData = () => {
      const grid = myGrid.current;
      const data = [

        {"ShipTypes": "Measures1"},
        {"ShipTypes": "Measures2"}

  ];

      grid.showAjaxLoader();
      grid.setGridData(data);
      grid.removeAjaxLoader();


    };

    return (
        <section className="sample">
     
        <div className='grid__blue'>
          <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <div className=''>
        <Button children="+" variant="blue" size="medium" />
       </div>

        </section>
    );
  };
  
  export default UserAddForm;
  