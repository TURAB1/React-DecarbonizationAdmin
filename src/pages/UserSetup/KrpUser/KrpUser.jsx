import React, { useState, useEffect, useRef, useId } from "react";
import axios from "axios";
import useHeaderStore from "../../../store/useHeaderStore";

import AUIGrid from "../../../static/AUIGrid-React/AUIGridReact";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import InputNum from "../../../components/InputNum/InputNum";
import InputSearch from "../../../components/InputSearch/InputSearch";
import Select from "../../../components/Select/Select";
import deleIcon from "../../../assets/images/delete_icon.png";
import InputCalendar from "../../../components/InputCalendar/InputCalendar";
import Checkbox from "../../../components/Checkbox/Checkbox";
import styles from "./krp_user.module.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

const KrpUser = () => {
  const [searchAuthType,setSearchAuthType]=useState("")
  const [inputCompany,setInputCompany]=useState("")
  const [searchedData,setSearchedData]=useState([]);
  const inputRef = useRef(null);

  const handleSearchAuthType=(event)=>{
    //console.log("authtypes:"+event.target.value)
    setSearchAuthType(event.target.value);
  }
  const handleInputCompany=()=>{
    if (inputRef.current) {
      if(inputRef.current.value==="")
       setInputCompany(null) 
      else
      setInputCompany(inputRef.current.value);
  }
  }
  const refTest=()=>{
    console.log("refTest:"+inputCompany)
  }
  const krpUserSearch = () => {
 
    const data= {
      "Authtype":searchAuthType,
      "SearchText":inputCompany
    }
    const url="https://mail.teamsplus.kr/cm/krs/user/api/KRPUserList"
    axios.get(
         url,
         {
         params:data
       })
       .then((response)=>{
       //console.log("search result:"+JSON.stringify(response.data.result));
       if (response.data.result.result === "success") {
           setSearchedData(JSON.parse(response.data.result.message));
           
       } else {
           alert(response.data.result.message);
       }
     })
 
       .catch(function (error) {
         console.log(error);
     });

  }

  const handleClick = () => {
    alert("테스트");
  };
  const deleteUser = () => {
    alert("do you want to delete user");
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelctChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
     { value: "All", label: "All"},
    { value: "master", label: "Master" },
    { value: "sub", label: "Sub" },
   
  ];

  const [selectedValue, setSelectedValue] = useState("radio1");

  const { setHeaderShow } = useHeaderStore();

  const myGrid2 = useRef();

  // 그리드 name 에 정의할 고유값

  const uid2 = useId();
  

  // 그리드 칼럼 레이아웃 정의
  const columnLayout = [
    {
      dataField: "PersonCode",
      headerText: "Person Code",
    },
    {
      dataField: "ComCode",
      headerText: "Company Code",
    },
    {
      dataField: "CompanyName",
      headerText: "Company Name",
    },
    {
      dataField: "PilotRegDate",
      headerText: "Pilot Reg Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: 'yyyy-mm-dd' // 그리드에 보여줄 날짜 형식
    },
    {
      dataField: "PowerRegDate",
      headerText: "Power Reg Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: 'yyyy-mm-dd' // 그리드에 보여줄 날짜 형식
    },
  
    {
      dataField: "PersonName",
      headerText: "Person Name",
    },
    {
      dataField: "DeptName",
      headerText: "Department",
    },

    {
      dataField: "AuthType",
      headerText: "Auth Type",
    },
    {
      dataField: "AuthTimeStamp",
      headerText: "Auth Time Stamp",
      dataType:"date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: 'yyyy-mm-dd' // 그리드에 보여줄 날짜 형식
    },
   
    {
      dataField: "ExpireDate",
      headerText: "Expire Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: 'yyyy-mm-dd' // 그리드에 보여줄 날짜 형식
    },
    {
      dataField: "CreateDate",
      headerText: "Create Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: 'yyyy-mm-dd' // 그리드에 보여줄 날짜 형식
    },

  ];

 const gridProps = {
    width: "100%",
    height: 480,

    showRowNumColumn: true,

    // 행 높이 설정
    rowHeight: 42,
    headerHeight: 42,
    noDataMessage: "No Data to display!",
  };

  useEffect(() => {
    console.log("SampleDefault 마운트됨");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    setupGridEvents();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    if(searchedData.length===0)
      if(searchAuthType===""&&inputCompany==="")
       requestGridData();
      else
       requestNoMatchingGridData()

    else
     requestSearchedGridData()
    return () => {
      console.log("SampleDefault 언마운트됨");
    };
  }, [setHeaderShow,searchedData]);

  // 그리드 이벤트 세팅
  const setupGridEvents = () => {
    const grid = myGrid2.current;
    // 그리드 이벤트 바인딩
    grid.bind(["cellClick", "selectionChange", "headerClick"], (event) => {
      console.log(event.type);
    });
  };




 const requestGridData=()=>{
    const grid2 = myGrid2.current;
    const url="https://mail.teamsplus.kr/cm/krs/user/api/KRPUserList"
   axios.get(
        url,
        {
        params: {
          Authtype:"All",
          SearchText:null
        }
      })
      .then((response)=>{
      console.log(response.data);
      if (response.data.result.result === "success") {
          grid2.setGridData(JSON.parse(response.data.result.message));
          
      } else {
          alert(response.data.result.message);
      }
    })

      .catch(function (error) {
        console.log(error);
        alert(error);
    });
  }
  const requestSearchedGridData=()=>{
    const grid2 = myGrid2.current;
   grid2.setGridData(searchedData);
     
  }
  const requestNoMatchingGridData=()=>{
    const grid2 = myGrid2.current;
   grid2.setGridData([]);
     
  }
  return (
    <section className="subPage">
      <div className="titleBox titleBox--type1">
        <h2 className="title">KRP User</h2>
      </div>
      <div className="grayBox">
        <div className="grayBox__line">
          <div className="grayBox__inner">
            <div className="grayBox__box">
              <div className="grayBox__tit">Auth Type</div>
              <Select
                options={options}
                value={searchAuthType}
                onChange={handleSearchAuthType}
                placeholder=""
                size="160px"
              />
              </div>
              <div className="grayBox__box">
              <div className="grayBox__tit">Company Name:</div>
              <InputText
                    ref={inputRef}
                    placeholder=""
                    size="200px"
                    name="Company"
                    value={inputCompany}
                    onChange={handleInputCompany}
                  />
                 
              </div>
             
            
          </div>
          <div className="grayBox__btn">
            <Button
              children="Search"
              onClick={krpUserSearch}
              variant="blue"
              size="medium"
             
            />
          </div>
        </div>
      </div>
      <div className="grid__blue">
        <AUIGrid
          ref={myGrid2}
          name={uid2}
          columnLayout={columnLayout}
          gridProps={gridProps}
        />
      </div>
    </section>
  );
};

export default KrpUser;
