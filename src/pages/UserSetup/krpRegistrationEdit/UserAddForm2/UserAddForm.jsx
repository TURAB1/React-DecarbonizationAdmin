
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
        dataField: 'id',
        headerText: "User.ID",
    
  
    },
    {
        dataField: 'crm',
        headerText: 'CRM',
      
    },
      {
          dataField: 'email',
          headerText: "KRP"+'<br>'+"e-Mail",
      
    
      },
      {
          dataField: 'company',
          headerText: 'Company',
        
      },
      {
          dataField: 'department',
          headerText: 'Department',
         
      },
      {
          dataField: 'expire_date',
          headerText: 'Expire Date',
          
      },

      {
          dataField: 'remark',
          headerText: 'Remark',
         
      },
      {
          dataField: 'admin',
          headerText: "KRP"+'<br>'+"관리자계정여부",
       
      }
  ];

    // 그리드 속성 정의
    const gridProps = {
      width: '100%',
      height: 110,
      editable:true,
      showRowNumColumn: true,
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
      const data = [{
        "id": "",
        "crm": " ",
        "email": " ",
        "company": " ",
        "department": " ",
        "expire_date": " ",
        "remark": " ",
        "admin": " ",
    }];

      grid.showAjaxLoader();
      grid.setGridData(data);
      grid.removeAjaxLoader();


    };

    return (
        <section className="sample">
     
        <div className='grid__blue'>
          <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <div className='grayBox'>
                <div className='grayBox__line'>
                    <div className='grayBox__inner'>
                        <div className='grayBox__box'>

                            {/* <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Auth Types" size="110px"/> */}
                        </div>
                        <div className='grayBox__box'>
                            {/* <div className='grayBox__tit'>Search</div>
                        <InputSearch placeholder="" size="160px"/> */}
                        </div>

                    </div>
                    <div className='grayBox__btn'>
                        <Button children="CANCEL" onClick={goBack} variant="blue" size="medium" />
                        <Button children="SAVE" onClick={handleClick} variant="blue" size="medium" />
                        <Button children="SAVE & SEND EMAIL" onClick={handleClick} variant="blue" size="medium" />
                    </div>


                </div>
            </div>

        </section>
    );
  };
  
  export default UserAddForm;
  