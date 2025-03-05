
import React, { useState, useEffect, useRef, useId } from 'react';
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import InputSearch from "../../../components/InputSearch/InputSearch";

import useHeaderStore from '../../../store/useHeaderStore';
import AUIGrid from '../../../static/AUIGrid-React/AUIGridReact';
import styles from "./krp_user_list.module.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

const KrpUserList = () => {
  const handleClick = () => {
    alert("테스트")
  }

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelctChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: "option1", label: "Auth.Email" },
    { value: "option2", label: "Auth.types" },
    { value: "option3", label: "Auth.Timestamp" },
  ];
  const { setHeaderShow } = useHeaderStore();

  // 그리드 객체
  const myGrid = useRef();


  // 그리드 name 에 정의할 고유값
  const uid = useId();

  // 그리드 칼럼 레이아웃 정의
  const columnLayout = [
    {
      dataField: 'email',
      headerText: "KR-" + '<br>' + "DAON" + '<br>' + "ID",
      width: 140,
      height: 200
    },

    {
      dataField: 'name',
      headerText: "First/" + '<br>' + "Middle" + '<br>' + "name",
      width: 140
    },
    {
      dataField: 'lastName',
      headerText: 'Last name',
      width: 100
    },
    {
      dataField: 'company',
      headerText: "Company" + '<br>' + "name",
      dataType: 'numeric',
      style: 'my-column',
      width: 120,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    },
    {
      dataField: 'department',
      headerText: 'Department',
      dataType: 'numeric',
      style: 'my-column',
      width: 100,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    },
    {
      dataField: 'crm_code',
      headerText: 'CRM Code'
    },
    {
      dataField: 'no_ships',
      headerText: 'No. of Ships',
      dataType: 'numeric',
      style: 'my-column',
      width: 100,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    },
    {
      dataField: 'created_date',
      headerText: "KRP user" + '<br>' + "created date",
      dataType: 'date',
      width: 100,
      dateInputFormat: 'yyyy-mm-dd', // 데이터의 날짜 형식
     // formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    }
    ,
    {
      dataField: 'expired_date',
      headerText: "Expired" + '<br>' + "date",
      dataType: 'date',
      dateInputFormat: 'yyyy-mm-dd', // 데이터의 날짜 형식
      //formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    }
    ,
    {
      dataField: 'pilot_last_visit_date',
      headerText: "KR-PILOT" + '<br>' + "last visit date",
      dataType: 'date',
      width: 100,
      dateInputFormat: 'yyyy-mm-dd', // 데이터의 날짜 형식
      //formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    }
    ,
    {
      dataField: 'power_last_visit_date',
      headerText: "KR-POWER" + '<br>' + "last visit date",
      dataType: 'date',
      width: 100,
      dateInputFormat: 'yyyy-mm-dd', // 데이터의 날짜 형식
     // formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    }
    ,
    {
      dataField: 'home_visit_count',
      headerText: "KR-PILOT " + '<br>' + "home visit counts",
      dataType: 'numeric',
      style: 'my-column',
      width: 130,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    }
    ,
    {
      dataField: 'pilot_step1_visit_count',
      headerText: "KR-PILOT" + '<br>' + "step1 visit counts",
      dataType: 'numeric',
      style: 'my-column',
      width: 130,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    }
    ,
    {
      dataField: 'pilot_step2_visit_count',
      headerText: "KR-PILOT" + '<br>' + "step2 visit counts",
      dataType: 'numeric',
      style: 'my-column',
      width: 130,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    }
    ,
    {
      dataField: 'pilot_step3_visit_count',
      headerText: "KR-PILOT" + '<br>' + "step3 visit counts",
      dataType: 'numeric',
      style: 'my-column',
      width: 130,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    }
    ,
    {
      dataField: 'power_home_visit_count',
      headerText: "KR-POWER" + '<br>' + "home visit counts",
      dataType: 'numeric',
      style: 'my-column',
      width: 130,
      editRenderer: {
        type: 'InputEditRenderer',
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true // 천단위 구분자 삽입 여부
      }
    }
    ,
    {
      dataField: 'auth_email',
      headerText: "Auth" + '<br>' + "email",
      width: 140,
      height: 200
    }
    ,
    {
      dataField: 'auth_types',
      headerText: "Auth types" + '<br>' + "(eFleet master/sub/KRP)",
      width: 200
    },
    {
      dataField: 'auth_timestamp',
      headerText: "Auth" + '<br>' + "timestamp",
      width: 140
    },
    {
      dataField: 'pilot_reg',
      headerText: 'PILOT Reg',
      width: 100
    },
    {
      dataField: 'power_reg',
      headerText: 'POWER Reg',
      width: 100
    }
    ,
    {
      dataField: 'daon_email',
      headerText: "KRP Reg." + '<br>' + "code",
      width: 140,
      height: 200
    }
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: '100%',
    height: 480,

    showRowNumColumn: true,
    showRowCheckColumn: false,

    // 행 높이 설정
    rowHeight: 32,
    headerHeight: 90,
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
      "date": "2014-10-01",
      "name": "Steve",
      "country": "USA",
      "product": "IPad Air",
      "color": "Green",
      "quantity": 3,
      "price": 630700,
      "email": "yhkim1@krs.co.kr",

      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,




    }, {
      "date": "2014-09-30",
      "name": "Emma",
      "country": "Korea",
      "product": "LG G3",
      "color": "Pink",
      "quantity": 1,
      "price": 503800,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }, {
      "date": "2014-09-29",
      "name": "Emma",
      "country": "Japan",
      "product": "IPad Air",
      "color": "Yellow",
      "quantity": 7,
      "price": 66900,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,
      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }, {
      "date": "2014-09-28",
      "name": "Emma",
      "country": "UK",
      "product": "Galaxy Note3",
      "color": "Orange",
      "quantity": 9,
      "price": 458300,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }, {
      "date": "2014-09-27",
      "name": "Anna",
      "country": "China",
      "product": "LG G3",
      "color": "Violet",
      "quantity": 10,
      "price": 168100,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }, {
      "date": "2014-09-26",
      "name": "Anna",
      "country": "USA",
      "product": "Galaxy S5",
      "color": "Gray",
      "quantity": 3,
      "price": 10400,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }, {
      "date": "2014-09-25",
      "name": "Lowrence",
      "country": "Ireland",
      "product": "LG G3",
      "color": "Yellow",
      "quantity": 12,
      "price": 696100,
      "email": "yhkim1@krs.co.kr",
      "lastName": "emily",
      "company": "delt ltd",
      "department": "production",
      "crm_code": "G234",
      "no_ships": 3,
      "created_date": "2014-10-01",
      "expired_date": "2014-10-01",
      "pilot_last_visit_date": "2014-10-01",
      "power_last_visit_date": "2014-10-01",
      "home_visit_count": 2,
      "pilot_step1_visit_count": 2,
      "pilot_step2_visit_count": 2,
      "pilot_step3_visit_count": 2,

      "power_home_visit_count": 2,
      "auth_email": 2,
      "auth_types": 2,
      "auth_timestamp": 2,
      "pilot_reg": 2,
      "power_reg": 2,
      "daon_email": 2,
    }

    ]

    grid.showAjaxLoader();
    grid.setGridData(data);
    grid.removeAjaxLoader();


  };

  return (
    <section className="sample">
      <h2 className='title'>
        KRP user List(일반 사용자)
      </h2>
      <div className='grayBox'>
        <div className='grayBox__line'>
          <div className='grayBox__inner'>
            <div className='grayBox__box'>
              <div className='grayBox__tit'>Auth selection</div>
              <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Auth Types" size="110px" />
            </div>
            <div className='grayBox__box'>
              <div className='grayBox__tit'>Search</div>
              <InputSearch placeholder="" size="160px" />
            </div>

          </div>
          <div className='grayBox__btn'>
            <Button children="apply" onClick={handleClick} variant="blue" size="medium" icon='apply' />
          </div>
        </div>
      </div>

      <div className='grid__blue'>
        <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
      </div>

    </section>
  );
};

export default KrpUserList;
