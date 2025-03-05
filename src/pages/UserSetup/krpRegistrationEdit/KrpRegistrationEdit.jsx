import React, { useState, useEffect, useRef, useId } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import InputSearch from "../../../components/InputSearch/InputSearch";
import InputText from "../../../components/InputText/InputText";
import InputPassword from "../../../components/InputPassword/InputPassword";
import Modal from "../../../components/Modal/Modal";
import InputCalendar from "../../../components/InputCalendar/InputCalendar";
import CheckBox from "../../../components/Checkbox/Checkbox";
import useHeaderStore from "../../../store/useHeaderStore";
import AUIGrid from "../../../static/AUIGrid-React/AUIGridReact";
import "../../../samples/RendererTemplateFunc";
import UserAddForm from "./UserAddForm/UserAddForm";
import UserEditForm from "./UserEditForm/UserEditForm";
import styles from "./krp_registration_edit.module.scss";

const KrpRegistrationEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [userData, setUserData] = useState([])

  const [inputKrpCode, setInputKrpCode] = useState("");
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputDepartment, setInputDepartment] = useState("");
  const [inputRemark, setInputRemark] = useState("");
  const [userType, setUserType] = useState("");
  const [useYn, setUseYn] = useState("");
  const [inputCalendar, setInputCalendar] = useState("")
  const [inputCreateUser, setInputCreateUser] = useState("");


  const [selectedUsers, setSelectedUsers] = useState([]);
  const [clickedEmailId, setClickedEmailId] = useState("");
  const [inputs, setInputs] = useState({ "UseYN": true, "UserType": 2, "CreateUser": "chdgf" });
  const [edits, setEdits] = useState({ "UpdateUser": "chungju" });
  const [selectedOption, setSelectedOption] = useState("");

  const inputRef = useRef(null);
  const krpCodeRef = useRef(null);
  const shipNoRef = useRef(null);
  const passwordRef = useRef(null);
  const departmentRef = useRef(null);
  const userCreaterRef = useRef(null);
  const remarkRef = useRef(null);
  const expireDateRef = useRef(null);

  const editShipNoRef = useRef(null);
  const editDepartmentRef = useRef(null);
  const editPasswordRef = useRef(null);
  const updateUserRef = useRef(null);
  const editRemarkRef = useRef(null);

  const [editKrpCode, setEditKrpCode] = useState("")
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [inputUpdateUser, setInputUpdateUser] = useState("kellf");
  const [editExpireDate, setEditExpireDate] = useState("")
  const [editRemark, setEditRemark] = useState("");


  const [searchType, setSearchType] = useState("")
  const [inputSearch, setInputSearch] = useState("")
  const [expiredAccount, setExpiredAccount] = useState(true)
  const [searchedData, setSearchedData] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);




  const [inputExpireDate, setInputExpiredate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 90); // Add 90 days
    const value = today.toISOString().split("T")[0];
    setInputs(values => ({ ...values, ["ExpireDate"]: value }));
    return value
  })


  const handleClick = () => {
    console.log("selected data: " + JSON.stringify(selectedUsers));

  };


  const handleSelctChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);

  };

  const handleSelectUserType = (event) => {
    // console.log(event.target.value)
    // const UserType = event.target.value
    // setInputs((values) => ({ ...values, ["UserType"]: JSON.parse(UserType) }))
    // setUserType(event.target.value);

  };

  const handleSelectUseYn = (event) => {
    console.log(event.target.value)
    const UserYn = event.target.value
    setInputs((values) => ({ ...values, ["UseYN"]: JSON.parse(UserYn) }))
    setUseYn(event.target.value);

  };
  const handleCalendarInput = (event) => {
    console.log(event.target.value)
    const ExpireDate = event.target.value
    setInputs((values) => ({ ...values, ["ExpireDate"]: ExpireDate }))
    setInputCalendar(ExpireDate)
  }


  // 사용자 추가 로직
  const handleAddUser = () => {
    setIsModalOpen(true)
    setInputs((values) => ({ ...values, ["UserType"]: 2 }))
    setUserType(2);
  }
  function checkPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,8}$/;
    if (inputtxt.match(decimal)) {
      //alert('Correct Password...')
      return true;
    }
    else {
      alert('Wrong Password...!')
      return false;
    }
  }


  const handleKrpCodeChange = () => {
    if (krpCodeRef.current) {
      const name = krpCodeRef.current.name;
      const value = krpCodeRef.current.value;
      setInputs(values => ({ ...values, [name]: value.toLowerCase() }));
      setInputKrpCode(value);
    }
  }
  const handleShipNoChange = () => {
    if (shipNoRef.current) {
      const name = shipNoRef.current.name;
      const value = shipNoRef.current.value;
      setInputs(values => ({ ...values, [name]: value.toUpperCase() }));
      setInputCompanyName(value);
    }
  }
  const handlePasswordChange = () => {
    if (passwordRef.current) {
      const name = passwordRef.current.name;
      const value = passwordRef.current.value;
      setInputs(values => ({ ...values, [name]: value }));
      setInputPassword(value);
    }
  }
  const handleDepartmentChange = () => {
    if (departmentRef.current) {
      const name = departmentRef.current.name;
      const value = departmentRef.current.value;
      setInputs(values => ({ ...values, [name]: value }));
      setInputDepartment(value);
    }
  }
  const handleUserCreaterChange = () => {
    if (userCreaterRef.current) {
      const name = userCreaterRef.current.name;
      const value = userCreaterRef.current.value;
      setInputs(values => ({ ...values, [name]: value }));
      setInputCreateUser(value);
    }
  }
  const handleRemarkChange = () => {
    if (remarkRef.current) {
      const name = remarkRef.current.name;
      const value = remarkRef.current.value;
      setInputs(values => ({ ...values, [name]: value }));
      setInputRemark(value);
    }
  }

  // const handleExpireDateChange = () => {

  //   const today = new Date();
  //   today.setDate(today.getDate() + 90); // Add 90 days
  //   const value = today.toISOString().split("T")[0];
  //   setInputs(values => ({ ...values, ["ExpireDate"]: value }));
  //   //setInputExpiredate(value);
  //   return value
  // }
  const handleAddSubmit = (event) => {
    event.preventDefault();
    if (inputKrpCode === "") {
      alert("Enter KRP Code");
    } else if (inputCompanyName === "") {
      alert("Enter Comapny Name")
    } else if (!checkPassword(inputPassword)) {
      alert("Password must be 8 characters including(Uppercase,Lowercase,number,special symbol)")
    } else if (inputDepartment === "") {
      alert("Enter Department")
    }
    else {
      //call add api , close modal after success
      addUser();
      //alert(JSON.stringify(inputs));
      setIsModalOpen(false)
      setInputKrpCode("");
      setInputCompanyName("");
      setInputDepartment("");
      setUserType("")
      setInputPassword("");
      setUseYn("");
      setInputCalendar("");
      setInputRemark("");
      setInputCreateUser("");

    }

  }

  const addUser = () => {
    console.log("sent add data:" + JSON.stringify(inputs));
    const data = {
      "KRPRegCode": "9224245",
      "ComCode": "3456",
      "DeptName": "sdsf",
      "UserType": 2,
      "Password": "dsggg",
      "UseYN": true,
      "CreateUser": "sfdf"
    }

    const addUserUrl = 'https://mail.teamsplus.kr/cm/krs/user/api/KRPTempUserRegister';

    axios.post(addUserUrl, inputs, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(({ data }) => {

        console.log("add results:"+JSON.stringify(data.result))
        if(data.result.result==="success"){
          alert("User saved")
          setRefreshKey(prevKey => prevKey + 1)
        }
        else alert("save failed:"+data.result.message)

       

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  //사용자 변집 로직
  const handleEditUser = () => {
    setIsModalOpen2(true);
    console.log()
  };
  const handleEditShipNoChange = () => {
    if (editShipNoRef.current) {
      const name = editShipNoRef.current.name;
      const value = editShipNoRef.current.value;
      setEdits(values => ({ ...values, [name]: value.toUpperCase() }));
      setEditCompanyName(value);
    }
  }
  const handleEditDepartmentChange = () => {
    if (editDepartmentRef.current) {
      const name = editDepartmentRef.current.name;
      const value = editDepartmentRef.current.value;
      setEdits(values => ({ ...values, [name]: value }));
      setEditDepartment(value);
    }
  }
  const handleEditPasswordChange = () => {
    if (editPasswordRef.current) {
      const name = editPasswordRef.current.name;
      const value = editPasswordRef.current.value;
      setEdits(values => ({ ...values, [name]: value }));
      setEditPassword(value);
    }
  }
  const handleUpdateUserChange = () => {
    if (updateUserRef.current) {
      const name = updateUserRef.current.name;
      const value = updateUserRef.current.value;
      setEdits(values => ({ ...values, [name]: value }));
      setInputUpdateUser(value);
    }
  }

  const handleEditRemarkChange = () => {
    if (editRemarkRef.current) {
      const name = editRemarkRef.current.name;
      const value = editRemarkRef.current.value;
      setEdits(values => ({ ...values, [name]: value }));
      setEditRemark(value);
    }
  }


  const handleEditSubmit = (event) => {
    event.preventDefault();
    //alert(JSON.stringify(inputs));
    if (editCompanyName === "") {
      alert("Enter Company Code")
    } else if (!checkPassword(editPassword)) {
      alert("Password must be 8 characters including(Uppercase,Lowercase,number,special symbol)")
    } else if (editDepartment === "") {
      alert("Enter Department")
    } else {
      //call edit api , close modal after success
      editUser();
      setIsModalOpen2(false)
      setEditCompanyName("");
      setEditDepartment("");
      setEditPassword("");
      setInputUpdateUser("");
      setEditRemark("");


    }

  }
  const editUser = () => {
    console.log("sentEditData:" + JSON.stringify(edits));
   
    // const data = {
    //   "KRPRegCode": "9224245",
    //   "ComCode": "3456",
    //   "DeptName": "sdsf",
    //   "Password": "dsggg",
    //   "UpdateUser": "sfdf"
    // }

    const editUserUrl = 'https://mail.teamsplus.kr/cm/krs/user/api/UpdateKRPTempUser';

    axios.post(editUserUrl, edits, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(({ data }) => {
        console.log("edit reseult:" + JSON.stringify(data.result))
        //alert(JSON.stringify(data.result));
       
        if(data.result.result==="success"){
          alert("User Edited")
          setRefreshKey(prevKey => prevKey + 1)
        }
        else alert(" Edit failed")

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  //사용자 삭제 로직
  const handleDeleteUser = () => {
    const deleteUrl = 'https://mail.teamsplus.kr/cm/krs/user/api/DeleteKRPTempUser';
    let count =0

    selectedUsers.forEach((user) => {
      //const KRPRegCode  = String(selectedUsers[0].KRPRegCode );
      let krpRegCode = user.KRPRegCode
      const bodyData = {
        "KRPRegCode": krpRegCode,
      };
      console.log(bodyData)
      axios.post(deleteUrl, bodyData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then(({ data }) => {
          console.log(JSON.stringify("delete result:" + JSON.stringify(data.result)));
          //setUserData([])or generate random numbers to rerender
     
          if(data.result.result==="success"){
             count++
            if(count===selectedUsers.length){
            alert("successfully deleted")
            setRefreshKey(prevKey => prevKey + 1)
            }
          }
          else alert("Delete failed")
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    )
  }
  //Krp temp 사용자 검색 
  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  }
  const handleInputSearch = (event) => {
    if (inputRef.current) {
      if (inputRef.current.value === "")
        setInputSearch(null)
      else
        setInputSearch(inputRef.current.value);
    }

  }
  const handleExpiredAccount = (event) => {
    setExpiredAccount(event.target.checked)
  }
  const userSearch = () => {
    let bodyData = {}
    if (searchType === "CompanyName") {
      bodyData = {
        "SearchType": "CompanyName",
        "SearchText": inputSearch,
        "CheckExpire": expiredAccount
      }
    }
    else
      bodyData = {
        "SearchType": "RegCode",
        "SearchText": inputSearch,
        "CheckExpire": expiredAccount
      }


    const editUserUrl = 'https://mail.teamsplus.kr/cm/krs/user/api/KRPTempUserList';

    axios.get(editUserUrl,
      {
        params: bodyData
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        //console.log(JSON.parse(response.data.result.message));
        setSearchedData(JSON.parse(response.data.result.message));
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  const searchOptions = [
    { value: "RegCode", label: "Reg.Code", },
    { value: "CompanyName", label: "Company Name" },

  ];
  const userTypeOptions = [
    { value: "2", label: "Temp User" }



  ];
  const useOptions = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];
  const { setHeaderShow } = useHeaderStore();

  // 그리드 객체
  const myGrid = useRef();

  // 그리드 name 에 정의할 고유값
  const uid = useId();
  // 그리드 칼럼 레이아웃 정의
  const columnLayout = [
    {
      dataField: "check",
      headerText: "",
      width: 74,
      headerRenderer: {
        type: "CheckBoxHeaderRenderer",
        dependentMode: true,
        onClick: () => {
          console.log("헤더 체크박스 클릭됨");
          const grid = myGrid.current;
          const allData = grid.getGridData();
          const newlyCheckedData = allData.filter(
            (item) => item.check === true
          );

          if (newlyCheckedData.length === 0) {
            // 헤더가 전체 해제된 경우: grid에 표시된 항목들을 selectedUsers에서 제거
            setSelectedUsers((prev) =>
              prev.filter(
                (user) => !allData.some((dataItem) => dataItem.KRPRegCode === user.KRPRegCode)
              )
            );
          } else {
            // 헤더가 전체 체크된 경우: 새로 체크된 항목들을 기존 selectedUsers에 병합 (중복 제거)
            setSelectedUsers((prev) => {
              const merged = [...prev];
              newlyCheckedData.forEach((newItem) => {
                if (
                  !merged.some((existingItem) => existingItem.KRPRegCode === newItem.KRPRegCode)
                ) {
                  merged.push(newItem);
                }
              });
              return merged;
            });
          }
        },
      },
      renderer: {
        type: "CheckBoxEditRenderer",
        editable: true,
      },
    },
    {
      headerText: "NO",
      width: 40,
      renderer: {
        type: "TemplateRenderer",
      },
      labelFunction: (rowIndex, columnIndex, value, headerText, item) => {
        // HTML 템플릿 작성
        let template = rowIndex + 1;
        return template;
      },
    },
    {
      dataField: "KRPRegCode",
      headerText: "KRP Reg Code",
      style: `${styles.emailColumn}`,
    },
    {
      dataField: "ComCode",
      headerText: "Company Name",
    },
    {
      dataField: "DeptName",
      headerText: "Department",
    },
    {
      dataField: "CreateDate",
      headerText: "KRP Created Date",
      dataType: "date",
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


  ];
  const gridProps = {
    width: "100%",
    height: 350,
    showRowCheckColumn: false,
    showRowNumColumn: false,

    // 행 높이 설정
    rowHeight: 42,
    headerHeight: 42,
    noDataMessage: "No Data to Display!",
  };

  useEffect(() => {
    console.log("KRP temp 마운트됨");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    setupGridEvents();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    if (searchedData.length === 0) {
      console.log("type:"+userType+"input:"+inputSearch+"exp:"+expiredAccount)
      if (userType === "" && inputSearch === "" && expiredAccount === true)
        requestGridData();
      else
        requestNoMatchingGridData();
    }
    else
      requestSearchedGridData();

    return () => {
      console.log("KRP temp 언마운트됨");
    };
  }, [setHeaderShow, searchedData, refreshKey]);

  // 그리드 이벤트 세팅
  const setupGridEvents = () => {
    const grid = myGrid.current;
    // 그리드 이벤트 바인딩
    grid.bind("cellEditEnd", (evt) => {
      console.log(evt);
      const { dataField, item } = evt;
      if (dataField === "check") {

        if (item.check === true) {
          setSelectedUsers((prev) => {
            const exists = prev.some((user) => user.KRPRegCode === item.KRPRegCode);
            if (!exists) return [...prev, item];
            return prev;
          });
        } else {
          setSelectedUsers((prev) =>
            prev.filter((user) => user.KRPRegCode !== item.KRPRegCode)
          );
        }
        /////////
      }
    });
    grid.bind("cellClick", (evt) => {
      console.log("2");
      const { dataField, item } = evt;
      if (dataField === "KRPRegCode") {
        console.log(" krpreg code clicked");
        setClickedEmailId(item.KRPRegCode);
        // setEdits(values => ({ ...values, ["KRPRegCode"]: item.KRPRegCode }));
        setEditKrpCode(item.KRPRegCode)
        setEditCompanyName(item.ComCode);
        setEditDepartment(item.DeptName);
        setEditRemark(item.remark)
        setEditExpireDate((item.ExpireDate).split("T")[0])
        setEdits({ "KRPRegCode": item.KRPRegCode, "UpdateUser": "chrdtlk" })
        handleEditUser();
      }
    });
    // grid.bind(['cellClick', 'selectionChange', 'headerClick'], (event) => {
    //     console.log(event);
    // });
  };

  function requestGridData() {
    const grid = myGrid.current;
    const bodyData = {
      "SearchType": "RegCode",
      "SearchText": null,
      "CheckExpire": true
    }


    grid.showAjaxLoader();
    axios.get("https://mail.teamsplus.kr/cm/krs/user/api/KRPTempUserList",{params:bodyData})
      .then((response) => {
        //console.log(JSON.stringify(response.data.result));
        if (response.data.result.result === "success") {
          setUserData(JSON.parse(response.data.result.message));
          console.log(JSON.parse(response.data.result.message));
          const fetchedData=JSON.parse(response.data.result.message)
           const addedCheck=    fetchedData.map((users)=>({...users,"check":false}));
           console.log(addedCheck);
          grid.setGridData(addedCheck);
          grid.removeAjaxLoader();
        } else {
          alert(response.data.result.result);
        }

      })
      .catch(function (error) {
        console.log(error);
        alert(error)
      });
  };

  const requestSearchedGridData = () => {
    const grid = myGrid.current;
    grid.showAjaxLoader();
    grid.setGridData(searchedData);
    grid.removeAjaxLoader();
  }
  const requestNoMatchingGridData = () => {
    const grid = myGrid.current;
    grid.showAjaxLoader();
    grid.setGridData([]);
    grid.removeAjaxLoader();
  }

  return (
    <section className="subPage">
      <div className="titleBox titleBox--type1">
        <h2 className="title">KRP Temp User</h2>
      </div>
      <div className="grayBox">
        <div className="grayBox__line">
          <div className="grayBox__inner">
            <div className="grayBox__box">
              <div className="grayBox__tit">Type</div>
              <Select
                options={searchOptions}
                value={searchType}
                onChange={handleSearchType}
                placeholder=""
                size="160px"
              />
            </div>
            <div className="grayBox__tit"></div>
            <InputText
              ref={inputRef}
              placeholder=""
              size="200px"
              name="Company"
              value={inputSearch}
              onChange={handleInputSearch}
            />
            <div className="grayBox__tit"></div>
            <div className="grayBox__box">
              <CheckBox
                id="ExpiredAccount"
                name="ChackBox"
                defaultChecked={true}
                label="Including Expired Account"
                checked={expiredAccount}
                onChange={handleExpiredAccount}
              />
            </div>

          </div>
          <div className="grayBox__btn">
            <Button
              children="Search"
              onClick={userSearch}
              variant="blue"
              size="medium"

            />
          </div>
        </div>
      </div>

      <div className={styles["btnBox"]}>
        <Button
          children="ADD"
          onClick={handleAddUser}
          variant="lineBlue"
          size="medium"
        />
        <Button
          children="Delete"
          onClick={handleDeleteUser}
          variant="lineBlue"
          size="medium"
        />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddSubmit}
          title="KRP Temp User"
          type="confirm"
          size={"600px"}
        >
          <table className="vertical-table">
            <colgroup>
              <col style={{ width: "160px" }}></col>
            </colgroup>
            <tbody>
              <tr>
                <th>KRP Code</th>
                <td>
                  <InputText
                    ref={krpCodeRef}
                    placeholder=""
                    size="350px"
                    name="KRPRegCode"
                    value={inputKrpCode}
                    onChange={handleKrpCodeChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Company Name</th>
                <td>
                  <InputText
                    ref={shipNoRef}
                    placeholder=""
                    size="350px"
                    name="ComCode"
                    value={inputCompanyName}
                    onChange={handleShipNoChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Password</th>
                <td>
                  <div className={styles.password}>
                  <InputPassword
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="8(upper&lowercase,digit,special symbol)"
                    size="350px"
                    name="Password"
                    value={inputPassword}
                    onChange={handlePasswordChange}
                  />
                  <button className={styles.passwordToggle}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  </div>
                </td>

              </tr>
              <tr>
                <th>Department</th>
                <td>
                  <InputText
                    ref={departmentRef}
                    placeholder=""
                    size="350px"
                    name="DeptName"
                    value={inputDepartment}
                    onChange={handleDepartmentChange}
                  />
                </td>
              </tr>
              {/* <tr>
                <th>User Creater</th>
                <td>
                  <InputText
                    ref={userCreaterRef}
                    placeholder=""
                    size="350px"
                    name="CreateUser"
                    value={inputCreateUser}
                    onChange={handleUserCreaterChange}
                  />
                </td>
              </tr>
              <tr>
                <th>User Type</th>
                <td>
                  <Select
                    options={userTypeOptions}
                    value={userType}
                    onChange={handleSelectUserType}
                    placeholder=""
                    size="350px"
                  />
                </td>
              </tr>
              <tr>
                <th>Use</th>
                <td>
                  <Select
                    options={useOptions}
                    value={useYn}
                    onChange={handleSelectUseYn}
                    placeholder="Y/N"
                    size="350px"
                  />
                </td>
              </tr> */}
              <tr>
                <th>Expire Date</th>
                <td>
                  <InputText
                    ref={expireDateRef}
                    placeholder={inputExpireDate}
                    size="350px"
                    name="ExpireDate"
                    value={inputExpireDate}
                    disabled={true}
                  />
                  {/* <InputCalendar
                    id="InputCalendar1"
                    placeholder=""
                    size="350px"
                    value={inputCalendar}
                    onChange={handleCalendarInput} /> */}
                </td>
              </tr>
              <tr>
                <th>Remark</th>
                <td>
                  <InputText
                    ref={remarkRef}
                    placeholder=""
                    size="350px"
                    name="remark"
                    value={inputRemark}
                    onChange={handleRemarkChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
        <Modal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          onConfirm={handleEditSubmit}
          title="KRP Temp User"
          type="confirm"
          size={"600px"}
        >
          <table className="vertical-table">
            <colgroup>
              <col style={{ width: "160px" }}></col>
            </colgroup>
            <tbody>
              <tr>
                <th>KRP Code</th>
                <td>
                  <InputText
                    disabled={true}
                    placeholder={editKrpCode}
                    size="350px"
                    name="KRPRegCode"
                  />
                </td>
              </tr>
              <tr>
                <th>Company Name</th>
                <td>
                  <InputText
                    ref={editShipNoRef}
                    placeholder={editCompanyName}
                    size="350px"
                    name="ComCode"
                    defaultValue={editCompanyName}
                    onChange={handleEditShipNoChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Department</th>
                <td>
                  <InputText
                    ref={editDepartmentRef}
                    placeholder={editDepartment}
                    size="350px"
                    name="DeptName"
                    defaultValue={editDepartment}
                    onChange={handleEditDepartmentChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Password</th>
                <td>
                  <div className={styles.password}>
                  <InputPassword
                    ref={editPasswordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="8(upper&lowercase,digit,special symbol)"
                    size="350px"
                    name="Password"
                    value={editPassword}
                    onChange={handleEditPasswordChange}
                  />
                  <button className={styles.passwordToggle}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                  </div>
                </td>

              </tr>

              {/* <tr>
                <th>User Editor</th>
                <td>
                  <InputText
                    ref={updateUserRef}
                    placeholder=""
                    size="350px"
                    name="UpdateUser"
                    value={inputUpdateUser}
                    onChange={handleUpdateUserChange}
                  />
                </td>
              </tr> */}
              <tr>
                <th>Expire Date</th>
                <td>
                  <InputText
                    placeholder={editExpireDate}
                    size="350px"
                    name="ExpireDate"
                    disabled={true}
                  />
                </td>
              </tr>
              <tr>
                <th>Remark</th>
                <td>
                  <InputText
                    ref={editRemarkRef}
                    placeholder={editRemark}
                    size="350px"
                    name="remark"
                    defaultValue={editRemark}
                    onChange={handleEditRemarkChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
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

export default KrpRegistrationEdit;
