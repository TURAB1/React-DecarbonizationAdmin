import React, {useState, useEffect, useRef, useId } from 'react';
import AUIGrid from '../../static/AUIGrid-React/AUIGridReact';
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./subPage.module.scss";

const SubPage = () => {
    const { setHeaderShow } = useHeaderStore();

    // 그리드 객체
    const myGrid = useRef();

    const myGrid2 = useRef();

    // 그리드 name 에 정의할 고유값
    const uid = useId();

    const uid2 = useId();

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
    setHeaderShow(true);
    requestGridData();
},[setHeaderShow]);


// 그리드 데이터 조회하여 삽입
const requestGridData = () => {
    const grid = myGrid.current;
    const grid2 = myGrid2.current;
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
}]

grid.setGridData(data);
grid2.setGridData(data);
}


  return (
    <section className='subPage'>
        <div className="titleBox titleBox--type1">
            <div className='title'>
                Ships List
            </div>
        </div>

        <div className={styles["box"]}>
            <div className='grid__blue'>
                <AUIGrid ref={myGrid} name={uid} columnLayout={columnLayout} gridProps={gridProps} />
            </div>
            <div className='grid__sky'>
                <AUIGrid ref={myGrid2} name={uid2} columnLayout={columnLayout} gridProps={gridProps} />
            </div>
        </div>
    </section>
  );
};

export default SubPage;
