
import React, {useState, useEffect, useRef, useId } from 'react';
import useHeaderStore from '../../store/useHeaderStore';

import AUIGrid from '../../static/AUIGrid-React/AUIGridReact';
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import InputNum from "../../components/InputNum/InputNum";
import InputSearch from "../../components/InputSearch/InputSearch";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import Checkbox from "../../components/Checkbox/Checkbox";
import Radio from "../../components/Radio/Radio";
import Switch from "../../components/Switch/Switch";
import Select from "../../components/Select/Select";
import Tabs from "../../components/Tabs/Tabs";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./test.module.scss";

const PUBLIC_URL = process.env.PUBLIC_URL;

const Test = () => {
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

    const [selectedValue, setSelectedValue] = useState("radio1");

    const handleChange = (event) => {
        setSelectedValue(event.target.id);
    };

    const [activeTab, setActiveTab] = useState(0);
    const [activeTab2, setActiveTab2] = useState(0);

    const tabs = [
        { label: "Home" },
        { label: "Profile" },
        { label: "Settings" },
    ];


    const { setHeaderShow } = useHeaderStore();

    // 그리드 객체
    const myGrid = useRef();

    const myGrid2 = useRef();

    const myGrid3 = useRef();

    const myGrid4 = useRef();

    // 그리드 name 에 정의할 고유값
    const uid = useId();

    const uid2 = useId();

    const uid3 = useId();

    const uid4 = useId();

    // 그리드 칼럼 레이아웃 정의
    const columnLayout = [
      {
        dataField: 'id',
        headerText: 'ID',
        width: 120
      },
      {
        dataField: 'name',
        headerText: 'Name',
        width: 140
      },
      {
        dataField: 'country',
        headerText: 'Country',
        width: 140
      },
      {
        dataField: 'flag',
        headerText: 'Flag IMG',
        editable: false,
        prefix: PUBLIC_URL + '/assets/images/auigrid/',
        renderer: {
          type: 'ImageRenderer',
          imgHeight: 24,
          altField: 'country'
        },
        width: 100
      },
      {
        dataField: 'product',
        headerText: 'Product',
        width: 140
      },
      {
        dataField: 'color',
        headerText: 'Color',
        width: 100
      },
      {
        dataField: 'price',
        headerText: 'Price',
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
        dataField: 'quantity',
        headerText: 'Quantity',
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
        dataField: 'date',
        headerText: 'Date',
        dataType: 'date',
        dateInputFormat: 'yyyy-mm-dd', // 데이터의 날짜 형식
        formatString: 'yyyy년 mm월 dd일' // 그리드에 보여줄 날짜 형식
      }
    ];

    // 그리드 속성 정의
    const gridProps = {
      width: '100%',
      height: 480,

      showRowNumColumn: false,

      // 행 높이 설정
      rowHeight: 32,
      headerHeight: 32,
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

    const totalItems = 50;
    const itemsPerPage = 10;
  
    const handlePageChange = (page) => {
      console.log(`현재 페이지: ${page}`);
    };
  

    // 그리드 데이터 조회하여 삽입
    const requestGridData = () => {
      const grid = myGrid.current;
      const grid2 = myGrid2.current;
      const grid3 = myGrid3.current;
      const grid4 = myGrid4.current;
      const data = [{
        "id": "#Cust0",
        "date": "2014-10-01",
        "name": "Steve",
        "country": "USA",
        "flag": "usa.png",
        "product": "IPad Air",
        "color": "Green",
        "quantity": 3,
        "price": 630700
    }, {
        "id": "#Cust1",
        "date": "2014-09-30",
        "name": "Emma",
        "country": "Korea",
        "flag": "korea.png",
        "product": "LG G3",
        "color": "Pink",
        "quantity": 1,
        "price": 503800
    }, {
        "id": "#Cust2",
        "date": "2014-09-29",
        "name": "Emma",
        "country": "Japan",
        "flag": "japan.png",
        "product": "IPad Air",
        "color": "Yellow",
        "quantity": 7,
        "price": 66900
    }, {
        "id": "#Cust3",
        "date": "2014-09-28",
        "name": "Emma",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy Note3",
        "color": "Orange",
        "quantity": 9,
        "price": 458300
    }, {
        "id": "#Cust4",
        "date": "2014-09-27",
        "name": "Anna",
        "country": "China",
        "flag": "china.png",
        "product": "LG G3",
        "color": "Violet",
        "quantity": 10,
        "price": 168100
    }, {
        "id": "#Cust5",
        "date": "2014-09-26",
        "name": "Anna",
        "country": "USA",
        "flag": "usa.png",
        "product": "Galaxy S5",
        "color": "Gray",
        "quantity": 3,
        "price": 10400
    }, {
        "id": "#Cust6",
        "date": "2014-09-25",
        "name": "Lowrence",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "LG G3",
        "color": "Yellow",
        "quantity": 12,
        "price": 696100
    }, {
        "id": "#Cust7",
        "date": "2014-09-24",
        "name": "Lowrence",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "Galaxy Note3",
        "color": "Yellow",
        "quantity": 12,
        "price": 623600
    }, {
        "id": "#Cust8",
        "date": "2014-09-23",
        "name": "Kim",
        "country": "Japan",
        "flag": "japan.png",
        "product": "IPad Air",
        "color": "Gray",
        "quantity": 7,
        "price": 8000
    }, {
        "id": "#Cust9",
        "date": "2014-09-22",
        "name": "Kim",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy S5",
        "color": "Orange",
        "quantity": 9,
        "price": 982600
    }, {
        "id": "#Cust10",
        "date": "2014-09-21",
        "name": "Jennifer",
        "country": "UK",
        "flag": "uk.png",
        "product": "IPad Air",
        "color": "Green",
        "quantity": 9,
        "price": 800400
    }, {
        "id": "#Cust11",
        "date": "2014-09-20",
        "name": "Steve",
        "country": "Japan",
        "flag": "japan.png",
        "product": "Galaxy Note3",
        "color": "Yellow",
        "quantity": 7,
        "price": 740100
    }, {
        "id": "#Cust12",
        "date": "2014-09-19",
        "name": "Emma",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPhone 5S",
        "color": "Green",
        "quantity": 20,
        "price": 868400
    }, {
        "id": "#Cust13",
        "date": "2014-09-18",
        "name": "Anna",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 15,
        "price": 266800
    }, {
        "id": "#Cust14",
        "date": "2014-09-17",
        "name": "Steve",
        "country": "China",
        "flag": "china.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 10,
        "price": 848100
    }, {
        "id": "#Cust15",
        "date": "2014-09-16",
        "name": "Emma",
        "country": "Italy",
        "flag": "italy.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 15,
        "price": 401900
    }, {
        "id": "#Cust16",
        "date": "2014-09-15",
        "name": "Anna",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPad Air",
        "color": "Green",
        "quantity": 20,
        "price": 969700
    }, {
        "id": "#Cust17",
        "date": "2014-09-14",
        "name": "Steve",
        "country": "Japan",
        "flag": "japan.png",
        "product": "LG G3",
        "color": "Orange",
        "quantity": 7,
        "price": 204700
    }, {
        "id": "#Cust18",
        "date": "2014-09-13",
        "name": "Steve",
        "country": "Korea",
        "flag": "korea.png",
        "product": "LG G3",
        "color": "Orange",
        "quantity": 1,
        "price": 808000
    }, {
        "id": "#Cust19",
        "date": "2014-09-12",
        "name": "Anna",
        "country": "Japan",
        "flag": "japan.png",
        "product": "Galaxy S5",
        "color": "Gray",
        "quantity": 7,
        "price": 701800
    }, {
        "id": "#Cust20",
        "date": "2014-09-11",
        "name": "Kim",
        "country": "UK",
        "flag": "uk.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 9,
        "price": 31000
    }, {
        "id": "#Cust21",
        "date": "2014-09-10",
        "name": "Kim",
        "country": "China",
        "flag": "china.png",
        "product": "LG G3",
        "color": "Blue",
        "quantity": 10,
        "price": 640200
    }, {
        "id": "#Cust22",
        "date": "2014-09-09",
        "name": "Anna",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPad Air",
        "color": "Green",
        "quantity": 20,
        "price": 149300
    }, {
        "id": "#Cust23",
        "date": "2014-09-08",
        "name": "Emma",
        "country": "France",
        "flag": "france.png",
        "product": "IPhone 5S",
        "color": "Violet",
        "quantity": 0,
        "price": 234800
    }, {
        "id": "#Cust24",
        "date": "2014-09-07",
        "name": "Kim",
        "country": "USA",
        "flag": "usa.png",
        "product": "IPad Air",
        "color": "Gray",
        "quantity": 3,
        "price": 269000
    }, {
        "id": "#Cust25",
        "date": "2014-09-06",
        "name": "Emma",
        "country": "Korea",
        "flag": "korea.png",
        "product": "IPhone 5S",
        "color": "Blue",
        "quantity": 1,
        "price": 917700
    }, {
        "id": "#Cust26",
        "date": "2014-09-05",
        "name": "Jennifer",
        "country": "China",
        "flag": "china.png",
        "product": "Galaxy S5",
        "color": "Yellow",
        "quantity": 10,
        "price": 838900
    }, {
        "id": "#Cust27",
        "date": "2014-09-04",
        "name": "Jennifer",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 20,
        "price": 93700
    }, {
        "id": "#Cust28",
        "date": "2014-09-03",
        "name": "Kim",
        "country": "France",
        "flag": "france.png",
        "product": "IPad Air",
        "color": "Blue",
        "quantity": 0,
        "price": 403500
    }, {
        "id": "#Cust29",
        "date": "2014-09-02",
        "name": "Steve",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy Note3",
        "color": "Yellow",
        "quantity": 9,
        "price": 881000
    }, {
        "id": "#Cust30",
        "date": "2014-09-01",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "Galaxy S5",
        "color": "Pink",
        "quantity": 20,
        "price": 348000
    }, {
        "id": "#Cust31",
        "date": "2014-08-31",
        "name": "Steve",
        "country": "Japan",
        "flag": "japan.png",
        "product": "IPad Air",
        "color": "Gray",
        "quantity": 7,
        "price": 871700
    }, {
        "id": "#Cust32",
        "date": "2014-08-30",
        "name": "Anna",
        "country": "UK",
        "flag": "uk.png",
        "product": "IPhone 5S",
        "color": "Yellow",
        "quantity": 9,
        "price": 653100
    }, {
        "id": "#Cust33",
        "date": "2014-08-29",
        "name": "Kim",
        "country": "Korea",
        "flag": "korea.png",
        "product": "IPhone 5S",
        "color": "Gray",
        "quantity": 1,
        "price": 873500
    }, {
        "id": "#Cust34",
        "date": "2014-08-28",
        "name": "Steve",
        "country": "UK",
        "flag": "uk.png",
        "product": "IPad Air",
        "color": "Orange",
        "quantity": 9,
        "price": 643600
    }, {
        "id": "#Cust35",
        "date": "2014-08-27",
        "name": "Emma",
        "country": "Italy",
        "flag": "italy.png",
        "product": "IPhone 5S",
        "color": "Orange",
        "quantity": 15,
        "price": 664200
    }, {
        "id": "#Cust36",
        "date": "2014-08-26",
        "name": "Lowrence",
        "country": "China",
        "flag": "china.png",
        "product": "IPhone 5S",
        "color": "Orange",
        "quantity": 10,
        "price": 736900
    }, {
        "id": "#Cust37",
        "date": "2014-08-25",
        "name": "Kim",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy S5",
        "color": "Gray",
        "quantity": 15,
        "price": 739300
    }, {
        "id": "#Cust38",
        "date": "2014-08-24",
        "name": "Lowrence",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "LG G3",
        "color": "Pink",
        "quantity": 12,
        "price": 195600
    }, {
        "id": "#Cust39",
        "date": "2014-08-23",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPhone 5S",
        "color": "Pink",
        "quantity": 20,
        "price": 64500
    }, {
        "id": "#Cust40",
        "date": "2014-08-22",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPhone 5S",
        "color": "Blue",
        "quantity": 20,
        "price": 873400
    }, {
        "id": "#Cust41",
        "date": "2014-08-21",
        "name": "Steve",
        "country": "USA",
        "flag": "usa.png",
        "product": "IPhone 5S",
        "color": "Orange",
        "quantity": 3,
        "price": 821600
    }, {
        "id": "#Cust42",
        "date": "2014-08-20",
        "name": "Kim",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy S5",
        "color": "Yellow",
        "quantity": 9,
        "price": 971100
    }, {
        "id": "#Cust43",
        "date": "2014-08-19",
        "name": "Kim",
        "country": "China",
        "flag": "china.png",
        "product": "Galaxy Note3",
        "color": "Blue",
        "quantity": 10,
        "price": 165400
    }, {
        "id": "#Cust44",
        "date": "2014-08-18",
        "name": "Jennifer",
        "country": "Italy",
        "flag": "italy.png",
        "product": "IPhone 5S",
        "color": "Yellow",
        "quantity": 15,
        "price": 781600
    }, {
        "id": "#Cust45",
        "date": "2014-08-17",
        "name": "Kim",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy Note3",
        "color": "Orange",
        "quantity": 15,
        "price": 964400
    }, {
        "id": "#Cust46",
        "date": "2014-08-16",
        "name": "Jennifer",
        "country": "USA",
        "flag": "usa.png",
        "product": "LG G3",
        "color": "Violet",
        "quantity": 3,
        "price": 441200
    }, {
        "id": "#Cust47",
        "date": "2014-08-15",
        "name": "Kim",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "LG G3",
        "color": "Yellow",
        "quantity": 20,
        "price": 560900
    }, {
        "id": "#Cust48",
        "date": "2014-08-14",
        "name": "Lowrence",
        "country": "France",
        "flag": "france.png",
        "product": "Galaxy S5",
        "color": "Gray",
        "quantity": 0,
        "price": 680000
    }, {
        "id": "#Cust49",
        "date": "2014-08-13",
        "name": "Steve",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 9,
        "price": 512100
    }, {
        "id": "#Cust50",
        "date": "2014-08-12",
        "name": "Jennifer",
        "country": "Korea",
        "flag": "korea.png",
        "product": "IPad Air",
        "color": "Yellow",
        "quantity": 1,
        "price": 572800
    }, {
        "id": "#Cust51",
        "date": "2014-08-11",
        "name": "Steve",
        "country": "USA",
        "flag": "usa.png",
        "product": "Galaxy Note3",
        "color": "Green",
        "quantity": 3,
        "price": 345600
    }, {
        "id": "#Cust52",
        "date": "2014-08-10",
        "name": "Emma",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "LG G3",
        "color": "Violet",
        "quantity": 12,
        "price": 287600
    }, {
        "id": "#Cust53",
        "date": "2014-08-09",
        "name": "Steve",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 12,
        "price": 307500
    }, {
        "id": "#Cust54",
        "date": "2014-08-08",
        "name": "Emma",
        "country": "Korea",
        "flag": "korea.png",
        "product": "IPhone 5S",
        "color": "Yellow",
        "quantity": 1,
        "price": 835200
    }, {
        "id": "#Cust55",
        "date": "2014-08-07",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 20,
        "price": 112800
    }, {
        "id": "#Cust56",
        "date": "2014-08-06",
        "name": "Anna",
        "country": "Japan",
        "flag": "japan.png",
        "product": "IPad Air",
        "color": "Orange",
        "quantity": 7,
        "price": 822200
    }, {
        "id": "#Cust57",
        "date": "2014-08-05",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 20,
        "price": 694300
    }, {
        "id": "#Cust58",
        "date": "2014-08-04",
        "name": "Jennifer",
        "country": "France",
        "flag": "france.png",
        "product": "LG G3",
        "color": "Green",
        "quantity": 0,
        "price": 197900
    }, {
        "id": "#Cust59",
        "date": "2014-08-03",
        "name": "Steve",
        "country": "Japan",
        "flag": "japan.png",
        "product": "IPhone 5S",
        "color": "Blue",
        "quantity": 7,
        "price": 955200
    }, {
        "id": "#Cust60",
        "date": "2014-08-02",
        "name": "Kim",
        "country": "Korea",
        "flag": "korea.png",
        "product": "Galaxy Note3",
        "color": "Yellow",
        "quantity": 1,
        "price": 4400
    }, {
        "id": "#Cust61",
        "date": "2014-08-01",
        "name": "Emma",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy S5",
        "color": "Green",
        "quantity": 9,
        "price": 517100
    }, {
        "id": "#Cust62",
        "date": "2014-07-31",
        "name": "Emma",
        "country": "France",
        "flag": "france.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 0,
        "price": 128500
    }, {
        "id": "#Cust63",
        "date": "2014-07-30",
        "name": "Lowrence",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 12,
        "price": 468700
    }, {
        "id": "#Cust64",
        "date": "2014-07-29",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPhone 5S",
        "color": "Green",
        "quantity": 20,
        "price": 51100
    }, {
        "id": "#Cust65",
        "date": "2014-07-28",
        "name": "Emma",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "LG G3",
        "color": "Gray",
        "quantity": 20,
        "price": 119300
    }, {
        "id": "#Cust66",
        "date": "2014-07-27",
        "name": "Lowrence",
        "country": "China",
        "flag": "china.png",
        "product": "LG G3",
        "color": "Yellow",
        "quantity": 10,
        "price": 595800
    }, {
        "id": "#Cust67",
        "date": "2014-07-26",
        "name": "Anna",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "IPad Air",
        "color": "Yellow",
        "quantity": 12,
        "price": 745200
    }, {
        "id": "#Cust68",
        "date": "2014-07-25",
        "name": "Lowrence",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "LG G3",
        "color": "Gray",
        "quantity": 20,
        "price": 681300
    }, {
        "id": "#Cust69",
        "date": "2014-07-24",
        "name": "Anna",
        "country": "USA",
        "flag": "usa.png",
        "product": "Galaxy S5",
        "color": "Orange",
        "quantity": 3,
        "price": 344100
    }, {
        "id": "#Cust70",
        "date": "2014-07-23",
        "name": "Lowrence",
        "country": "UK",
        "flag": "uk.png",
        "product": "Galaxy S5",
        "color": "Blue",
        "quantity": 9,
        "price": 69700
    }, {
        "id": "#Cust71",
        "date": "2014-07-22",
        "name": "Kim",
        "country": "France",
        "flag": "france.png",
        "product": "Galaxy S5",
        "color": "Violet",
        "quantity": 0,
        "price": 379700
    }, {
        "id": "#Cust72",
        "date": "2014-07-21",
        "name": "Jennifer",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy S5",
        "color": "Pink",
        "quantity": 15,
        "price": 115300
    }, {
        "id": "#Cust73",
        "date": "2014-07-20",
        "name": "Jennifer",
        "country": "Korea",
        "flag": "korea.png",
        "product": "LG G3",
        "color": "Yellow",
        "quantity": 1,
        "price": 535700
    }, {
        "id": "#Cust74",
        "date": "2014-07-19",
        "name": "Jennifer",
        "country": "China",
        "flag": "china.png",
        "product": "IPad Air",
        "color": "Green",
        "quantity": 10,
        "price": 517500
    }, {
        "id": "#Cust75",
        "date": "2014-07-18",
        "name": "Lowrence",
        "country": "China",
        "flag": "china.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 10,
        "price": 464900
    }, {
        "id": "#Cust76",
        "date": "2014-07-17",
        "name": "Jennifer",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "Galaxy S5",
        "color": "Gray",
        "quantity": 20,
        "price": 70300
    }, {
        "id": "#Cust77",
        "date": "2014-07-16",
        "name": "Lowrence",
        "country": "France",
        "flag": "france.png",
        "product": "LG G3",
        "color": "Pink",
        "quantity": 0,
        "price": 538000
    }, {
        "id": "#Cust78",
        "date": "2014-07-15",
        "name": "Emma",
        "country": "USA",
        "flag": "usa.png",
        "product": "Galaxy Note3",
        "color": "Violet",
        "quantity": 3,
        "price": 409000
    }, {
        "id": "#Cust79",
        "date": "2014-07-14",
        "name": "Emma",
        "country": "Italy",
        "flag": "italy.png",
        "product": "LG G3",
        "color": "Pink",
        "quantity": 15,
        "price": 595000
    }, {
        "id": "#Cust80",
        "date": "2014-07-13",
        "name": "Kim",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "IPad Air",
        "color": "Blue",
        "quantity": 20,
        "price": 764800
    }, {
        "id": "#Cust81",
        "date": "2014-07-12",
        "name": "Kim",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "Galaxy Note3",
        "color": "Orange",
        "quantity": 12,
        "price": 694500
    }, {
        "id": "#Cust82",
        "date": "2014-07-11",
        "name": "Kim",
        "country": "China",
        "flag": "china.png",
        "product": "Galaxy Note3",
        "color": "Green",
        "quantity": 10,
        "price": 712300
    }, {
        "id": "#Cust83",
        "date": "2014-07-10",
        "name": "Anna",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "IPhone 5S",
        "color": "Blue",
        "quantity": 12,
        "price": 863700
    }, {
        "id": "#Cust84",
        "date": "2014-07-09",
        "name": "Emma",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "LG G3",
        "color": "Violet",
        "quantity": 12,
        "price": 918900
    }, {
        "id": "#Cust85",
        "date": "2014-07-08",
        "name": "Jennifer",
        "country": "Japan",
        "flag": "japan.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 7,
        "price": 849000
    }, {
        "id": "#Cust86",
        "date": "2014-07-07",
        "name": "Anna",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy S5",
        "color": "Green",
        "quantity": 15,
        "price": 896600
    }, {
        "id": "#Cust87",
        "date": "2014-07-06",
        "name": "Anna",
        "country": "Korea",
        "flag": "korea.png",
        "product": "IPad Air",
        "color": "Yellow",
        "quantity": 1,
        "price": 865100
    }, {
        "id": "#Cust88",
        "date": "2014-07-05",
        "name": "Emma",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "Galaxy Note3",
        "color": "Orange",
        "quantity": 12,
        "price": 750900
    }, {
        "id": "#Cust89",
        "date": "2014-07-04",
        "name": "Lowrence",
        "country": "France",
        "flag": "france.png",
        "product": "IPad Air",
        "color": "Violet",
        "quantity": 0,
        "price": 345900
    }, {
        "id": "#Cust90",
        "date": "2014-07-03",
        "name": "Emma",
        "country": "Korea",
        "flag": "korea.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 1,
        "price": 930700
    }, {
        "id": "#Cust91",
        "date": "2014-07-02",
        "name": "Kim",
        "country": "Singapore",
        "flag": "singapore.png",
        "product": "LG G3",
        "color": "Violet",
        "quantity": 20,
        "price": 692700
    }, {
        "id": "#Cust92",
        "date": "2014-07-01",
        "name": "Kim",
        "country": "Ireland",
        "flag": "ireland.png",
        "product": "IPhone 5S",
        "color": "Violet",
        "quantity": 12,
        "price": 979100
    }, {
        "id": "#Cust93",
        "date": "2014-06-30",
        "name": "Kim",
        "country": "Korea",
        "flag": "korea.png",
        "product": "LG G3",
        "color": "Gray",
        "quantity": 1,
        "price": 28200
    }, {
        "id": "#Cust94",
        "date": "2014-06-29",
        "name": "Jennifer",
        "country": "Italy",
        "flag": "italy.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 15,
        "price": 283700
    }, {
        "id": "#Cust95",
        "date": "2014-06-28",
        "name": "Anna",
        "country": "Japan",
        "flag": "japan.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 7,
        "price": 940000
    }, {
        "id": "#Cust96",
        "date": "2014-06-27",
        "name": "Kim",
        "country": "Italy",
        "flag": "italy.png",
        "product": "IPad Air",
        "color": "Pink",
        "quantity": 15,
        "price": 822900
    }, {
        "id": "#Cust97",
        "date": "2014-06-26",
        "name": "Lowrence",
        "country": "France",
        "flag": "france.png",
        "product": "Galaxy Note3",
        "color": "Pink",
        "quantity": 0,
        "price": 239400
    }, {
        "id": "#Cust98",
        "date": "2014-06-25",
        "name": "Lowrence",
        "country": "Korea",
        "flag": "korea.png",
        "product": "Galaxy Note3",
        "color": "Gray",
        "quantity": 1,
        "price": 922600
    }, {
        "id": "#Cust99",
        "date": "2014-06-24",
        "name": "Steve",
        "country": "USA",
        "flag": "usa.png",
        "product": "Galaxy Note3",
        "color": "Violet",
        "quantity": 3,
        "price": 701300
    }]

      grid.setGridData(data);
      grid2.setGridData(data);
      grid3.setGridData(data);
      grid4.setGridData(data);
    };

    return (
      <section className={styles.box}>
        <h2 className='title'>
            Title
        </h2>
        <br/>    
        <h3 className='subTitle'>
            Sub title
        </h3>
        <br/>
        <h4 className='headline'>
            Headline
        </h4>
        <br/>
        <div>
          <InputText placeholder="검색어를 입력하세요." size="200px"/>
          <br/>
          <InputText defaultValue="Hello World" size="200px"/>
          <br/>
          <InputText defaultValue="Hello World" disabled size="256px"/>
        </div>
        <br/>
        <div>
          <InputNum placeholder="숫자를 입력하세요" size="200px"/>
          <br/>
          <InputNum defaultValue="11" size="200px"/>
          <br/>
          <InputNum defaultValue="000" disabled size="256px"/>
        </div>

        <br/>

        <div>
          <InputSearch placeholder="search" size="200px"/>
          <br/>
          <InputSearch defaultValue="search" size="200px"/>
          <br/>
          <InputSearch defaultValue="search" disabled size="256px"/>
        </div>

        <br/>

        <div>
          <InputCalendar id="InputCalendar1" placeholder="" size="200px"/>
          <br/>
          <InputCalendar id="InputCalendar2" defaultValue="2023-01-01" size="200px"/>
          <br/>
          <InputCalendar id="InputCalendar3" defaultValue="2023-01-01" disabled size="200px"/>
        </div>
        
        <br/>
        <div className='flex'>
            <Checkbox id="ChackBox1" name="ChackBox" defaultChecked={true} label="ALL" />
            <Checkbox id="ChackBox2" name="ChackBox" defaultChecked={false} disabled={true} />
        </div>
        <br/>

        <div className="flex">
            <Radio id="radio1" name="radioGroup" label="ALL" checked={selectedValue === "radio1"} onChange={handleChange} />
            <Radio id="radio2" name="radioGroup" checked={selectedValue === "radio2"} onChange={handleChange} />
            <Radio id="radio3" name="radioGroup" disabled={true} checked={selectedValue === "radio3"} onChange={handleChange} />
        </div>
        <br/>

        <div>
            <Switch id="toggle1" defaultChecked={true} label="Noon" />
            <br/>
            <Switch id="toggle2" defaultChecked={false} label="Noon" />
        </div>
        <br/>

        <div>
            <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Choose an option" size="200px"/>
            <p>Selected: {selectedOption}</p>
        </div>
        <br/>

        <div>
            {/* 탭 버튼만 표시 */}
            <Tabs tabs={tabs} activeIndex={activeTab} onTabChange={setActiveTab} color="green" />

            {/* 선택된 탭에 따라 콘텐츠 변경 */}
            <div>
                {activeTab === 0 && <p>🏠 content1</p>}
                {activeTab === 1 && <p>👤 content2</p>}
                {activeTab === 2 && <p>⚙️ content3</p>}
            </div>
        </div>
        <br/>

        <div>
            {/* 탭 버튼만 표시 */}
            <Tabs tabs={tabs} activeIndex={activeTab2} onTabChange={setActiveTab2} color="blue" />

            {/* 선택된 탭에 따라 콘텐츠 변경 */}
            <div>
                {activeTab2 === 0 && <p>🏠 content1</p>}
                {activeTab2 === 1 && <p>👤 content2</p>}
                {activeTab2 === 2 && <p>⚙️ content3</p>}
            </div>
        </div>
        <br/>
        <br/>
        
        <div>
            <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
        </div>
        <br/>
        <br/>

        <div>
          <Button children="추가" onClick={handleClick} variant="blue" size="medium"/>
          <br/>
          <br/>
          <Button children="추가" onClick={handleClick} variant="lineBlue" size="medium"/>
          <br/>
          <br/>
          <Button children="추가" onClick={handleClick} variant="green" size="small"/>
          <br/>
          <br/>
          <Button children="추가" onClick={handleClick} variant="lineGreen" size="small"/>
          <br/>
          <br/>
          <Button children="apply" onClick={handleClick} variant="green" size="medium" icon="apply"/>
          <br/>
          <Button children="apply" onClick={handleClick} variant="green" size="medium" icon="apply" disabled={true} />
          <br/>
          <Button children="Ship AAA" onClick={handleClick} icon="blueClose" />
          <br/>
          <Button children="Ship AAA" onClick={handleClick} icon="greenClose" />
          <br/>
          <Button children="Upload Logo" onClick={handleClick} variant="blue" size="medium" icon="upload"/>
          <br/>
          <Button children="Export PDF" onClick={handleClick} variant="blue" size="medium" icon="export"/>
        </div>

        <br/>
        <div className='grid__blue'>
          <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <br/>
        <div className='grid__sky'>
          <AUIGrid ref={myGrid2} name={uid2} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <br/>
        <div className='grid__borderBlue'>
          <AUIGrid ref={myGrid3} name={uid3} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <br/>
        <div className='grid__borderSky'>
          <AUIGrid ref={myGrid4} name={uid4} columnLayout={columnLayout} gridProps={gridProps} />
        </div>
        <br/>
        <table class="horizontal-table">
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>제목1</th>
                    <th>제목2</th>
                    <th>제목3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table class="horizontal-table2">
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>제목1</th>
                    <th>제목2</th>
                    <th>제목3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table class="horizontal-table3">
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>제목1</th>
                    <th>제목2</th>
                    <th>제목3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table class="horizontal-table4">
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>제목1</th>
                    <th>제목2</th>
                    <th>제목3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </table>
      </section>
    );
  };
  
  export default Test;
  