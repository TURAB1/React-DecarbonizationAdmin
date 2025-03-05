import React, { useState, useEffect, useRef, useId } from "react";
import axios from "axios";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../../components/InputSearch/InputSearch";
import InputText from "../../../components/InputText/InputText";
import Modal from "../../../components/Modal/Modal";
import useHeaderStore from "../../../store/useHeaderStore";
import AUIGrid from "../../../static/AUIGrid-React/AUIGridReact";
import styles from "./kr_user.module.scss";
import { type } from "@testing-library/user-event/dist/type";

const KrpUserList = () => {
    const [userData, setUserData] = useState(null);
    const [selectedKrUser, setSelectedKrUser] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);


    const [department,setDepartment]=useState(null)
    const [userName, setUserName] = useState(null);
    const [GHGRegistration, setGHGRegistration] = useState(null);

    const userNameRef=useRef(null);
    const [selectedUserID, setSelectedUserID] = useState("")

    const [searchedData,setSearchedData]=useState([]);

    const [userObject, setUserObject] = useState({});
    const [userArray, setUserArray] = useState([]);
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
     const navigate=useNavigate()

    const arrayTest = [];
    //const axios = require('axios');
    const handleClick = () => {
        alert("테스트:" + selectedKrUser);
    };

    function handleApply() {

        console.log("aaaaaaaa");
        axios.get('https://mail.teamsplus.kr/cm/krs/user/api/KRPTempUserList')
            .then(response => console.log(response.data.result.result))
            .catch(error => console.error(error));
    }

    //Kr 사용자 검색 로직
    const handleDepartment = (event) => {
        const value = event.target.value
        if (value === "all")
            setDepartment(null)
        else setDepartment(value)
    }
    const handleUserName = () => {
        if(userNameRef.current){
            if(userNameRef.current.value==="")
                setUserName(null)
            else setUserName((userNameRef.current.value).trim())
        }
    }
    const handleGHGregistration = (event) => {
        const value = event.target.value

        if (value === "all")
            setGHGRegistration(null)
        else setGHGRegistration(value)
    }
    const handleSearch = () => {
        // console.log("userName:" + userName + " code:" + GHGRegistration)
        // setSearchedUsers(userData.filter(
        //     (user) => (user.UserName == userName.trim() && `${JSON.stringify(user.JobGroupCode)}` == GHGRegistration)
        // ))
        
        let data={

                "DeptCode": department,
                "UserName": userName,
                "JobGroupCode":GHGRegistration
                }

         console.log(data)         

       
        const url="https://mail.teamsplus.kr/cm/krs/user/api/KRUserList"
        axios.get(
             url,
             {
             params: data
           })
           .then((response)=>{

           
           if (response.data.result.result === "success") {
            console.log("search result:"+JSON.stringify(response.data.result));

               setSearchedData(JSON.parse(response.data.result.message));
               
           } else {
               alert(response.data.result.message);
           }
         })
     
           .catch(function (error) {
             console.log(error);
         });
    }

    // //Kr 사용자 권한 할당 로직
    // const handleUserRole = (event) => {
       
    //     const value = event.target.value
    //     console.log(event.target.value);
    //     setUserRole(value)
    //     // if(value==="noAccess"){
      
    //     //   setSelectedUsers(selectedUsers.map((items) => ({ ...items, ["JobGroupCode"]: null })));
    //     //     //setUserObject((items) => ({ ...items, ["JobGroupCode"]: null }))
    //     //   setUserRole(value)
    //     // }
    //     // else
    //     // {
    //     //   setSelectedUsers(selectedUsers.map((items) => ({ ...items, ["JobGroupCode"]: value })));
    //     // //setUserObject((items) => ({ ...items, ["JobGroupCode"]: value }))
    //     //   setUserRole(value)
    //     // }
    // }

    const handleUserRole = (event) => {
        const { value } = event.target; // Extract value
        console.log("Selected Value:", value);
        setUserRole(value);
    
        setSelectedUsers((prevUsers) => 
            prevUsers.map((user) => ({
                ...user,
                JobGroupCode: value === "noAccess" ? null : value
            }))
        );
    };
    

    const applyAccess = () => {
        
        setRefreshKey(refreshKey+ 1)
   
   
        const asdas = userRole;
        const daaa = selectedUsers;


        const data = selectedUsers.map(user => ({
            "UserID": user.UserID,
            "JobGroupCode": userRole
        }));

        console.log(data);

    
   
        const setAccessUrl = 'https://mail.teamsplus.kr/cm/krs/user/api/SetKRUser';

        axios.post(setAccessUrl, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {
               // console.log("change access results:"+JSON.stringify(data.result));
                
                if(data.result.result==="success"){
                 
                 // trigger rerender
                 //setRefreshKey(prevKey => prevKey + 1)
                     //navigate(0);
                 window.location.reload();
            
              
                 setSelectedUsers([])
                 
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelctChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const GHGOptions = [
        { value: "all", label: "All" },
        { value: "S", label: "Super Admin" },
        { value: "N", label: "Normal Admin" },
        { value: "X", label: "No Access" },
    ];
    const userRoleOptions = [
        { value: "N", label: " Normal Admin"},
        { value: "", label: "No Access" },
    ];

    const [userRole, setUserRole] = useState(userRoleOptions[0].value)

    const options = [
        { value: "all", label: "All" },
        { value: "depart", label: "Depart" },
        { value: "dtest", label: "Dtest" },
    ];
    const { setHeaderShow } = useHeaderStore();

    // 그리드 객체
    const myGrid = useRef();

    // 그리드 name 에 정의할 고유값
    const uid = useId();
    ///**권한 설명**
    // 부서명, 사번, 이름, 사용자아이디, 권한이 표시되어야 합니다.
    // UserID, UserName, EmployeeNumber, DeptName, JobGroupCode
    // JobGroupCode 의 결과는 3가지로 S 일 경우 전체관리자, N일 경우 일반관리자, null은 권한없음 입니다.
    const columnLayout = [
        {
            dataField: "check",
            headerText: "",
            width: 74,
            headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
                onClick: () => {
                    console.log("111");
                    const grid = myGrid.current;
                    const allData = grid.getGridData();
                    const newlyCheckedData = allData.filter(
                        (item) => item.check === true
                    );
                    const filteredData = allData.filter(item => item.disabled == false);  
                    console.log("no s:"+JSON.stringify(filteredData));
                    
                  
                   
                    if (filteredData.length === 0) {
                        // 헤더가 전체 해제된 경우: grid에 표시된 항목들을 selectedUsers에서 제거
                        setSelectedUsers((prev) =>
                          prev.filter(
                            (user) => !allData.some((dataItem) => dataItem.UserID === user.UserID )
                          )
                        );

                      } else {
                        // 헤더가 전체 체크된 경우: 새로 체크된 항목들을 기존 selectedUsers에 병합 (중복 제거)
                        setSelectedUsers((prev) => {
                          const merged = [...prev];
                          filteredData.forEach((newItem) => {
                            if (
                              !merged.some((existingItem) => existingItem.UserID === newItem.UserID )
                            ) {
                              merged.push(newItem);
                            }
                            

                          });
                          return merged;
                        
                        }
                      );
                      }

                },
            },
             renderer: {
                type: "CheckBoxEditRenderer",
                editable: true,
                disabledFunction: function (rowIndex, columnIndex, value, isChecked, item, dataField) {
                    return item.disabled == true;
                }
            },
 
            

        
        },
        {
            dataField: "UserID",
            headerText: "User ID",
            width: 100,
        },
        {
            dataField: "UserName",
            headerText: "User Name",
        },
        {
            dataField: "EmployeeID",
            headerText: "Employee ID",
        },
        {
            dataField: "DeptCode",
            headerText: "Dept Code",
        },
        {
            dataField: "DeptName",
            headerText: "Dept Name",
        },
        {
            dataField: "JobGroupName",
            headerText: "Job Group Name"

        },
        
        {
            dataField: "JobGroupCode",
            headerText: "Job Group Code",
            width: 120,
        },
        {
            dataField: "CreateUser",
            headerText: "Create User",
        }
    ];
 const gridProps = {
        width: "100%",
        height: 480,
        showRowCheckColumn: false,
        showRowNumColumn: false,

        // 행 높이 설정
        rowHeight: 42,
        headerHeight: 42,
        noDataMessage: "No Data to display!",
    };

    useEffect(() => {
        console.log("SampleDefault 마운트됨");

        // 최초 마운팅 될 때 그리드 이벤트 세팅
        setupGridEvents();
      

        if (searchedData.length === 0){
            // 최초 마운팅 될 때 그리드 데이터 조회시키기
             console.log("department:"+department+"useranme:"+userName+"access:"+GHGRegistration)

            if(department===null&& userName===null&& GHGRegistration===null)
                requestGridData();
            else requestNomatchingGridData()
        }
        else
            // 최초 마운팅 될 때 그리드 데이터 조회시키기
            requestSearchedGridData()


        return () => {
            console.log("SampleDefault 언마운트됨");
        };

    }, [setHeaderShow, searchedData,refreshKey]);


    // 그리드 이벤트 세팅
    const setupGridEvents = () => {
        const grid = myGrid.current;

        grid.bind("cellEditEnd", (evt) => {
            const { dataField, item } = evt;

            if (dataField === "check") {
                console.log(dataField);
                // if(item.JobGroupCode==="S")
                //     //item.check=false
                //  console.log("S clicked:"+item.JobGroupCode)
                    
                    if (item.check === true) {
                        setSelectedUsers((prev) => {
                          const exists = prev.some((user) => user.UserID === item.UserID);
                          if (!exists) return [...prev, item ];
                          return prev;
                        });
                      } else {
                        setSelectedUsers((prev) =>
                          prev.filter((user) => user.UserID !== item.UserID)
                        );
                      }
                      /////////
                    //권한 할당 위해 사용자 id 선택
                    // setSelectedUserID(item.UserID)
                    // setUserObject((items) => ({ ...items, ["UserID"]: item.UserID }))
                    
            }
        });

        grid.bind(["cellClick", "selectionChange", "headerClick"], (evt) => {
            const { dataField, item } = evt;

            if (dataField === "check") {
                console.log(dataField);
                // if(item.JobGroupCode==="S")
                //     //item.check=false
                //  console.log("S clicked:"+item.JobGroupCode)
                    
                    if (item.check === true) {
                        setSelectedUsers((prev) => {
                          const exists = prev.some((user) => user.UserID === item.UserID);
                          if (!exists) return [...prev, item ];
                          return prev;
                        });
                      } else {
                        setSelectedUsers((prev) =>
                          prev.filter((user) => user.UserID !== item.UserID)
                        );
                      }
                      /////////
                    //권한 할당 위해 사용자 id 선택
                    // setSelectedUserID(item.UserID)
                    // setUserObject((items) => ({ ...items, ["UserID"]: item.UserID }))
                    console.log("selected: " + JSON.stringify(selectedUsers));
            }
        });
    };

    //초기 그리드 데이터 조회하여 삽입
    function requestGridData() {
        const grid = myGrid.current;

        grid.showAjaxLoader();

        axios.get("https://mail.teamsplus.kr/cm/krs/user/api/KRUserList")
            .then((response) => {
                console.log(JSON.parse(response.data.result.message));
                if (response.data.result.result === "success") {
                    setUserData(JSON.parse(response.data.result.message));
                    const fetchedData= JSON.parse(response.data.result.message)
                    const addedCheck = fetchedData.map((user) => ({
                        ...user,
                        check: false,
                        disabled: user.JobGroupCode === "S" // JobGroupCode가 "S"인 경우 disabled를 true로 설정
                    }));
                   // console.log(addedCheck);
                    grid.setGridData(addedCheck);
                    grid.removeAjaxLoader();
                } else {
                    alert(response.data.result.message);
                }
            }
            )
            .catch(function (error) {
                console.log(error)
                alert(error);
            });

    };
    //검색그리드 데이터 조회하여 삽입
     function requestSearchedGridData() {
        const grid = myGrid.current;
        //console.log("searched:" + JSON.stringify(searchedUsers))
        grid.showAjaxLoader();
        const addedCheck = searchedData.map((user) => ({
            ...user,
            check: false,
            disabled: user.JobGroupCode === "S" // JobGroupCode가 "S"인 경우 disabled를 true로 설정
        }));
        grid.setGridData(addedCheck);
        grid.removeAjaxLoader();
    };
    function requestNomatchingGridData() {
        const grid = myGrid.current;
        //console.log("searched:" + JSON.stringify(searchedUsers))
        grid.showAjaxLoader();
        grid.setGridData([]);
        grid.removeAjaxLoader();
    };
    return (
        <section className="subPage">
            <div className="titleBox titleBox--type1">
                <h2 className="title">KR User</h2>
            </div>
            <div className="grayBox">
                <div className="grayBox__line">
                    <div className="grayBox__inner">
                        <div className="grayBox__box">
                            <div className="grayBox__tit">Dept</div>
                            <Select
                                options={options}

                               

                                onChange={handleDepartment}
                                placeholder=""
                                size="160px"
                            />
                        </div>

                        <div className="grayBox__box">
                            <div className="grayBox__tit">UserName</div>
                            <InputText
                                ref={userNameRef}
                                defaultValue=" "
                                size="160px"
                              
                                onChange={handleUserName}
                            />
                        </div>


                        <div className="grayBox__box">
                            <div className="grayBox__tit">GHG Registration</div>
                            <Select
                                options={GHGOptions}
                              
                                onChange={handleGHGregistration}
                                placeholder=""
                                size="160px"
                            />

                        </div>
                    </div>
                    <div className="grayBox__btn">
                        <Button
                            children="Search"
                            onClick={handleSearch}
                            variant="blue"
                            size="medium"
                        />
                    </div>
                </div>
            </div>

            <div className={styles["saveBox"]}>
                <div className={styles["saveBox__tit"]}>User Role</div>
                <Select
                    options={userRoleOptions}
                    value={userRole}
                    onChange={handleUserRole}
                    placeholder=""
                    size="160px"
                />
                <Button
                    children="Apply"
                    onClick={applyAccess}
                    variant="lineBlue"
                    size="medium"
                />
            </div>

            <div className="grid__blue">
                <AUIGrid
                    ref={myGrid}
                    name={uid}
                    columnLayout={columnLayout}
                    gridProps={gridProps}
                />
            </div>


        </section>
    );
};

export default KrpUserList;
