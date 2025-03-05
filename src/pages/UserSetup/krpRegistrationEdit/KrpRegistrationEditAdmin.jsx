import React, { useState, useEffect, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";
import InputSearch from "../../../components/InputSearch/InputSearch";
import InputText from "../../../components/InputText/InputText";
import Modal from "../../../components/Modal/Modal";
import useHeaderStore from "../../../store/useHeaderStore";
import AUIGrid from "../../../static/AUIGrid-React/AUIGridReact";
import "../../../samples/RendererTemplateFunc";
import UserAddForm from "./UserAddForm/UserAddForm";
import UserEditForm from "./UserEditForm/UserEditForm";
import styles from "./krp_registration_edit.module.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

const KrpRegistrationEditAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const handleClick = () => {
    alert("테스트");
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelctChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const navigate = useNavigate();
  const handleAddUser = () => {
    setIsModalOpen(true);
    // navigate("/pilot/krpRegistrationEdit/krpRegistrationEdit/userAddForm");
  };
  const handleEditUser = () => {
    setIsModalOpen2(true);
    // navigate("/pilot/krpRegistrationEdit/krpRegistrationEdit/userAddForm");
  };
  const handleDeleteUser = () => {
    // setIsModalOpen(true)
  };

  const handleAdd = () => {
    alert("Add 버튼이 클릭되었습니다!");
    setIsModalOpen(false); // 모달 닫기
  };

  const $ag = window.AUIGrid;
  window.$agRendererTemplate = {
    // 적용 버턴 클릭 핸들러
    editUser: (rowIndex, event) => {
      const myGridID = "#aui-grid-wrap-RendererTemplate";
      // 그리드에 실제 업데이트 적용 시킴
      $ag.updateRow(
        myGridID,
        {
          name: "셀 값 예약어로 수정",
        },
        rowIndex
      );
      //alert('rowIndex : ' + rowIndex + 'edit user');
      // navigate("/pilot/krpRegistrationEdit/krpRegistrationEdit/userEditForm");
      handleEditUser();
    },
  };
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const { setHeaderShow } = useHeaderStore();

  // 그리드 객체
  const myGrid = useRef();
  const myGridAdd = useRef();
  const myGridEdit = useRef();

  // 그리드 name 에 정의할 고유값
  const uid = useId();
  const uidAdd = useId();
  const uidEdit = useId();

  // 그리드 칼럼 레이아웃 정의
  const columnLayout = [
    {
      dataField: "email",
      headerText: "KRP" + "<br>" + " Reg.code" + "<br>" + " E-mail",
      // width: 200,
      renderer: {
        // HTML 템플릿 렌더러 사용
        type: "TemplateRenderer",
      },
      // dataField 로 정의된 필드 값이 HTML 이라면 labelFunction 으로 처리할 필요 없음.
      labelFunction: (rowIndex, columnIndex, value, headerText, item) => {
        // HTML 템플릿 작성
        let template = '<div class="my_div">';
        template +=
          '<span class="my_div_btn" onclick="javascript:$agRendererTemplate.editUser(' +
          rowIndex +
          ', event);">yhkim1@krs.co.kr</span>';
        template += "</div>";
        return template;
      },
    },
    {
      dataField: "company",
      headerText: "Company" + "<br>" + "name ",
    },
    {
      dataField: "department",
      headerText: "Department",
    },
    {
      dataField: "created_date",
      headerText: "KRP Created Date",
      //width:200,
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      //formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    },
    {
      dataField: "expire_date",
      headerText: "Expire Date",
      //width:200,
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      // formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
    },
  ];
  const columnLayoutAdd = [
    {
      dataField: "email",
      headerText: "KRP Reg.code E-mail",
      width: 120,
    },
    {
      dataField: "id",
      headerText: "ID",
      width: 120,
    },
    {
      dataField: "name",
      headerText: "Name",
      width: 140,
    },
    {
      dataField: "country",
      headerText: "Country",
      width: 140,
    },

    {
      dataField: "product",
      headerText: "Product",
      width: 140,
    },
    {
      dataField: "color",
      headerText: "Color",
      width: 100,
    },
    {
      dataField: "price",
      headerText: "Price",
      dataType: "numeric",
      style: "my-column",
      width: 120,
      editRenderer: {
        type: "InputEditRenderer",
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: "right", // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true, // 천단위 구분자 삽입 여부
      },
    },
    {
      dataField: "quantity",
      headerText: "Quantity",
      dataType: "numeric",
      style: "my-column",
      width: 100,
      editRenderer: {
        type: "InputEditRenderer",
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: "right", // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true, // 천단위 구분자 삽입 여부
      },
    },
    {
      dataField: "date",
      headerText: "Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: "yyyy년 mm월 dd일", // 그리드에 보여줄 날짜 형식
    },
  ];

  const columnLayoutEdit = [
    {
      dataField: "email",
      headerText: "KRP Reg.code E-mail",
      width: 120,
    },
    {
      dataField: "id",
      headerText: "ID",
      width: 120,
    },
    {
      dataField: "name",
      headerText: "Name",
      width: 140,
    },
    {
      dataField: "country",
      headerText: "Country",
      width: 140,
    },

    {
      dataField: "product",
      headerText: "Product",
      width: 140,
    },
    {
      dataField: "color",
      headerText: "Color",
      width: 100,
    },
    {
      dataField: "price",
      headerText: "Price",
      dataType: "numeric",
      style: "my-column",
      width: 120,
      editRenderer: {
        type: "InputEditRenderer",
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: "right", // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true, // 천단위 구분자 삽입 여부
      },
    },
    {
      dataField: "quantity",
      headerText: "Quantity",
      dataType: "numeric",
      style: "my-column",
      width: 100,
      editRenderer: {
        type: "InputEditRenderer",
        onlyNumeric: true, // 0~9만 입력가능
        textAlign: "right", // 오른쪽 정렬로 입력되도록 설정
        autoThousandSeparator: true, // 천단위 구분자 삽입 여부
      },
    },
    {
      dataField: "date",
      headerText: "Date",
      dataType: "date",
      dateInputFormat: "yyyy-mm-dd", // 데이터의 날짜 형식
      formatString: "yyyy년 mm월 dd일", // 그리드에 보여줄 날짜 형식
    },
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: "100%",
    height: 350,
    showRowCheckColumn: true,
    showRowNumColumn: false,

    // 행 높이 설정
    rowHeight: 42,
    headerHeight: 42,
    noDataMessage: "출력할 데이터가 없습니다.",
  };
  const gridPropsAdd = {
    width: "100%",
    height: 480,
    showRowCheckColumn: true,
    showRowNumColumn: false,

    // 행 높이 설정
    rowHeight: 42,
    headerHeight: 42,
    noDataMessage: "출력할 데이터가 없습니다.",
  };
  const gridPropsEdit = {
    width: "100%",
    height: 480,
    showRowCheckColumn: true,
    showRowNumColumn: false,

    // 행 높이 설정
    rowHeight: 32,
    headerHeight: 32,
    noDataMessage: "출력할 데이터가 없습니다.",
  };

  useEffect(() => {
    console.log("SampleDefault 마운트됨");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    setupGridEvents();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    requestGridData();

    setHeaderShow(false);

    return () => {
      console.log("SampleDefault 언마운트됨");
    };
  }, [setHeaderShow]);

  // 그리드 이벤트 세팅
  const setupGridEvents = () => {
    const grid = myGrid.current;
    // const gridAdd = myGridAdd.current;
    // const gridEdit = myGridEdit.current;
    // 그리드 이벤트 바인딩
    grid.bind(["cellClick", "selectionChange", "headerClick"], (event) => {
      console.log(event.type);
    });
    // gridAdd.bind(['cellClick', 'selectionChange', 'headerClick'], (event) => {
    //     console.log(event.type);
    // });
    // gridEdit.bind(['cellClick', 'selectionChange', 'headerClick'], (event) => {
    //     console.log(event.type);
    // });
  };

  // const totalItems = 50;
  // const itemsPerPage = 10;

  // const handlePageChange = (page) => {
  //   console.log(`현재 페이지: ${page}`);
  // };

  // 그리드 데이터 조회하여 삽입
  const requestGridData = () => {
    const grid = myGrid.current;
    const gridAdd = myGridAdd.current;
    const gridEdit = myGridEdit.current;
    const data = [
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
      {
        company: "kr1",
        department: "advert",
        created_date: "2014-10-01",
        expire_date: "2014-10-01",
      },
    ];
    const dataAdd = [
      {
        email: "yhkim1@krs.co.kr",
        id: "#Cust0",
        date: "2014-10-01",
        name: "Steve",
        country: "USA",
        product: "IPad Air",
        color: "Green",
        quantity: 3,
        price: 630700,
      },
    ];
    const dataEdit = [
      {
        id: "#Cust0",
        date: "2014-10-01",
        name: "Steve",
        country: "USA",
        product: "IPad Air",
        color: "Green",
        quantity: 3,
        price: 630700,
      },
    ];

    //grid.showAjaxLoader();
    grid.setGridData(data);
    //grid.removeAjaxLoader();

    //gridAdd.showAjaxLoader();
    //gridAdd.setGridData(dataAdd);
    // gridAdd.removeAjaxLoader();

    //gridEdit.showAjaxLoader();
    //gridEdit.setGridData(dataEdit);
    //gridEdit.removeAjaxLoader();
  };

  return (
    <section className="sample">
      <h2 className="title">KRP Registration</h2>
      <div className="grayBox">
        <div className="grayBox__line">
          <div className="grayBox__inner">
            <div className="grayBox__box">
              <div className="grayBox__tit">Auth selection</div>
              <Select
                options={options}
                value={selectedOption}
                onChange={handleSelctChange}
                placeholder="Auth Types"
                size="110px"
              />
            </div>
            <div className="grayBox__box">
              <div className="grayBox__tit">Search</div>
              <InputSearch placeholder="" size="160px" />
            </div>
            <div className="grayBox__btn">
              <Button
                children="apply"
                onClick={handleClick}
                variant="blue"
                size="medium"
                icon="apply"
              />
            </div>
          </div>

          <div className="grayBox__btn">
            <Button
              children="+ADD"
              onClick={handleAddUser}
              variant="green"
              size="medium"
            />
            <Button
              children="-DEL"
              onClick={handleDeleteUser}
              variant="green"
              size="medium"
            />
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleAdd}
              title="confirm"
              type="confirm"
              size={"1200px"}
            >
              <table class="vertical-table">
                <colgroup>
                  <col style={{ width: "160px" }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>User.ID</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>CRM</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>e-Mail</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Expire date</th>
                    <td>
                      <InputText placeholder="" size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Remark</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>KRP 관리자계정여부</th>
                    <td>
                      <InputText placeholder="" size="150px" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal>
            <Modal
              isOpen={isModalOpen2}
              onClose={() => setIsModalOpen2(false)}
              onConfirm={handleAdd}
              title="confirm"
              type="confirm"
              size={"1200px"}
            >
              <table class="vertical-table">
                <colgroup>
                  <col style={{ width: "160px" }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>KRP e-Mail</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Expire date</th>
                    <td>
                      <InputText placeholder="" size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>Remark</th>
                    <td>
                      <InputText placeholder=" " size="150px" />
                    </td>
                  </tr>
                  <tr>
                    <th>KRP 관리자계정여부</th>
                    <td>
                      <InputText placeholder="" size="150px" />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* <UserEditForm/> */}
              {/* <div className='grid__blue'>
                                <AUIGrid ref={myGridAdd} name={uidAdd} columnLayout={columnLayoutAdd} gridProps={gridPropsAdd} />
                            </div> */}
              {/* <div className='grid__blue'>
                                <AUIGrid ref={myGridEdit} name={uidEdit} columnLayout={columnLayoutEdit} gridProps={gridPropsEdit} />
                            </div> */}
              {/* <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Choose an option" size="200px" /> */}
            </Modal>
          </div>
        </div>
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

export default KrpRegistrationEditAdmin;
